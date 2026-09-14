import Link from 'next/link'
import { getContentBlock } from '@/lib/content'

type AboutPageContent = {
  title: string
  description: string
  cards: { title: string; text: string }[]
  stats: { label: string; value: string }[]
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
}

const defaultContent: AboutPageContent = {
  title: 'About ASR Visuals',
  description: 'We help brands grow with premium video editing, content strategy, and performance-focused creative that converts attention into customers.',
  cards: [
    {
      title: 'Clarity first',
      text: 'We plan content with clear hooks, structure, and outcomes so every edit has a job.'
    },
    {
      title: 'Speed without chaos',
      text: 'Tight turnaround and clean feedback loops so production stays consistent.'
    },
    {
      title: 'Performance-minded',
      text: 'We build creative that matches your goals, not just aesthetics.'
    }
  ],
  stats: [
    { label: 'Projects delivered', value: '500+' },
    { label: 'Client partners', value: '100+' },
    { label: 'Total views', value: '50M+' }
  ],
  primaryCtaLabel: 'Book a call',
  primaryCtaHref: 'https://cal.com/asrvisuals',
  secondaryCtaLabel: 'View services',
  secondaryCtaHref: '/services'
}

export default async function AboutPage() {
  const content = await getContentBlock('page.about', defaultContent)

  return (
    <section className="py-20 sm:py-24 bg-bg-primary">
      <div className="container-custom">
        <div className="max-w-3xl">
          <span className="section-tag">About</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-text-primary">{content.title}</h1>
          <p className="mt-4 text-text-secondary">
            {content.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {content.cards.map((item) => (
            <div key={item.title} className="bg-bg-secondary border border-border-divider rounded-lg p-6">
              <h2 className="text-xl font-semibold text-text-primary">{item.title}</h2>
              <p className="mt-2 text-text-secondary text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {content.stats.map((stat) => (
            <div key={stat.label} className="bg-bg-secondary border border-border-divider rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-brand-red">{stat.value}</div>
              <div className="mt-2 text-xs text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={content.primaryCtaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border-divider bg-brand-red px-5 py-2 text-sm font-semibold text-text-primary hover:bg-brand-red-hover transition-colors"
          >
            {content.primaryCtaLabel}
          </a>
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
