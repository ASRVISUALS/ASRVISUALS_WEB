// Schema.org structured data helper for SEO
export const getBlogPostSchema = (post: {
  title: string
  description: string
  author: string
  date: string
  slug: string
}) => {
  const baseUrl = 'https://asrvisuals.live'
  const publishDate = new Date(post.date).toISOString()

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `${baseUrl}/images/blog-1.jpg`,
    datePublished: publishDate,
    dateModified: publishDate,
    author: {
      '@type': 'Person',
      name: post.author,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ASR Visuals',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
  }
}

export const getBlogListSchema = () => {
  const baseUrl = 'https://asrvisuals.live'

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Content Creation Blog',
    url: `${baseUrl}/blog`,
    description: 'Professional blog on video editing, YouTube growth, and content creation strategies',
    isPartOf: {
      '@type': 'WebSite',
      name: 'ASR Visuals',
      url: baseUrl,
    },
  }
}

export const getOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ASR Visuals',
    url: 'https://asrvisuals.live',
    logo: 'https://asrvisuals.live/logo.png',
    description: 'Professional video editing and content creation services for creators and businesses',
    sameAs: [
      'https://www.youtube.com/@asrvisuals',
      'https://www.instagram.com/asrvisuals',
      'https://www.twitter.com/VisualsAsr83268',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'contact@asrvisuals.live',
      availableLanguage: ['en'],
    },
  }
}

export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
