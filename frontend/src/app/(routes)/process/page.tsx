import Link from 'next/link'
import { getContentBlock } from '@/lib/content'

type ProcessPageContent = {
  title: string
  description: string
  steps: { title: string; text: string }[]
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
}

const defaultContent: ProcessPageContent = {
  title: 'How We Work',
  description: 'A simple, reliable system built to deliver quality and speed without chaos.',
  steps: [
    {
      title: 'Strategy & discovery',
      text: 'We clarify goals, audience, and content direction so every edit supports a result.'
    },
    {
      title: 'Production',
      text: 'We edit, refine, and deliver content with clean feedback and version control.'
    },
    {
      title: 'Distribution',
      text: 'We optimize formats and outputs so you can publish across platforms without friction.'
    },
    {
      title: 'Iteration',
      text: 'We learn from performance and refine the content system over time.'
    }
  ],
  primaryCtaLabel: 'Book a call',
  primaryCtaHref: 'https://cal.com/asrvisuals',
  secondaryCtaLabel: 'View portfolio',
  secondaryCtaHref: '/portfolio'
}

export default async function ProcessPage() {
  const content = await getContentBlock('page.process', defaultContent)

  return (
    <section className="py-20 sm:py-24 bg-bg-primary">
      <div className="container-custom">
        <div className="max-w-3xl">
          <span className="section-tag">Process</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-text-primary">{content.title}</h1>
          <p className="mt-4 text-text-secondary">
            {content.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.steps.map((step, index) => (
            <div key={step.title} className="bg-bg-secondary border border-border-divider rounded-lg p-6">
              <div className="text-sm font-semibold text-brand-red">Step {String(index + 1).padStart(2, '0')}</div>
              <h2 className="mt-2 text-xl font-semibold text-text-primary">{step.title}</h2>
              <p className="mt-2 text-sm text-text-secondary">{step.text}</p>
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
