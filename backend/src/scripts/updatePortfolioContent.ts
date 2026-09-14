import dotenv from 'dotenv'
import mongoose from 'mongoose'
import ContentBlock from '../models/ContentBlock'

dotenv.config()

const updatePortfolioContent = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI
    if (!mongoUri) {
      throw new Error('MONGODB_URI not found in environment variables')
    }

    console.log('Connecting to MongoDB...')
    await mongoose.connect(mongoUri)
    console.log('Connected successfully')

    // Update home.portfolio
    const portfolioContent = {
      heading: 'Our Best Work',
      intro: "From cinematic reels to dynamic pacing breakdowns -- here's a glimpse of how we turn raw footage into binge-worthy content that resonates.",
      categories: ['All', 'Shorts (9:16)', 'Testimonial', 'Fast Pace & Motion', 'Cinematic'],
      projects: [
        {
          title: 'Patient Testimonial',
          creator: 'ASR Visuals',
          views: 'YouTube Shorts',
          category: 'Testimonial',
          image: 'https://i.ytimg.com/vi/YOzDH_lIPhc/maxresdefault.jpg',
          tags: ['Testimonial', 'Shorts', 'ASR Visuals'],
          videoUrl: 'https://www.youtube.com/embed/YOzDH_lIPhc?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
        },
        {
          title: 'Fast Pace',
          creator: 'ASR Visuals',
          views: 'YouTube Shorts',
          category: 'Fast Pace & Motion',
          image: 'https://i.ytimg.com/vi/HV3gmADlZ9c/maxresdefault.jpg',
          tags: ['Fast Pace', 'Motion', 'Shorts', 'ASR Visuals'],
          videoUrl: 'https://www.youtube.com/embed/HV3gmADlZ9c?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
        }
      ]
    }

    console.log('Updating home.portfolio...')
    await ContentBlock.findOneAndUpdate(
      { key: 'home.portfolio' },
      { key: 'home.portfolio', data: portfolioContent },
      { upsert: true, new: true }
    )
    console.log('✅ home.portfolio updated successfully')

    // Update portfolio.videos
    const videosContent = {
      videoMode: 'auto',
      maxResults: 50,
      items: [
        {
          mode: 'auto',
          videoUrl: 'https://www.youtube.com/embed/YOzDH_lIPhc?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
        },
        {
          mode: 'auto',
          videoUrl: 'https://www.youtube.com/embed/HV3gmADlZ9c?controls=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3'
        }
      ]
    }

    console.log('Updating portfolio.videos...')
    await ContentBlock.findOneAndUpdate(
      { key: 'portfolio.videos' },
      { key: 'portfolio.videos', data: videosContent },
      { upsert: true, new: true }
    )
    console.log('✅ portfolio.videos updated successfully')

    console.log('\n✨ All portfolio content updated successfully!')
  } catch (error) {
    console.error('❌ Error updating portfolio content:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('Database connection closed')
    process.exit(0)
  }
}

updatePortfolioContent()
