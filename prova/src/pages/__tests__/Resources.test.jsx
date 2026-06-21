import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Resources from '../Resources'
import resourcesService from '../../api/resourcesService'

vi.mock('../../api/resourcesService', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  }
}))

describe('Resources', () => {
  it('lista carros retornados pela API', async () => {
    resourcesService.getAll.mockResolvedValue([
      { id: 1, modelo: 'Civic', marca: 'Honda', ano: 2020, cor: 'Prata' }
    ])

    render(<Resources />)

    expect(await screen.findByText('Civic')).toBeInTheDocument()
    expect(screen.getByText('Honda')).toBeInTheDocument()
    expect(screen.getByText('2020')).toBeInTheDocument()
  })

  it('mostra estado vazio quando não há carros', async () => {
    resourcesService.getAll.mockResolvedValue([])

    render(<Resources />)

    expect(await screen.findByText('Nenhum carro encontrado')).toBeInTheDocument()
  })
})
