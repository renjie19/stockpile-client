<template>
  <q-layout view="hHh Lpr lFf">
    <app-toolbar/>
    <q-drawer
      v-model="open"
      content-class="bg-white"
      :width="215"
      :breakpoint="500"
      :mini="miniState"
      mini-to-overlay
      elevated
    >
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-btn
              flat
              dense
              round
              icon="menu"
              @click="miniState = !miniState"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-bold brand-font" style="font-size: 24px;">StockPile</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-for="i in getDefaultItems"
                v-bind:key="i.label"
                :to="i.route"
                :exact="i.exact"
                clickable>
          <q-item-section avatar>
            <q-icon :name="i.icon">
            </q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ i.label }}</q-item-label>
          </q-item-section>
        </q-item>
        <div class="absolute-bottom">
          <q-item
            to="/setting"
            exact
            clickable
          >
            <q-item-section avatar>
              <q-icon name="las la-cog"/>
            </q-item-section>
            <q-item-section>
              Settings
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import AppToolbar from '../components/AppToolBar'

export default {
  name: 'MainLayout',
  components: { AppToolbar },
  data () {
    return {
      open: true,
      miniState: true
    }
  },
  computed: {
    getDefaultItems () {
      return [
        { route: '/', icon: 'las la-home', label: 'Home', exact: true },
        { route: '/stock', icon: 'las la-box-open', label: 'Stocks' }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="sass">
  .q-router-link--active
    border-right: 3px solid $primary
</style>
