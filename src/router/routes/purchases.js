export default [
  {
    path: '/add-multiple-purchase',
    name: 'add-multiple-purchase',
    component: () => import('@/views/purchases/add-multiple-purchase/MultiplePurchase.vue'),
  },
  {
    path: '/purchase-list',
    name: 'purchase-list',
    component: () => import('@/views/purchases/purchase-list/Purchase.vue'),
  },
]
