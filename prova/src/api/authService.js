import axiosInstance from './axiosInstance'

const authService = {
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', { email, password })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },

  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData)
    return response.data
  },
}

export default authService
