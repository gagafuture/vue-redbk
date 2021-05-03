import * as types from './mutation-types'
export const isNav = ({ commit }) => {
    commit(types.ISNAV)
}
export const showPopup = ({ commit }) => {
    commit(types.SHOWPOPUP)
}
export const hidePopup = ({ commit }) => {
    commit(types.HIDEPOPUP)
}
export const isShow = ({ commit },type) =>{
    commit(types.ISSHOW,type)
}
export const addToCart = ({ commit }, { Goods,quantity }) => {
    // console.log(quantity)
    if (quantity>0) {
        commit(types.ADD_TO_CART, {
            id: Goods.pid,
            quantity: quantity
        })
    }
}
export const author = ({ commit },{userName,imageUrl,pid}) =>{
    commit(types.AUTH,{userName,imageUrl,pid})
}

export const isShowUpload = ({ commit },type)=>{
    commit(types.ISSHOWUPLOAD,type)
}