<template>
  <q-page padding>
    <q-card>
      <q-card-section class="row q-ma-sm">
        <div class="col text-h4 ">
          Stock Management
        </div>
        <q-btn
          color="primary"
          label="Add Stock"
          @click="showItemDialog"
        />
      </q-card-section>
      <q-table
        title= "Stocked Items"
        :data= "getItems"
        :columns= "column"
        row-key="id"
        :filter="filter"
        @row-click="showDialogOnSelectedItem"
      >
        <template v-slot:top-right>
          <q-input style="width: 350px"
                   debounce="300"
                   v-model="filter"
                   placeholder="Search"
                   dense>
            <template v-slot:append>
              <q-icon name="las la-search"/>
            </template>
          </q-input>
        </template>
      </q-table>
    </q-card>
    <item-dialog/>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { ItemStore } from '../store/item/constants'
import { EventBus, events } from '../boot/bus-event'
import ItemDialog from '../components/ItemDialog'

export default {
  name: 'StockManagement',
  components: {
    ItemDialog
  },
  computed: {
    ...mapState(ItemStore.MODULE_NAME, {
      items: ItemStore.ITEMS
    }),
    getItems () {
      return this.items
    }
  },
  data () {
    return {
      filter: '',
      column: [
        {
          name: 'name',
          required: true,
          label: 'Item Name',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'brand',
          required: true,
          label: 'Brand',
          align: 'left',
          field: 'brand',
          sortable: true
        },
        {
          name: 'capital',
          required: true,
          label: 'Capital Price',
          align: 'left',
          field: 'capital',
          sortable: true
        },
        {
          name: 'retail',
          required: true,
          label: 'Retail Price',
          align: 'left',
          field: 'retail',
          sortable: true
        },
        {
          name: 'wholeSale',
          required: true,
          label: 'WholeSale Price',
          align: 'left',
          field: 'wholeSale',
          sortable: true
        }
      ]
    }
  },
  async activated () {
    try {
      await this[ItemStore.FIND_ALL]()
    } catch (e) {
      this.notifyError(e)
    }
  },

  methods: {
    ...mapActions(ItemStore.MODULE_NAME, [ItemStore.FIND_ALL]),
    showDialogOnSelectedItem (event, row) {
      EventBus.$emit(events.ON_ITEM_VIEW, row)
    },
    showItemDialog () {
      EventBus.$emit(events.ON_ITEM_VIEW)
    }
  }
}
</script>

<style scoped>

</style>
