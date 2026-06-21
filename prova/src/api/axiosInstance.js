import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const isAuthEndpoint = (url = '') => url.includes('/auth/login') || url.includes('/auth/register')

const clearSessionAndRedirect = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  if (window.location.pathname !== '/login') {
    window.location.href = '/login'
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else if (!isAuthEndpoint(config.url)) {
      clearSessionAndRedirect()
      return Promise.reject({
        isAuthError: true,
        response: {
          status: 401,
          data: { message: 'Sessão expirada. Faça login novamente.' },
        },
      })
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRequest = isAuthEndpoint(error.config?.url)

    if (error.response?.status === 401 && !isAuthRequest) {
      clearSessionAndRedirect()
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
