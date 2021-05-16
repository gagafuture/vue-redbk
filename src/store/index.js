import Vue from 'vue'
import Vuex from 'vuex'
import discovery from './modules/discovery'
import goods from './modules/goods'
import cart from './modules/cart'
import edit from './modules/edit'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    isNav: true,
    popupVisible: false,
    auth:"",
    isShow:false,
    isShowUpload:false
}

export default new Vuex.Store({
    state,
    modules: {
        discovery,
        goods,
        cart,
        edit
    },
    getters,
    actions,
    mutations
})