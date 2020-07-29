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
      form: {
        host: '',
        port: ''
      }
    }
  },
  async created () {
    this.form.host = await AppConfigService.getProperty(AppConfigConstants.HOST)
    this.form.port = await AppConfigService.getProperty(AppConfigConstants.PORT)
  },
  methods: {
    saveConfig () {
      // check connection
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
