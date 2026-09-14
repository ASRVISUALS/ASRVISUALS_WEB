'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

type AboutContent = {
  heading: string
  description: string
  achievements: { icon: string; text: string }[]
  stats: { value: string; label: string }[]
  ctaLabel: string
  ctaHref: string
  videoUrl: string
}

const defaultAchievements = [
    { icon: '🎥', text: '10+ years in industry' },
    { icon: '⚡', text: 'Fast Delivery' },
    { icon: '⭐', text: 'Top Rated on Fiverr' },
  ]

const defaultStats = [
  { value: '200+', label: 'Videos' },
  { value: '50+', label: 'Creators' },
  { value: '50M+', label: 'Views' }
]

const defaultContent: AboutContent = {
  heading: "We're the Editing Partners Behind the Creators Who Actually Grow with Results.",
  description: 'Fast, Reliable and Obsessed with delivering scroll-stopping content that keeps your audience hooked and your channel growing.',
  achievements: defaultAchievements,
  stats: defaultStats,
  ctaLabel: 'Learn More About Us',
  ctaHref: '/about',
  videoUrl: 'https://www.youtube.com/embed/YOzDH_lIPhc?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
}

const About = ({ content = defaultContent }: { content?: AboutContent }) => {
  const achievements = content.achievements || defaultAchievements
  const stats = content.stats || defaultStats

  return (
    <section id="about" className="py-20 sm:py-24 bg-bg-primary">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-10 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">About</span>
            <h2 className="mb-6">
              {content.heading}
            </h2>
            <p className="text-text-secondary text-base sm:text-lg mb-8">
              {content.description}
            </p>

            {/* Achievement Tags */}
            <div className="flex flex-wrap gap-4 mb-8">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-bg-secondary border border-border-divider flex items-center gap-2 px-4 py-2 rounded-md"
                >
                  <span>{item.icon}</span>
                  <span className="text-sm text-text-primary font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats Preview */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-bg-secondary border border-border-divider p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-brand-red">{stat.value}</div>
                  <div className="text-xs text-text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>

            <Button variant="primary" href={content.ctaHref}>
              {content.ctaLabel}
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default About