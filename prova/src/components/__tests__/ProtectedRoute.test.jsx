import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'

function renderRoute(isAuthenticated) {
  render(
    <MemoryRouter initialEntries={['/protegida']}>
      <Routes>
        <Route
          path="/protegida"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <p>Conteúdo protegido</p>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<p>Tela de login</p>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ProtectedRoute', () => {
  it('exibe conteúdo quando autenticado', () => {
    renderRoute(true)
    expect(screen.getByText('Conteúdo protegido')).toBeInTheDocument()
  })

  it('redireciona para login quando não autenticado', () => {
    renderRoute(false)
    expect(screen.getByText('Tela de login')).toBeInTheDocument()
  })
})
