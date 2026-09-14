import { getContentBlock } from '@/lib/content'

type LegalSection = { title: string; text: string }

type PrivacyPageContent = {
  title: string
  description: string
  sections: LegalSection[]
  contactEmail: string
}

const defaultContent: PrivacyPageContent = {
  title: 'Privacy Policy',
  description: 'We respect your privacy. This policy explains what we collect, how we use it, and how we keep your data safe.',
  sections: [
    {
      title: 'Information we collect',
      text: 'We collect the information you choose to share, such as your name, email, business details, project goals, and uploaded assets. We also collect basic technical data like browser type and device information.'
    },
    {
      title: 'How we use information',
      text: 'We use your information to respond to inquiries, deliver video editing services, manage projects, send updates, and improve our website and customer experience. We do not sell your personal data.'
    },
    {
      title: 'Legal basis',
      text: 'We process data to perform a contract, comply with legal obligations, and pursue legitimate business interests such as service improvement and security.'
    },
    {
      title: 'Sharing and disclosure',
      text: 'We may share data with trusted service providers (such as hosting, analytics, or payment processors) only as needed to operate our services. These providers are required to protect your information.'
    },
    {
      title: 'Cookies and analytics',
      text: 'We use cookies to keep the site working and to understand how visitors use our pages. You can manage cookies in your browser settings.'
    },
    {
      title: 'Data retention',
      text: 'We keep data only as long as needed to deliver services, meet legal requirements, or resolve disputes. You may request deletion where legally permitted.'
    },
    {
      title: 'Security',
      text: 'We use reasonable technical and organizational measures to protect your information. However, no system can be guaranteed 100% secure.'
    },
    {
      title: 'Your rights',
      text: 'You can request access, correction, or deletion of your personal data. To make a request, contact us using the email below.'
    },
    {
      title: 'Children’s privacy',
      text: 'Our services are intended for adults and businesses. We do not knowingly collect data from children under 13.'
    }
  ],
  contactEmail: 'asrvisualshelpline@gmail.com'
}

export default async function PrivacyPage() {
  const content = await getContentBlock('page.privacy', defaultContent)

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
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Contact</h2>
            <p className="mt-2">Email: {content.contactEmail}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
