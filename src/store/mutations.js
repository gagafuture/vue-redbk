import * as types from './mutation-types'

export default {
    [types.ISNAV] (state) {
        state.isNav = !state.isNav
    },
    [types.SHOWPOPUP] (state) {
        state.popupVisible = true
    },
    [types.HIDEPOPUP] (state) {
        state.popupVisible = false
    },
    [types.ISSHOW] (state,type) {
        state.isShow = type
    },
    [types.AUTH] (state,{userName,imageUrl,pid}) {
        state.auth = {
            userName:userName,
            imageUrl:imageUrl,
            pid:pid
        }
    },
    [types.ISSHOWUPLOAD] (state,type){
        state.isShowUpload = type
    }
}