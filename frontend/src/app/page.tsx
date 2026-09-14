import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Portfolio from '@/components/sections/Portfolio'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import Blog from '@/components/sections/Blog'
import CTA from '@/components/sections/CTA'
import Stats from '@/components/sections/Stats'
import { getContentBlock } from '@/lib/content'

export const revalidate = 0 // Disable static generation, always fetch fresh data

type PortfolioVideoItem = {
  videoUrl?: string
  mode?: 'auto' | 'manual'
}

type PortfolioVideosContent = {
  videoMode?: 'auto' | 'manual'
  maxResults?: number
  items?: PortfolioVideoItem[]
}

export default async function Home() {
  const heroContent = await getContentBlock('home.hero', null as any)
  const aboutContent = await getContentBlock('home.about', null as any)
  const servicesContent = await getContentBlock('home.services', null as any)
  const processContent = await getContentBlock('home.process', null as any)
  const portfolioContent = await getContentBlock('home.portfolio', null as any)
  const portfolioVideos = await getContentBlock<PortfolioVideosContent>('portfolio.videos', {
    videoMode: 'auto',
    maxResults: 6,
    items: []
  })
  const testimonialsContent = await getContentBlock('home.testimonials', null as any)
  const faqContent = await getContentBlock('home.faq', null as any)
  const blogContent = await getContentBlock('home.blog', null as any)
  const ctaContent = await getContentBlock('home.cta', null as any)
  const statsContent = await getContentBlock('home.stats', null as any)

  const portfolioVideoOverrides = portfolioVideos?.items || []

  return (
    <>
      <Hero content={heroContent || undefined} />
      <Stats content={statsContent || undefined} />
      <About content={aboutContent || undefined} />
      <Services content={servicesContent || undefined} />
      <Process content={processContent || undefined} />
      <Portfolio content={portfolioContent || undefined} videoOverrides={portfolioVideoOverrides} />
      <Testimonials content={testimonialsContent || undefined} />
      <FAQ content={faqContent || undefined} />
      <Blog content={blogContent || undefined} />
      <CTA content={ctaContent || undefined} />
    </>
  )
}