import { describe, expect, it, vi } from 'vitest'
import usersService from '../usersService'
import axiosInstance from '../axiosInstance'

vi.mock('../axiosInstance', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

describe('usersService', () => {
  it('lista usuários', async () => {
    const users = [{ id: 1, name: 'Admin' }]
    axiosInstance.get.mockResolvedValue({ data: users })

    await expect(usersService.getAll()).resolves.toEqual(users)
    expect(axiosInstance.get).toHaveBeenCalledWith('/users')
  })

  it('cria, atualiza e remove usuário', async () => {
    const user = { name: 'Novo', email: 'novo@email.com', role: 'user' }
    axiosInstance.post.mockResolvedValue({ data: { id: 1, ...user } })
    axiosInstance.put.mockResolvedValue({ data: { id: 1, name: 'Editado' } })
    axiosInstance.delete.mockResolvedValue({ data: { success: true } })

    await usersService.create(user)
    await usersService.update(1, { name: 'Editado' })
    await usersService.delete(1)

    expect(axiosInstance.post).toHaveBeenCalledWith('/users', user)
    expect(axiosInstance.put).toHaveBeenCalledWith('/users/1', { name: 'Editado' })
    expect(axiosInstance.delete).toHaveBeenCalledWith('/users/1')
  })
})
