import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import './WorkVideoPanel.css';

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
      if (watchId) return watchId;
    }

    return '';
  } catch {
    return '';
  }
};

const getYouTubeEmbedUrl = (rawUrl) => {
  const videoId = getYouTubeId(rawUrl);
  return videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&fs=1&rel=0`
    : '';
};

const getYouTubeThumbnailCandidates = (rawUrl) => {
  const videoId = getYouTubeId(rawUrl);
  if (!videoId) return [];

  return [
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/default.jpg`
  ];
};

const isShortFormVideo = (rawUrl) => {
  if (!rawUrl) return false;
  return rawUrl.includes('/shorts/');
};

const FALLBACK_THUMB =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540"><rect width="100%" height="100%" fill="%23101010"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-size="42" font-family="Arial, sans-serif">Video Preview</text></svg>';

function FullscreenVideoModal({ video, videoTitle, onClose }) {
  const isShortVideo = isShortFormVideo(video?.url);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    };
  }, []);

  return createPortal(
    <div className="fullscreen-video-modal" onClick={onClose}>
      <div
        className={`fullscreen-video-container ${isShortVideo ? 'is-short' : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="fullscreen-close-btn"
          onClick={onClose}
          aria-label="Close fullscreen video"
          type="button"
        >
          x
        </button>
        <iframe
          src={getYouTubeEmbedUrl(video.url)}
          title={videoTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={`fullscreen-video-iframe ${isShortVideo ? 'is-short' : ''}`}
        />
      </div>
    </div>,
    document.body
  );
}

function WorkVideoPanel({ videos, shorts, panelTitle }) {
  const [fullscreenVideo, setFullscreenVideo] = useState(null);
  const [thumbVariantById, setThumbVariantById] = useState({});

  const allItems = useMemo(() => [...videos, ...shorts], [videos, shorts]);

  useEffect(() => {
    const initialVariants = {};
    allItems.forEach((item) => {
      initialVariants[item.id] = 0;
    });
    setThumbVariantById(initialVariants);
  }, [allItems]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setFullscreenVideo(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleThumbError = (item) => {
    const candidates = getYouTubeThumbnailCandidates(item.url);
    const current = thumbVariantById[item.id] ?? 0;

    if (current < candidates.length - 1) {
      setThumbVariantById((prev) => ({ ...prev, [item.id]: current + 1 }));
    } else {
      setThumbVariantById((prev) => ({ ...prev, [item.id]: candidates.length }));
    }
  };

  const getThumbSrc = (item) => {
    const candidates = getYouTubeThumbnailCandidates(item.url);
    const variant = thumbVariantById[item.id] ?? 0;
    return candidates[variant] || FALLBACK_THUMB;
  };

  return (
    <section className="work-panel">
      <h2>{panelTitle || 'Our Work'}</h2>

      {videos.length > 0 && (
        <div className="work-main-video">
          <div className="videos-scroll-wrapper">
            <div className="videos-scroll">
              {videos.map((video, index) => (
                <div key={video.id} className="video-card">
                  <button
                    type="button"
                    className="video-poster-btn"
                    onClick={() => setFullscreenVideo(video)}
                    aria-label={`Play ${video.title}`}
                  >
                    <img
                      src={getThumbSrc(video)}
                      alt={`${video.title} preview`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      onError={() => handleThumbError(video)}
                    />
                    <span className="video-play-icon" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5v14l11-7z" fill="white" />
                      </svg>
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {shorts.length > 0 && (
        <div className="work-shorts-horizontal">
          <h3>Shorts</h3>
          <div className="shorts-scroll-wrapper">
            <div className="shorts-scroll">
              {shorts.map((short, index) => (
                <div key={short.id} className="shorts-card">
                  <button
                    type="button"
                    className="video-poster-btn"
                    onClick={() => setFullscreenVideo(short)}
                    aria-label={`Play ${short.title}`}
                  >
                    <img
                      src={getThumbSrc(short)}
                      alt={`${short.title} preview`}
                      loading={index === 0 && videos.length === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      fetchPriority={index === 0 && videos.length === 0 ? 'high' : 'auto'}
                      onError={() => handleThumbError(short)}
                    />
                    <span className="video-play-icon" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5v14l11-7z" fill="white" />
                      </svg>
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {fullscreenVideo && (
        <FullscreenVideoModal
          video={fullscreenVideo}
          videoTitle={fullscreenVideo.title}
          onClose={() => setFullscreenVideo(null)}
        />
      )}
    </section>
  );
}

FullscreenVideoModal.propTypes = {
  video: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired,
  videoTitle: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

WorkVideoPanel.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
  shorts: PropTypes.arrayOf(PropTypes.object).isRequired,
  panelTitle: PropTypes.string
};

export default WorkVideoPanel;
