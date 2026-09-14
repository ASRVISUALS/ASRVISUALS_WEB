export type YouTubeVideo = {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  publishedDateFormatted: string
  duration: number // in seconds
  formattedDuration: string
  isShort: boolean
  aspectRatio: '9:16' | '16:9'
  views: string
  rawViews: number
  likes: string
  category: string
  tags: string[]
  embedUrl: string
  youtubeUrl: string
  creator: string
}

export const YOUTUBE_CONFIG = {
  CHANNEL_ID: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || 'UCdIeEUCrh0rPYyK2Nuk9NDw',
  API_KEY: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY || '',
  CHANNEL_NAME: 'ASR VISUALS',
  CHANNEL_HANDLE: '@asrvisuals_1'
}

/**
 * Converts YouTube ISO 8601 duration (e.g. PT48S, PT1M20S, PT1H2M3S) to seconds
 */
export function parseDurationToSeconds(durationStr?: string): number {
  if (!durationStr) return 0
  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0
  const hours = parseInt(match[1] || '0', 10)
  const minutes = parseInt(match[2] || '0', 10)
  const seconds = parseInt(match[3] || '0', 10)
  return hours * 3600 + minutes * 60 + seconds
}

/**
 * Formats duration in seconds to display MM:SS or HH:MM:SS
 */
export function formatDuration(seconds: number): string {
  if (seconds <= 0) return '0:00'
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

/**
 * Formats raw view counts into human-readable K/M notation
 */
export function formatViews(views: string | number | undefined): string {
  const n = Number(views || 0)
  if (isNaN(n) || n === 0) return '0'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  return n.toLocaleString()
}

/**
 * Formats ISO date string to human-readable format
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  } catch {
    return ''
  }
}

/**
 * Automatically infers specific visual categories based on video metadata
 */
export function detectCategory(title: string, description: string = '', isShort: boolean = false): string {
  const text = `${title} ${description}`.toLowerCase()
  if (text.includes('testimonial') || text.includes('review') || text.includes('client')) {
    return 'Testimonial'
  }
  if (text.includes('pace') || text.includes('fast') || text.includes('speed') || text.includes('motion') || text.includes('reel')) {
    return 'Fast Pace & Motion'
  }
  if (text.includes('cinematic') || text.includes('film') || text.includes('aesthetic') || text.includes('color')) {
    return 'Cinematic'
  }
  if (text.includes('commercial') || text.includes('brand') || text.includes('product') || text.includes('ad')) {
    return 'Brand & Commercial'
  }
  if (text.includes('tutorial') || text.includes('guide') || text.includes('breakdown')) {
    return 'Tutorial'
  }
  return isShort ? 'Shorts' : 'Video'
}

/**
 * Builds standard or shorts embed URL
 */
export function buildEmbedUrl(videoId: string, isShort: boolean = false): string {
  const base = `https://www.youtube.com/embed/${videoId}`
  const params = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    modestbranding: '1',
    controls: '1',
    fs: '1',
    iv_load_policy: '3',
    playsinline: '1'
  })
  if (isShort) {
    params.set('loop', '1')
  }
  return `${base}?${params.toString()}`
}

/**
 * Default fallback channel videos (from ASR Visuals channel UCdIeEUCrh0rPYyK2Nuk9NDw)
 */
export const FALLBACK_CHANNEL_VIDEOS: YouTubeVideo[] = [
  {
    id: 'YOzDH_lIPhc',
    title: 'Patient Testimonial',
    description: 'High-quality patient testimonial edit crafted with smooth pacing and clean visual storytelling.',
    thumbnail: 'https://i.ytimg.com/vi/YOzDH_lIPhc/maxresdefault.jpg',
    publishedAt: '2026-09-03T14:10:47Z',
    publishedDateFormatted: 'Sep 3, 2026',
    duration: 48,
    formattedDuration: '0:48',
    isShort: true,
    aspectRatio: '9:16',
    views: '1.2K',
    rawViews: 1200,
    likes: '142',
    category: 'Testimonial',
    tags: ['Testimonial', 'Shorts', 'ASR Visuals'],
    embedUrl: buildEmbedUrl('YOzDH_lIPhc', true),
    youtubeUrl: 'https://www.youtube.com/shorts/YOzDH_lIPhc',
    creator: 'ASR VISUALS'
  },
  {
    id: 'HV3gmADlZ9c',
    title: 'Fast Pace',
    description: 'Dynamic fast-paced visual editing with synced sound effects and creative motion cuts.',
    thumbnail: 'https://i.ytimg.com/vi/HV3gmADlZ9c/maxresdefault.jpg',
    publishedAt: '2026-03-30T15:24:13Z',
    publishedDateFormatted: 'Mar 30, 2026',
    duration: 50,
    formattedDuration: '0:50',
    isShort: true,
    aspectRatio: '9:16',
    views: '2.5K',
    rawViews: 2500,
    likes: '280',
    category: 'Fast Pace & Motion',
    tags: ['Fast Pace', 'Motion', 'Shorts', 'ASR Visuals'],
    embedUrl: buildEmbedUrl('HV3gmADlZ9c', true),
    youtubeUrl: 'https://www.youtube.com/shorts/HV3gmADlZ9c',
    creator: 'ASR VISUALS'
  }
]

/**
 * Fetches all channel uploads from YouTube Data API v3
 */
export async function fetchChannelVideos(
  channelId: string = YOUTUBE_CONFIG.CHANNEL_ID,
  apiKey: string = YOUTUBE_CONFIG.API_KEY,
  maxResults: number = 50
): Promise<YouTubeVideo[]> {
  if (!channelId || !apiKey) {
    return FALLBACK_CHANNEL_VIDEOS
  }

  // Convert Channel ID (UC...) to Uploads Playlist ID (UU...)
  const uploadsPlaylistId = channelId.startsWith('UC')
    ? 'UU' + channelId.substring(2)
    : channelId

  try {
    // 1. Fetch items from uploads playlist
    const playlistUrl = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
    playlistUrl.searchParams.set('part', 'snippet,contentDetails')
    playlistUrl.searchParams.set('playlistId', uploadsPlaylistId)
    playlistUrl.searchParams.set('maxResults', String(Math.min(maxResults, 50)))
    playlistUrl.searchParams.set('key', apiKey)

    const plRes = await fetch(playlistUrl.toString(), {
      next: { revalidate: 300 } // Cache for 5 minutes in Next.js
    })

    if (!plRes.ok) {
      console.warn(`YouTube playlist fetch returned ${plRes.status}. Using fallback channel data.`)
      return FALLBACK_CHANNEL_VIDEOS
    }

    const plData = await plRes.json()
    const items = plData?.items || []

    if (!items.length) {
      return FALLBACK_CHANNEL_VIDEOS
    }

    const videoIds = items
      .map((item: any) => item?.contentDetails?.videoId || item?.snippet?.resourceId?.videoId)
      .filter(Boolean)
      .join(',')

    if (!videoIds) {
      return FALLBACK_CHANNEL_VIDEOS
    }

    // 2. Fetch video details for durations and statistics in a single batch request
    const videosUrl = new URL('https://www.googleapis.com/youtube/v3/videos')
    videosUrl.searchParams.set('part', 'snippet,contentDetails,statistics')
    videosUrl.searchParams.set('id', videoIds)
    videosUrl.searchParams.set('key', apiKey)

    const vidRes = await fetch(videosUrl.toString(), {
      next: { revalidate: 300 }
    })

    if (!vidRes.ok) {
      console.warn(`YouTube videos fetch returned ${vidRes.status}. Using fallback.`)
      return FALLBACK_CHANNEL_VIDEOS
    }

    const vidData = await vidRes.json()
    const videoItems = vidData?.items || []

    if (!videoItems.length) {
      return FALLBACK_CHANNEL_VIDEOS
    }

    // 3. Map into clean, categorized YouTubeVideo objects
    const mappedVideos: YouTubeVideo[] = videoItems.map((item: any) => {
      const id = item.id
      const snippet = item.snippet || {}
      const contentDetails = item.contentDetails || {}
      const statistics = item.statistics || {}

      const title = snippet.title || 'ASR Visuals Edit'
      const description = snippet.description || ''
      const duration = parseDurationToSeconds(contentDetails.duration)
      const formattedDuration = formatDuration(duration)
      
      // Shorts classification: Duration <= 60 seconds or title/description contains #shorts
      const isShort = duration > 0 && duration <= 60 || title.toLowerCase().includes('#short') || description.toLowerCase().includes('#short')
      const aspectRatio: '9:16' | '16:9' = isShort ? '9:16' : '16:9'

      const thumbnails = snippet.thumbnails || {}
      const thumbnail =
        thumbnails.maxres?.url ||
        thumbnails.high?.url ||
        thumbnails.standard?.url ||
        thumbnails.medium?.url ||
        thumbnails.default?.url ||
        `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

      const rawViews = Number(statistics.viewCount || 0)
      const views = formatViews(rawViews)
      const likes = formatViews(statistics.likeCount)
      const category = detectCategory(title, description, isShort)
      const tags = snippet.tags || [category, isShort ? 'Shorts' : 'Video']

      return {
        id,
        title,
        description,
        thumbnail,
        publishedAt: snippet.publishedAt || '',
        publishedDateFormatted: formatDate(snippet.publishedAt),
        duration,
        formattedDuration,
        isShort,
        aspectRatio,
        views,
        rawViews,
        likes,
        category,
        tags,
        embedUrl: buildEmbedUrl(id, isShort),
        youtubeUrl: isShort ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`,
        creator: snippet.channelTitle || YOUTUBE_CONFIG.CHANNEL_NAME
      }
    })

    return mappedVideos
  } catch (error) {
    console.error('Error fetching YouTube channel videos:', error)
    return FALLBACK_CHANNEL_VIDEOS
  }
}
