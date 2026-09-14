'use client'

import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  VideoCameraIcon,
  RocketLaunchIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline'

type ProcessContent = {
  label: string
  heading: string
  subheading: string
  steps: {
    number: string
    title: string
    description: string
  }[]
}

const processSteps = [
  {
    number: '01',
    title: 'Strategy & Discovery',
    description: 'We define your audience, messaging, creative angles, and growth objectives to build a clear content and ad strategy.',
    icon: MagnifyingGlassIcon
  },
  {
    number: '02',
    title: 'Production & Execution',
    description: 'We plan, script, edit, and produce high-performing videos and marketing assets designed to attract and convert.',
    icon: VideoCameraIcon
  },
  {
    number: '03',
    title: 'Campaign Launch & Distribution',
    description: 'Meta ads and organic content are deployed strategically to generate awareness, inbound leads, and consistent engagement.',
    icon: RocketLaunchIcon
  },
  {
    number: '04',
    title: 'Analytics & Scaling',
    description: 'We analyze performance data, improve creatives and funnels, and scale campaigns that drive predictable revenue growth.',
    icon: ChartBarIcon
  }
]

const stepIcons = [MagnifyingGlassIcon, VideoCameraIcon, RocketLaunchIcon, ChartBarIcon]

const defaultContent: ProcessContent = {
  label: '(02)',
  heading: 'Process',
  subheading: 'How we work with clients',
  steps: processSteps.map((step) => ({
    number: step.number,
    title: step.title,
    description: step.description
  }))
}

const Process = ({ content = defaultContent }: { content?: ProcessContent }) => {
  const steps = content.steps.length ? content.steps : defaultContent.steps

  return (
    <section id="process" className="py-24 bg-bg-primary relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(225, 6, 0) 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header - ASR Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-16"
        >
          <div>
            <span className="text-brand-red font-mono text-sm">{content.label}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mt-2">{content.heading}</h2>
            <p className="text-text-secondary text-xl mt-2">{content.subheading}</p>
          </div>
          <div className="hidden md:block w-24 h-[1px] bg-border-divider" />
        </motion.div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-bg-secondary border border-border-divider rounded-lg p-8 
                         hover:border-brand-red transition-all duration-300 
                         group hover:shadow-medium"
            >
              <div className="flex items-start gap-6">
                <span className="text-4xl font-bold text-brand-red opacity-30 group-hover:opacity-100 transition-opacity">
                  {step.number}
                </span>
                <div>
                  <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4 
                                group-hover:bg-brand-red/20 transition-colors">
                    {(() => {
                      const Icon = stepIcons[index % stepIcons.length]
                      return <Icon className="w-6 h-6 text-brand-red" />
                    })()}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">{step.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process