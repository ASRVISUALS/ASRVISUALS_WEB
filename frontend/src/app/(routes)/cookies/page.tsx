import { getContentBlock } from '@/lib/content'

type LegalSection = { title: string; text: string }

type CookiesPageContent = {
  title: string
  description: string
  sections: LegalSection[]
}

const defaultContent: CookiesPageContent = {
  title: 'Cookie Policy',
  description: 'This policy explains how we use cookies and similar technologies to provide a smooth, secure experience.',
  sections: [
    {
      title: 'What are cookies?',
      text: 'Cookies are small text files stored on your device that help websites function and remember preferences.'
    },
    {
      title: 'Essential cookies',
      text: 'These cookies help the site load properly, keep forms working, and provide core functionality.'
    },
    {
      title: 'Analytics cookies',
      text: 'We may use analytics tools to understand traffic and improve content performance. These cookies help us learn what pages are most helpful.'
    },
    {
      title: 'Third-party cookies',
      text: 'Some services we use (such as embedded video or scheduling tools) may set their own cookies. Their policies apply to their cookies.'
    },
    {
      title: 'Managing cookies',
      text: 'You can control or delete cookies through your browser settings at any time. Blocking cookies may affect some site features.'
    },
    {
      title: 'Do Not Track',
      text: 'Some browsers offer Do Not Track signals. At this time, our site does not respond to these signals in a standardized way.'
    },
    {
      title: 'Updates to this policy',
      text: 'We may update this policy as technology or regulations change. The latest version will always be posted here.'
    }
  ]
}

export default async function CookiesPage() {
  const content = await getContentBlock('page.cookies', defaultContent)

  return (
    <section className="py-20 sm:py-24 bg-bg-primary">
      <div className="container-custom max-w-4xl">
        <span className="section-tag">Legal</span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-text-primary">{content.title}</h1>
        <p className="mt-4 text-text-secondary">
          {content.description}
        </p>

        <div className="mt-8 space-y-6 text-text-secondary text-sm">
          {content.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold text-text-primary">{section.title}</h2>
              <p className="mt-2">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
