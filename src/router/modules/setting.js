export default {
  path: '/setting',
  meta: { requiresAuth: true },
  components: {
    default: () => import('layouts/MainLayout.vue')
  },
  children: [
    {
      path: '',
      component: () => import('pages/Settings.vue'),
      meta: { title: 'Discounts' }
    }
  ]
}
