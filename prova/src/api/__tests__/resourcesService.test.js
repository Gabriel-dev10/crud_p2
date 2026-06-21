import { describe, expect, it, vi } from 'vitest'
import resourcesService from '../resourcesService'
import axiosInstance from '../axiosInstance'

vi.mock('../axiosInstance', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

describe('resourcesService', () => {
  it('lista carros', async () => {
    const carros = [{ id: 1, modelo: 'Civic' }]
    axiosInstance.get.mockResolvedValue({ data: carros })

    await expect(resourcesService.getAll('carros')).resolves.toEqual(carros)
    expect(axiosInstance.get).toHaveBeenCalledWith('/carros')
  })

  it('cria, atualiza e remove moto', async () => {
    const moto = { modelo: 'CG 160', marca: 'Honda', cilindrada: 160 }
    axiosInstance.post.mockResolvedValue({ data: { id: 1, ...moto } })
    axiosInstance.put.mockResolvedValue({ data: { id: 1, modelo: 'Editada' } })
    axiosInstance.delete.mockResolvedValue({ data: { success: true } })

    await resourcesService.create('motos', moto)
    await resourcesService.update('motos', 1, { modelo: 'Editada' })
    await resourcesService.delete('motos', 1)

    expect(axiosInstance.post).toHaveBeenCalledWith('/motos', moto)
    expect(axiosInstance.put).toHaveBeenCalledWith('/motos/1', { modelo: 'Editada' })
    expect(axiosInstance.delete).toHaveBeenCalledWith('/motos/1')
  })
})
