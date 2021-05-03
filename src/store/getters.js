export const cartProducts = state => {
    return state.cart.added.map(({ id, quantity }) => {
        const product = state.goods.goodslist.find(p => p.pid === id)
        return {
          id:product.pid,
          title: product.commodityName,
          price: product.price,
          // bName: product.brandName,
          img: product.media.mediaUrl,
          quantity
        }
      })
}
export const isShow = state => {
  return state.isShow;
}
export const getUser = state =>{
  return state.auth;
}
export const isShowUpload = state => {
  return state.isShowUpload;
}