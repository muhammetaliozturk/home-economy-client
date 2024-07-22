export default [
  {
    path: '/new-puchase',
    name: 'new-purchase',
    component: () => import('@/views/purchases/purchase-list/Purchase.vue'),
  },
  {
    path: '/purchase-list',
    name: 'purchase-list',
    component: () => import('@/views/purchases/purchase-list/Purchase.vue'),
  },
]
