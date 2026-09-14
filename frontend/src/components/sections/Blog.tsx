'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'

const posts = [
  {
    title: '10 Editing Tricks That Will Double Your Retention',
    excerpt: 'Learn the secrets top creators use to keep viewers watching until the very end. Discover advanced cutting techniques, transitions, and pacing strategies.',
    content: 'Retention is the key metric for YouTube success. In this comprehensive guide, we break down 10 proven editing techniques that top creators use to maximize watch time. From jump cuts to strategic pauses, each technique is designed to keep your audience engaged throughout your entire video.',
    author: 'Sarah Chen',
    date: 'Mar 15, 2024',
    readTime: '5 min read',
    category: 'Editing Tips',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
    slug: 'editing-tricks-retention',
    tags: ['editing', 'retention', 'youtube', 'productivity'],
    seoDescription: 'Master 10 advanced video editing techniques to increase viewer retention. Learn jump cuts, transitions, and pacing strategies used by top YouTube creators.'
  },
  {
    title: 'The Ultimate YouTube SEO Guide for 2024',
    excerpt: 'How we helped our clients grow their views by 300% using these simple SEO techniques. A data-driven approach to dominating YouTube search rankings.',
    content: 'YouTube SEO is more important than ever. With competition fiercer than before, understanding how to optimize your videos for search is crucial. This detailed guide covers keyword research, title optimization, tag strategies, and more.',
    author: 'Mike Ross',
    date: 'Mar 12, 2024',
    readTime: '8 min read',
    category: 'YouTube Growth',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80',
    slug: 'youtube-seo-guide-2024',
    tags: ['seo', 'youtube', 'growth', 'optimization'],
    seoDescription: 'Complete YouTube SEO guide 2024: Learn keyword research, title optimization, and ranking strategies to grow your channel by 300%.'
  },
  {
    title: 'From 0 to 100K: A Creator\'s Journey',
    excerpt: 'Case study: How consistent, high-quality editing helped a gaming channel explode. Real numbers, real strategies, real results.',
    content: 'We partnered with a gaming channel that started with zero subscribers. Within 6 months, they reached 100K subscribers through strategic content planning and professional editing. Here\'s exactly what we did.',
    author: 'Alex Thompson',
    date: 'Mar 10, 2024',
    readTime: '6 min read',
    category: 'Success Stories',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    slug: 'zero-to-hundredk-journey',
    tags: ['case-study', 'growth', 'gaming', 'strategy'],
    seoDescription: 'See how a gaming channel grew from 0 to 100K subscribers in 6 months with professional video editing and strategic content planning.'
  },
  {
    title: 'How to Repurpose One Video Into 10 Content Pieces',
    excerpt: 'Maximize your content ROI by turning long-form videos into Shorts, Reels, quotes cards, and more. Save time and reach multiple platforms.',
    content: 'Content repurposing is the ultimate time-saving strategy. Learn how to break down a single long-form video into 10+ pieces optimized for different platforms and audiences.',
    author: 'Sarah Chen',
    date: 'Mar 8, 2024',
    readTime: '7 min read',
    category: 'Content Strategy',
    image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&auto=format&fit=crop&q=80',
    slug: 'repurpose-video-content',
    tags: ['repurposing', 'shorts', 'reels', 'content-strategy'],
    seoDescription: 'Learn how to repurpose one long-form video into 10+ Shorts, Reels, and quotes cards for maximum reach and engagement.'
  },
  {
    title: 'The Psychology of Hooks: Why First 3 Seconds Matter',
    excerpt: 'Master the art of the hook. Industry research shows 70% of viewers drop off in the first 3 seconds. Here\'s how to stop the scroll.',
    content: 'The hook is everything in the age of short attention spans. This scientifically-backed guide teaches you psychological principles that make people stop scrolling and start watching.',
    author: 'Mike Ross',
    date: 'Mar 5, 2024',
    readTime: '6 min read',
    category: 'Video Psychology',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80',
    slug: 'psychology-hooks-first-seconds',
    tags: ['hooks', 'psychology', 'retention', 'creative'],
    seoDescription: 'Master video hooks using psychology principles. Learn why the first 3 seconds matter and how to stop viewers from scrolling.'
  },
  {
    title: 'Color Grading Trends 2024: From Cinematic to Viral',
    excerpt: 'Explore the latest color grading trends that professionals are using. From cinematic looks to viral TikTok aesthetics, stay on top of trends.',
    content: 'Color grading can make or break your video\'s visual appeal. This trend report covers the hottest color grading techniques and LUT recommendations for 2024.',
    author: 'Alex Thompson',
    date: 'Mar 3, 2024',
    readTime: '5 min read',
    category: 'Visual Editing',
    image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&auto=format&fit=crop&q=80',
    slug: 'color-grading-trends-2024',
    tags: ['color-grading', 'trends', 'cinematography', 'aesthetics'],
    seoDescription: 'Latest color grading trends 2024: Cinematic techniques, viral aesthetics, and LUT recommendations for professional video editing.'
  }
]

type BlogContent = {
  heading: string
  intro: string
  posts: typeof posts
}

const defaultContent: BlogContent = {
  heading: 'Creator Insights & Tips',
  intro: 'Stay ahead of the game with fresh insights on editing trends, YouTube growth strategies.',
  posts
}

const Blog = ({ content = defaultContent }: { content?: BlogContent }) => {
  const items = content?.posts?.length ? content.posts : defaultContent.posts

  return (
    <section id="blog" className="py-20 sm:py-24 bg-bg-primary">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="section-tag">Blog</span>
          <h2 className="mb-4">{content?.heading || defaultContent.heading}</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {content?.intro || defaultContent.intro}
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {items.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-bg-secondary rounded-lg overflow-hidden border border-border-divider 
                         hover:border-brand-red transition-all duration-300 
                         hover:shadow-lg hover:shadow-brand-red/10 group"
            >
              {/* Image */}
              <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-brand-red text-text-primary px-3 py-1 rounded-lg text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
              </Link>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-text-secondary mb-3">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand-red transition-colors">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-text-secondary text-sm mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-text-secondary font-medium">
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
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="outline" href="/blog">
            View All Posts
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Blog