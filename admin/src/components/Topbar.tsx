import { useNavigate } from 'react-router-dom'
import { clearToken, getUser } from '../lib/auth'

const Topbar = ({ title }: { title: string }) => {
  const navigate = useNavigate()
  const user = getUser()

  const handleLogout = () => {
    clearToken()
    navigate('/login')
  }

  return (
    <div className="topbar">
      <h1 className="page-title">{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span className="pill">{user?.email || 'Admin'}</span>
        <button className="button secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Topbar
