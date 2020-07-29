import os from 'os'
import fs from 'fs'
import { FileUtils } from '../file-utils'
import defaultConfig from '../../../app-config.default'
import { AppConfigConstants } from 'src/constants/app-config-constants'

const CONFIG_FOLDER = `${os.homedir()}/stockpile`
const CONFIG_PATH = `${CONFIG_FOLDER}/config`

let appConfig = {}

export const AppConfigService = {
  init () {
    console.log('initializing app config...')
    this.initConfigFile()
    appConfig = JSON.parse(this.readConfig())
  },
  initConfigFile () {
    FileUtils.mkdir(CONFIG_FOLDER)
    if (!fs.existsSync(CONFIG_PATH)) {
      fs.writeFileSync(CONFIG_PATH, this.getDefaultConfig())
    } else {
      addNonExistentKeyValuePairsInExistingConfig.call(this)
    }
  },
  getServerUrl (restEndPoint) {
    return appConfig[AppConfigConstants.HOST] + ':' + appConfig[AppConfigConstants.PORT] + restEndPoint
  },
  getProperty (key) {
    return appConfig[key]
  },
  readConfig () {
    const config = fs.readFileSync(CONFIG_PATH).toString()
    return JSON.parse(JSON.stringify(config, null, 2))
  },
  saveConfig (newConfig) {
    const currentConfig = this.readConfig()
    Object.keys(newConfig).forEach(key => {
      currentConfig[key] = newConfig[key]
    })
    fs.writeFileSync(CONFIG_PATH, currentConfig)
    appConfig = this.readConfig()
  },
  getDefaultConfig () {
    return JSON.stringify(defaultConfig, null, 2)
  }
}

function addNonExistentKeyValuePairsInExistingConfig () {
  const existingConfig = this.readConfig()
  const defaultConfig = this.getDefaultConfig()
  Object.keys(defaultConfig).forEach(key => {
    const value = existingConfig[key]
    if (value === undefined) {
      existingConfig[key] = defaultConfig[key]
    }
  })
  fs.writeFileSync(CONFIG_PATH, existingConfig)
}
