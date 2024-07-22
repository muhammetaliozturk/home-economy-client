<template>
    <b-row>
      <b-col cols="12">
        <purchase-list v-if="!isAddClicked"/>
        <!-- <transmitter-wizard v-if="isAddClicked"/> -->
      </b-col>
    </b-row>
  </template>
  
  <script>
  import { BRow, BCol } from 'bootstrap-vue'
  import store from '@/store/index'
  import PurchaseList from './PurchaseList.vue'
  // import PurchaseWizard from './PurchaseWizard.vue'
  
  export default {
    components: {
      BRow,
      BCol,
      PurchaseList,
      // PurchaseWizard
    },
    computed: {
      isAddClicked() {
        return store.state.purchase.isAddClicked
      },
    }
  }
  </script>
  
  <style lang="scss" >
  @import '@core/scss/vue/libs/vue-good-table.scss';
  </style>
  