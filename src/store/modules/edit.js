import * as types from '../mutation-types'
const state = {
    dialog: false,
    password: false,
}
const getters = {
    isDialog: function () {
        return state.dialog
    },
    isPassword : ()=>state.password
}
const actions ={
    setDialog({ commit },dialog){
        commit(types.ISDIALOG, { dialog })
    },
    setPassword({commit},password){
        commit(types.ISPASSWORD,{ password})
    }
}
const mutations = {
    [types.ISDIALOG] (state, { dialog }){
        state.dialog = dialog
    },
    [types.ISPASSWORD] (state, {password}){
        state.password = password;
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}