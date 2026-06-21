import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../api/authService'
import Alert from '../components/Alert'

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setAlert(null)

    try {
      await authService.login(email, password)
      setAlert({ type: 'success', message: 'Login realizado com sucesso!' })
      onLoginSuccess()
      setTimeout(() => navigate('/'), 1000)
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-slate-950">Acesso</h1>
          <p className="mt-2 text-sm text-slate-500">
            Entre com suas credenciais para continuar
          </p>
        </div>

        <div className="card card-pad">
          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="label" htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Sua senha"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="mt-5 rounded-md bg-slate-100 px-3 py-2 text-center text-xs text-slate-600">
            Credenciais de teste: admin@email.com / senha123
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
