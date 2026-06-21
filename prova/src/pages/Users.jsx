import { useEffect, useState } from 'react'
import usersService from '../api/usersService'
import Alert from '../components/Alert'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await usersService.getAll()
      setUsers(Array.isArray(data) ? data : [])
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || error.response?.data?.error || 'Erro ao carregar usuários'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await usersService.update(editingId, formData)
        setAlert({ type: 'success', message: 'Usuário atualizado com sucesso!' })
      } else {
        await usersService.create(formData)
        setAlert({ type: 'success', message: 'Usuário criado com sucesso!' })
      }
      resetForm()
      fetchUsers()
    } catch (error) {
      setAlert({ 
        type: 'error', 
        message: error.response?.data?.message || error.response?.data?.error || 'Erro ao salvar usuário'
      })
    }
  }

  const handleEdit = (user) => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      password: '',
      role: user.role || 'user'
    })
    setEditingId(user.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      try {
        await usersService.delete(id)
        setAlert({ type: 'success', message: 'Usuário deletado com sucesso!' })
        fetchUsers()
      } catch (error) {
        setAlert({ 
          type: 'error', 
          message: error.response?.data?.message || error.response?.data?.error || 'Erro ao deletar usuário'
        })
      }
    }
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', role: 'user' })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="page">
      <div className="shell">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="title">Usuários</h1>
            <p className="muted mt-1">Cadastre, edite e remova usuários do sistema.</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className={showForm ? 'btn btn-secondary' : 'btn btn-primary'}
          >
            {showForm ? 'Cancelar' : 'Novo Usuário'}
          </button>
        </div>

        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        {showForm && (
          <div className="card card-pad mb-8">
            <h2 className="mb-5 text-lg font-semibold text-slate-950">
              {editingId ? 'Editar Usuário' : 'Novo Usuário'}
            </h2>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="label" htmlFor="user-name">Nome</label>
                <input
                  id="user-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label" htmlFor="user-email">Email</label>
                <input
                  id="user-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label" htmlFor="user-password">Senha</label>
                <input
                  id="user-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={editingId ? 'Deixe em branco para manter a senha' : ''}
                  className="input"
                  required={!editingId}
                />
              </div>

              <div>
                <label className="label" htmlFor="user-role">Função</label>
                <select
                  id="user-role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="input"
                >
                  <option value="user">Usuário</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary md:col-span-2"
              >
                {editingId ? 'Atualizar' : 'Criar'}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-slate-950"></div>
            <p className="muted">Carregando...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-sm text-slate-500">Nenhum usuário encontrado</p>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">Função</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-950">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.role === 'admin' 
                            ? 'border border-slate-300 bg-slate-950 text-white'
                            : 'border border-slate-200 bg-white text-slate-700'
                        }`}>
                          {user.role === 'admin' ? 'Admin' : 'Usuário'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="btn btn-secondary h-9 px-3"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn btn-danger h-9 px-3"
                        >
                          Deletar
                        </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Users
