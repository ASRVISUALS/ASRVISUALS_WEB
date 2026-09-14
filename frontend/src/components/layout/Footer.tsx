'use client'

import { motion } from 'framer-motion'
import { 
  CloudArrowUpIcon, 
  SparklesIcon, 
  ChatBubbleLeftRightIcon,
  RocketLaunchIcon 
} from '@heroicons/react/24/outline'

const steps = [
  {
    number: '01',
    title: 'Drop Your Footage',
    description: 'Upload your raw clips — WeTransfer, Google Drive, Dropbox — whatever works for you.',
    icon: CloudArrowUpIcon,
    color: 'from-blue-400 to-blue-600'
  },
  {
    number: '02',
    title: 'We Do Our Magic',
    description: 'We cut, trim, color-grade, add transitions and make your content shine.',
    icon: SparklesIcon,
    color: 'from-accent/60 to-accent'
  },
  {
    number: '03',
    title: 'Feedback? Easy',
    description: 'Want something changed? We offer smooth revision rounds to make sure everything is perfect.',
    icon: ChatBubbleLeftRightIcon,
    color: 'from-orange-400 to-red-500'
  },
  {
    number: '04',
    title: 'Upload & Grow',
    description: 'We deliver your final video in ready-to-upload YouTube format.',
    icon: RocketLaunchIcon,
    color: 'from-accent to-accent/70'
  }
]

const Process = () => {
  return (
    <section id="process" className="py-24 bg-bg-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">Process</span>
          <h2 className="mb-4">How It Works?</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            A quick overview of how we work together to make your edit best in class!
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-red/30 via-brand-red to-brand-red/30 transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-bg-secondary rounded-lg p-8 text-center relative z-10 
                              border border-border-divider shadow-soft
                              hover:border-brand-red hover:shadow-medium 
                              transition-all duration-300 group">
                  
                  {/* Icon with Gradient Background */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${step.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                    <step.icon className="w-8 h-8 text-text-primary" />
                  </div>

                  {/* Step Number */}
                  <div className="text-5xl font-bold text-brand-red/10 mb-4">
                    {step.number}
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl font-bold mb-3 text-text-primary">{step.title}</h3>

                  {/* Step Description */}
                  <p className="text-text-secondary text-sm">
                    {step.description}
                  </p>

                  {/* Arrow for Desktop (except last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                      <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center shadow-soft">
                        <span className="text-text-primary font-bold">→</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process