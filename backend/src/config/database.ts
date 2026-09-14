import mongoose from 'mongoose'

const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    console.warn('[DEV MODE] MONGODB_URI not set, skipping DB connection')
    return
  }

  try {
    await mongoose.connect(uri)
    console.log('MongoDB connected')
  } catch (error) {
    console.warn('[DEV MODE] MongoDB connection failed:', (error as any).message)
    console.warn('Continuing without database...')
  }
}

export default connectDB
