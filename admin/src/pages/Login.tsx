import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../lib/api'
import { setToken, setUser } from '../lib/auth'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/auth/login', { email, password })
      const { data } = response.data

      if (data.role !== 'admin') {
        setError('Access denied. Admins only.')
        setLoading(false)
        return
      }

      setToken(data.token)
      setUser({ id: data.id, name: data.name, email: data.email, role: data.role })
      navigate('/admin/content')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1>Admin Sign In</h1>
        <p>Access content and operations updates.</p>
        <form onSubmit={handleSubmit} className="grid">
          <div className="grid">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@asrvisuals.com"
              required
            />
          </div>
          <div className="grid">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error ? <div className="pill">{error}</div> : null}
          <button className="button primary" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p style={{ marginTop: '16px' }}>
          Need to set up an admin? <Link to="/setup">Run setup</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
