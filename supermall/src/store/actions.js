import {
    ADD_COUNTER,
    ADD_TO_CART
}from './mutation-types'

export default {
    addCart(context,payload){
        // payload新添加得商品
        // 数组常用得方法：push/pop/reverse/shift/unshift/map/sort/reduce/filter
        // let oldProduct=null
        // for (let item of state.cartList) {
        //     if (item.iid===payload.iid) {
        //         oldProduct=item
        //     }
        // }
        // 1.查找之前数组中是否有该商品
       return new Promise((resolve,reject)=>{
        let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)

        // 哪呢
        // 2.判断oldProduct
        if (oldProduct) {
            // oldProduct.count+=1
            // 啥 你得意思是 为什么不在这里 直接 oldProduct.count+=1
            // 而要comit吗 差不多，但是我主要没看懂commit不知道啥意思
            // 就很简单 我们一般来说 state 是存状态得
            // getter 是获取值得
            // mutation 是设置值得
            // action 是操作请求判断得
            // 所以假设我们添加 一个商品
            // 我们要判断我们是不是有过这个商品 
            // 有就+1 这时候就再action中判断
            // 然后判断完  调用mutation得方法 去设置值
            // 所以这里得commit 就是调用mutation得方法

            // context为什么就可以调用这个方法呢
            // 没为啥啊 设计就是如此 context可以拿到上下文得状态
            // 所以她设计就这样context代表啥意思我上下文
            // payload就是商品吗 哪来得payload
            // 这只是个形参！！名字随便起得！哦哦哦，但是context是固定得嘛
            // 也是形参 名字随便起得 额 但是可以拿到上下文 payload、可以嘛
            // action 基本有连个参数 第一个是上下文 第二个是参数
            // 所以上下文就是context 你用ctx啥名字都可以
            // 她可以拿到commit state 这种上下文得状态 去设置值 获取值
            // 第二个参数就是传参 指的是你调用得时候 传得参数 例如
            // this.$store.dispatch('addCart',product) 这个produc哦哦
            // 那ok不那commit这个就是一个调用像$emit吗 对 你这语文 该回去重修了为啥
            // 打个调用打一年那是因为我看不见键盘我躺着 。。。你这个畜生！我都还坐着！！！哈哈哈哈
            // 告辞！ 可以了吧 可以我挂了！好哦
            context.commit(ADD_COUNTER,oldProduct)

            resolve('当前商品数量+1')

        }else{
            payload.count=1
            // state.cartList.push(payload)
            context.commit(ADD_TO_CART,payload)

            resolve('添加了新的商品')
        }
       })
    }
}