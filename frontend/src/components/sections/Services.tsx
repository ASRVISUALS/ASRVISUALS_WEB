'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { 
  FilmIcon, 
  DocumentTextIcon, 
  PhotoIcon,
  ArrowPathIcon 
} from '@heroicons/react/24/outline'

type ServicesContent = {
  heading: string
  intro: string
  items: {
    title: string
    description: string
    tags: string[]
  }[]
}

const services = [
  {
    title: 'Youtube Shorts Editing',
    description: 'We turn raw clips into high-retention, caption-packed vertical videos that pop on Reels, Shorts, and TikTok.',
    icon: FilmIcon,
    tags: ['Snappy Pacing', 'Viral-Ready', 'Subtitled'],
  },
  {
    title: 'Long Form Edits',
    description: 'From vlogs to deep dives, we trim the fluff, tighten the pacing for maximum retention.',
    icon: DocumentTextIcon,
    tags: ['Retention-Driven', 'Cinematic', 'Story-Focused'],
  },
  {
    title: 'Thumbnail Design',
    description: 'Custom thumbnails that demand clicks and capture your video\'s essence in one frame.',
    icon: PhotoIcon,
    tags: ['Click Magnet', 'Brand Consistent', 'High-Contrast'],
  },
  {
    title: 'Content Repurposing',
    description: 'One video, 10 pieces of content — cut into Shorts, Reels, quote cards, and teasers.',
    icon: ArrowPathIcon,
    tags: ['Multi-Platform', 'Batch Delivery', 'Quick Turnaround'],
  }
]

const serviceIcons = [FilmIcon, DocumentTextIcon, PhotoIcon, ArrowPathIcon]

const defaultContent: ServicesContent = {
  heading: 'What We Do Best',
  intro: 'We craft scroll-stopping edits that keep your audience hooked and your content looking top-tier.',
  items: services.map((service) => ({
    title: service.title,
    description: service.description,
    tags: service.tags
  }))
}

const Services = ({ content = defaultContent }: { content?: ServicesContent }) => {
  const items = content.items.length ? content.items : defaultContent.items

  return (
    <section className="py-20 sm:py-24 bg-bg-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">Services</span>
          <h2 className="mb-4">{content.heading}</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {content.intro}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {items.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group">
                {/* Card Header with Icon */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-brand-red/10 rounded-lg">
                    {(() => {
                      const Icon = serviceIcons[index % serviceIcons.length]
                      return <Icon className="w-6 h-6 text-brand-red" />
                    })()}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">{service.title}</h3>
                </div>
                
                {/* Description */}
                <p className="text-text-secondary mb-4">
                  {service.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-brand-red/10 text-brand-red rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover Effect Indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-brand-red text-sm">Learn more →</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services