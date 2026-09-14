type ContentResponse<T> = {
  success: boolean
  data?: {
    key: string
    data: T
  }
}

export async function getContentBlock<T>(key: string, fallback: T): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  if (!baseUrl) {
    return fallback
  }

  try {
    const response = await fetch(`${baseUrl}/content/${encodeURIComponent(key)}`, {
      next: { revalidate: 60 }
    })

    if (!response.ok) {
      return fallback
    }

    const json = (await response.json()) as ContentResponse<T>
    if (json?.data?.data) {
      return json.data.data
    }

    return fallback
  } catch {
    return fallback
  }
}
