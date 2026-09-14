'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Copy, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useContentBlock } from '@/lib/useContentBlock'

export default function DonatePage() {
  const [copiedUPI, setCopiedUPI] = useState(false)
  const content = useContentBlock('page.donate', {
    title: 'Support ASR Visuals',
    description: 'Your generous donations help us continue creating amazing content and improving our services. Every contribution, no matter the size, makes a difference!',
    upiId: 'asrvisuals@ptaxis',
    stripeUrl: 'https://buy.stripe.com/your-payment-link'
  })

  const upiID = content.upiId

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiID)
    setCopiedUPI(true)
    setTimeout(() => setCopiedUPI(false), 2000)
  }

  const handleStripePayment = () => {
    window.open(content.stripeUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-primary-light py-24">
      {/* Floating Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="container-custom relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-6">
            <Heart className="w-10 h-10 text-accent" fill="currentColor" />
          </div>
          <h1 className="heading-lg text-text-primary mb-6">
            {content.title}
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed">
            {content.description}
          </p>
        </motion.div>

        {/* Donation Options */}
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
          {/* UPI Payment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <svg 
                  className="w-6 h-6 text-accent" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M20.5 3h-17C2.67 3 2 3.67 2 4.5v15C2 20.33 2.67 21 3.5 21h17c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5zm-17 15v-12h17v12h-17zm8.5-9.5c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-text-primary">UPI Payment</h2>
            </div>

            <div className="bg-white/50 rounded-lg p-4 mb-6 border border-card-border">
              <p className="text-sm text-text-secondary mb-2">UPI ID</p>
              <div className="flex items-center justify-between gap-3">
                <code className="text-lg font-mono text-text-primary break-all">
                  {upiID}
                </code>
                <button
                  onClick={handleCopyUPI}
                  className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent hover:bg-accent/90 
                           text-white flex items-center justify-center transition-colors"
                >
                  {copiedUPI ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              {copiedUPI && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-600 mt-2"
                >
                  Copied to clipboard!
                </motion.p>
              )}
            </div>

            <div className="space-y-3 text-sm text-text-secondary">
              <p className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>Instant transfer via any UPI app (GPay, PhonePe, Paytm, etc.)</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>No transaction fees</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>100% of your donation goes directly to us</span>
              </p>
            </div>
          </motion.div>

          {/* Stripe Payment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <svg 
                  className="w-6 h-6 text-accent" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.667 3.445 2.87 0 .79-.790 1.479-2.241 1.479-1.988 0-4.79-.915-6.566-1.984l-.952 5.449C5.644 23.095 8.102 24 11.421 24c2.774 0 5.024-.699 6.499-2.026C19.425 20.63 20 18.79 20 16.631c0-3.424-1.862-5.449-6.024-7.481z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-text-primary">Card Payment</h2>
            </div>

            <p className="text-text-secondary mb-6 leading-relaxed">
              Donate securely using your credit or debit card through Stripe. 
              We accept all major cards worldwide.
            </p>

            <div className="space-y-3 text-sm text-text-secondary mb-8">
              <p className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>Secure payment processing</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>Accept all major credit/debit cards</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>International payments supported</span>
              </p>
            </div>

            <Button
              variant="primary"
              size="large"
              onClick={handleStripePayment}
              className="w-full"
            >
              Donate via Stripe
            </Button>
          </motion.div>
        </div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto mt-16 text-center"
        >
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Thank You! 🙏
            </h3>
            <p className="text-text-secondary leading-relaxed mb-6">
              Your support means the world to us. Every donation helps us invest in better equipment, 
              software, and training to deliver the highest quality video editing services to our clients.
            </p>
            <p className="text-sm text-text-secondary">
              Questions? Reach out to us at{' '}
              <a 
                href="mailto:asrvisualshelpline@gmail.com" 
                className="text-accent hover:underline"
              >
                asrvisualshelpline@gmail.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
