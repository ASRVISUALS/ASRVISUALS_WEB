import Link from 'next/link'
import { getContentBlock } from '@/lib/content'

type ContactPageContent = {
  title: string
  description: string
  email: string
  phone: string
  instagramLabel: string
  instagramUrl: string
  includeItems: string[]
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
}

const defaultContent: ContactPageContent = {
  title: 'Contact',
  description: 'Ready to grow? Book a call or send us a note. We usually respond within 24 hours.',
  email: 'asrvisualshelpline@gmail.com',
  phone: '+91 8102651176',
  instagramLabel: '@asr_visuals_',
  instagramUrl: 'https://www.instagram.com/asr_visuals_/',
  includeItems: [
    'Content goals and target audience',
    'Current volume and turnaround needs',
    'Links to existing content or references'
  ],
  primaryCtaLabel: 'Book a call',
  primaryCtaHref: 'https://cal.com/asrvisuals',
  secondaryCtaLabel: 'Back to home',
  secondaryCtaHref: '/'
}

export default async function ContactPage() {
  const content = await getContentBlock('page.contact', defaultContent)

  return (
    <section className="py-20 sm:py-24 bg-bg-primary">
      <div className="container-custom">
        <div className="max-w-3xl">
          <span className="section-tag">Contact</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-text-primary">{content.title}</h1>
          <p className="mt-4 text-text-secondary">
            {content.description}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-text-primary">Contact details</h2>
            <div className="mt-4 space-y-2 text-text-secondary text-sm">
              <p>Email:{' '}
                <a
                  href={`mailto:${content.email}`}
                  className="text-brand-red font-semibold hover:text-brand-red-hover transition-colors"
                >
                  {content.email}
                </a>
              </p>
              <p>Phone:{' '}
                <a
                  href={`tel:${content.phone.replace(/\s+/g, '')}`}
                  className="text-brand-red font-semibold hover:text-brand-red-hover transition-colors"
                >
                  {content.phone}
                </a>
              </p>
              <p>
                Instagram:{' '}
                <a
                  href={content.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-red font-semibold hover:text-brand-red-hover transition-colors"
                >
                  {content.instagramLabel}
                </a>
              </p>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-text-primary">What to include</h2>
            <ul className="mt-4 space-y-2 text-text-secondary text-sm">
              {content.includeItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={content.primaryCtaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border-divider bg-brand-red text-white px-5 py-2 text-sm font-semibold hover:bg-brand-red-hover transition-colors"
          >
            {content.primaryCtaLabel}
          </a>
          <Link
            href={content.secondaryCtaHref}
            className="inline-flex items-center gap-2 rounded-full border border-border-divider bg-bg-secondary text-text-primary px-5 py-2 text-sm font-semibold hover:border-brand-red transition-colors"
          >
            {content.secondaryCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
