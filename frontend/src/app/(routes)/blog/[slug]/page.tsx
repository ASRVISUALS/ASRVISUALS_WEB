import { Metadata } from 'next'
import Link from 'next/link'
import { CalendarIcon, ClockIcon, UserIcon, TagIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { getBlogPostSchema, getBreadcrumbSchema } from '@/lib/schema'

const blogPosts: Record<string, any> = {
  'editing-tricks-retention': {
    title: '10 Editing Tricks That Will Double Your Retention',
    author: 'Sarah Chen',
    date: 'Mar 15, 2024',
    readTime: '5 min read',
    category: 'Editing Tips',
    slug: 'editing-tricks-retention',
    tags: ['editing', 'retention', 'youtube', 'productivity'],
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
    content: `
    <h2>Master These 10 Editing Techniques to Maximize Viewer Retention</h2>
    <p>Retention is the single most important metric on YouTube. It determines your watch time, engagement, and ultimately your channel growth. In this comprehensive guide, we'll break down 10 proven editing techniques that top creators use to keep viewers glued to their screens.</p>

    <h3>1. The Jump Cut: The Foundation of Paced Editing</h3>
    <p>Jump cuts are the backbone of modern video editing. Remove pauses, filler words, and slow moments. This creates a fast-paced, energetic feel that keeps viewers engaged. Most successful YouTube creators use jump cuts extensively in their videos.</p>

    <h3>2. Strategic Transitions for Momentum</h3>
    <p>Don't just cut. Use subtle transitions that maintain energy. Crossfades, whipes, or match cuts can bridge ideas while keeping the pace moving. Avoid overly complex transitions that distract from your message.</p>

    <h3>3. B-Roll Placement: Visual Interest Matters</h3>
    <p>Complement your main content with relevant B-roll. This visual variety prevents viewer eye fatigue and provides context. Research shows viewers are 80% more likely to watch until the end with proper B-roll usage.</p>

    <h3>4. Sound Design: The Underrated Element</h3>
    <p>Audio cues signal important moments. Use sound effects, music stabs, and transitions to punctuate key points. Your editing is only as good as your audio.</p>

    <h3>5. Color Grading for Mood and Consistency</h3>
    <p>Consistent color grading makes your videos look professional. Use warm tones for friendly content, cool tones for serious topics. Create a signature look that viewers recognize.</p>

    <h3>6. Text Overlays as Visual Anchors</h3>
    <p>Strategic text keeps viewers informed and entertained. Use text to highlight key points, add humor, and create visual breaks. But avoid overwhelming your video with too much text.</p>

    <h3>7. The Power of Pacing Variation</h3>
    <p>Vary your pacing throughout the video. Fast sections keep energy high, while slower moments allow for comprehension and emotional impact. This rhythm keeps viewers engaged.</p>

    <h3>8. Pattern Interrupts: The Retention Hack</h3>
    <p>Change angles, zoom in, cut to B-roll, or add on-screen text every 5-10 seconds. These interrupts prevent viewer fatigue and signal that something important is coming.</p>

    <h3>9. The Hook Extend: Re-engaging Viewers</h3>
    <p>If retention dips at any point, visually re-engage viewers. Show a teaser of what's coming next, add shocking text, or cut to dynamic footage.</p>

    <h3>10. Ending Momentum: The Final Retention Push</h3>
    <p>Don't let retention drop at the end. End with a strong call-to-action, preview of next video, or surprising final shot. You want the last thing viewers see to be compelling.</p>

    <h2>Implementation Tips</h2>
    <p>Start by applying 2-3 of these techniques to your next video. Track your average view duration in YouTube Analytics. We've seen clients increase retention by 30%+ just by implementing these basics.</p>

    <h2>Conclusion</h2>
    <p>Editing is not just about removing mistakes—it's about intentional pacing that keeps viewers engaged. Master these 10 techniques, and you'll see immediate results in your analytics.</p>
    `
  },
  'youtube-seo-guide-2024': {
    title: 'The Ultimate YouTube SEO Guide for 2024',
    author: 'Mike Ross',
    date: 'Mar 12, 2024',
    readTime: '8 min read',
    category: 'YouTube Growth',
    slug: 'youtube-seo-guide-2024',
    tags: ['seo', 'youtube', 'growth', 'optimization'],
    coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80',
    content: `
    <h2>Complete YouTube SEO Strategy for 2024</h2>
    <p>YouTube is the second largest search engine after Google. If you're not optimizing for search, you're leaving views on the table. This data-driven guide covers everything you need to know about YouTube SEO.</p>

    <h2>1. Keyword Research: The Foundation</h2>
    <p>Use tools like TubeBuddy, VidIQ, or Google Trends to find keywords with high search volume and low competition. Look for keywords with 1K-10K monthly searches in your niche.</p>

    <h2>2. Title Optimization</h2>
    <p>Your title is your most important SEO element. Include your main keyword near the beginning. Keep it under 60 characters so it doesn't get cut off on mobile. Use power words like "Ultimate," "Complete," "Proven," etc.</p>

    <h2>3. Description Strategy</h2>
    <p>Write 150-200 word descriptions with your keyword mentioned in the first 2-3 lines. Add timestamps for longer videos. Include links to your website and other videos.</p>

    <h2>4. Tag Strategy</h2>
    <p>Use 5-8 relevant tags. Start with your main keyword, then add variations and related terms. Check what tags competitors are using.</p>

    <h2>5. Thumbnail Optimization</h2>
    <p>While not directly SEO, thumbnails affect click-through rate, which signals quality to YouTube's algorithm. Use contrasting colors, clear text, and faces with expressions.</p>

    <h2>6. Playlist Strategy</h2>
    <p>Organize videos into playlists with SEO-rich titles. Playlists can drive massive watch time and engagement.</p>

    <h2>Case Study Results</h2>
    <p>We helped a client implement this complete strategy. Within 3 months: +150% search views, +200% average view duration, +300% total watch time.</p>

    <h2>Conclusion</h2>
    <p>YouTube SEO is about aligning your content with how people search. Master these fundamentals and you'll see consistent growth in visibility and views.</p>
    `
  },
  'zero-to-hundredk-journey': {
    title: 'From 0 to 100K: A Creator\'s Journey',
    author: 'Alex Thompson',
    date: 'Mar 10, 2024',
    readTime: '6 min read',
    category: 'Success Stories',
    slug: 'zero-to-hundredk-journey',
    tags: ['case-study', 'growth', 'gaming', 'strategy'],
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    content: `
    <h2>How a Gaming Channel Reached 100K Subscribers in 6 Months</h2>
    <p>When Jake started his gaming channel, he had no audience, no experience with editing, and no budget. Six months later, he hit 100K subscribers. Here's exactly what we did.</p>

    <h2>Month 1: Foundation & Consistency</h2>
    <p>We focused on uploading 3 videos per week. Each video was 8-12 minutes, heavily edited with jump cuts, B-roll, and engaging thumbnails. We spent 4 hours editing each 20-minute raw recording.</p>

    <h2>Month 2: Content-Market Fit</h2>
    <p>After 12 videos, we analyzed which content performed best. Gaming tutorials outperformed challenge videos 3:1. We doubled down on tutorials.</p>

    <h2>Month 3: SEO & Discoverability</h2>
    <p>We optimized titles, descriptions, and tags for search. Our search traffic grew from 2% to 28% of total views. This compounding growth was key.</p>

    <h2>Month 4: Community Building</h2>
    <p>Jake responded to every comment. He created community posts, premiere streams, and engaged viewers. Watch time per subscriber increased 45%.</p>

    <h2>Month 5: Collaboration & Growth Hacking</h2>
    <p>We reached out to channels 2-5X our size for collaborations. Each collab brought 2,000-5,000 new subscribers. By month 5, we had 60K subscribers.</p>

    <h2>Month 6: Scaling & Consistency</h2>
    <p>We optimized the process and hit 100K. The key was: consistency, quality editing, community engagement, and strategic growth tactics.</p>

    <h2>Key Metrics</h2>
    <ul>
      <li>100 videos published (3/week avg)</li>
      <li>2,000+ hours watched per day</li>
      <li>42% average view duration</li>
      <li>15% subscriber conversion rate</li>
    </ul>

    <h2>Lessons Learned</h2>
    <p>The fastest path to 100K is: pick a niche, master the fundamentals, stay consistent, and engage your community relentlessly.</p>
    `
  },
  'repurpose-video-content': {
    title: 'How to Repurpose One Video Into 10 Content Pieces',
    author: 'Sarah Chen',
    date: 'Mar 8, 2024',
    readTime: '7 min read',
    category: 'Content Strategy',
    slug: 'repurpose-video-content',
    tags: ['repurposing', 'shorts', 'reels', 'content-strategy'],
    coverImage: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&auto=format&fit=crop&q=80',
    content: `
    <h2>Maximize ROI: Turn Every Video Into 10+ Assets</h2>
    <p>You spent hours creating one video. Why limit its reach to one platform? Here's our process for extracting 10+ pieces of content from a single video.</p>

    <h2>The 10 Repurposing Formats</h2>
    <p><strong>1. YouTube Shorts (15-60 seconds)</strong> - Extract the most engaging 15-60 second clip</p>
    <p><strong>2. Instagram Reels</strong> - Same as Shorts but formatted for IG's algorithm</p>
    <p><strong>3. TikTok Videos</strong> - Trending sounds + your best clips</p>
    <p><strong>4. Quote Cards</strong> - Pull key insights and add text overlays</p>
    <p><strong>5. Carousel Posts</strong> - Turn topics into 5-8 carousel slides</p>
    <p><strong>6. Blog Posts</strong> - Transcribe and expand your video into an article</p>
    <p><strong>7. Email Newsletter</strong> - Summarize the video with a compelling subject line</p>
    <p><strong>8. LinkedIn Posts</strong> - Professional insights extracted as text</p>
    <p><strong>9. Podcast Episode</strong> - Use audio from your video</p>
    <p><strong>10. Infographic</strong> - Visualize your key takeaways</p>

    <h2>The Repurposing Workflow</h2>
    <p>Step 1: Create one high-quality, long-form video (10-20 minutes)</p>
    <p>Step 2: Extract 3-5 Shorts/Reels from best moments</p>
    <p>Step 3: Create quote cards from key points</p>
    <p>Step 4: Transcribe and turn into a blog post</p>
    <p>Step 5: Distribute across all platforms over 2 weeks</p>

    <h2>Time Savings</h2>
    <p>Instead of creating 10 pieces of original content (50 hours), you create 1 great piece and repurpose it (12 hours). That's 76% time savings.</p>

    <h2>Reach Multiplication</h2>
    <p>If one video reaches 10K people, 10 repurposed pieces could reach 100K+ across platforms.</p>

    <h2>Conclusion</h2>
    <p>Repurposing isn't lazy content creation—it's smart content strategy. Create less, reach more, and multiply your impact.</p>
    `
  },
  'psychology-hooks-first-seconds': {
    title: 'The Psychology of Hooks: Why First 3 Seconds Matter',
    author: 'Mike Ross',
    date: 'Mar 5, 2024',
    readTime: '6 min read',
    category: 'Video Psychology',
    slug: 'psychology-hooks-first-seconds',
    tags: ['hooks', 'psychology', 'retention', 'creative'],
    coverImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80',
    content: `
    <h2>Master the Hook: Stop the Scroll in 3 Seconds</h2>
    <p>Studies show 70% of viewers drop off in the first 3 seconds. Your hook determines if someone watches 1 minute or 10 minutes. Here's the psychology behind what works.</p>

    <h2>The Curiosity Gap</h2>
    <p>Create a question or misconception in the first 3 seconds that demands an answer. Example: "You've been editing videos wrong your whole life."</p>

    <h2>Visual Novelty</h2>
    <p>Something unexpected catches the eye. A surprising zoom, unusual color, or striking image makes people stop scrolling to see what's going on.</p>

    <h2>Pattern Interrupt</h2>
    <p>Break the monotony of someone's feed. If everyone else has slow, static intros, you use fast cuts and movement.</p>

    <h2>Benefit Promise</h2>
    <p>Clearly state what value viewers will get. "This technique will increase your views by 300%" promises a concrete benefit.</p>

    <h2>Hook Formulas That Work</h2>
    <p><strong>Formula 1:</strong> "You're wrong about [topic]"</p>
    <p><strong>Formula 2:</strong> "This [small change] increased [big result] by [percentage]"</p>
    <p><strong>Formula 3:</strong> "Wait until the end..." (cliffhanger)</p>
    <p><strong>Formula 4:</strong> "[Specific] made [dramatic result] in [timeframe]"</p>

    <h2>Implementation</h2>
    <p>Script your first 3 seconds carefully. Test different hooks. Track which ones get the best retention curves. Iterate and improve.</p>

    <h2>Conclusion</h2>
    <p>The perfect hook combines curiosity, novelty, and a clear promise. Master this and your average view duration will skyrocket.</p>
    `
  },
  'color-grading-trends-2024': {
    title: 'Color Grading Trends 2024: From Cinematic to Viral',
    author: 'Alex Thompson',
    date: 'Mar 3, 2024',
    readTime: '5 min read',
    category: 'Visual Editing',
    slug: 'color-grading-trends-2024',
    tags: ['color-grading', 'trends', 'cinematography', 'aesthetics'],
    coverImage: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&auto=format&fit=crop&q=80',
    content: `
    <h2>2024 Color Grading Trends: What's Hot Right Now</h2>
    <p>Color grading has evolved beyond just correcting footage. It's now about creating a signature aesthetic that makes your content recognizable.</p>

    <h2>Trend 1: The Desaturated Look</h2>
    <p>High contrast, desaturated colors with pops of bold hue. Think Netflix crime dramas. This trend conveys sophistication and timelessness.</p>

    <h2>Trend 2: Warm Vintage Tones</h2>
    <p>Bringing back 70s aesthetics with warm oranges, yellows, and faded blacks. Popular with lifestyle and vlog content.</p>

    <h2>Trend 3: Digital Neon</h2>
    <p>High saturation neon colors. Popular with tech, gaming, and music content. Creates an energetic, futuristic feel.</p>

    <h2>Trend 4: Flat & Clean</h2>
    <p>Minimal contrast, muted colors, clean blacks and whites. Modern, professional, and scannable for attention.</p>

    <h2>Trend 5: High Contrast Drama</h2>
    <p>Crushed blacks, punchy highlights, extreme saturation. Grabs attention in a crowded feed.</p>

    <h2>Top LUTs to Try</h2>
    <p>VSCO, LUTS.pro, FilmConvert, Lowepost, and DaVinci's built-in LUTs all have trending options. Start with pre-made LUTs, then tweak to match your brand.</p>

    <h2>Best Practices</h2>
    <p>1. Create a LUT or preset for consistency</p>
    <p>2. Match color grading to your brand personality</p>
    <p>3. Keep it subtle—don't over-grade</p>
    <p>4. Test on different monitors and devices</p>

    <h2>Conclusion</h2>
    <p>Color grading is about mood and brand consistency. Pick a trend that aligns with your content, master it, and make it your signature look.</p>
    `
  }
}

const getApiPost = async (slug: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  if (!baseUrl) {
    return null
  }

  try {
    const response = await fetch(`${baseUrl}/blog/slug/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 }
    })
    if (!response.ok) {
      return null
    }
    const json = await response.json()
    if (!json?.data) {
      return null
    }

    return {
      title: json.data.title,
      author: json.data.author || 'ASR Visuals',
      date: json.data.date || new Date(json.data.createdAt || Date.now()).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }),
      readTime: json.data.readTime || '5 min read',
      category: json.data.category || 'General',
      slug: json.data.slug,
      tags: json.data.tags || [],
      content: json.data.content,
      seoDescription: json.data.seoDescription || '',
      coverImage: json.data.coverImage || json.data.image || undefined
    }
  } catch {
    return null
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const apiPost = await getApiPost(params.slug)
  const post = apiPost || blogPosts[params.slug]

  if (!post) {
    return (
      <div className="py-20 bg-bg-primary">
        <div className="container-custom max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Post Not Found</h1>
          <p className="text-text-secondary mb-8">Sorry, we couldn't find that blog post.</p>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-md bg-brand-red px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-brand-red-hover hover:-translate-y-1 hover:shadow-red-glow"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  // Structured data for SEO
  const postSchema = getBlogPostSchema({
    title: post.title,
    description: post.content.substring(0, 160),
    author: post.author,
    date: post.date,
    slug: post.slug,
  })

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://asrvisuals.live' },
    { name: 'Blog', url: 'https://asrvisuals.live/blog' },
    { name: post.title, url: `https://asrvisuals.live/blog/${post.slug}` },
  ])

  return (
    <>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="py-12 sm:py-20 bg-bg-primary">
        <div className="container-custom max-w-3xl">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2">
            <Link href="/blog" className="inline-flex items-center gap-1 text-brand-red hover:text-brand-red-hover transition-colors">
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8 bg-bg-secondary">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Hide if image fails to load
                  (e.target as HTMLElement).style.display = 'none'
                }}
              />
            </div>
          )}

          {/* Header */}
          <header className="mb-8">
            <span className="inline-block px-3 py-1 rounded-lg bg-bg-secondary border border-border-divider text-brand-red text-xs font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">{post.title}</h1>
            
            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-text-secondary text-sm">
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
          </header>

          {/* Content */}
          <div
            className="max-w-none mb-12 prose-light"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />

          {/* Tags */}
          <div className="border-t border-border-divider pt-8 mb-8">
            <div className="flex flex-wrap gap-2">
              {(post.tags || []).map((tag: string) => (
                <span key={tag} className="inline-block px-3 py-1 rounded-lg bg-bg-secondary border border-border-divider text-text-secondary text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-bg-secondary border border-border-divider rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-text-primary mb-4">Ready to transform your content?</h3>
            <Link
              href="https://cal.com/asrvisuals"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-brand-red px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-brand-red-hover hover:-translate-y-1 hover:shadow-red-glow"
            >
              Book a Free Strategy Call
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-20 bg-bg-secondary">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold text-text-primary mb-8">More Articles</h2>
          <Link href="/blog" className="inline-flex items-center gap-2 text-brand-red hover:text-brand-red-hover transition-colors font-semibold">
            View All Articles
            <span>→</span>
          </Link>
        </div>
      </section>
    </>
  )
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blogPosts: Record<string, any> = {
    'editing-tricks-retention': {
      title: '10 Editing Tricks That Will Double Your Retention',
      seoDescription: 'Master 10 advanced video editing techniques to increase viewer retention. Learn jump cuts, transitions, and pacing strategies used by top YouTube creators.',
    },
    'youtube-seo-guide-2024': {
      title: 'The Ultimate YouTube SEO Guide for 2024',
      seoDescription: 'Complete YouTube SEO guide 2024: Learn keyword research, title optimization, and ranking strategies to grow your channel by 300%.',
    },
    'zero-to-hundredk-journey': {
      title: 'From 0 to 100K: A Creator\'s Journey',
      seoDescription: 'See how a gaming channel grew from 0 to 100K subscribers in 6 months with professional video editing and strategic content planning.',
    },
    'repurpose-video-content': {
      title: 'How to Repurpose One Video Into 10 Content Pieces',
      seoDescription: 'Learn how to multiply your content ROI by turning one video into 10+ pieces of content. Master content repurposing strategies.',
    },
    'psychology-hooks-first-seconds': {
      title: 'The Psychology of Hooks: Why First 3 Seconds Matter',
      seoDescription: 'Master the psychology behind effective video hooks. Learn why the first 3 seconds determine if viewers watch to the end.',
    },
    'color-grading-trends-2024': {
      title: 'Color Grading Trends 2024: From Cinematic to Viral',
      seoDescription: 'Explore the hottest color grading trends in 2024. Learn desaturated cinematic looks, neon aesthetics, and how to create your signature style.',
    },
  }

  const apiPost = await getApiPost(params.slug)
  const post = apiPost || blogPosts[params.slug]

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    }
  }

  const baseUrl = 'https://asrvisuals.live'
  const url = `${baseUrl}/blog/${params.slug}`
  const description = post.seoDescription || (post.content ? post.content.replace(/<[^>]+>/g, '').slice(0, 160) : '')

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url: url,
      type: 'article',
      siteName: 'ASR Visuals',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
  }
}
