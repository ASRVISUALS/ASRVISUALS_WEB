'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Eye, Smartphone, Film, ExternalLink, X, Sparkles, Youtube } from 'lucide-react'
import Button from '@/components/ui/Button'
import { 
  YouTubeVideo, 
  FALLBACK_CHANNEL_VIDEOS, 
  fetchChannelVideos, 
  YOUTUBE_CONFIG 
} from '@/lib/youtube'

type PortfolioContent = {
  heading?: string
  intro?: string
  categories?: string[]
}

const defaultContent: PortfolioContent = {
  heading: 'Our Best Work',
  intro: 'Explore our latest cinematic edits, high-converting reels, and dynamic visual storytelling crafted for maximum engagement.'
}

export default function Portfolio({
  content = defaultContent
}: {
  content?: PortfolioContent
  videoOverrides?: any[]
}) {
  const [videos, setVideos] = useState<YouTubeVideo[]>(FALLBACK_CHANNEL_VIDEOS)
  const [categories, setCategories] = useState<string[]>(['All', 'Shorts (9:16)'])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [activeModalVideo, setActiveModalVideo] = useState<YouTubeVideo | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Auto-detect videos from YouTube channel
  useEffect(() => {
    let isMounted = true

    async function loadVideos() {
      try {
        // Try internal API route first (with ISR caching)
        const res = await fetch('/api/youtube')
        if (res.ok) {
          const json = await res.json()
          if (json.success && Array.from(json.data.videos || []).length > 0) {
            if (isMounted) {
              setVideos(json.data.videos)
              if (json.data.categories?.length) {
                setCategories(json.data.categories)
              }
              setIsLoading(false)
              return
            }
          }
        }
      } catch (err) {
        // Fallback to direct client fetch if route is unreachable
      }

      try {
        const fetchedVideos = await fetchChannelVideos()
        if (isMounted && fetchedVideos.length > 0) {
          setVideos(fetchedVideos)
          
          const cats = new Set<string>(['All'])
          if (fetchedVideos.some(v => v.isShort)) cats.add('Shorts (9:16)')
          if (fetchedVideos.some(v => !v.isShort)) cats.add('Long-Form (16:9)')
          fetchedVideos.forEach(v => {
            if (v.category && v.category !== 'Shorts' && v.category !== 'Video') {
              cats.add(v.category)
            }
          })
          setCategories(Array.from(cats))
        }
      } catch {
        // Keep fallback videos
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadVideos()
    return () => {
      isMounted = false
    }
  }, [])

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalVideo(null)
    }
    if (activeModalVideo) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [activeModalVideo])

  // Filtered videos based on active category
  const filteredVideos = videos.filter((video) => {
    if (selectedCategory === 'All') return true
    if (selectedCategory === 'Shorts (9:16)') return video.isShort
    if (selectedCategory === 'Long-Form (16:9)') return !video.isShort
    return video.category === selectedCategory || video.tags.includes(selectedCategory)
  })

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-[#0B0B0F] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-red/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-brand-red/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Featured Portfolio & YouTube Channel</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
            {content.heading || defaultContent.heading}
          </h2>
          
          <p className="text-text-secondary max-w-2xl mx-auto text-base sm:text-lg">
            {content.intro || defaultContent.intro}
          </p>

          {/* YouTube Channel Badge */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <a
              href={`https://www.youtube.com/channel/${YOUTUBE_CONFIG.CHANNEL_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-text-secondary hover:text-brand-red transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
            >
              <Youtube className="w-4 h-4 text-brand-red" />
              <span>Auto-synced with <strong>{YOUTUBE_CONFIG.CHANNEL_NAME}</strong> ({YOUTUBE_CONFIG.CHANNEL_HANDLE})</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5 mb-12"
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category
            const isShortsCat = category.includes('Shorts')
            const isLongCat = category.includes('Long-Form')

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-brand-red text-white shadow-[0_0_20px_rgba(217,4,41,0.4)] border border-brand-red font-semibold'
                    : 'bg-[#15151E] text-text-secondary hover:text-text-primary border border-white/10 hover:border-white/20'
                }`}
              >
                {isShortsCat && <Smartphone className="w-3.5 h-3.5" />}
                {isLongCat && <Film className="w-3.5 h-3.5" />}
                <span>{category}</span>
              </button>
            )
          })}
        </motion.div>

        {/* Videos Grid with Dynamic Aspect Ratio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video, index) => {
              const isShort = video.isShort

              return (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setActiveModalVideo(video)}
                  className={`group relative rounded-2xl bg-[#121218] border border-white/10 overflow-hidden cursor-pointer hover:border-brand-red/60 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(217,4,41,0.2)] flex flex-col ${
                    isShort ? 'mx-auto w-full max-w-[320px]' : 'w-full'
                  }`}
                >
                  {/* Media Wrapper with dynamic viewing ratio */}
                  <div
                    className={`relative w-full overflow-hidden bg-black ${
                      isShort ? 'aspect-[9/16]' : 'aspect-video'
                    }`}
                  >
                    {/* Video Thumbnail */}
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 group-hover:from-black/90 transition-opacity" />

                    {/* Format Badge (Top Left) */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-xs font-medium text-white">
                      {isShort ? (
                        <>
                          <Smartphone className="w-3.5 h-3.5 text-brand-red" />
                          <span>Shorts 9:16</span>
                        </>
                      ) : (
                        <>
                          <Film className="w-3.5 h-3.5 text-brand-red" />
                          <span>16:9 HD</span>
                        </>
                      )}
                    </div>

                    {/* Duration Badge (Top Right) */}
                    {video.formattedDuration && (
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-xs font-mono font-semibold text-white/90 border border-white/10">
                        {video.formattedDuration}
                      </div>
                    )}

                    {/* Play Button Overlay (Center) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-brand-red/90 text-white flex items-center justify-center shadow-[0_0_25px_rgba(217,4,41,0.6)] transform group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Category & Stats (Bottom of video preview) */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                      <span className="bg-brand-red/20 backdrop-blur-md text-brand-red border border-brand-red/30 px-2 py-0.5 rounded font-medium">
                        {video.category}
                      </span>
                      {video.views && (
                        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded text-white/80">
                          <Eye className="w-3 h-3" />
                          <span>{video.views}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Video Meta Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-text-primary group-hover:text-brand-red transition-colors line-clamp-2 mb-1.5">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-text-secondary text-xs line-clamp-2 mb-3">
                          {video.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-text-secondary">
                      <span className="font-medium text-white/80">{video.creator}</span>
                      <span>{video.publishedDateFormatted}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <p className="text-text-secondary text-lg">No videos found in this category.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 px-6 py-2 rounded-full bg-brand-red text-white text-sm font-semibold"
            >
              Show All Videos
            </button>
          </div>
        )}

        {/* View Full Portfolio & Channel CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          <Button variant="primary" href="/portfolio">
            View All Projects ({videos.length}+)
          </Button>

          <a
            href={`https://www.youtube.com/channel/${YOUTUBE_CONFIG.CHANNEL_ID}?sub_confirmation=1`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#1A1A24] hover:bg-[#222230] border border-white/10 hover:border-brand-red px-6 py-3 text-sm font-semibold text-text-primary transition-all duration-300"
          >
            <Youtube className="w-4 h-4 text-brand-red" />
            <span>Subscribe on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </motion.div>
      </div>

      {/* Cinematic Modal Player (Scales to 9:16 or 16:9 accordingly) */}
      <AnimatePresence>
        {activeModalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveModalVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative bg-[#121218] border border-white/15 rounded-2xl overflow-hidden shadow-2xl w-full ${
                activeModalVideo.isShort ? 'max-w-sm sm:max-w-md' : 'max-w-4xl'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalVideo(null)}
                aria-label="Close modal"
                className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-brand-red text-white flex items-center justify-center border border-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Player Container */}
              <div
                className={`relative w-full bg-black ${
                  activeModalVideo.isShort ? 'aspect-[9/16]' : 'aspect-video'
                }`}
              >
                <iframe
                  src={activeModalVideo.embedUrl}
                  title={activeModalVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Video Info inside Modal */}
              <div className="p-5 flex items-center justify-between gap-4 border-t border-white/10">
                <div className="min-w-0 flex-1">
                  <span className="inline-block text-xs font-semibold text-brand-red mb-1">
                    {activeModalVideo.category} • {activeModalVideo.isShort ? 'Shorts 9:16' : '16:9 HD'}
                  </span>
                  <h3 className="font-bold text-lg text-text-primary truncate">
                    {activeModalVideo.title}
                  </h3>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {activeModalVideo.creator} • {activeModalVideo.views} views • {activeModalVideo.publishedDateFormatted}
                  </p>
                </div>

                <a
                  href={activeModalVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-1.5 bg-white/10 hover:bg-brand-red text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors border border-white/10"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>Open on YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}