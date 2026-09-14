import mongoose from 'mongoose'
import User from '../models/User'

const DEFAULT_ADMIN_NAME = process.env.DEFAULT_ADMIN_NAME || 'Amit Rana'
const DEFAULT_ADMIN_EMAIL = process.env.DEFAULT_ADMIN_EMAIL || 'amitrana748095@gmail.com'
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD || 'AmitraNa2'

const ensureDefaultAdmin = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 1) {
    console.warn('[DEV MODE] Skipping default admin setup: MongoDB not connected')
    return
  }

  const existingAdmin = await User.findOne({ role: 'admin' })
  if (existingAdmin) {
    return
  }

  const existingUser = await User.findOne({ email: DEFAULT_ADMIN_EMAIL }).select('+password')

  if (existingUser) {
    existingUser.role = 'admin'
    existingUser.password = DEFAULT_ADMIN_PASSWORD
    if (!existingUser.name) {
      existingUser.name = DEFAULT_ADMIN_NAME
    }
    await existingUser.save()
    console.log(`[Default Admin] Promoted existing user to admin: ${DEFAULT_ADMIN_EMAIL}`)
    return
  }

  await User.create({
    name: DEFAULT_ADMIN_NAME,
    email: DEFAULT_ADMIN_EMAIL,
    password: DEFAULT_ADMIN_PASSWORD,
    role: 'admin'
  })

  console.log(`[Default Admin] Created admin user: ${DEFAULT_ADMIN_EMAIL}`)
}

export default ensureDefaultAdmin
