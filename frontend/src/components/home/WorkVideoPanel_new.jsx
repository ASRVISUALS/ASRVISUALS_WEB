import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './WorkVideoPanel.css';

// Utility functions
const getYouTubeId = (rawUrl) => {
  if (!rawUrl) return '';
  try {
    const parsed = new URL(rawUrl);
    const host = parsed.hostname.replace('www.', '');
    if (host === 'youtu.be') {
      return parsed.pathname.replace('/', '');
    }
    if (host.includes('youtube.com')) {
      if (parsed.pathname.startsWith('/shorts/')) {
        const [, , id] = parsed.pathname.split('/');
        return id || '';
      }
      const watchId = parsed.searchParams.get('v');
      if (watchId) {
        return watchId;
      }
    }
    return '';
  } catch (error) {
    return '';
  }
};

const getYouTubeEmbedUrl = (rawUrl, autoplay = true) => {
  const videoId = getYouTubeId(rawUrl);
  const autoplayParam = autoplay ? '1' : '0';
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=${autoplayParam}&modestbranding=1&fs=1&rel=0` : '';
};

const getYouTubeThumbnailUrl = (rawUrl) => {
  const videoId = getYouTubeId(rawUrl);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
};

// Fullscreen Modal Component
function FullscreenVideoModal({ video, videoTitle, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fullscreen-video-modal" onClick={onClose}>
      <div className="fullscreen-video-container" onClick={(e) => e.stopPropagation()}>
        <button 
          className="fullscreen-close-btn" 
          onClick={onClose} 
          aria-label="Close fullscreen video"
        >
          ✕
        </button>
        <iframe
          src={getYouTubeEmbedUrl(video.url, true)}
          title={videoTitle}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="fullscreen-video-iframe"
        />
      </div>
    </div>
  );
}

// Main reusable component
function WorkVideoPanel({ videos, shorts, panelTitle }) {
  const [fullscreenVideo, setFullscreenVideo] = useState(null);
  const [thumbnailLoading, setThumbnailLoading] = useState(() => {
    const all = {};
    [...videos, ...shorts].forEach(v => { all[v.id] = true; });
    return all;
  });
  const [videoTitles, setVideoTitles] = useState(() => {
    const all = {};
    [...videos, ...shorts].forEach(v => { all[v.id] = v.title; });
    return all;
  });

  const videosScrollRef = useRef(null);
  const shortsScrollRef = useRef(null);

  const handlePlayVideo = (videoId, video) => {
    setFullscreenVideo({ ...video, id: videoId });
  };

  const handlePlayShort = (shortId, short) => {
    setFullscreenVideo({ ...short, id: shortId });
  };

  const handleCloseFullscreen = () => {
    setFullscreenVideo(null);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchTitles = async () => {
      const all = [...videos, ...shorts];
      const titlePairs = await Promise.all(all.map(async (video) => {
        try {
          const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(video.url)}&format=json`;
          const response = await fetch(endpoint);
          if (!response.ok) return [video.id, video.title];
          const data = await response.json();
          return [video.id, data?.title || video.title];
        } catch {
          return [video.id, video.title];
        }
      }));
      if (!isMounted) return;
      setVideoTitles(prev => ({ ...prev, ...Object.fromEntries(titlePairs) }));
    };
    fetchTitles();
    return () => { isMounted = false; };
  }, [videos, shorts]);

  // Handle shorts scroll for center zoom and progress
  useEffect(() => {
    const scrollContainer = shortsScrollRef.current;
    if (!scrollContainer) return;

    let rafId;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const cards = scrollContainer.querySelectorAll('.shorts-card');
        const containerCenter = scrollContainer.offsetWidth / 2;
        const scrollLeft = scrollContainer.scrollLeft;

        cards.forEach((card) => {
          const cardLeft = card.offsetLeft - scrollLeft;
          const cardCenter = cardLeft + card.offsetWidth / 2;
          const distance = Math.abs(containerCenter - cardCenter);
          const maxDistance = containerCenter;
          const zoomFactor = Math.max(0.8, 1 - (distance / maxDistance) * 0.2);
          card.style.transform = `scale(${zoomFactor})`;
        });

        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth || 1;
        const normalizedProgress = Math.min(scrollLeft / maxScroll, 1);
        const progressBar = scrollContainer.nextElementSibling;
        if (progressBar) {
          progressBar.style.width = `${normalizedProgress * 100}%`;
        }
      });
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [shorts.length]);

  useEffect(() => {
    const scrollContainer = shortsScrollRef.current;
    if (!scrollContainer || shorts.length === 0) return;

    const CARD_WIDTH = 330;
    const loopSize = CARD_WIDTH * shorts.length;
    let isLooping = false;

    const handleAutoScroll = () => {
      if (isLooping) return;
      if (scrollContainer.matches(':hover')) return;

      const currentScroll = scrollContainer.scrollLeft;

      if (currentScroll >= loopSize - 10) {
        isLooping = true;
        scrollContainer.scrollLeft = 0;
        setTimeout(() => { isLooping = false; }, 100);
      }
    };

    const autoScrollInterval = setInterval(handleAutoScroll, 50);

    return () => clearInterval(autoScrollInterval);
  }, [shorts]);

  // Handle videos scroll for center zoom and progress
  useEffect(() => {
    const scrollContainer = videosScrollRef.current;
    if (!scrollContainer) return;

    let rafId;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const cards = scrollContainer.querySelectorAll('.video-card');
        const containerCenter = scrollContainer.offsetWidth / 2;
        const scrollLeft = scrollContainer.scrollLeft;

        cards.forEach((card) => {
          const cardLeft = card.offsetLeft - scrollLeft;
          const cardCenter = cardLeft + card.offsetWidth / 2;
          const distance = Math.abs(containerCenter - cardCenter);
          const maxDistance = containerCenter;
          const zoomFactor = Math.max(0.8, 1 - (distance / maxDistance) * 0.2);
          card.style.transform = `scale(${zoomFactor})`;
        });

        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth || 1;
        const normalizedProgress = Math.min(scrollLeft / maxScroll, 1);
        const progressBar = scrollContainer.nextElementSibling;
        if (progressBar) {
          progressBar.style.width = `${normalizedProgress * 100}%`;
        }
      });
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [videos.length]);

  // Stop playback when page scrolls
  useEffect(() => {
    let scrollTimeout;
    const handlePageScroll = () => {
      setFullscreenVideo(null);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {}, 500);
    };

    window.addEventListener('scroll', handlePageScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handlePageScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Create looped shorts for infinite carousel
  const loopedShorts = React.useMemo(() => {
    if (shorts.length === 0) return [];
    return [...shorts, ...shorts, ...shorts];
  }, [shorts]);

  return (
    <section className="work-panel">
      <h2>{panelTitle || 'Our Work'}</h2>
      
      {fullscreenVideo && (
        <FullscreenVideoModal 
          video={fullscreenVideo} 
          videoTitle={videoTitles[fullscreenVideo.id]}
          onClose={handleCloseFullscreen}
        />
      )}

      <div className="work-main-video">
        <div className="videos-scroll-wrapper">
          <div className="videos-scroll" ref={videosScrollRef}>
            {videos.map((video) => (
              <div key={video.id} className="video-card">
                <button
                  type="button"
                  className="video-poster-btn"
                  onClick={() => handlePlayVideo(video.id, video)}
                  aria-label={`Play ${videoTitles[video.id]}`}
                >
                  {thumbnailLoading[video.id] && <span className="video-thumb-skeleton" aria-hidden="true" />}
                  <img
                    src={getYouTubeThumbnailUrl(video.url)}
                    alt={`${videoTitles[video.id]} preview`}
                    loading="lazy"
                    className={thumbnailLoading[video.id] ? 'is-loading' : ''}
                    onLoad={() => setThumbnailLoading(prev => ({ ...prev, [video.id]: false }))}
                    onError={() => setThumbnailLoading(prev => ({ ...prev, [video.id]: false }))}
                  />
                  <span className="video-play-icon">Play Fullscreen</span>
                </button>
                <div className="video-meta">
                  <span className="video-chip">{`${video.type || video.mediaType || 'Video'} • ${video.category || 'General'}`}</span>
                  <h4>{videoTitles[video.id]}</h4>
                  {video.description && <p className="video-description">{video.description}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="videos-progress-bar"></div>
        </div>
      </div>

      <div className="work-shorts-horizontal">
        <h3>Shorts</h3>
        <div className="shorts-scroll-wrapper">
          <div className="shorts-scroll" ref={shortsScrollRef}>
            {loopedShorts.map((short, idx) => (
              <div key={`${short.id}-${idx}`} className="shorts-card">
                <button
                  type="button"
                  className="video-poster-btn"
                  onClick={() => handlePlayShort(short.id, short)}
                  aria-label={`Play ${videoTitles[short.id]}`}
                >
                  {thumbnailLoading[short.id] && <span className="video-thumb-skeleton" aria-hidden="true" />}
                  <img
                    src={getYouTubeThumbnailUrl(short.url)}
                    alt={`${videoTitles[short.id]} preview`}
                    loading="lazy"
                    className={thumbnailLoading[short.id] ? 'is-loading' : ''}
                    onLoad={() => setThumbnailLoading(prev => ({ ...prev, [short.id]: false }))}
                    onError={() => setThumbnailLoading(prev => ({ ...prev, [short.id]: false }))}
                  />
                  <span className="video-play-icon">Play Fullscreen</span>
                </button>
                <div className="video-meta">
                  <span className="video-chip">{`${short.type || short.mediaType || 'Shorts'} • ${short.category || 'General'}`}</span>
                  <h4>{videoTitles[short.id]}</h4>
                  {short.description && <p className="video-description">{short.description}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="shorts-progress-bar"></div>
        </div>
      </div>
    </section>
  );
}

WorkVideoPanel.propTypes = {
  videos: PropTypes.array.isRequired,
  shorts: PropTypes.array.isRequired,
  panelTitle: PropTypes.string
};

export default WorkVideoPanel;
