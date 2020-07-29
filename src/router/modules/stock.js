export default {
  path: '/stock',
  meta: { requiresAuth: true },
  components: {
    default: () => import('layouts/MainLayout.vue')
  },
  children: [
    {
      path: '',
      component: () => import('pages/StockManagement.vue'),
      meta: { title: 'Discounts' }
    }
  ]
}
