const API_URL = 'https://www.googleapis.com/youtube/v3';
const CACHE_MS = 5 * 60 * 1000;
const cache = new Map();

const getApiKey = () => process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

const request = async (resource, params) => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('YouTube API key is not configured.');
  const searchParams = new URLSearchParams({ ...params, key: apiKey });
  const cacheKey = `${resource}?${[...searchParams].filter(([key]) => key !== 'key').map(([key, value]) => `${key}=${value}`).join('&')}`;
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.value;

  const response = await fetch(`${API_URL}/${resource}?${searchParams}`);
  const body = await response.json();
  if (!response.ok) throw new Error(body?.error?.message || 'YouTube API request failed.');
  cache.set(cacheKey, { value: body, expiresAt: Date.now() + CACHE_MS });
  return body;
};

const getAllPages = async (resource, params) => {
  const items = [];
  let pageToken = '';
  do {
    const page = await request(resource, { ...params, maxResults: '50', ...(pageToken ? { pageToken } : {}) });
    items.push(...(page.items || []));
    pageToken = page.nextPageToken || '';
  } while (pageToken);
  return items;
};

const toVideo = (item, category) => {
  const snippet = item.snippet || {};
  const videoId = snippet.resourceId?.videoId || item.id?.videoId;
  if (!videoId) return null;
  const title = snippet.title || 'YouTube video';
  return {
    id: videoId,
    title,
    description: snippet.description || '',
    url: `https://www.youtube.com/watch?v=${videoId}`,
    thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    publishedAt: snippet.publishedAt || null,
    category,
    mediaType: /#shorts|\bshorts?\b/i.test(`${title} ${snippet.description || ''}`) ? 'Shorts' : 'Video',
    duration: null
  };
};

const parseDuration = (duration = '') => {
  const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return null;
  return (Number(match[1] || 0) * 3600) + (Number(match[2] || 0) * 60) + Number(match[3] || 0);
};

const enrichVideoTypes = async (videos) => {
  const ids = [...new Set(videos.map((video) => video.id).filter(Boolean))];
  const details = new Map();

  for (let index = 0; index < ids.length; index += 50) {
    const page = await request('videos', {
      part: 'contentDetails,snippet,liveStreamingDetails',
      id: ids.slice(index, index + 50).join(',')
    });
    (page.items || []).forEach((item) => {
      const liveDetails = item.liveStreamingDetails || {};
      details.set(item.id, {
        duration: parseDuration(item.contentDetails?.duration),
        title: item.snippet?.title,
        description: item.snippet?.description,
        liveStatus: liveDetails.actualStartTime && !liveDetails.actualEndTime ? 'live' : liveDetails.scheduledStartTime && !liveDetails.actualStartTime ? 'upcoming' : 'offline'
      });
    });
  }

  return videos.map((video) => {
    const detail = details.get(video.id);
    if (!detail) return video;
    const searchableText = `${video.title} ${video.description} ${detail.title || ''} ${detail.description || ''}`;
    const isShort = /#shorts|\bshorts?\b/i.test(searchableText) || (detail.duration !== null && detail.duration <= 180);
    return { ...video, title: detail.title || video.title, description: detail.description || video.description, duration: detail.duration, liveStatus: detail.liveStatus, mediaType: isShort ? 'Shorts' : 'Video' };
  });
};

const fetchPlaylists = async (channelId) => getAllPages('playlists', { part: 'snippet,contentDetails', channelId });
const fetchVideosByPlaylist = async (playlistId, category) => (await getAllPages('playlistItems', { part: 'snippet,contentDetails', playlistId })).map((item) => toVideo(item, category)).filter(Boolean);
const fetchChannelUploads = async (channelId) => {
  const channel = await request('channels', { part: 'contentDetails', id: channelId });
  const uploadsId = channel.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsId) return [];
  return (await getAllPages('playlistItems', { part: 'snippet,contentDetails', playlistId: uploadsId })).map((item) => toVideo(item, null)).filter(Boolean);
};

module.exports = { fetchPlaylists, fetchVideosByPlaylist, fetchChannelUploads, enrichVideoTypes };