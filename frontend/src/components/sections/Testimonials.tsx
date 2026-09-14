'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const testimonials = [
  {
    quote: "We got 31 calls in 30 days and booked 14 moves. I was honestly shocked and relieved. Calendar finally looked full again.",
    author: "John Parker",
    company: "Texas Moving LLC",
    image: "/testimonials/john.jpg"
  },
  {
    quote: "Closed 9 flooring jobs in one month. These were real homeowners, not price shoppers. I felt confident hiring another installer.",
    author: "Mark Robertson",
    company: "Ohio Flooring",
    image: "/testimonials/mark.jpg"
  },
  {
    quote: "We went from 2 quotes a week to 3 a day. Crews stayed fully booked, revenue stabilized, and I stopped stressing about slow weeks.",
    author: "Mike Carter",
    company: "16th Street Fencing",
    image: "/testimonials/mike.jpg"
  },
  {
    quote: "Got 18 pool cover leads in 3 weeks and booked 7 installs. Follow-ups ran on autopilot, which saved me tons of time.",
    author: "Wilson Pool Covers",
    company: "Wales Pool Services",
    image: "/testimonials/wilson.jpg"
  },
  {
    quote: "Added 6 new monthly clients in 45 days without cold calling. People already trusted us, and onboarding felt smooth.",
    author: "Sarah Thompson",
    company: "Thompson CPA",
    image: "/testimonials/sarah.jpg"
  },
  {
    quote: "Our phone didn't stop ringing, and we hit about $110K extra revenue in 90 days. It took a huge weight off my shoulders.",
    author: "Jake Miller",
    company: "East Coast Junk Removals",
    image: "/testimonials/jake.jpg"
  }
]

type TestimonialsContent = {
  label: string
  heading: string
  subheading: string
  items: typeof testimonials
}

const defaultContent: TestimonialsContent = {
  label: '(03)',
  heading: 'Testimonials',
  subheading: 'Hear from those who trust us',
  items: testimonials
}

const Testimonials = ({ content = defaultContent }: { content?: TestimonialsContent }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  const activeItems = content.items.length ? content.items : defaultContent.items

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  const nextSlide = () => {
    if (currentIndex + visibleCount < activeItems.length) {
      setDirection(1)
      setCurrentIndex(prev => prev + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(prev => prev - 1)
    }
  }

  return (
    <section className="py-20 sm:py-24 bg-bg-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(225, 6, 0, 0.25) 0%, transparent 50%)'
        }} />
      </div>
      <div className="orb -top-24 -left-16 w-64 h-64 bg-brand-red/15" />
      <div className="orb orb--slow -bottom-28 -right-20 w-72 h-72 bg-brand-red/10" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <span className="text-brand-red font-mono text-sm">{content.label}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mt-2">{content.heading}</h2>
            <p className="text-text-secondary text-xl mt-2">{content.subheading}</p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-lg border border-border-divider flex items-center justify-center
                       text-text-secondary hover:text-text-primary hover:border-brand-red 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex + visibleCount >= testimonials.length}
              className="w-10 h-10 rounded-lg border border-border-divider flex items-center justify-center
                       text-text-secondary hover:text-text-primary hover:border-brand-red
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div ref={containerRef} className="overflow-hidden">
          <motion.div
            animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex"
          >
            {activeItems.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <div className="bg-bg-secondary border border-border-divider rounded-lg p-8 h-full
                              hover:border-brand-red transition-all duration-300">
                  {/* Quote Icon */}
                  <div className="text-4xl text-brand-red opacity-30 mb-4">"</div>
                  
                  {/* Quote */}
                  <p className="text-text-secondary mb-6 leading-relaxed">{testimonial.quote}</p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-brand-red/20 flex items-center justify-center">
                      <span className="text-brand-red font-bold text-lg">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-text-primary font-semibold">{testimonial.author}</h4>
                      <p className="text-text-secondary text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: activeItems.length - visibleCount + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                    ? 'w-8 bg-brand-red'
                    : 'bg-border-divider hover:bg-text-secondary'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials