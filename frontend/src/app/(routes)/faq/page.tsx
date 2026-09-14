import { getContentBlock } from '@/lib/content'

type FAQPageContent = {
  title: string
  description: string
  items: { q: string; a: string }[]
}

const defaultContent: FAQPageContent = {
  title: 'FAQs',
  description: 'Clear, quick answers about our video editing services, process, and timelines.',
  items: [
    {
      q: 'What does ASR Visuals do?',
      a: 'We provide professional video editing, content strategy, and performance-focused creative for YouTube, short-form, and marketing content.'
    },
    {
      q: 'What services do you offer?',
      a: 'We handle short-form edits, long-form edits, thumbnails, and content repurposing. We also help with content planning and optimization.'
    },
    {
      q: 'What is your typical turnaround time?',
      a: 'Most edits are delivered in 48 to 72 hours, depending on complexity and volume. Rush options are available when schedules allow.'
    },
    {
      q: 'How many revisions are included?',
      a: 'Each plan includes a set number of revision rounds. We recommend sending consolidated feedback to keep turnaround fast.'
    },
    {
      q: 'Can you match my style and brand?',
      a: 'Yes. We follow your brand guidelines, fonts, colors, and pacing style to keep everything consistent.'
    },
    {
      q: 'Do you work with YouTube Shorts, Reels, and TikTok?',
      a: 'Yes. We edit vertical short-form content with hooks, captions, and pacing optimized for retention.'
    },
    {
      q: 'What do you need from me to start?',
      a: 'We need your raw footage, brand assets (logo, colors, fonts), references, and any specific instructions for tone or style.'
    },
    {
      q: 'Will I own the final videos?',
      a: 'Yes. You own your footage and receive full usage rights to the final deliverables after payment.'
    },
    {
      q: 'Can you handle ongoing weekly edits?',
      a: 'Absolutely. We offer monthly plans for creators and teams who need consistent output and predictable turnaround.'
    },
    {
      q: 'How do we get started?',
      a: 'Book a call or send a message. We will review your goals, recommend a plan, and outline the next steps.'
    }
  ]
}

export default async function FAQPage() {
  const content = await getContentBlock('page.faq', defaultContent)

  return (
    <section className="py-20 sm:py-24 bg-bg-primary">
      <div className="container-custom">
        <div className="max-w-3xl">
          <span className="section-tag">FAQ</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-text-primary">{content.title}</h1>
          <p className="mt-4 text-text-secondary">
            {content.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.items.map((item) => (
            <div key={item.q} className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-text-primary">{item.q}</h2>
              <p className="mt-2 text-sm text-text-secondary">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
