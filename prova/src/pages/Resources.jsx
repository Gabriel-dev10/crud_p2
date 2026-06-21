import { useEffect, useMemo, useState } from 'react'
import resourcesService from '../api/resourcesService'
import Alert from '../components/Alert'

const resourceConfig = {
  carros: {
    label: 'Carros',
    singular: 'Carro',
    empty: 'Nenhum carro encontrado',
    fields: [
      { name: 'modelo', label: 'Modelo', type: 'text', required: true },
      { name: 'marca', label: 'Marca', type: 'text', required: true },
      { name: 'ano', label: 'Ano', type: 'number', required: true },
      { name: 'cor', label: 'Cor', type: 'text' },
    ],
    details: [
      { label: 'Marca', value: (item) => item.marca },
      { label: 'Ano', value: (item) => item.ano },
      { label: 'Cor', value: (item) => item.cor || '-' },
    ],
    title: (item) => item.modelo,
  },
  motos: {
    label: 'Motos',
    singular: 'Moto',
    empty: 'Nenhuma moto encontrada',
    fields: [
      { name: 'modelo', label: 'Modelo', type: 'text', required: true },
      { name: 'marca', label: 'Marca', type: 'text', required: true },
      { name: 'cilindrada', label: 'Cilindrada', type: 'number', required: true },
    ],
    details: [
      { label: 'Marca', value: (item) => item.marca },
      { label: 'Cilindrada', value: (item) => `${item.cilindrada} cc` },
    ],
    title: (item) => item.modelo,
  },
  marcas: {
    label: 'Marcas de roupa',
    singular: 'Marca',
    empty: 'Nenhuma marca de roupa encontrada',
    fields: [
      { name: 'nome', label: 'Nome', type: 'text', required: true },
      { name: 'fundador', label: 'Fundador', type: 'text' },
      { name: 'anoFundacao', label: 'Ano de fundação', type: 'number' },
    ],
    details: [
      { label: 'Fundador', value: (item) => item.fundador || '-' },
      { label: 'Ano de fundação', value: (item) => item.anoFundacao || '-' },
    ],
    title: (item) => item.nome,
  },
}

const getInitialFormData = (fields) =>
  fields.reduce((values, field) => ({
    ...values,
    [field.name]: field.type === 'number' ? '' : '',
  }), {})

const normalizeFormData = (fields, formData) =>
  fields.reduce((values, field) => {
    const value = formData[field.name]
    if (field.type === 'number') {
      return value === '' ? values : { ...values, [field.name]: Number(value) }
    }
    return { ...values, [field.name]: value }
  }, {})

function Resources() {
  const [activeResource, setActiveResource] = useState('carros')
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const config = resourceConfig[activeResource]
  const initialFormData = useMemo(() => getInitialFormData(config.fields), [config])
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    setFormData(initialFormData)
    setEditingId(null)
    setShowForm(false)
    fetchResources(activeResource)
  }, [activeResource, initialFormData])

  const fetchResources = async (resource = activeResource) => {
    try {
      setLoading(true)
      const data = await resourcesService.getAll(resource)
      setResources(Array.isArray(data) ? data : [])
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || error.response?.data?.error || `Erro ao carregar ${config.label.toLowerCase()}`
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = normalizeFormData(config.fields, formData)

    try {
      if (editingId) {
        await resourcesService.update(activeResource, editingId, payload)
        setAlert({ type: 'success', message: `${config.singular} atualizado com sucesso!` })
      } else {
        await resourcesService.create(activeResource, payload)
        setAlert({ type: 'success', message: `${config.singular} cadastrado com sucesso!` })
      }
      resetForm()
      fetchResources()
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || error.response?.data?.error || `Erro ao salvar ${config.singular.toLowerCase()}`
      })
    }
  }

  const handleEdit = (item) => {
    const nextFormData = config.fields.reduce((values, field) => ({
      ...values,
      [field.name]: item[field.name] ?? '',
    }), {})

    setFormData(nextFormData)
    setEditingId(item._id || item.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja remover este ${config.singular.toLowerCase()}?`)) {
      try {
        await resourcesService.delete(activeResource, id)
        setAlert({ type: 'success', message: `${config.singular} removido com sucesso!` })
        fetchResources()
      } catch (error) {
        setAlert({
          type: 'error',
          message: error.response?.data?.message || error.response?.data?.error || `Erro ao remover ${config.singular.toLowerCase()}`
        })
      }
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="page">
      <div className="shell">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="title">Recursos NoSQL</h1>
            <p className="muted mt-1">Gerencie carros, motos e marcas de roupa.</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className={showForm ? 'btn btn-secondary' : 'btn btn-primary'}
          >
            {showForm ? 'Cancelar' : `Novo ${config.singular}`}
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {Object.entries(resourceConfig).map(([resource, itemConfig]) => (
            <button
              key={resource}
              onClick={() => setActiveResource(resource)}
              className={activeResource === resource ? 'btn btn-primary' : 'btn btn-secondary'}
            >
              {itemConfig.label}
            </button>
          ))}
        </div>

        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        {showForm && (
          <div className="card card-pad mb-8">
            <h2 className="mb-5 text-lg font-semibold text-slate-950">
              {editingId ? `Editar ${config.singular}` : `Novo ${config.singular}`}
            </h2>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              {config.fields.map((field) => (
                <div key={field.name}>
                  <label className="label" htmlFor={`resource-${field.name}`}>{field.label}</label>
                  <input
                    id={`resource-${field.name}`}
                    type={field.type}
                    value={formData[field.name]}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    className="input"
                    required={field.required}
                  />
                </div>
              ))}

              <button type="submit" className="btn btn-primary md:col-span-2">
                {editingId ? 'Atualizar' : 'Cadastrar'}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-slate-950"></div>
            <p className="muted">Carregando...</p>
          </div>
        ) : resources.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-sm text-slate-500">{config.empty}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((item) => {
              const itemId = item._id || item.id

              return (
                <div key={itemId} className="card card-pad transition hover:border-slate-300 hover:shadow-md">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-950">{config.title(item)}</h3>
                    <p className="mt-2 text-sm text-slate-500">{config.singular}</p>
                  </div>
                  <div className="mb-5 grid grid-cols-1 gap-3 text-sm">
                    {config.details.map((detail) => (
                      <div key={detail.label} className="rounded-md border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">{detail.label}</p>
                        <p className="mt-1 font-medium text-slate-950">{detail.value(item)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item)} className="btn btn-secondary flex-1">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(itemId)} className="btn btn-danger flex-1">
                      Remover
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Resources
