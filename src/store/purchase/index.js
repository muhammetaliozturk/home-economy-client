import purchaseService from '@/service/purchase-service'

export default {
    namespaced : true,
    state: {
        purchaseList: [],
        newPurchase: null,
        sparePurchase: null,
        isAddClicked: false
    },
    getters: {},
    actions: {
        async getPurchaseList({ commit }) {
            purchaseService.register("Purchase/", () => new purchaseService())
            const response = await purchaseService.getAllActive()
            commit('getPurchaseList', response.data)
        },

        setSelectedPurchase({ commit }, purchaseData) {
          commit('setSelectedPurchase', purchaseData)
          commit('setIsAddClicked', true)
        },

        async getPurchaseDetailById({ commit }, id) {
            purchaseService.register("Purchase/", () => new purchaseService())
            const response = await purchaseService.getDetailById(id)
            commit('setDetailedPurchase', response.data)
        },

        createPurchase({ commit }, purchaseData) {
          purchaseService.register('Purchase/', () => new purchaseService())
          return new Promise((resolve, reject) => {
            purchaseService.create(purchaseData)
            .then((response) => {
              resolve(response.data)
            })
            .catch((error) => {
              reject(error.response.data)
            })
          })
        },
        async updatePurchase({ state }, purchaseData) {
          purchaseService.register('purchase/', () => new userService())
          return new Promise((resolve, reject) => {
            purchaseService.update(state.selectedPurchase.id, purchaseData)
            .then((response) => {
              resolve(response.data)
            })
            .catch((error) => {
              reject(error.response.data)
            })
          })
        },
        async deletePurchase({ commit }, purchaseId) {
          purchaseService.register('purchase/', () => new userService())
          await purchaseService.deleteById(purchaseId)
          commit('deletePurchase', purchaseId)
        }
    },
    mutations: {
        getPurchaseList: (state, purchaseList) => (state.purchaseList = purchaseList),
        setSelectedPurchase: (state, selectedPurchase) => (state.selectedPurchase = selectedPurchase),
        setSparePurchase: (state, sparePurchase) => (state.sparePurchase = sparePurchase),
        setIsAddClicked: (state, isAddClicked) => (state.isAddClicked = isAddClicked),

        createPurchase: (state, purchase) => (state.purchaseList.unshift(purchase)),
        deletePurchase: (state, purchaseId) => (state.purchaseList = state.purchaseList.filter(x => x.id !== purchaseId)),

        updatePurchase: (state, purchase) => {
            const index = state.purchaseList.findIndex(x => x.id === purchase.id)
            state.purchaseList[index].name = purchase.name
            state.purchaseList[index].surname = purchase.surname
            state.purchaseList[index].emailAddress = purchase.emailAddress
            state.purchaseList[index].mobileNumber = purchase.mobileNumber
            state.purchaseList[index].beginDate = purchase.beginDate
            state.purchaseList[index].address = purchase.address
        },
    }
}