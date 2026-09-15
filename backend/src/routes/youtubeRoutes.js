const express = require('express');
const { fetchPlaylists, fetchVideosByPlaylist, fetchChannelUploads, enrichVideoTypes } = require('../utils/youtube');
const { playlistCategories, keywordCategories } = require('../config/youtubeCategories');

const router = express.Router();

const resolveCategory = (title, playlistCategory) => {
  if (playlistCategory) return playlistCategory;
  const normalizedTitle = title.toLowerCase();
  const keyword = Object.keys(keywordCategories).find((term) => normalizedTitle.includes(term));
  return keyword ? keywordCategories[keyword] : 'Other';
};

const normalizeVideo = (video, category, source) => {
  const resolvedCategory = resolveCategory(video.title, category);
  return {
    ...video,
    category: resolvedCategory,
    source,
    categoryPriority: source === 'configured-playlist' ? 3 : source === 'playlist' ? 2 : resolvedCategory !== 'Other' ? 1 : 0
  };
};

const DEFAULT_CHANNEL_ID = 'UCdIeEUCrh0rPYyK2Nuk9NDw';

router.get('/work', async (req, res) => {
  try {
    const channelId = (req.query.channelId || process.env.YOUTUBE_CHANNEL_ID || process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || DEFAULT_CHANNEL_ID).trim();
    if (!channelId) return res.status(500).json({ status: 'error', message: 'YouTube channel ID is not configured.' });

    const playlists = await fetchPlaylists(channelId);
    const configuredById = new Map(Object.entries(playlistCategories).filter(([, id]) => id).map(([name, id]) => [id, name]));
    const playlistVideos = (await Promise.all(playlists.map(async (playlist) => {
      const configuredCategory = configuredById.get(playlist.id);
      const category = configuredCategory || playlist.snippet?.title || 'Other';
      const source = configuredCategory ? 'configured-playlist' : 'playlist';
      return fetchVideosByPlaylist(playlist.id, category).then((videos) => videos.map((video) => ({ ...video, source })));
    }))).flat();
    const uploads = (await fetchChannelUploads(channelId)).map((video) => ({ ...video, source: 'upload' }));
    const enrichedVideos = await enrichVideoTypes([...playlistVideos, ...uploads]);
    const videos = new Map();

    // Configured playlists win over ordinary playlists, which win over upload keyword classification.
    enrichedVideos.forEach((video) => {
      const normalized = normalizeVideo(video, video.category, video.source);
      const current = videos.get(normalized.id);
      if (!current || normalized.categoryPriority > current.categoryPriority) videos.set(normalized.id, normalized);
    });

    const categories = [...new Set([...Object.keys(playlistCategories), ...Array.from(videos.values(), (video) => video.category)])]
      .filter(Boolean)
      .map((name) => ({ name, videos: Array.from(videos.values()).filter((video) => video.category === name) }))
      .filter((category) => category.videos.length > 0);

    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    return res.json({ status: 'success', data: { categories } });
  } catch (error) {
    return res.status(502).json({ status: 'error', message: error.message || 'Failed to fetch YouTube work.' });
  }
});

const decodeEntities = (text = '') => {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

const sanitizeHandle = (handle = '') => handle.replace(/^@/, '').trim();

const extractChannelId = (html = '') => {
  const match = html.match(/"channelId":"(UC[^"]+)"/);
  return match ? match[1] : null;
};

const parseFeedEntries = (xml = '') => {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];

  return entries.map((entry, index) => {
    const videoId = (entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1] || `video-${index}`;
    const titleRaw = (entry.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || 'YouTube Upload';
    const title = decodeEntities(titleRaw.trim());
    const link = (entry.match(/<link[^>]*href="([^"]+)"/) || [])[1] || `https://www.youtube.com/watch?v=${videoId}`;
    const published = (entry.match(/<published>([^<]+)<\/published>/) || [])[1] || null;

    const isShort = /#shorts/i.test(title) || /\/shorts\//i.test(link);

    return {
      id: `yt-${videoId}`,
      title,
      category: 'Others',
      mediaType: isShort ? 'Shorts' : 'Video',
      type: isShort ? 'Short-Form' : 'Long-form Story',
      description: 'Auto-synced from latest YouTube uploads.',
      url: link,
      publishedAt: published
    };
  });
};

router.get('/uploads', async (req, res) => {
  try {
    const max = Math.min(Math.max(Number(req.query.max) || 12, 1), 30);
    const queryChannelId = (req.query.channelId || '').trim();
    const handle = sanitizeHandle(req.query.handle || process.env.YOUTUBE_HANDLE || 'asrvisuals');

    let channelId = queryChannelId;

    if (!channelId) {
      const channelPageUrl = `https://www.youtube.com/@${encodeURIComponent(handle)}`;
      const channelResponse = await fetch(channelPageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ASRVisualsBot/1.0)'
        }
      });

      if (!channelResponse.ok) {
        return res.status(502).json({
          status: 'fail',
          message: 'Unable to resolve YouTube channel handle right now.'
        });
      }

      const channelHtml = await channelResponse.text();
      channelId = extractChannelId(channelHtml);

      if (!channelId) {
        return res.status(502).json({
          status: 'fail',
          message: 'Unable to detect channel id from YouTube handle.'
        });
      }
    }

    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;
    const feedResponse = await fetch(feedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ASRVisualsBot/1.0)'
      }
    });

    if (!feedResponse.ok) {
      return res.status(502).json({
        status: 'fail',
        message: 'Unable to fetch YouTube uploads feed right now.'
      });
    }

    const xml = await feedResponse.text();
    const uploads = parseFeedEntries(xml).slice(0, max);

    return res.status(200).json({
      status: 'success',
      data: {
        channelId,
        handle,
        count: uploads.length,
        uploads
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch YouTube uploads.',
      error: error.message
    });
  }
});

module.exports = router;
