<template>
    <b-row>
      <b-col cols="12">
      <label
        for="extension"
        class="mt-1"
      >
        Accept specific image formats by extension
      </label>
      <b-form-file
        id="extension"
        accept=".xlsx"
      />
      </b-col>
    </b-row>
  </template>
  
  <script>
  import { BRow, BCol, BFormFile, BCardText } from 'bootstrap-vue'
  import store from '@/store/index'
  
  export default {
    components: {
      BRow,
      BCol,
      BFormFile,
      BCardText,
      // PurchaseWizard
    },
  }
  </script>
  
  <style lang="scss" >
  @import '@core/scss/vue/libs/vue-good-table.scss';
  </style>
  