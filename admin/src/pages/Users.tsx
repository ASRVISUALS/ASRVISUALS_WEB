import { useEffect, useState } from 'react'
import api from '../lib/api'
import Topbar from '../components/Topbar'

type User = {
  _id: string
  name: string
  email: string
  role: string
  createdAt: string
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    api.get('/users').then((res) => setUsers(res.data.data || [])).catch(() => setUsers([]))
  }, [])

  return (
    <div>
      <Topbar title="Users" />
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersPage
