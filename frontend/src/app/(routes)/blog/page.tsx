'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'
import { useContentBlock } from '@/lib/useContentBlock'

const allPosts = [
  {
    title: '10 Editing Tricks That Will Double Your Retention',
    excerpt: 'Learn the secrets top creators use to keep viewers watching until the very end. Discover advanced cutting techniques, transitions, and pacing strategies.',
    author: 'Sarah Chen',
    date: 'Mar 15, 2024',
    readTime: '5 min read',
    category: 'Editing Tips',
    slug: 'editing-tricks-retention',
    tags: ['editing', 'retention', 'youtube', 'productivity'],
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'The Ultimate YouTube SEO Guide for 2024',
    excerpt: 'How we helped our clients grow their views by 300% using these simple SEO techniques. A data-driven approach to dominating YouTube search rankings.',
    author: 'Mike Ross',
    date: 'Mar 12, 2024',
    readTime: '8 min read',
    category: 'YouTube Growth',
    slug: 'youtube-seo-guide-2024',
    tags: ['seo', 'youtube', 'growth', 'optimization'],
    coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'From 0 to 100K: A Creator\'s Journey',
    excerpt: 'Case study: How consistent, high-quality editing helped a gaming channel explode. Real numbers, real strategies, real results.',
    author: 'Alex Thompson',
    date: 'Mar 10, 2024',
    readTime: '6 min read',
    category: 'Success Stories',
    slug: 'zero-to-hundredk-journey',
    tags: ['case-study', 'growth', 'gaming', 'strategy'],
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'How to Repurpose One Video Into 10 Content Pieces',
    excerpt: 'Master the art of content multiplication. Turn one high-quality video into short-form content, blog posts, podcasts, and more. Maximize reach and ROI.',
    author: 'Sarah Chen',
    date: 'Mar 8, 2024',
    readTime: '7 min read',
    category: 'Content Strategy',
    slug: 'repurpose-video-content',
    tags: ['repurposing', 'shorts', 'reels', 'content-strategy'],
    coverImage: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'The Psychology of Hooks: Why First 3 Seconds Matter',
    excerpt: 'Understanding why viewers stop and watch. The neuroscience behind effective hooks, curiosity gaps, and what actually makes people keep scrolling.',
    author: 'Mike Ross',
    date: 'Mar 5, 2024',
    readTime: '6 min read',
    category: 'Video Psychology',
    slug: 'psychology-hooks-first-seconds',
    tags: ['hooks', 'psychology', 'retention', 'creative'],
    coverImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Color Grading Trends 2024: From Cinematic to Viral',
    excerpt: 'Explore the hottest color grading styles right now. From desaturated cinematics to neon digital aesthetics. Create your signature look.',
    author: 'Alex Thompson',
    date: 'Mar 3, 2024',
    readTime: '5 min read',
    category: 'Visual Editing',
    slug: 'color-grading-trends-2024',
    tags: ['color-grading', 'trends', 'cinematography', 'aesthetics'],
    coverImage: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&auto=format&fit=crop&q=80',
  },
]

type BlogPageContent = {
  title: string
  highlight: string
  description: string
  posts: typeof allPosts
}

const defaultContent: BlogPageContent = {
  title: 'Content',
  highlight: 'Creation',
  description: 'Learn professional video editing, YouTube growth strategies, content creation techniques, and creator psychology from industry experts.',
  posts: allPosts
}

const categories = ['All', ...allPosts.reduce((acc, post) => {
  if (acc.includes(post.category)) {
    return acc
  }

  return [...acc, post.category]
}, [] as string[])]

export default function BlogPage() {
  const content = useContentBlock('page.blog', defaultContent)
  const [apiPosts, setApiPosts] = useState(allPosts)
  const posts = content.posts?.length ? content.posts : apiPosts
  const categories = ['All', ...posts.reduce((acc, post) => {
    if (acc.includes(post.category)) {
      return acc
    }
    return [...acc, post.category]
  }, [] as string[])]

  const [selectedCategory, setSelectedCategory] = useState('All')
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === selectedCategory)

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    if (!baseUrl) return

    const load = async () => {
      try {
        const response = await fetch(`${baseUrl}/blog`)
        if (!response.ok) return
        const json = await response.json()
        if (Array.isArray(json.data) && json.data.length) {
          const normalized = json.data.map((post: any) => ({
            title: post.title,
            excerpt: post.excerpt,
            author: post.author || 'ASR Visuals',
            date: post.date || new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric'
            }),
            readTime: post.readTime || '5 min read',
            category: post.category || 'General',
            slug: post.slug,
            tags: post.tags || [],
            coverImage: post.coverImage || post.image || undefined
          }))
          setApiPosts(normalized)
        }
      } catch {
        // ignore
      }
    }

    load()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-bg-primary">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="section-tag">Blog</span>
            <h1 className="mt-4 text-5xl md:text-6xl font-bold text-text-primary mb-6">
              {content.title} <span className="text-brand-red">{content.highlight}</span> Insights
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
              {content.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-bg-secondary border-b border-border-divider">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-wrap gap-3"
          >
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-brand-red text-white'
                    : 'bg-bg-primary text-text-primary border border-border-divider hover:border-brand-red'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 bg-bg-primary">
        <div className="container-custom max-w-4xl">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-bg-secondary border border-border-divider rounded-lg overflow-hidden hover:border-brand-red hover:shadow-red-glow transition-all duration-300"
                >
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="relative w-full h-48 overflow-hidden bg-bg-primary">
                      <img 
                        src={post.coverImage} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback if image fails to load
                          (e.target as HTMLElement).style.display = 'none'
                        }}
                      />
                    </div>
                  )}

                  {/* Post Content */}
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 rounded-lg bg-bg-primary border border-border-divider text-brand-red text-xs font-semibold mb-4">
                      {post.category}
                    </span>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="inline-flex items-center gap-1 text-xs text-text-secondary">
                        <CalendarIcon className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <ClockIcon className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-border-divider">
                      {(post.tags || []).slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-bg-primary text-text-secondary rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-xs text-text-secondary font-medium">
                        By {post.author}
                      </span>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-brand-red text-sm font-bold border-b-2 border-brand-red hover:border-brand-red-hover hover:text-brand-red-hover transition-all duration-300 group-hover:gap-3"
                      >
                        Read More
                        <span className="text-lg leading-none group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-text-secondary text-lg">No posts found in this category.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-bg-secondary">
        <div className="container-custom max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Stay Updated on Latest Tips
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Get weekly content creation strategies delivered to your inbox.
            </p>
            <Button variant="primary" href="/contact">
              Join Our Newsletter
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-12 bg-bg-primary">
        <div className="container-custom">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border-divider bg-bg-secondary px-5 py-2 text-sm font-semibold text-text-primary hover:border-brand-red transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </>
  )
}
