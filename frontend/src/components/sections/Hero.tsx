'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

type HeroContent = {
  badge: string
  titleLine1: string
  titleLine2: string
  subtitle: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  indicatorNumber: string
  indicatorLabel: string
}

const defaultContent: HeroContent = {
  badge: 'Available for work',
  titleLine1: 'We Build Revenue Engines',
  titleLine2: 'With Content, Ads, and Automation That Convert',
  subtitle: 'We help businesses scale revenue through strategic content, high-performance video editing, and data-driven advertising systems.',
  primaryCta: { label: 'Book a Strategy Call', href: 'https://cal.com/asrvisuals' },
  secondaryCta: { label: 'View Our Work', href: '#portfolio' },
  indicatorNumber: '(01)',
  indicatorLabel: 'VS.'
}

const Hero = ({ content = defaultContent }: { content?: HeroContent }) => {
  const {
    badge,
    titleLine1,
    titleLine2,
    subtitle,
    primaryCta,
    secondaryCta,
    indicatorNumber,
    indicatorLabel
  } = content

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgb(225, 6, 0) 1px, transparent 1px),
                            linear-gradient(to bottom, rgb(225, 6, 0) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="orb orb--slow -top-40 -right-40 w-96 h-96 bg-brand-red/15" />
        <div className="orb -bottom-40 -left-40 w-80 h-80 bg-brand-red/10" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Available for Work Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-bg-secondary border border-border-divider px-4 py-2 rounded-lg mb-8"
          >
            <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
            <span className="text-sm text-text-secondary">{badge}</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="mb-6">
            <span className="block text-4xl sm:text-5xl md:text-7xl font-bold text-text-primary">
              {titleLine1}
            </span>
            <span className="block text-3xl sm:text-4xl md:text-6xl font-bold text-brand-red mt-2">
              {titleLine2}
            </span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-8"
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-6 sm:mb-12"
          >
            <Button variant="primary" size="large" href={primaryCta.href}>
              {primaryCta.label}
            </Button>
            <Button variant="outline" size="large" href={secondaryCta.href}>
              {secondaryCta.label}
            </Button>
          </motion.div>

          {/* Section Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 sm:mt-10 flex items-center justify-center gap-2"
          >
            <span className="text-brand-red font-mono text-sm">{indicatorNumber}</span>
            <div className="w-12 h-[1px] bg-border-divider" />
            <span className="text-text-secondary text-sm">{indicatorLabel}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero