<template>
    <div class="cart">
        <!-- 导航 -->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>

        <!-- 商品得列表 -->
        <!-- 首先这里没问题 传进去了 所以我们要进入到组件里面 看看 -->
        <cart-list :cartList="list"></cart-list>

        <!-- 底部汇总 -->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>

    import NavBar from 'components/common/navbar/NavBar'
    import CartList from './childComps/CartList'
    import CartBottomBar from './childComps/CartBottomBar'

    import { mapGetters } from 'vuex'


    export default {
        name:"Cart",
        components:{
            NavBar,
            CartList,
            CartBottomBar
        },
        computed:{
            // cartLength(){
            //     return this.$store.getters.cartLength
            // },
            
            ...mapGetters({
                length:'cartLength',
                list:'cartList'
            })
        }
    }
</script>

<style scoped>
    .cart{
        height: 100vh;
    }
    .nav-bar{
        background-color: brown;
        color: #ffffff;
    }
</style>