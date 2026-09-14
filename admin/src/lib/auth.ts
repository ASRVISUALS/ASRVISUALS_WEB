const TOKEN_KEY = 'admin_token'
const USER_KEY = 'admin_user'

export type AdminUser = {
  id: string
  name: string
  email: string
  role: string
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export const setUser = (user: AdminUser) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const getUser = (): AdminUser | null => {
  const stored = localStorage.getItem(USER_KEY)
  return stored ? (JSON.parse(stored) as AdminUser) : null
}
