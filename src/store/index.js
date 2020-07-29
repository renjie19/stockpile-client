import Vue from 'vue'
import Vuex from 'vuex'
import item from '../store/item'

// import example from './module-example'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  return new Vuex.Store({
    modules: {
      item
    }
  })
}
