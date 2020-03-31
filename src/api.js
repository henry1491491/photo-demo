import axios from 'axios'
import store from './store'

const albumRequest = axios.create({
  baseURL: 'https://emma.pixnet.cc/album/'
})

class NewData {
  constructor (data) {
    this.params = { user: 'jiney' }
    if (data !== undefined) {
      Object.assign(this.params, data.params)
    }
  }
}

export const apiAlbumSets = data => {
  const newData = new NewData(data)
  return albumRequest.get('sets', newData)
}

export const apiAlbumElements = data => {
  const newData = new NewData(data)
  return albumRequest.get('elements', newData)
}

export const apiAlbumElementsWithId = data => {
  const newData = new NewData(data)
  return albumRequest.get(`/elements/${data.id}`, newData)
}

albumRequest.interceptors.request.use(
  function (config) {
    store.dispatch('setLoading', true)
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

albumRequest.interceptors.response.use(
  function (response) {
    store.dispatch('setLoading', false)
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
