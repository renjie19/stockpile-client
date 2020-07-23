import { ItemStore } from 'src/store/item/constants'
import axios from 'axios'
import { ItemApi } from 'src/constants/api-item-constants'

export default {
  [ItemStore.FIND_ALL] ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        await axios.get(ItemApi.FIND_ALL).then(response => commit([ItemStore.SET_ITEMS], response.data))
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  [ItemStore.ADD] ({ commit }, item) {
    return new Promise(async (resolve, reject) => {
      try {
        await axios.post(ItemApi.ADD, item).then(response => commit([ItemStore.ADD], response.data))
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  },
  [ItemStore.UPDATE] ({ commit }, item) {
    return new Promise(async (resolve, reject) => {
      try {
        await axios.post(ItemApi.UPDATE, item).then(response => commit([ItemStore.UPDATE], response.data))
      } catch (e) {
        reject(e)
      }
    })
  }
}
