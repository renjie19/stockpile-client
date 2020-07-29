import { ItemStore } from 'src/store/item/constants'

export default {
  [ItemStore.FIND_BY_ID]: state => {
    return id => {
      return state[ItemStore.ITEMS].find(i => i.id === id)
    }
  },
  [ItemStore.FIND_BY_KEYWORD]: state => {
    return keyword => {
      return state[ItemStore.ITEMS].find(i => (i.name + ' ' + i.brand).toLowerCase().includes(keyword.toLowerCase()))
    }
  }
}
