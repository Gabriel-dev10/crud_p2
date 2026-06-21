import axiosInstance from './axiosInstance'

const getUserFromResponse = (data) => {
  if (data.user) return data.user
  if (data.id || data.email) {
    return {
      id: data.id,
      name: data.name || data.nome,
      nome: data.nome || data.name,
      email: data.email,
    }
  }
  return null
}

const authService = {
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', { email, password })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(getUserFromResponse(response.data)))
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
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(getUserFromResponse(response.data)))
    }
    return response.data
  },
}

export default authService
