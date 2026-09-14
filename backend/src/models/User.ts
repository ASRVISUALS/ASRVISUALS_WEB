import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcryptjs'

interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  company?: string
  website?: string
  socialMedia?: {
    youtube?: string
    instagram?: string
    tiktok?: string
  }
  bookings: mongoose.Types.ObjectId[]
  resetPasswordToken?: string
  resetPasswordExpire?: Date
  emailVerified: boolean
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  company: String,
  website: String,
  socialMedia: {
    youtube: String,
    instagram: String,
    tiktok: String
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  emailVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Compare password method
userSchema.methods.comparePassword = async function(this: IUser, candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model<IUser>('User', userSchema)