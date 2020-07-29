<template>
  <q-header elevated>
    <q-bar class="q-electron-drag" style="padding-right: 0;">
      <div>StockPile v{{ appVersion }}</div>
      <q-space/>
      <q-btn flat icon="minimize" @click="minimize"/>
      <q-btn flat icon="crop_square" @click="maximize"/>
      <q-btn class="closeButton" flat icon="close" @click="closeApp"/>
    </q-bar>
  </q-header>
</template>
<script>
import { AppConfigService } from '../backend/app-config/app-config-service'

export default {
  name: 'AppToolbar',
  data () {
    return {
      appVersion: AppConfigService.getProperty('version')
    }
  },
  methods: {
    minimize () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },

    maximize () {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

        if (win.isMaximized()) {
          win.unmaximize()
        } else {
          win.maximize()
        }
      }
    },
    closeApp () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    }
  }
}
</script>

<style lang="sass">
  .closeButton
    &:hover
      background-color: $negative

    &:active
      background-color: $negative

</style>
