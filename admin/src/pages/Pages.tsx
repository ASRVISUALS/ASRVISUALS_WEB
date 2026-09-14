import { useEffect, useState } from 'react'
import api from '../lib/api'
import Topbar from '../components/Topbar'

type Page = {
  _id: string
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
  author: { name: string; email: string }
  publishDate?: string
  order: number
  showInMenu: boolean
  parentPage?: string
  customCSS?: string
  customJS?: string
  createdAt: string
  updatedAt: string
}

const PagesPage = () => {
  const [pages, setPages] = useState<Page[]>([])
  const [filteredPages, setFilteredPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedPages, setSelectedPages] = useState<string[]>([])
  
  // View states
  const [view, setView] = useState<'list' | 'edit' | 'create'>('list')
  const [currentPage, setCurrentPage] = useState<Partial<Page> | null>(null)
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Form state
  const [formData, setFormData] = useState<Partial<Page>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft',
    template: 'default',
    featuredImage: '',
    seo: {
      metaTitle: '',
      metaDescription: '',
      ogImage: '',
      keywords: []
    },
    order: 0,
    showInMenu: false,
    customCSS: '',
    customJS: ''
  })

  useEffect(() => {
    loadPages()
  }, [])

  useEffect(() => {
    filterPages()
  }, [pages, statusFilter, searchQuery])

  const loadPages = async () => {
    setLoading(true)
    try {
      const response = await api.get('/pages')
      setPages(response.data.data || [])
      setError('')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load pages')
    } finally {
      setLoading(false)
    }
  }

  const filterPages = () => {
    let filtered = [...pages]
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter)
    }
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    setFilteredPages(filtered)
  }

  const handleCreateNew = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      status: 'draft',
      template: 'default',
      featuredImage: '',
      seo: {
        metaTitle: '',
        metaDescription: '',
        ogImage: '',
        keywords: []
      },
      order: 0,
      showInMenu: false,
      customCSS: '',
      customJS: ''
    })
    setCurrentPage(null)
    setView('create')
  }

  const handleEdit = (page: Page) => {
    setFormData(page)
    setCurrentPage(page)
    setView('edit')
  }

  const handleSave = async () => {
    setLoading(true)
    setError('')
    
    try {
      if (view === 'create') {
        await api.post('/pages', formData)
      } else if (currentPage?._id) {
        await api.put(`/pages/${currentPage._id}`, formData)
      }
      
      await loadPages()
      setView('list')
      setCurrentPage(null)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to save page')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return
    
    setLoading(true)
    try {
      await api.delete(`/pages/${id}`)
      await loadPages()
      setError('')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to delete page')
    } finally {
      setLoading(false)
    }
  }

  const handleDuplicate = async (id: string) => {
    setLoading(true)
    try {
      await api.post(`/pages/${id}/duplicate`)
      await loadPages()
      setError('')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to duplicate page')
    } finally {
      setLoading(false)
    }
  }

  const handleBulkDelete = async () => {
    if (!selectedPages.length) return
    if (!confirm(`Delete ${selectedPages.length} page(s)?`)) return
    
    setLoading(true)
    try {
      await api.post('/pages/bulk-delete', { ids: selectedPages })
      await loadPages()
      setSelectedPages([])
      setError('')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to delete pages')
    } finally {
      setLoading(false)
    }
  }

  const togglePageSelection = (id: string) => {
    setSelectedPages(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }))
  }

  if (view === 'list') {
    return (
      <div>
        <Topbar title="Pages Management" />
        
        {/* Action Bar */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button 
            className="button primary" 
            onClick={handleCreateNew}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            ➕ Add New Page
          </button>
          
          {selectedPages.length > 0 && (
            <button 
              className="button secondary" 
              onClick={handleBulkDelete}
              style={{ background: '#fee', color: '#c00' }}
            >
              🗑️ Delete ({selectedPages.length})
            </button>
          )}
          
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
          </select>
          
          <input
            type="text"
            placeholder="🔍 Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, minWidth: '200px' }}
          />
        </div>

        {error && (
          <div className="pill" style={{ marginBottom: '20px', background: '#fee', color: '#c00' }}>
            {error}
          </div>
        )}

        {/* Pages Table */}
        <div className="card">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Loading pages...
            </div>
          ) : filteredPages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <p>No pages found.</p>
              <button className="button primary" onClick={handleCreateNew}>
                Create Your First Page
              </button>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input
                      type="checkbox"
                      onChange={(e) => setSelectedPages(
                        e.target.checked ? filteredPages.map(p => p._id) : []
                      )}
                      checked={selectedPages.length === filteredPages.length && filteredPages.length > 0}
                    />
                  </th>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Template</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPages.map((page) => (
                  <tr key={page._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedPages.includes(page._id)}
                        onChange={() => togglePageSelection(page._id)}
                      />
                    </td>
                    <td>
                      <strong>{page.title}</strong>
                      {page.showInMenu && <span style={{ marginLeft: '8px', fontSize: '11px' }}>📌</span>}
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>/{page.slug}</td>
                    <td>
                      <span 
                        className="pill" 
                        style={{ 
                          background: page.status === 'published' ? '#d4edda' : 
                                     page.status === 'draft' ? '#fff3cd' : '#d1ecf1',
                          color: page.status === 'published' ? '#155724' : 
                                 page.status === 'draft' ? '#856404' : '#0c5460'
                        }}
                      >
                        {page.status}
                      </span>
                    </td>
                    <td>{page.template}</td>
                    <td style={{ fontSize: '12px', color: '#666' }}>
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button 
                          className="button secondary" 
                          onClick={() => handleEdit(page)}
                          title="Edit"
                          style={{ padding: '6px 10px', fontSize: '12px' }}
                        >
                          ✏️
                        </button>
                        <button 
                          className="button secondary" 
                          onClick={() => handleDuplicate(page._id)}
                          title="Duplicate"
                          style={{ padding: '6px 10px', fontSize: '12px' }}
                        >
                          📋
                        </button>
                        <button 
                          className="button secondary" 
                          onClick={() => handleDelete(page._id)}
                          title="Delete"
                          style={{ padding: '6px 10px', fontSize: '12px', background: '#fee', color: '#c00' }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )
  }

  // Edit/Create View
  return (
    <div>
      <Topbar title={view === 'create' ? 'Create New Page' : 'Edit Page'} />
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '12px' }}>
        <button className="button secondary" onClick={() => setView('list')}>
          ← Back to Pages
        </button>
        <button 
          className="button primary" 
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Saving...' : '💾 Save Page'}
        </button>
      </div>

      {error && (
        <div className="pill" style={{ marginBottom: '20px', background: '#fee', color: '#c00' }}>
          {error}
        </div>
      )}

      <div className="grid two">
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Page Content</h3>
            <div className="grid">
              <div>
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter page title"
                  required
                />
              </div>
              
              <div>
                <label>Slug (URL) *</label>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="page-url-slug"
                  required
                />
                <small style={{ fontSize: '11px', color: '#666' }}>
                  Preview: /{formData.slug}
                </small>
              </div>
              
              <div>
                <label>Excerpt (Optional)</label>
                <textarea
                  rows={3}
                  value={formData.excerpt || ''}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief description..."
                />
              </div>
              
              <div>
                <label>Content (HTML/Text)</label>
                <textarea
                  rows={12}
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Page content in HTML or plain text..."
                  style={{ fontFamily: 'monospace', fontSize: '13px' }}
                />
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="card">
            <h3 style={{ marginTop: 0 }}>🔍 SEO Settings</h3>
            <div className="grid">
              <div>
                <label>Meta Title</label>
                <input
                  type="text"
                  value={formData.seo?.metaTitle || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    seo: { ...formData.seo, metaTitle: e.target.value }
                  })}
                  placeholder="SEO-friendly title"
                />
              </div>
              
              <div>
                <label>Meta Description</label>
                <textarea
                  rows={3}
                  value={formData.seo?.metaDescription || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    seo: { ...formData.seo, metaDescription: e.target.value }
                  })}
                  placeholder="Page description for search engines"
                />
              </div>
              
              <div>
                <label>Keywords (comma-separated)</label>
                <input
                  type="text"
                  value={formData.seo?.keywords?.join(', ') || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    seo: { 
                      ...formData.seo, 
                      keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                    }
                  })}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="card">
            <h3 style={{ marginTop: 0 }}>⚙️ Advanced Settings</h3>
            <div className="grid">
              <div>
                <label>Custom CSS</label>
                <textarea
                  rows={6}
                  value={formData.customCSS || ''}
                  onChange={(e) => setFormData({ ...formData, customCSS: e.target.value })}
                  placeholder=".custom-class { color: blue; }"
                  style={{ fontFamily: 'monospace', fontSize: '12px' }}
                />
              </div>
              
              <div>
                <label>Custom JavaScript</label>
                <textarea
                  rows={6}
                  value={formData.customJS || ''}
                  onChange={(e) => setFormData({ ...formData, customJS: e.target.value })}
                  placeholder="console.log('Custom JS');"
                  style={{ fontFamily: 'monospace', fontSize: '12px' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>📄 Page Settings</h3>
            <div className="grid">
              <div>
                <label>Status</label>
                <select
                  value={formData.status || 'draft'}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    status: e.target.value as 'draft' | 'published' | 'scheduled'
                  })}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              
              <div>
                <label>Template</label>
                <select
                  value={formData.template || 'default'}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    template: e.target.value as any
                  })}
                >
                  <option value="default">Default</option>
                  <option value="full-width">Full Width</option>
                  <option value="landing">Landing Page</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              
              <div>
                <label>Featured Image URL</label>
                <input
                  type="text"
                  value={formData.featuredImage || ''}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
                {formData.featuredImage && (
                  <img 
                    src={formData.featuredImage} 
                    alt="Preview"
                    style={{ width: '100%', marginTop: '8px', borderRadius: '8px' }}
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                )}
              </div>
              
              <div>
                <label>Display Order</label>
                <input
                  type="number"
                  value={formData.order || 0}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  placeholder="0"
                />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  checked={formData.showInMenu || false}
                  onChange={(e) => setFormData({ ...formData, showInMenu: e.target.checked })}
                  id="showInMenu"
                />
                <label htmlFor="showInMenu" style={{ margin: 0, cursor: 'pointer' }}>
                  Show in Navigation Menu
                </label>
              </div>
            </div>
          </div>

          {view === 'edit' && currentPage && (
            <div className="card">
              <h3 style={{ marginTop: 0 }}>📊 Page Info</h3>
              <div style={{ fontSize: '13px', color: '#666', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div><strong>Author:</strong> {currentPage.author?.name}</div>
                <div><strong>Created:</strong> {new Date(currentPage.createdAt || '').toLocaleString()}</div>
                <div><strong>Updated:</strong> {new Date(currentPage.updatedAt || '').toLocaleString()}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PagesPage
