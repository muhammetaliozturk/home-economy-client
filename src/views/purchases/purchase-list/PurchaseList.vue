<template>
    <b-card>
  
      <!-- <purchase-detail /> -->
  
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        @click="newPurchase"
      >
        <feather-icon
          icon="PlusIcon"
          class="mr-25"
        />
        <span>Yeni Harcama Ekle</span>
      </b-button>
     
      <!-- input search -->
      <div class="custom-search d-flex justify-content-end">
        <b-form-group>
          <div class="d-flex align-items-center">
            <label class="mr-1" style="font-size:15px;">Arama</label>
            <b-form-input
              v-model="searchTerm"
              placeholder="Tüm Tabloda Ara"
              type="text"
              class="d-inline-block"
            />
          </div>
        </b-form-group>
      </div>
  
      <!-- table -->
      <vue-good-table
        ref="purchase-table"
        :columns="columns"
        :rows="getRows"
        :line-numbers="true"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm }"
        :pagination-options="{
          enabled: true,
          perPage:pageLength
        }"
      >
        <template
          slot="table-row"
          slot-scope="props"
        >
        <span v-if="props.column.field === 'details'">
            <feather-icon
              icon="BookIcon"
              class="cursor-pointer"
              size="21"
              v-b-modal.modal-purchase-detail
              style="
                color: #1b7e27;
                margin-left:15px;
                margin-top: 10px;
                margin-bottom: auto;"
              @click="openPurchaseDetail(props.row)"
            />
          </span>
        <span v-else-if="props.column.field === 'action'">
            <feather-icon
              icon="EditIcon"
              class="cursor-pointer"
              size="21"
              v-b-modal.modal-purchase-detail
              style="
                color: #0056d7;
                margin-left:15px;
                margin-top: 10px;
                margin-bottom: auto;"
              @click="updatePurchase(props.row)"
            />
            <feather-icon
              icon="Trash2Icon"
              class="cursor-pointer"
              size="20"
              style="
                color: #ab2a2a;
                margin-left:15px;
                margin-top: 10px;
                margin-bottom: auto;"
              @click="deletePurchase(props.row)"
            />
          </span>
          <!-- Column: Common -->
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
  
        <!-- pagination -->
        <template
          slot="pagination-bottom"
          slot-scope="props"
        >
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-center mb-0 mt-1">
              <span class="text-nowrap">
                Toplam {{ props.total }} kayıttan 1 -
              </span>
              <b-form-select
                v-model="pageLength"
                :options="['10','20','50']"
                class="mx-1"
                @input="(value)=>props.perPageChanged({currentPerPage:value})"
              />
              <span class="text-nowrap "> kayıt arası gösteriliyor </span>
            </div>
            <div>
              <b-pagination
                :value="1"
                :total-rows="props.total"
                :per-page="pageLength"
                first-number
                last-number
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1 mb-0"
                @input="(value)=>props.pageChanged({currentPage:value})"
              >
                <template #prev-text>
                  <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                  />
                </template>
                <template #next-text>
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                  />
                </template>
              </b-pagination>
            </div>
          </div>
        </template>
      </vue-good-table>
    </b-card>
  </template>
  
  <script>
  import {
    BCard, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BButton
  } from 'bootstrap-vue'
  import { VueGoodTable } from 'vue-good-table'
  import store from '@/store/index'
  import { codeColumnSearch } from '@/views/table/vue-good-table/code'
  import Ripple from 'vue-ripple-directive'
  //import PurchaseDetail from './purchase-modal/PurchaseDetail.vue'
  
  export default {
    components: {
      VueGoodTable,
      BCard,
      BBadge,
      BPagination,
      BFormGroup,
      BFormInput,
      BFormSelect,
      BDropdown,
      BDropdownItem,
      BButton,
      //PurchaseDetail,
    },
    data() {
      return {
        pageLength: 10,
        codeColumnSearch,
        columns: [
          {
            label: 'Frekans',
            field: 'purchase.frequency',
            filterOptions: {
              enabled: true,
              placeholder: 'Frekans Giriniz',
            },
          },
          {
            label: 'Markası',
            field: 'purchase.trademark',
            filterOptions: {
              enabled: true,
              placeholder: 'Marka Giriniz',
            },
          },
          {
            label: 'Modeli',
            field: 'purchase.brandModel',
            filterOptions: {
              enabled: true,
              placeholder: 'Model Giriniz',
            },
          },
          {
            label: 'Seri No',
            field: 'purchase.serialNumber',
            filterOptions: {
              enabled: true,
              placeholder: 'Seri No Giriniz',
            },
          },
          {
            label: 'Gücü',
            field: 'purchase.power',
            filterOptions: {
              enabled: true,
              placeholder: 'Güç Giriniz',
            },
          },
          {
            label: 'Anten Tipi',
            field: 'purchase.antennaTypeCount',
            filterOptions: {
              enabled: true,
              placeholder: 'Anten Tipi Giriniz',
            },
          },
          {
            label: 'RDS',
            field: 'purchase.rds',
            filterOptions: {
              enabled: true,
              placeholder: 'RDS Giriniz',
            },
          },
          {
            label: 'Filtre',
            field: 'purchase.filterType',
            filterOptions: {
              enabled: true,
              placeholder: 'Filtre Giriniz',
            },
          },
          {
            label: 'Uydu Alıcısı',
            field: 'purchase.satelliteReceiverTypeText',
            filterOptions: {
              enabled: true,
              placeholder: 'Uydu Giriniz',
            },
          },
          {
            label: 'Detay',
            field: 'details',
          },
          {
            label: 'İşlemler',
            field: 'action',
          },
        ],
        searchTerm: '',
      }
    },
    directives: {
      Ripple,
    },
    computed: {
      getRows() {
        return store.state.purchase.purchaseList
      },
    },
    mounted() {
        store.dispatch('purchase/getPurchaseList')
    },
    methods: {
      setSelectedTransmiter(purchaseDetail, isWizardAction) {
        var purchase = purchaseDetail.purchase
        purchase.id = purchaseDetail.purchaseId
  
        var station = purchaseDetail.station
        station.id = purchaseDetail.stationId
  
        if (isWizardAction) {
          store.dispatch('purchase/setSelectedPurchase', purchase)
        }
        else {
          store.commit('purchase/setSelectedPurchase', purchase)
        }
  
        store.commit('station/setSelectedStation', station)
        store.commit('representative/setMainRepresentative', purchaseDetail.mainRepresentative)
        store.commit('representative/setSpareRepresentative', purchaseDetail.spareRepresentative)
      },
  
      newPurchase() {      
        var purchase = {
          id: 0,
          trademark: "",
          brandModel: "",
          serialNumber: '',
          frequency: null,
          power: null,
          antennaTypeCount: null,
          rds: null,
          filterType: '',
          satelliteReceiverType: '',
        }
  
        var station = {
          id: 0,
          city: "",
          county: "",
          fullAddress: "",
          latitude: "",
          longtitude: "",
          postLength: null,
          buildingType: "",
          postType: "",
          electrictySubscription: "",
          stationOwnership: "",
          postOwnership: "",
          hasUps: false,
          hasGenerator: false,
          hasGrouding: false,
          hasWarningLamb: false,
          hasTechnicalMaintenance: false,
        }
        
        var mainRepresentative = {
          representativeId : null,
          personnelId: null,
          fullName: ""
        }
        var spareRepresentative = {
          representativeId : null,
          personnelId: null,
          fullName: ""
        }
  
        var purchaseDetail = {
          purchaseId: 0,
          stationId: 0,
          purchase: purchase,
          station: station,
          mainRepresentative: mainRepresentative,
          spareRepresentative: spareRepresentative,
        }
  
        this.setSelectedTransmiter(purchaseDetail, true)
      },
      
      updatePurchase(currentRow) {
        this.setSelectedTransmiter(currentRow, true)
      },
      
      openPurchaseDetail(currentRow) {
        this.setSelectedTransmiter(currentRow, false)
      },
  
      deletePurchase(currentRow) {
        var requestData = {
          purchaseRequest: currentRow.purchase,
          stationRequest: currentRow.station,
          mainRepresentativeId: currentRow.mainRepresentative.representativeId,
          spareRepresentativeId: currentRow.spareRepresentative.representativeId,
          purchaseProcessId: 0
        }
        
        store.dispatch("purchaseProcess/deleteRequested", requestData)
          .then((responseData) => {
            this.$swal({
                  title: 'Başarılı!',
                  text: 'Silme işlemi başarıyla silme onayına gönderildi.',
                  icon: 'success',
                  confirmButtonText: 'Tamam',
              })
          })
          .catch((errorData) => {
            this.$swal({
              title: 'Hata!',
              text: errorData,
              icon: 'error',
              confirmButtonText: 'Tamam',
            })
            return;
          })
      },
    },
  }
  </script>
  
  <style lang="scss" >
  @import '@core/scss/vue/libs/vue-good-table.scss';
  </style>
  