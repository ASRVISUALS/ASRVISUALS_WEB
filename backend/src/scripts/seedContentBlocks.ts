import dotenv from 'dotenv'
import mongoose from 'mongoose'
import ContentBlock from '../models/ContentBlock'

dotenv.config()

const contentBlocks = [
  {
    key: 'home.hero',
    data: {
      badge: 'Available for work',
      titleLine1: 'We Build Revenue Engines',
      titleLine2: 'With Content, Ads, and Automation That Convert',
      subtitle: 'We help businesses scale revenue through strategic content, high-performance video editing, and data-driven advertising systems.',
      primaryCta: { label: 'Book a Strategy Call', href: 'https://cal.com/asrvisuals' },
      secondaryCta: { label: 'View Our Work', href: '#portfolio' },
      indicatorNumber: '(01)',
      indicatorLabel: 'VS.'
    }
  },
  {
    key: 'home.about',
    data: {
      heading: "We're the Editing Partners Behind the Creators Who Actually Grow with Results.",
      description: 'Fast, reliable, and obsessed with delivering scroll-stopping content that keeps your audience hooked and your channel growing.',
      achievements: [
        { icon: 'Video', text: '10+ years in industry' },
        { icon: 'Fast', text: 'Fast delivery' },
        { icon: 'Top', text: 'Top rated on Fiverr' }
      ],
      stats: [
        { value: '500+', label: 'Videos' },
        { value: '100+', label: 'Creators' },
        { value: '50M+', label: 'Views' }
      ],
      ctaLabel: 'Learn More About Us',
      ctaHref: '/about',
      videoMode: 'auto',
        videoUrl: 'https://youtube.com/shorts/OctCccn7XuY?feature=share'
    }
  },
  {
    key: 'home.services',
    data: {
      heading: 'What We Do Best',
      intro: 'We craft scroll-stopping edits that keep your audience hooked and your content looking top-tier.',
      items: [
        {
          title: 'Youtube Shorts Editing',
          description: 'We turn raw clips into high-retention, caption-packed vertical videos that pop on Reels, Shorts, and TikTok.',
          tags: ['Snappy Pacing', 'Viral-Ready', 'Subtitled']
        },
        {
          title: 'Long Form Edits',
          description: 'From vlogs to deep dives, we trim the fluff and tighten the pacing for maximum retention.',
          tags: ['Retention-Driven', 'Cinematic', 'Story-Focused']
        },
        {
          title: 'Thumbnail Design',
          description: "Custom thumbnails that demand clicks and capture your video's essence in one frame.",
          tags: ['Click Magnet', 'Brand Consistent', 'High-Contrast']
        },
        {
          title: 'Content Repurposing',
          description: 'One video, 10 pieces of content - cut into Shorts, Reels, quote cards, and teasers.',
          tags: ['Multi-Platform', 'Batch Delivery', 'Quick Turnaround']
        }
      ]
    }
  },
  {
    key: 'home.process',
    data: {
      label: '(02)',
      heading: 'Process',
      subheading: 'How we work with clients',
      steps: [
        {
          number: '01',
          title: 'Strategy & Discovery',
          description: 'We define your audience, messaging, creative angles, and growth objectives to build a clear content and ad strategy.'
        },
        {
          number: '02',
          title: 'Production & Execution',
          description: 'We plan, script, edit, and produce high-performing videos and marketing assets designed to attract and convert.'
        },
        {
          number: '03',
          title: 'Campaign Launch & Distribution',
          description: 'Meta ads and organic content are deployed strategically to generate awareness, inbound leads, and consistent engagement.'
        },
        {
          number: '04',
          title: 'Analytics & Scaling',
          description: 'We analyze performance data, improve creatives and funnels, and scale campaigns that drive predictable revenue growth.'
        }
      ]
    }
  },
  {
    key: 'home.portfolio',
    data: {
      heading: 'Our Best Work',
      intro: "From cinematic reels to dynamic pacing breakdowns -- here's a glimpse of how we turn raw footage into binge-worthy content that resonates.",
      categories: ['All', 'Shorts (9:16)', 'Testimonial', 'Fast Pace & Motion', 'Cinematic'],
      projects: [
        {
          title: 'Patient Testimonial',
          creator: 'ASR Visuals',
          views: 'YouTube Shorts',
          category: 'Testimonial',
          image: 'https://i.ytimg.com/vi/YOzDH_lIPhc/maxresdefault.jpg',
          tags: ['Testimonial', 'Shorts', 'ASR Visuals'],
          videoUrl: 'https://www.youtube.com/embed/YOzDH_lIPhc?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
        },
        {
          title: 'Fast Pace',
          creator: 'ASR Visuals',
          views: 'YouTube Shorts',
          category: 'Fast Pace & Motion',
          image: 'https://i.ytimg.com/vi/HV3gmADlZ9c/maxresdefault.jpg',
          tags: ['Fast Pace', 'Motion', 'Shorts', 'ASR Visuals'],
          videoUrl: 'https://www.youtube.com/embed/HV3gmADlZ9c?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
        }
      ]
    }
  },
  {
    key: 'portfolio.videos',
    data: {
      videoMode: 'auto',
      maxResults: 50,
      items: [
        {
          mode: 'auto',
          videoUrl: 'https://www.youtube.com/embed/YOzDH_lIPhc?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
        },
        {
          mode: 'auto',
          videoUrl: 'https://www.youtube.com/embed/HV3gmADlZ9c?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
        }
      ]
    }
  },
  {
    key: 'home.testimonials',
    data: {
      label: '(03)',
      heading: 'Testimonials',
      subheading: 'Hear from those who trust us',
      items: [
        {
          quote: 'We got 31 calls in 30 days and booked 14 moves. I was honestly shocked and relieved. Calendar finally looked full again.',
          author: 'John Parker',
          company: 'Texas Moving LLC',
          image: '/testimonials/john.jpg'
        },
        {
          quote: 'Closed 9 flooring jobs in one month. These were real homeowners, not price shoppers. I felt confident hiring another installer.',
          author: 'Mark Robertson',
          company: 'Ohio Flooring',
          image: '/testimonials/mark.jpg'
        },
        {
          quote: 'We went from 2 quotes a week to 3 a day. Crews stayed fully booked, revenue stabilized, and I stopped stressing about slow weeks.',
          author: 'Mike Carter',
          company: '16th Street Fencing',
          image: '/testimonials/mike.jpg'
        }
      ]
    }
  },
  {
    key: 'home.faq',
    data: {
      label: '(04)',
      heading: 'FAQs',
      subheading: 'Answering your questions',
      items: [
        {
          question: 'What does ASR Visuals do?',
          answer: 'ASR Visuals helps businesses grow through strategic content creation, performance video editing, and paid advertising systems designed to generate customers.'
        },
        {
          question: 'Who is ASR Visuals for?',
          answer: 'We work with small and mid-sized businesses, local service companies, and brands looking to scale revenue using content and marketing.'
        }
      ]
    }
  },
  {
    key: 'home.blog',
    data: {
      heading: 'Creator Insights & Tips',
      intro: 'Stay ahead of the game with fresh insights on editing trends and YouTube growth strategies.',
      posts: [
        {
          title: '10 Editing Tricks That Will Double Your Retention',
          excerpt: 'Learn the secrets top creators use to keep viewers watching until the very end. Discover advanced cutting techniques, transitions, and pacing strategies.',
          author: 'Sarah Chen',
          date: 'Mar 15, 2024',
          readTime: '5 min read',
          category: 'Editing Tips',
          slug: 'editing-tricks-retention',
          tags: ['editing', 'retention', 'youtube', 'productivity']
        },
        {
          title: 'The Ultimate YouTube SEO Guide for 2024',
          excerpt: 'How we helped our clients grow their views by 300% using these simple SEO techniques. A data-driven approach to dominating YouTube search rankings.',
          author: 'Mike Ross',
          date: 'Mar 12, 2024',
          readTime: '8 min read',
          category: 'YouTube Growth',
          slug: 'youtube-seo-guide-2024',
          tags: ['seo', 'youtube', 'growth', 'optimization']
        },
        {
          title: 'From 0 to 100K: A Creator\'s Journey',
          excerpt: 'Case study: How consistent, high-quality editing helped a gaming channel explode. Real numbers, real strategies, real results.',
          author: 'Alex Thompson',
          date: 'Mar 10, 2024',
          readTime: '6 min read',
          category: 'Success Stories',
          slug: 'zero-to-hundredk-journey',
          tags: ['case-study', 'growth', 'gaming', 'strategy']
        }
      ]
    }
  },
  {
    key: 'home.cta',
    data: {
      heading: 'Start Generating Customers for Your Business',
      description: "Book a free strategy call and we'll design a 90-day customer acquisition roadmap for your business.",
      primaryCta: { label: 'Book Your Free Strategy Call', href: 'https://cal.com/asrvisuals' },
      secondaryCta: { label: 'Or Email Us for Custom Inquiry', href: '/contact' },
      trustItems: ['No commitment', '30-min call', 'Actionable roadmap', '90-day plan']
    }
  },
  {
    key: 'home.stats',
    data: {
      items: [
        { value: 500, label: 'Videos Delivered', suffix: '+' },
        { value: 100, label: 'Creators Served', suffix: '+' },
        { value: 50, label: 'Total Views', suffix: 'M+' },
        { value: 4.9, label: 'Stars Rating', suffix: '' }
      ]
    }
  },
  {
    key: 'page.about',
    data: {
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
  },
  {
    key: 'page.services',
    data: {
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
      primaryCtaLabel: 'Contact us',
      primaryCtaHref: '/contact',
      secondaryCtaLabel: 'Contact us',
      secondaryCtaHref: '/contact'
    }
  },
  {
    key: 'page.process',
    data: {
      title: 'How We Work',
      description: 'A simple, reliable system built to deliver quality and speed without chaos.',
      steps: [
        { title: 'Strategy & discovery', text: 'We clarify goals, audience, and content direction so every edit supports a result.' },
        { title: 'Production', text: 'We edit, refine, and deliver content with clean feedback and version control.' },
        { title: 'Distribution', text: 'We optimize formats and outputs so you can publish across platforms without friction.' },
        { title: 'Iteration', text: 'We learn from performance and refine the content system over time.' }
      ],
      primaryCtaLabel: 'Book a call',
      primaryCtaHref: 'https://cal.com/asrvisuals',
      secondaryCtaLabel: 'View portfolio',
      secondaryCtaHref: '/portfolio'
    }
  },
  {
    key: 'page.portfolio',
    data: {
      title: 'Our Best Work',
      description: 'Explore our portfolio of stunning video edits that have helped creators and brands achieve millions of views and engage their audiences.',
      categories: ['All', 'Long-form Edit', 'Short-form Content', 'Documentary Style', 'Educational Content', 'Paid Advertising', 'Event Coverage'],
      projects: []
    }
  },
  {
    key: 'page.contact',
    data: {
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
  },
  {
    key: 'page.faq',
    data: {
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
  },
  {
    key: 'page.blog',
    data: {
      title: 'Content',
      highlight: 'Creation',
      description: 'Learn professional video editing, YouTube growth strategies, content creation techniques, and creator psychology from industry experts.',
      posts: []
    }
  },
  {
    key: 'page.ai-gallery',
    data: {
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
  },
  {
    key: 'page.donate',
    data: {
      title: 'Support ASR Visuals',
      description: 'Your generous donations help us continue creating amazing content and improving our services. Every contribution, no matter the size, makes a difference!',
      upiId: 'asrvisuals@ptaxis',
      stripeUrl: 'https://buy.stripe.com/your-payment-link'
    }
  },
  {
    key: 'page.privacy',
    data: {
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
  },
  {
    key: 'page.terms',
    data: {
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
  },
  {
    key: 'page.cookies',
    data: {
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
  }
]

const seed = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is required to seed content blocks')
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGODB_URI)

  for (const block of contentBlocks) {
    await ContentBlock.findOneAndUpdate(
      { key: block.key },
      { data: block.data },
      { upsert: true, new: true }
    )
  }

  await mongoose.disconnect()
  console.log('Content blocks seeded successfully')
}

seed().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
