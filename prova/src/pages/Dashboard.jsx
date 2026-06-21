import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import authService from '../api/authService'
import usersService from '../api/usersService'
import resourcesService from '../api/resourcesService'

function Dashboard() {
  const user = authService.getCurrentUser()
  const [stats, setStats] = useState({ users: 0, resources: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [usersResponse, carrosResponse, motosResponse, marcasResponse] = await Promise.all([
        usersService.getAll().catch(() => []),
        resourcesService.getAll('carros').catch(() => []),
        resourcesService.getAll('motos').catch(() => []),
        resourcesService.getAll('marcas').catch(() => [])
      ])

      const resourcesCount = [carrosResponse, motosResponse, marcasResponse]
        .reduce((total, response) => total + (Array.isArray(response) ? response.length : 0), 0)
      
      setStats({
        users: Array.isArray(usersResponse) ? usersResponse.length : 0,
        resources: resourcesCount
      })
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="shell">
        <div className="mb-8">
          <h1 className="title">
            Bem-vindo, {user?.name || user?.email}!
          </h1>
          <p className="muted mt-2">
            Gestione seus dados através dessa plataforma
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-slate-950"></div>
            <p className="muted">Carregando...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link to="/users" className="card card-pad transition hover:border-slate-300 hover:shadow-md">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="muted mb-1">Total de</p>
                  <p className="text-lg font-medium text-slate-950">Usuários</p>
                </div>
                <div className="text-4xl font-semibold text-slate-950">
                  {stats.users}
                </div>
              </div>
            </Link>

            <Link to="/recursos" className="card card-pad transition hover:border-slate-300 hover:shadow-md">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="muted mb-1">Total de</p>
                  <p className="text-lg font-medium text-slate-950">Recursos NoSQL</p>
                </div>
                <div className="text-4xl font-semibold text-slate-950">
                  {stats.resources}
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="card card-pad">
          <h2 className="mb-4 text-lg font-semibold text-slate-950">Acesso Rápido</h2>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link to="/users" className="btn btn-secondary justify-start">
              Gerenciar Usuários
            </Link>
            <Link to="/recursos" className="btn btn-secondary justify-start">
              Gerenciar Carros, Motos e Marcas
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
