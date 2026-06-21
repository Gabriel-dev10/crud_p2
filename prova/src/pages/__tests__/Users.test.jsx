import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Users from '../Users'
import usersService from '../../api/usersService'

vi.mock('../../api/usersService', () => ({
  default: {
    getAll: vi.fn()
  }
}))

describe('Users', () => {
  it('lista usuários retornados pela API', async () => {
    usersService.getAll.mockResolvedValue([
      { id: 1, name: 'Maria', email: 'admin@email.com', role: 'admin' },
      { id: 2, name: 'Usuário', email: 'user@email.com', role: 'user' }
    ])

    render(<Users />)

    expect(await screen.findByText('Maria')).toBeInTheDocument()
    expect(screen.getByText('admin@email.com')).toBeInTheDocument()
    expect(screen.getByText('user@email.com')).toBeInTheDocument()
  })

  it('mostra estado vazio quando não há usuários', async () => {
    usersService.getAll.mockResolvedValue([])

    render(<Users />)

    expect(await screen.findByText('Nenhum usuário encontrado')).toBeInTheDocument()
  })
})
