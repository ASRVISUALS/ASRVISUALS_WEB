import { NextResponse } from 'next/server'
import { fetchChannelVideos, YOUTUBE_CONFIG } from '@/lib/youtube'

export const dynamic = 'force-dynamic'
export const revalidate = 300 // Revalidate every 5 minutes

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const channelId = searchParams.get('channelId') || YOUTUBE_CONFIG.CHANNEL_ID
    const apiKey = searchParams.get('apiKey') || YOUTUBE_CONFIG.API_KEY
    const maxResults = parseInt(searchParams.get('maxResults') || '50', 10)

    const videos = await fetchChannelVideos(channelId, apiKey, maxResults)

    // Build list of distinct categories for filtering
    const categoriesSet = new Set<string>()
    categoriesSet.add('All')

    const hasShorts = videos.some((v) => v.isShort)
    const hasLongForm = videos.some((v) => !v.isShort)

    if (hasShorts) categoriesSet.add('Shorts (9:16)')
    if (hasLongForm) categoriesSet.add('Long-Form (16:9)')

    videos.forEach((v) => {
      if (v.category && v.category !== 'Shorts' && v.category !== 'Video') {
        categoriesSet.add(v.category)
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        channelId,
        channelName: YOUTUBE_CONFIG.CHANNEL_NAME,
        channelHandle: YOUTUBE_CONFIG.CHANNEL_HANDLE,
        totalVideos: videos.length,
        categories: Array.from(categoriesSet),
        videos
      }
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Failed to fetch YouTube videos'
      },
      { status: 500 }
    )
  }
}
