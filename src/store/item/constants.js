import { AppConfigService } from 'src/backend/app-config/app-config-service'

export const ItemStore = {
  MODULE_NAME: 'item',
  ITEMS: 'ITEMS',
  SET_ITEMS: 'SET_ITEMS',
  FIND_ALL: 'FIND_ALL',
  FIND_BY_ID: 'FIND_BY_ID',
  FIND_BY_KEYWORD: 'FIND_BY_KEYWORD',
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  URL: AppConfigService.getProperty('host') + ':' + AppConfigService.getProperty('port')
}
