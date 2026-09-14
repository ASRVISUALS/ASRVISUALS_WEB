import { getContentBlock } from '@/lib/content'

type LegalSection = { title: string; text: string }

type TermsPageContent = {
  title: string
  description: string
  sections: LegalSection[]
  contactEmail: string
}

const defaultContent: TermsPageContent = {
  title: 'Terms of Service',
  description: 'These terms explain how our video editing and content services work, what you can expect from us, and what we need from you.',
  sections: [
    {
      title: 'Services and scope',
      text: 'We provide video editing, content production, and related creative services as described in your plan, proposal, or written agreement. Deliverables, formats, and turnaround targets are defined per project.'
    },
    {
      title: 'Onboarding and assets',
      text: 'You agree to provide footage, brand assets, references, and instructions needed to complete the work. Delays in providing assets may impact timelines.'
    },
    {
      title: 'Timelines and delivery',
      text: 'We aim to meet the agreed turnaround times. Timelines are estimates and may shift due to scope changes, late feedback, or additional revisions.'
    },
    {
      title: 'Revisions and feedback',
      text: 'Your plan includes a defined number of revision rounds. We welcome clear, consolidated feedback. Additional or out-of-scope revisions may be billed separately.'
    },
    {
      title: 'Payments and refunds',
      text: 'Fees, payment schedules, and billing terms are specified in your plan or proposal. Work begins after payment confirmation. All payments are non-refundable once work has started or files have been delivered. If a project is canceled before work begins, any prepaid amount may be credited to future services at our discretion.'
    },
    {
      title: 'Ownership and usage rights',
      text: 'You retain ownership of your original footage. Upon full payment, you receive a license to use the final deliverables for your business and marketing. We may showcase completed work in our portfolio unless you request otherwise in writing.'
    },
    {
      title: 'Client responsibilities',
      text: 'You confirm you have the rights to all assets you provide. You are responsible for final approvals before publishing and for complying with platform rules (YouTube, Instagram, TikTok, etc.).'
    },
    {
      title: 'Third-party tools',
      text: 'We may use licensed software, stock media, or third-party services to produce your content. If a specific license is required for your use case, we will discuss it with you in advance.'
    },
    {
      title: 'Limitation of liability',
      text: 'Our liability is limited to the amount paid for the specific service in question. We are not responsible for indirect losses such as lost revenue, platform bans, or audience changes.'
    },
    {
      title: 'Termination and changes',
      text: 'Either party may end services with written notice. We may pause or terminate service for non-payment or misuse. We may update these terms from time to time, and the latest version will be posted here.'
    }
  ],
  contactEmail: 'asrvisualshelpline@gmail.com'
}

export default async function TermsPage() {
  const content = await getContentBlock('page.terms', defaultContent)

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
