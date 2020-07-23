import fs from 'fs'

export const FileUtils = {
  mkdir (path) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }
  }
}
