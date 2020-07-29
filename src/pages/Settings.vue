<template>
    <q-page padding>
      <q-card>
        <q-card-section class="text-h4">
          Settings
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="form.host"
            label="Server Host"
            @blur="$v.form.host.$touch"
            :error="$v.form.host.$error"
            :error-message="null"
          />
          <q-input
            v-model="form.port"
            label="Server Port"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="Submit"
            :loading="isLoading"
            @click="saveConfig"
          />
        </q-card-actions>
      </q-card>
    </q-page>
</template>

<script>
import { AppConfigService } from '../backend/app-config/app-config-service'
import { AppConfigConstants } from '../constants/app-config-constants'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Settings',
  data () {
    return {
      isLoading: false,
      form: {
        host: '',
        port: ''
      }
    }
  },
  async activated () {
    this.form.host = await AppConfigService.getProperty(AppConfigConstants.HOST)
    this.form.port = await AppConfigService.getProperty(AppConfigConstants.PORT)
  },
  methods: {
    saveConfig () {
      try {
        this.isLoading = true
        this.$v.form.$touch()
        if (this.$v.form.$error) {
          this.notifyError('Please check fields')
          return
        }
        // check connection
        AppConfigService.saveConfig({
          [AppConfigConstants.HOST]: this.form.host,
          [AppConfigConstants.PORT]: this.form.port
        })
        this.isLoading = false
        this.notifySuccess('Config Saved')
      } catch (e) {
        this.isLoading = false
        this.notifyError(e)
      }
    }
  },
  validations: {
    form: {
      host: { required },
      port: { required }
    }
  }
}
</script>

<style scoped>

</style>
