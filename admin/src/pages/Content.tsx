import { useEffect, useState } from 'react'
import api from '../lib/api'
import Topbar from '../components/Topbar'

type ContentBlock = {
  _id?: string
  key: string
  data: any
}

const ContentPage = () => {
  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [selectedKey, setSelectedKey] = useState('')
  const [jsonValue, setJsonValue] = useState('')
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'split'>('split')
  const [previewUrl, setPreviewUrl] = useState('https://asrvisuals.live')
  const [iframeKey, setIframeKey] = useState(0)

  const loadBlocks = async () => {
    try {
      const response = await api.get('/content')
      const data = response.data.data || []
      setBlocks(data)
      if (data.length && !selectedKey) {
        setSelectedKey(data[0].key)
        setJsonValue(JSON.stringify(data[0].data, null, 2))
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load content')
    }
  }

  useEffect(() => {
    loadBlocks()
  }, [])

  const handleSelect = (key: string) => {
    setSelectedKey(key)
    const block = blocks.find((item) => item.key === key)
    setJsonValue(JSON.stringify(block?.data || {}, null, 2))
  }

  const handleSave = async () => {
    try {
      const parsed = JSON.parse(jsonValue)
      await api.put(`/content/${selectedKey}`, { data: parsed })
      loadBlocks()
      setError('')
      // Refresh preview iframe after save
      setIframeKey(prev => prev + 1)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid JSON or save failed')
    }
  }

  const handleCreate = async () => {
    if (!selectedKey) return
    try {
      const parsed = JSON.parse(jsonValue)
      await api.put(`/content/${selectedKey}`, { data: parsed })
      loadBlocks()
      setError('')
      setIframeKey(prev => prev + 1)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Create failed')
    }
  }

  const refreshPreview = () => {
    setIframeKey(prev => prev + 1)
  }

  return (
    <div>
      <Topbar title="Content Blocks" />
      
      {/* View Mode Toggle */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
          <button 
            className={`button ${viewMode === 'edit' ? 'primary' : 'secondary'}`}
            onClick={() => setViewMode('edit')}
          >
            📝 Edit Only
          </button>
          <button 
            className={`button ${viewMode === 'split' ? 'primary' : 'secondary'}`}
            onClick={() => setViewMode('split')}
          >
            ⚡ Split View
          </button>
          <button 
            className={`button ${viewMode === 'preview' ? 'primary' : 'secondary'}`}
            onClick={() => setViewMode('preview')}
          >
            👁️ Preview Only
          </button>
        </div>
        {viewMode !== 'edit' && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              value={previewUrl}
              onChange={(e) => setPreviewUrl(e.target.value)}
              placeholder="https://asrvisuals.live"
              style={{ width: '300px', fontSize: '13px' }}
            />
            <button 
              className="button secondary"
              onClick={refreshPreview}
              title="Refresh preview"
            >
              🔄
            </button>
          </div>
        )}
      </div>

      {error && <div className="pill" style={{ marginBottom: '20px', background: '#fee', color: '#c00' }}>{error}</div>}
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: viewMode === 'preview' ? '1fr' : viewMode === 'split' ? '1fr 1fr' : '1fr',
        gap: '20px',
        height: 'calc(100vh - 200px)'
      }}>
        
        {/* Editor Section */}
        {viewMode !== 'preview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'auto' }}>
            <div className="card">
              <h3 style={{ marginTop: 0 }}>Content Keys</h3>
              <div className="grid">
                {blocks.map((block) => (
                  <button
                    key={block.key}
                    className={`button ${selectedKey === block.key ? 'primary' : 'secondary'}`}
                    onClick={() => handleSelect(block.key)}
                  >
                    {block.key}
                  </button>
                ))}
                <div className="grid">
                  <label>New Key</label>
                  <input
                    value={selectedKey}
                    onChange={(event) => setSelectedKey(event.target.value)}
                    placeholder="homepage.hero"
                  />
                  <button className="button secondary" onClick={handleCreate}>
                    Create / Update
                  </button>
                </div>
              </div>
            </div>
            
            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginTop: 0 }}>JSON Editor</h3>
              <textarea
                style={{ 
                  flex: 1, 
                  fontFamily: 'monospace', 
                  fontSize: '13px',
                  minHeight: '400px'
                }}
                value={jsonValue}
                onChange={(event) => setJsonValue(event.target.value)}
              />
              <button className="button primary" style={{ marginTop: '12px' }} onClick={handleSave}>
                💾 Save & Refresh Preview
              </button>
            </div>
          </div>
        )}

        {/* Preview Section */}
        {viewMode !== 'edit' && (
          <div className="card" style={{ 
            padding: 0, 
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ 
              padding: '12px 20px', 
              borderBottom: '1px solid #e6e6eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#fafafa'
            }}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>🌐 Live Preview</h3>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Right-click iframe → Inspect to edit styles
              </div>
            </div>
            <iframe 
              key={iframeKey}
              src={previewUrl}
              style={{ 
                width: '100%', 
                height: '100%', 
                border: 'none',
                flex: 1
              }}
              title="Website Preview"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ContentPage
