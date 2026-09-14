import { useEffect, useState } from 'react'
import api from '../lib/api'
import Topbar from '../components/Topbar'

type Contact = {
  _id: string
  name: string
  email: string
  subject?: string
  message: string
  status: string
  createdAt: string
}

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => {
    api.get('/contact').then((res) => setContacts(res.data.data || [])).catch(() => setContacts([]))
  }, [])

  return (
    <div>
      <Topbar title="Contact Requests" />
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.status}</td>
                <td>{contact.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ContactsPage
