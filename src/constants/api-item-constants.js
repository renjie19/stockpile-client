import { ItemStore } from 'src/store/item/constants'

export const ItemApi = {
  API: ItemStore.URL + '/item',
  ADD: this.API + '/add',
  UPDATE: this.API + '/update',
  FIND_ALL: this.API + '/findAll',
  FIND_BY_ID: this.API + '/findById',
  FIND_BY_KEYWORD: this.API + '/findByKeyWord'
}
