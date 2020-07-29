import { ItemStore } from 'src/store/item/constants'
import ItemController from 'src/api/item/ItemController'

export default {
  async [ItemStore.FIND_ALL] ({ commit }) {
    const results = await ItemController[ItemStore.FIND_ALL]()
    commit(ItemStore.SET_ITEMS, results)
    return results
  },
  async [ItemStore.ADD] ({ commit }, item) {
    const result = await ItemController[ItemStore.ADD](item)
    commit(ItemStore.ADD, result)
    return result
  },
  async [ItemStore.UPDATE] ({ commit, state }, item) {
    const result = await ItemController[ItemStore.UPDATE](item)
    commit(ItemStore.UPDATE, result)
    return result
  }
}
