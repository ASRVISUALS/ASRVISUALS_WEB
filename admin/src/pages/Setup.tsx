import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'
import { setToken, setUser } from '../lib/auth'

const SetupPage = () => {
  const navigate = useNavigate()
  const [setupKey, setSetupKey] = useState('')
  const [name, setName] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post(
        '/auth/setup-admin',
        { name, email, password },
        { headers: { 'X-Admin-Setup-Key': setupKey } }
      )
      const { data } = response.data
      setToken(data.token)
      setUser({ id: data.id, name: data.name, email: data.email, role: data.role })
      navigate('/admin/content')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Setup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1>Admin Setup</h1>
        <p>Create the first admin using the setup key.</p>
        <form onSubmit={handleSubmit} className="grid">
          <div className="grid">
            <label>Setup key</label>
            <input
              type="password"
              value={setupKey}
              onChange={(event) => setSetupKey(event.target.value)}
              placeholder="Enter ADMIN_SETUP_KEY"
              required
            />
          </div>
          <div className="grid">
            <label>Name</label>
            <input value={name} onChange={(event) => setName(event.target.value)} required />
          </div>
          <div className="grid">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="grid">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error ? <div className="pill">{error}</div> : null}
          <button className="button primary" type="submit" disabled={loading}>
            {loading ? 'Creating admin...' : 'Create admin'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SetupPage
