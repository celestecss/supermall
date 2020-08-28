import {
    ADD_COUNTER,
    ADD_TO_CART
}from './mutation-types'

export default {
    // mutations唯一得目的就是修改state中得状态
    // mutations中得每一个方法尽可能完成得事件比较单一一点
    [ADD_COUNTER](state,payload){
        payload.count++
    },
    [ADD_TO_CART](state,payload){
        payload.checked=true
        state.cartList.push(payload)
    }
}