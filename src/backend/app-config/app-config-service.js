import os from 'os'
import fs from 'fs'
import { FileUtils } from '../file-utils'
import defaultConfig from '../../../app-config.default'

const CONFIG_FOLDER = `${os.homedir()}/stockpile`
const CONFIG_PATH = `${CONFIG_FOLDER}/config`

let appConfig = {}

export const AppConfigService = {
  init () {
    console.log('initializing app config...')
    this.initConfigFile()
    appConfig = this.readConfig()
  },
  initConfigFile () {
    FileUtils.mkdir(CONFIG_FOLDER)
    if (!fs.existsSync(CONFIG_PATH)) {
      fs.writeFileSync(CONFIG_PATH, this.getDefaultConfig())
    } else {
      addNonExistentKeyValuePairsInExistingConfig.call(this)
    }
  },
  getProperty (key) {
    console.log(appConfig)
    return appConfig[key]
  },
  readConfig () {
    const config = fs.readFileSync(CONFIG_PATH).toString()
    return JSON.parse(config)
  },
  saveConfig (newConfig) {
    const currentConfig = this.readConfig()
    Object.keys(newConfig).forEach(key => {
      currentConfig[key] = newConfig[key]
    })
    fs.writeFileSync(CONFIG_PATH, currentConfig)
    appConfig = this.readConfig()
  },
  decryptConfig (content) {
    if (process.env.DEV || process.env.NODE_ENV === 'test') {
      return content
    }
    return content
  },
  getDefaultConfig () {
    return JSON.stringify(defaultConfig, null, 2)
  }
}

function addNonExistentKeyValuePairsInExistingConfig () {
  const existingConfig = this.readConfig()
  Object.keys(defaultConfig).forEach(key => {
    const value = existingConfig[key]
    if (value === undefined) {
      console.log(existingConfig)

      existingConfig[key] = defaultConfig[key]
    }
  })
  fs.writeFileSync(CONFIG_PATH, existingConfig)
}
