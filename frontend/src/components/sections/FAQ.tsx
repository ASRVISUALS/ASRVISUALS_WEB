'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "What does ASR Visuals do?",
    answer: "ASR Visuals helps businesses grow through strategic content creation, performance video editing, and paid advertising systems designed to generate customers."
  },
  {
    question: "Who is ASR Visuals for?",
    answer: "We work with small and mid-sized businesses, local service companies, and brands looking to scale revenue using content and marketing."
  },
  {
    question: "How does your lead generation system work?",
    answer: "We create content, run Meta ad campaigns, optimize creatives, and build conversion-focused systems that turn attention into customers."
  },
  {
    question: "Do you work with local service businesses?",
    answer: "Yes. We specialize in movers, flooring contractors, waterproofing companies, pool installers, junk removal, and professional service brands."
  },
  {
    question: "How long does it take to see results?",
    answer: "Most clients begin seeing traction within 30-60 days as campaigns optimize and content distribution compounds."
  }
]

type FAQContent = {
  label: string
  heading: string
  subheading: string
  items: typeof faqs
}

const defaultContent: FAQContent = {
  label: '(04)',
  heading: 'FAQs',
  subheading: 'Answering your questions',
  items: faqs
}

const FAQ = ({ content = defaultContent }: { content?: FAQContent }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const items = content.items.length ? content.items : defaultContent.items

  return (
    <section className="py-20 sm:py-24 bg-bg-primary">
      <div className="container-custom max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-brand-red font-mono text-sm">{content.label}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mt-2 mb-4">{content.heading}</h2>
          <p className="text-text-secondary text-xl">{content.subheading}</p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {items.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-bg-secondary border border-border-divider rounded-lg overflow-hidden
                         hover:border-brand-red transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="text-brand-red font-mono text-sm">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-text-primary font-semibold">{faq.question}</span>
                </div>
                <ChevronDownIcon
                  className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-text-secondary border-t border-border-divider">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ