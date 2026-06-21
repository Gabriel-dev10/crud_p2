import { describe, expect, it, vi } from 'vitest'
import authService from '../authService'
import axiosInstance from '../axiosInstance'

vi.mock('../axiosInstance', () => ({
  default: {
    post: vi.fn()
  }
}))

describe('authService', () => {
  it('salva token e usuário ao fazer login', async () => {
    axiosInstance.post.mockResolvedValue({
      data: {
        token: 'token-teste',
        user: { id: 1, name: 'Admin', email: 'admin@email.com' }
      }
    })

    const result = await authService.login('admin@email.com', 'senha123')

    expect(axiosInstance.post).toHaveBeenCalledWith('/auth/login', {
      email: 'admin@email.com',
      password: 'senha123'
    })
    expect(result.token).toBe('token-teste')
    expect(localStorage.getItem('token')).toBe('token-teste')
    expect(authService.getCurrentUser()).toEqual({
      id: 1,
      name: 'Admin',
      email: 'admin@email.com'
    })
  })

  it('remove dados ao fazer logout', () => {
    localStorage.setItem('token', 'token-teste')
    localStorage.setItem('user', JSON.stringify({ id: 1 }))

    authService.logout()

    expect(localStorage.getItem('token')).toBeNull()
    expect(localStorage.getItem('user')).toBeNull()
    expect(authService.isAuthenticated()).toBe(false)
  })
})
