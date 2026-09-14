import mongoose, { Document } from 'mongoose'

export interface IPage extends Document {
  title: string
  slug: string
  content: string
  excerpt?: string
  status: 'draft' | 'published' | 'scheduled'
  template: 'default' | 'full-width' | 'landing' | 'custom'
  featuredImage?: string
  seo: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: string
    keywords?: string[]
  }
  author: mongoose.Types.ObjectId
  publishDate?: Date
  order: number
  showInMenu: boolean
  parentPage?: mongoose.Types.ObjectId
  customCSS?: string
  customJS?: string
  createdAt: Date
  updatedAt: Date
}

const pageSchema = new mongoose.Schema<IPage>({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    default: ''
  },
  excerpt: {
    type: String,
    maxlength: 300
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'scheduled'],
    default: 'draft'
  },
  template: {
    type: String,
    enum: ['default', 'full-width', 'landing', 'custom'],
    default: 'default'
  },
  featuredImage: String,
  seo: {
    metaTitle: String,
    metaDescription: String,
    ogImage: String,
    keywords: [String]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  publishDate: Date,
  order: {
    type: Number,
    default: 0
  },
  showInMenu: {
    type: Boolean,
    default: false
  },
  parentPage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page'
  },
  customCSS: String,
  customJS: String
}, {
  timestamps: true
})

// Auto-generate slug from title if not provided
pageSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})

export default mongoose.model<IPage>('Page', pageSchema)
