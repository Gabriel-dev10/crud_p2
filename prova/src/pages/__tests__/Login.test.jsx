import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from '../Login'
import authService from '../../api/authService'

vi.mock('../../api/authService', () => ({
  default: {
    login: vi.fn()
  }
}))

describe('Login', () => {
  it('envia email e senha para autenticação', async () => {
    const onLoginSuccess = vi.fn()
    authService.login.mockResolvedValue({ token: 'token-teste' })

    render(
      <MemoryRouter>
        <Login onLoginSuccess={onLoginSuccess} />
      </MemoryRouter>
    )

    await userEvent.type(screen.getByLabelText('Email'), 'admin@email.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'senha123')
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith('admin@email.com', 'senha123')
      expect(onLoginSuccess).toHaveBeenCalled()
    })
  })

  it('mostra mensagem de erro quando login falha', async () => {
    authService.login.mockRejectedValue({
      response: { data: { message: 'Credenciais inválidas' } }
    })

    render(
      <MemoryRouter>
        <Login onLoginSuccess={vi.fn()} />
      </MemoryRouter>
    )

    await userEvent.type(screen.getByLabelText('Email'), 'admin@email.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'errada')
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(await screen.findByText('Credenciais inválidas')).toBeInTheDocument()
  })
})
