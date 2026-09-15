import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../../utils/api';
import { getUniqueWorkItems, workVideos } from '../../data/workData';
import VideoModal from '../VideoModal';
import './OurWork.css';

const fallbackCategories = ['SaaS Explainers', 'Talking Heads', 'Others'].map((name) => ({
  name,
  videos: getUniqueWorkItems(workVideos).filter((video) => video.category === name)
}));

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || 'AIzaSyBTznIyuRmX03c9n6mmCy0x8w3A3eWQNCQ';
const YOUTUBE_CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID || 'UCdIeEUCrh0rPYyK2Nuk9NDw';

const fetchDirectFromYouTube = async () => {
  try {
    const plRes = await fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&maxResults=50&key=${YOUTUBE_API_KEY}`);
    if (!plRes.ok) return null;
    const plData = await plRes.json();
    const playlists = plData.items || [];
    if (!playlists.length) return null;

    const categories = await Promise.all(
      playlists.map(async (pl) => {
        const itemRes = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pl.id}&maxResults=50&key=${YOUTUBE_API_KEY}`);
        if (!itemRes.ok) return { name: pl.snippet.title, videos: [] };
        const itemData = await itemRes.json();
        const videos = (itemData.items || []).map((item) => {
          const videoId = item.snippet?.resourceId?.videoId;
          return {
            id: videoId,
            title: item.snippet?.title || 'Video',
            url: `https://www.youtube.com/watch?v=${videoId}`,
            thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            mediaType: /shorts/i.test(item.snippet?.title || '') ? 'Shorts' : 'Video'
          };
        }).filter((v) => v.id);
        return { name: pl.snippet.title, videos };
      })
    );

    const validCategories = categories.filter((c) => c.videos.length > 0);
    return validCategories.length ? validCategories : null;
  } catch {
    return null;
  }
};

const getVideoId = (video) => video.id && video.id.length === 11 ? video.id : video.url?.match(/(?:youtu\.be\/|v=|shorts\/)([\w-]{11})/)?.[1];

export default function OurWork() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const loadWork = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/youtube/work?_=${Date.now()}`, { cache: 'no-store' });
        if (response.ok) {
          const body = await response.json();
          const remoteCategories = body.data?.categories?.filter((category) => category.videos.length) || [];
          if (!cancelled && remoteCategories.length) {
            setCategories(remoteCategories);
            setActiveCategory((current) => remoteCategories.some((category) => category.name === current) ? current : remoteCategories[0].name);
            return;
          }
        }
      } catch {
        // Fall back to direct YouTube API
      }

      // If backend was not available or empty, try direct YouTube API
      try {
        const directCategories = await fetchDirectFromYouTube();
        if (!cancelled && directCategories && directCategories.length) {
          setCategories(directCategories);
          setActiveCategory((current) => directCategories.some((category) => category.name === current) ? current : directCategories[0].name);
          return;
        }
      } catch {
        // Fall back to static
      }

      if (!cancelled) {
        setCategories(fallbackCategories);
        setActiveCategory(fallbackCategories[0].name);
      }
    };

    loadWork().finally(() => {
      if (!cancelled) setLoading(false);
    });

    const refreshTimer = window.setInterval(loadWork, 5 * 60 * 1000);
    return () => { cancelled = true; window.clearInterval(refreshTimer); };
  }, []);

  const activeVideos = categories.find((category) => category.name === activeCategory)?.videos || [];

  return (
    <section className="our-work" aria-label="Our Work Portfolio">
      {loading ? (
        <div className="our-work-skeleton-grid" aria-label="Loading videos">
          {[1, 2, 3].map((item) => <span key={item} className="our-work-skeleton" />)}
        </div>
      ) : (
        <>
          <div className="our-work-tabs" role="tablist" aria-label="Work categories">
            {categories.map((category) => (
              <button key={category.name} type="button" role="tab" aria-selected={activeCategory === category.name} className={activeCategory === category.name ? 'is-active' : ''} onClick={() => setActiveCategory(category.name)}>
                {category.name}<span>{category.videos.length}</span>
              </button>
            ))}
          </div>
          <div className="our-work-grid">
            {activeVideos.map((video) => (
              <article className="our-work-card" key={video.id}>
                <button type="button" className="our-work-poster" onClick={() => {
                  if (window.innerWidth <= 768 && video.url) {
                    window.open(video.url, '_blank');
                  } else {
                    setSelectedVideo(video);
                  }
                }} aria-label={`Play ${video.title}`}>
                  <img src={video.thumbnail || `https://i.ytimg.com/vi/${getVideoId(video)}/hqdefault.jpg`} alt={`${video.title} video thumbnail`} loading="lazy" />
                  <span className="our-work-play" aria-hidden="true">&#9654;</span>
                  {video.liveStatus && video.liveStatus !== 'offline' && <span className={`our-work-live-badge ${video.liveStatus}`}>{video.liveStatus === 'live' ? 'LIVE NOW' : 'UPCOMING'}</span>}
                </button>
                <div className="our-work-card-copy"><span>{video.mediaType || 'Video'}</span><h3>{video.title}</h3></div>
                <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'VideoObject', name: video.title, description: video.description, thumbnailUrl: video.thumbnail, uploadDate: video.publishedAt, contentUrl: video.url, embedUrl: `https://www.youtube.com/embed/${getVideoId(video)}` })}</script>
              </article>
            ))}
          </div>
        </>
      )}
      <AnimatePresence>
        {selectedVideo && getVideoId(selectedVideo) && (
          <VideoModal videoId={getVideoId(selectedVideo)} title={selectedVideo.title} onClose={() => setSelectedVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}