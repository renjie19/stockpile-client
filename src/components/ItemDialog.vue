<template>
  <q-dialog v-model="open"
            @hide="onHide"
            persistent>
    <q-card style="width: 800px">
      <q-bar class="text-white bg-primary q-py-lg">
        <template>
          {{form.id ? 'Update ' : 'Create '}} Item
          <q-space/>
          <q-btn
            icon="las la-times"
            flat
            v-close-popup/>
        </template>
      </q-bar>
      <q-card-section>
        <q-input
          v-model="form.name"
          label="Item Name *"
          stack-label
          @blur="$v.form.name.$touch"
          :error="$v.form.name.$error"
          :error-message="getNameErrorMessage"/>
        <q-input
          v-model="form.brand"
          label="Brand (Optional)"
          stack-label
        />
        <q-input
          v-model.number="form.capital"
          type="number"
          label="Capital Price (Php) *"
          stack-label
          @blur="$v.form.capital.$touch"
          :error="$v.form.capital.$error"
          :error-message="getCapitalErrorMessage"
        />
        <q-input
          v-model.number="form.retail"
          type="number"
          label="Retail Price (Php) *"
          stack-label
          @blur="$v.form.retail.$touch"
          :error="$v.form.retail.$error"
          :error-message="getRetailErrorMessage"
        />
        <q-input
          v-model.number="form.wholeSale"
          type="number"
          label="Wholesale Price (Php) *"
          stack-label
          @blur="$v.form.wholeSale.$touch"
          :error="$v.form.wholeSale.$error"
          :error-message="getWholeSaleErrorMessage"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          :loading="isLoading"
          flat
          label="Cancel"
          v-close-popup/>
        <q-btn
          :loading="isLoading"
          color="positive"
          label="Submit"
          @click="submit"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { ItemStore } from '../store/item/constants'
import { EventBus, events } from '../boot/bus-event'
import { required, decimal, minValue } from 'vuelidate/lib/validators'

export default {
  name: 'ItemDialog',
  data () {
    return {
      isLoading: false,
      open: false,
      form: {
        id: '',
        createdBy: '',
        dateCreated: '',
        modifiedBy: '',
        name: null,
        brand: '',
        capital: '',
        retail: '',
        wholeSale: ''
      }
    }
  },
  computed: {
    getNameErrorMessage () {
      let message = ''
      if (!this.$v.form.name.required) {
        message = 'Name required'
      }
      return message
    },
    getCapitalErrorMessage () {
      let message = ''
      if (!this.$v.form.capital.required) {
        message = 'Price required'
      } else if (!this.$v.form.capital.integer) {
        message = 'Value should be a number and is greater than 0'
      }
      return message
    },
    getRetailErrorMessage () {
      let message = ''
      if (!this.$v.form.retail.required) {
        message = 'Price required'
      } else if (!this.$v.form.retail.integer) {
        message = 'Value should be a number and is greater than 0'
      }
      return message
    },
    getWholeSaleErrorMessage () {
      let message = ''
      if (!this.$v.form.wholeSale.required) {
        message = 'Price required'
      } else if (!this.$v.form.wholeSale.integer) {
        message = 'Value should be a number and is greater than 0'
      }
      return message
    }
  },
  validations: {
    form: {
      name: { required },
      capital: { required, decimal, minValue: minValue(1) },
      retail: { required, decimal, minValue: minValue(1) },
      wholeSale: { required, decimal, minValue: minValue(1) }
    }
  },
  methods: {
    ...mapActions(ItemStore.MODULE_NAME, [ItemStore.ADD, ItemStore.UPDATE]),
    onHide () {
      this.$v.$reset()
    },
    async submit () {
      try {
        this.$v.form.$touch()
        this.isLoading = true
        if (this.$v.form.$error) {
          this.notifyError('Please review fields')
          return
        }
        if (this.form.id) {
          await this[ItemStore.UPDATE](this.form)
          this.notifySuccess('Item Updated')
          this.open = false
        } else {
          this.notifySuccess('Item Created')
          await this[ItemStore.ADD](this.form)
          this.clearFields()
        }
        this.isLoading = false
        this.$v.$reset()
      } catch (e) {
        this.isLoading = false
        this.notifyError(e)
      }
    },
    clearFields () {
      this.form = {
        id: '',
        createdBy: '',
        dateCreated: '',
        modifiedBy: '',
        name: '',
        brand: '',
        capital: '',
        retail: '',
        wholeSale: ''
      }
    }
  },
  async created () {
    EventBus.$on(events.ON_ITEM_VIEW, item => {
      this.open = true
      if (item) {
        this.form.id = item.id
        this.form.createdBy = item.createdBy
        this.form.modifiedBy = item.modifiedBy
        this.form.dateCreated = item.dateCreated
        this.form.name = item.name
        this.form.brand = item.brand
        this.form.capital = item.capital
        this.form.retail = item.retail
        this.form.wholeSale = item.wholeSale
      } else {
        this.form.id = ''
        this.form.createdBy = 'admin'
        this.form.modifiedBy = ''
        this.form.dateCreated = Date.now()
        this.form.name = ''
        this.form.brand = ''
        this.form.capital = 0
        this.form.retail = 0
        this.form.wholeSale = 0
      }
    })
  },
  beforeDestroy () {
    EventBus.$off(events.ON_ITEM_VIEW)
  }
}
</script>

<style scoped>

</style>
