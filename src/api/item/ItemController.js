import { ItemStore } from 'src/store/item/constants'
import axios from 'axios'
import { AppConfigService } from 'src/backend/app-config/app-config-service'

const apiName = '/item'

export default {
  async [ItemStore.FIND_ALL] () {
    const endPoint = apiName + '/findAll'
    const url = AppConfigService.getServerUrl(endPoint)
    const result = await axios.get(url)
    return result.data
  },
  async [ItemStore.ADD] (item) {
    console.log('reached controller add')
    console.log(item)
    const endPoint = apiName + '/add'
    const url = AppConfigService.getServerUrl(endPoint)
    const result = await axios.post(url, item)
    return result.data
  },
  async [ItemStore.UPDATE] (item) {
    const endPoint = apiName + '/update'
    const url = AppConfigService.getServerUrl(endPoint)
    const result = await axios.post(url, item)
    return result.data
  }
}
