import Link from 'next/link'
import { getContentBlock } from '@/lib/content'

type ServicesPageContent = {
  title: string
  description: string
  items: { title: string; text: string }[]
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
}

const defaultContent: ServicesPageContent = {
  title: 'Services',
  description: 'Production built to move fast. We deliver consistent, premium edits that keep your pipeline full and your audience engaged.',
  items: [
    {
      title: 'Short-form editing',
      text: 'High-retention edits for Reels, Shorts, and TikTok with strong hooks and punchy pacing.'
    },
    {
      title: 'Long-form editing',
      text: 'Story-driven edits that keep watch time high and make your message land clearly.'
    },
    {
      title: 'Thumbnail design',
      text: 'Scroll-stopping thumbnails built for CTR and consistent brand identity.'
    },
    {
      title: 'Content repurposing',
      text: 'Turn one video into a content system across multiple platforms.'
    }
  ],
  primaryCtaLabel: 'Book a call',
  primaryCtaHref: 'https://cal.com/asrvisuals',
  secondaryCtaLabel: 'Contact us',
  secondaryCtaHref: '/contact'
}

export default async function ServicesPage() {
  const content = await getContentBlock('page.services', defaultContent)

  return (
    <section className="py-20 sm:py-24 bg-bg-primary">
      <div className="container-custom">
        <div className="max-w-3xl">
          <span className="section-tag">Services</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-text-primary">{content.title}</h1>
          <p className="mt-4 text-text-secondary">
            {content.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.items.map((service) => (
            <div key={service.title} className="bg-bg-secondary border border-border-divider rounded-lg p-6">
              <h2 className="text-xl font-semibold text-text-primary">{service.title}</h2>
              <p className="mt-2 text-sm text-text-secondary">{service.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={content.primaryCtaHref}
            className="inline-flex items-center gap-2 rounded-lg border border-border-divider bg-brand-red px-5 py-2 text-sm font-semibold text-text-primary hover:bg-brand-red-hover transition-colors"
          >
            {content.primaryCtaLabel}
          </Link>
          <Link
            href={content.secondaryCtaHref}
            className="inline-flex items-center gap-2 rounded-lg border border-border-divider bg-bg-secondary px-5 py-2 text-sm font-semibold text-text-primary hover:border-brand-red transition-colors"
          >
            {content.secondaryCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
