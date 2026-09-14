'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  InstagramIcon 
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Process', href: '/process' },
      { name: 'Portfolio', href: '/portfolio' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Donate', href: '/donate' },
    ],
    social: [
      { name: 'X', icon: 'X', href: 'https://x.com/VisualsAsr83268' },
      { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com/asr_visuals_' },
    ]
  }

  return (
    <footer className="bg-bg-secondary border-t border-border-divider pt-16 pb-8">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 text-2xl font-bold mb-4">
              <span className="inline-flex items-center justify-center rounded-lg border border-border-divider bg-white p-1 shadow-soft">
                <Image
                  src="/asr-logo.png"
                  alt="ASR Visuals"
                  width={36}
                  height={36}
                  className="rounded-lg"
                />
              </span>
              <span className="text-text-primary">ASR Visuals</span>
            </Link>
            <p className="text-text-secondary mb-6 max-w-md">
              Professional video editing services for content creators. 
              We help you grow your audience with scroll-stopping content.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="w-10 h-10 rounded-lg bg-bg-primary border border-border-divider 
                             flex items-center justify-center text-text-secondary 
                             hover:text-brand-red hover:border-brand-red 
                             transition-all duration-300"
                  >
                    {social.name === 'X' ? (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-text-secondary hover:text-brand-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-text-secondary hover:text-brand-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-text-secondary hover:text-brand-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-divider flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/asr-logo.png"
              alt="ASR Visuals"
              width={20}
              height={20}
              className="rounded"
            />
            <p className="text-text-secondary text-sm">
              © {currentYear} ASR Visuals. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-text-secondary hover:text-brand-red text-sm transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-text-secondary hover:text-brand-red text-sm transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-text-secondary hover:text-brand-red text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer