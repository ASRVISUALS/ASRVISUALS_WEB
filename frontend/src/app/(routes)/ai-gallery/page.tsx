import { getContentBlock } from '@/lib/content'

type AIGalleryItem = {
  imageUrl: string
  title: string
  prompt?: string
  tag?: string
}

type AIGalleryContent = {
  title: string
  description: string
  items: AIGalleryItem[]
}

const defaultContent: AIGalleryContent = {
  title: 'AI Gallery',
  description: 'A curated gallery of AI-assisted visual concepts and covers crafted for content creators.',
  items: [
    {
      imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      title: 'Cinematic Depth',
      prompt: 'Moody cinematic landscape with dramatic lighting',
      tag: 'Concept'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      title: 'Creator Workspace',
      prompt: 'Modern creator desk with neon accents and bokeh',
      tag: 'Cover'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?auto=format&fit=crop&w=1200&q=80',
      title: 'Future Signal',
      prompt: 'Futuristic abstract gradient with soft particles',
      tag: 'Thumbnail'
    }
  ]
}

export default async function AIGalleryPage() {
  const content = await getContentBlock('page.ai-gallery', defaultContent)

  return (
    <section className="py-20 sm:py-24 bg-bg-primary">
      <div className="container-custom">
        <div className="max-w-3xl">
          <span className="section-tag">AI Gallery</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-text-primary">
            {content.title}
          </h1>
          <p className="mt-4 text-text-secondary">
            {content.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items.map((item) => (
            <div key={item.title} className="bg-bg-secondary border border-border-divider rounded-lg overflow-hidden">
              <div className="relative w-full h-56 bg-bg-primary">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-text-primary">{item.title}</h2>
                  {item.tag ? (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-bg-primary border border-border-divider text-text-secondary">
                      {item.tag}
                    </span>
                  ) : null}
                </div>
                {item.prompt ? (
                  <p className="mt-2 text-sm text-text-secondary">{item.prompt}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
