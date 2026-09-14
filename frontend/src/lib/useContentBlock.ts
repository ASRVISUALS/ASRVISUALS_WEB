import { useEffect, useState } from 'react'

type ContentResponse<T> = {
  success: boolean
  data?: {
    key: string
    data: T
  }
}

export function useContentBlock<T>(key: string, fallback: T) {
  const [content, setContent] = useState<T>(fallback)

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    if (!baseUrl) {
      return
    }

    const controller = new AbortController()

    const load = async () => {
      try {
        const response = await fetch(`${baseUrl}/content/${encodeURIComponent(key)}`, {
          signal: controller.signal
        })
        if (!response.ok) {
          return
        }
        const json = (await response.json()) as ContentResponse<T>
        if (json?.data?.data) {
          setContent(json.data.data)
        }
      } catch {
        // ignore
      }
    }

    load()

    return () => controller.abort()
  }, [key])

  return content
}
