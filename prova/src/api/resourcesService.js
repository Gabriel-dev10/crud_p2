import axiosInstance from './axiosInstance'

const endpoints = {
  carros: '/carros',
  motos: '/motos',
  marcas: '/marcas',
}

const getEndpoint = (resource) => {
  const endpoint = endpoints[resource]
  if (!endpoint) {
    throw new Error(`Recurso inválido: ${resource}`)
  }
  return endpoint
}

const resourcesService = {
  getAll: async (resource) => {
    const response = await axiosInstance.get(getEndpoint(resource))
    return response.data
  },

  getById: async (resource, id) => {
    const response = await axiosInstance.get(`${getEndpoint(resource)}/${id}`)
    return response.data
  },

  create: async (resource, resourceData) => {
    const response = await axiosInstance.post(getEndpoint(resource), resourceData)
    return response.data
  },

  update: async (resource, id, resourceData) => {
    const response = await axiosInstance.put(`${getEndpoint(resource)}/${id}`, resourceData)
    return response.data
  },

  delete: async (resource, id) => {
    const response = await axiosInstance.delete(`${getEndpoint(resource)}/${id}`)
    return response.data
  },
}

export default resourcesService
