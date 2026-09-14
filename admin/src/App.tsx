import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { getToken } from './lib/auth'
import LoginPage from './pages/Login'
import SetupPage from './pages/Setup'
import DashboardLayout from './pages/DashboardLayout'
import ContactsPage from './pages/Contacts'
import BookingsPage from './pages/Bookings'
import UsersPage from './pages/Users'
import BlogPage from './pages/Blog'
import ContentPage from './pages/Content'
import PagesPage from './pages/Pages'

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const token = getToken()
  return token ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/pages" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/setup" element={<SetupPage />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route path="pages" element={<PagesPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="content" element={<ContentPage />} />
          <Route index element={<Navigate to="pages" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
