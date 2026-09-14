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
        if (!response.ok) throw new Error('YouTube work request failed');
        const body = await response.json();
        const remoteCategories = body.data?.categories?.filter((category) => category.videos.length) || [];
        if (!cancelled && remoteCategories.length) {
          setCategories(remoteCategories);
          setActiveCategory((current) => remoteCategories.some((category) => category.name === current) ? current : remoteCategories[0].name);
        } else if (!cancelled) {
          setCategories(fallbackCategories);
          setActiveCategory(fallbackCategories[0].name);
        }
      } catch {
        if (!cancelled) {
          setCategories(fallbackCategories);
          setActiveCategory(fallbackCategories[0].name);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadWork();
    const refreshTimer = window.setInterval(loadWork, 5 * 60 * 1000);
    return () => { cancelled = true; window.clearInterval(refreshTimer); };
  }, []);

  const activeVideos = categories.find((category) => category.name === activeCategory)?.videos || [];

  return (
    <section className="our-work" aria-labelledby="our-work-title">
      <div className="our-work-heading">
        <span className="our-work-eyebrow">Selected work</span>
        <h2 id="our-work-title">Stories that move</h2>
        <p>Explore edits shaped for attention, emotion, and measurable momentum.</p>
      </div>
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
                <button type="button" className="our-work-poster" onClick={() => setSelectedVideo(video)} aria-label={`Play ${video.title}`}>
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