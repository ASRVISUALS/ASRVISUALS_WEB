import { useEffect, useMemo, useState } from 'react'
import api from '../lib/api'
import Topbar from '../components/Topbar'

type BlogPost = {
  _id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  coverImage?: string
  seoDescription?: string
  published: boolean
}

type BlogForm = Omit<BlogPost, 'tags'> & { tags: string }

const emptyForm: BlogForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  author: 'ASR Visuals',
  category: 'General',
  tags: '',
  coverImage: '',
  seoDescription: '',
  published: true
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [form, setForm] = useState<BlogForm>(emptyForm)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [generatingImage, setGeneratingImage] = useState(false)

  const loadPosts = async () => {
    try {
      const response = await api.get('/blog/admin')
      setPosts(response.data.data || [])
    } catch {
      setPosts([])
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const selectedPost = useMemo(() => posts.find((post) => post._id === selectedId), [posts, selectedId])

  const setFromPost = (post?: BlogPost | null) => {
    if (!post) {
      setForm(emptyForm)
      return
    }

    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: (post.tags || []).join(', '),
      coverImage: post.coverImage || '',
      seoDescription: post.seoDescription || '',
      published: post.published
    })
  }

  const handleSelect = (post: BlogPost) => {
    setSelectedId(post._id || null)
    setFromPost(post)
    setError('')
  }

  const handleNew = () => {
    setSelectedId(null)
    setFromPost(null)
    setError('')
  }

  const handleChange = (field: keyof BlogForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerateSlug = () => {
    if (form.title) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.title) }))
    }
  }

  const handleGenerateCoverImage = async () => {
    if (!form.title || !form.category) {
      setError('Please fill in title and category before generating image')
      return
    }

    setGeneratingImage(true)
    setError('')

    try {
      const response = await api.post('/blog/generate-image', {
        title: form.title,
        slug: form.slug || slugify(form.title),
        category: form.category
      })

      if (response.data.success && response.data.data.imageUrl) {
        setForm((prev) => ({ ...prev, coverImage: response.data.data.imageUrl }))
      } else {
        setError('Failed to generate image')
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Image generation failed')
    } finally {
      setGeneratingImage(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')

    const payload: BlogPost = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      author: form.author.trim() || 'ASR Visuals',
      category: form.category.trim() || 'General',
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      coverImage: form.coverImage?.trim() || '',
      seoDescription: form.seoDescription?.trim() || '',
      published: form.published
    }

    try {
      if (selectedId) {
        await api.put(`/blog/${selectedId}`, payload)
      } else {
        await api.post('/blog', payload)
      }
      await loadPosts()
      if (!selectedId) {
        setForm(emptyForm)
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedId) return
    setSaving(true)
    setError('')
    try {
      await api.delete(`/blog/${selectedId}`)
      setSelectedId(null)
      setForm(emptyForm)
      await loadPosts()
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Delete failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <Topbar title="Blog Posts" />
      {error ? <div className="pill">{error}</div> : null}
      <div className="grid two">
        <div className="card">
          <div className="grid" style={{ gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Posts</h3>
              <button className="button secondary" onClick={handleNew}>New Post</button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Category</th>
                  <th>Published</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id || post.slug} onClick={() => handleSelect(post)}>
                    <td>{post.title}</td>
                    <td>{post.slug}</td>
                    <td>{post.category}</td>
                    <td>{post.published ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h3>{selectedPost ? 'Edit Post' : 'Create Post'}</h3>
          <div className="grid" style={{ gap: '12px' }}>
            <label>Title</label>
            <input value={form.title} onChange={(event) => handleChange('title', event.target.value)} />

            <label>Slug</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input value={form.slug} onChange={(event) => handleChange('slug', event.target.value)} />
              <button className="button secondary" onClick={handleGenerateSlug}>Generate</button>
            </div>

            <label>Excerpt</label>
            <textarea
              rows={3}
              value={form.excerpt}
              onChange={(event) => handleChange('excerpt', event.target.value)}
            />

            <label>Content (HTML)</label>
            <textarea
              rows={10}
              value={form.content}
              onChange={(event) => handleChange('content', event.target.value)}
            />

            <label>Author</label>
            <input value={form.author} onChange={(event) => handleChange('author', event.target.value)} />

            <label>Category</label>
            <input value={form.category} onChange={(event) => handleChange('category', event.target.value)} />

            <label>Tags (comma separated)</label>
            <input value={form.tags} onChange={(event) => handleChange('tags', event.target.value)} />

            <label>Cover Image URL</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input value={form.coverImage} onChange={(event) => handleChange('coverImage', event.target.value)} placeholder="Image URL or leave empty to auto-generate" />
              <button 
                className="button secondary" 
                onClick={handleGenerateCoverImage}
                disabled={generatingImage || !form.title}
              >
                {generatingImage ? 'Generating...' : 'Generate with AI'}
              </button>
              {form.coverImage && (
                <div style={{ marginTop: '8px' }}>
                  <img 
                    src={form.coverImage} 
                    alt="Cover preview" 
                    style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }} 
                  />
                </div>
              )}
            </div>

            <label>SEO Description</label>
            <textarea
              rows={2}
              value={form.seoDescription}
              onChange={(event) => handleChange('seoDescription', event.target.value)}
            />

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) => handleChange('published', event.target.checked)}
              />
              Published
            </label>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="button primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
              {selectedId ? (
                <button className="button secondary" onClick={handleDelete} disabled={saving}>
                  Delete
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage
