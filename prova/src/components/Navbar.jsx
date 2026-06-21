import { Link, useNavigate } from 'react-router-dom'
import authService from '../api/authService'
import { useState } from 'react'

function Navbar({ onLogout }) {
  const navigate = useNavigate()
  const user = authService.getCurrentUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    authService.logout()
    onLogout()
    navigate('/login')
  }

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-lg font-semibold text-slate-950">
              App
            </Link>
            <div className="hidden md:flex gap-1">
              <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
                Dashboard
              </Link>
              <Link to="/users" className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
                Usuários
              </Link>
              <Link to="/recursos" className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
                Recursos NoSQL
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-slate-500">{user?.name || user?.email}</span>
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
            >
              Sair
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-secondary md:hidden"
          >
            Menu
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-3 space-y-1">
            <Link to="/" className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
              Dashboard
            </Link>
            <Link to="/users" className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
              Usuários
            </Link>
            <Link to="/recursos" className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
              Recursos NoSQL
            </Link>
            <button
              onClick={handleLogout}
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-left text-sm font-medium text-slate-900 hover:bg-slate-100"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
