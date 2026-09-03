import { Request, Response } from 'express'
import ContentBlock from '../models/ContentBlock'

type HomeAboutData = {
  videoUrl?: string
  videoMode?: 'auto' | 'manual'
}

type PortfolioVideoItem = {
  videoUrl?: string
  mode?: 'auto' | 'manual'
}

type PortfolioVideosData = {
  videoMode?: 'auto' | 'manual'
  maxResults?: number
  items?: PortfolioVideoItem[]
}

const buildYoutubeEmbedUrl = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3`

type YoutubeSearchResponse = {
  items?: Array<{
    id?: {
      videoId?: string
    }
  }>
}

const getLatestYoutubeVideoUrl = async (): Promise<string | null> => {
  const apiKey = process.env.YOUTUBE_API_KEY || 'AIzaSyBTznIyuRmX03c9n6mmCy0x8w3A3eWQNCQ'
  const channelId = process.env.YOUTUBE_CHANNEL_ID || 'UCdIeEUCrh0rPYyK2Nuk9NDw'

  if (!apiKey || !channelId) {
    return null
  }

  const uploadsPlaylistId = channelId.startsWith('UC') ? 'UU' + channelId.substring(2) : channelId

  try {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
    url.searchParams.set('part', 'snippet,contentDetails')
    url.searchParams.set('playlistId', uploadsPlaylistId)
    url.searchParams.set('maxResults', '1')
    url.searchParams.set('key', apiKey)

    const response = await fetch(url.toString())
    if (response.ok) {
      const data = await response.json()
      const videoId = data?.items?.[0]?.contentDetails?.videoId || data?.items?.[0]?.snippet?.resourceId?.videoId
      if (videoId) return buildYoutubeEmbedUrl(videoId)
    }
  } catch {
    // Fall through to fallback
  }

  return 'https://www.youtube.com/embed/YOzDH_lIPhc?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
}

const getLatestYoutubeVideoUrls = async (maxResults: number): Promise<string[]> => {
  const apiKey = process.env.YOUTUBE_API_KEY || 'AIzaSyBTznIyuRmX03c9n6mmCy0x8w3A3eWQNCQ'
  const channelId = process.env.YOUTUBE_CHANNEL_ID || 'UCdIeEUCrh0rPYyK2Nuk9NDw'

  if (!apiKey || !channelId) {
    return [
      'https://www.youtube.com/embed/YOzDH_lIPhc?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3',
      'https://www.youtube.com/embed/HV3gmADlZ9c?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
    ]
  }

  const safeMaxResults = Math.min(Math.max(maxResults, 1), 50)
  const uploadsPlaylistId = channelId.startsWith('UC') ? 'UU' + channelId.substring(2) : channelId

  try {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
    url.searchParams.set('part', 'snippet,contentDetails')
    url.searchParams.set('playlistId', uploadsPlaylistId)
    url.searchParams.set('maxResults', String(safeMaxResults))
    url.searchParams.set('key', apiKey)

    const response = await fetch(url.toString())
    if (response.ok) {
      const data = await response.json()
      const items = data?.items || []
      const urls = items
        .map((item: any) => item?.contentDetails?.videoId || item?.snippet?.resourceId?.videoId)
        .filter(Boolean)
        .map((videoId: string) => buildYoutubeEmbedUrl(videoId))

      if (urls.length > 0) return urls
    }
  } catch {
    // Fall through
  }

  return [
    'https://www.youtube.com/embed/YOzDH_lIPhc?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3',
    'https://www.youtube.com/embed/HV3gmADlZ9c?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
  ]
}

export const getContentBlock = async (req: Request, res: Response) => {
  try {
    const { key } = req.params
    const block = await ContentBlock.findOne({ key })

    if (!block) {
      return res.status(404).json({ success: false, message: 'Content block not found' })
    }

    if (key === 'home.about') {
      const data = (block.data || {}) as HomeAboutData
      const shouldAuto = data.videoMode === 'auto' || !data.videoUrl

      if (shouldAuto) {
        const latestVideoUrl = await getLatestYoutubeVideoUrl()
        if (latestVideoUrl) {
          return res.status(200).json({
            success: true,
            data: {
              ...block.toObject(),
              data: {
                ...data,
                videoUrl: latestVideoUrl,
                videoMode: data.videoMode || 'auto'
              }
            }
          })
        }
      }
    }

    if (key === 'portfolio.videos') {
      const data = (block.data || {}) as PortfolioVideosData
      const shouldAuto = data.videoMode === 'auto' || !data.videoMode
      const maxResults = typeof data.maxResults === 'number' ? data.maxResults : 6

      if (shouldAuto) {
        const latestVideoUrls = await getLatestYoutubeVideoUrls(maxResults)
        if (latestVideoUrls.length) {
          const existingItems = data.items || []
          const maxItems = Math.max(latestVideoUrls.length, existingItems.length)
          const items = Array.from({ length: maxItems }).map((_, index) => {
            const existingItem = existingItems[index]
            if (existingItem?.mode === 'manual' && existingItem.videoUrl) {
              return { ...existingItem, videoUrl: existingItem.videoUrl, mode: 'manual' }
            }

            const autoUrl = latestVideoUrls[index]
            if (autoUrl) {
              return { videoUrl: autoUrl, mode: 'auto' as const }
            }

            if (existingItem?.videoUrl) {
              return { ...existingItem, videoUrl: existingItem.videoUrl, mode: existingItem.mode || 'manual' }
            }

            return { mode: 'auto' as const }
          })

          return res.status(200).json({
            success: true,
            data: {
              ...block.toObject(),
              data: {
                ...data,
                items,
                videoMode: data.videoMode || 'auto',
                maxResults
              }
            }
          })
        }
      }
    }

    res.status(200).json({ success: true, data: block })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching content block' })
  }
}

export const getAllContentBlocks = async (_req: Request, res: Response) => {
  try {
    const blocks = await ContentBlock.find({}).sort({ updatedAt: -1 })
    res.status(200).json({ success: true, data: blocks })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching content blocks' })
  }
}

export const upsertContentBlock = async (req: Request, res: Response) => {
  try {
    const { key } = req.params
    const { data } = req.body

    const block = await ContentBlock.findOneAndUpdate(
      { key },
      { data, updatedBy: (req as any).user?.id },
      { new: true, upsert: true, runValidators: true }
    )

    res.status(200).json({ success: true, data: block })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating content block' })
  }
}
