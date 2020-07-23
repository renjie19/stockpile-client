import { ItemStore } from 'src/store/item/constants'

export default {
  [ItemStore.SET_ITEMS] (state, items) {
    state([ItemStore.ITEMS], items)
  },
  [ItemStore.ADD] (state, item) {
    state[ItemStore.ITEMS].push(item)
  },
  [ItemStore.UPDATE] (state, item) {
    const itemFromStore = state[ItemStore.ITEMS].find(i => i.id === item.id)
    if (itemFromStore) {
      let selectedItem = itemFromStore
      selectedItem.name = item.name
      selectedItem.brand = item.brand
      selectedItem.capital = item.capital
      selectedItem.retail = item.retail
      selectedItem.wholeSale = item.wholeSale
    }
  }
}
