<template>
    <div class="bottom-bar">
        <div class="bar-item bar-left">
            <div>
                <i class="icon service"></i>
                <span class="text">客服</span>
            </div>
            <div>
                <i class="icon shop"></i>
                <span class="text">店铺</span>
            </div>
            <div>
                <i class="icon select"></i>
                <span class="text">收藏</span>
            </div>
        </div>
        <div class="bar-item bar-right">
            <div class="cart" @click="addToCart">加入购物车</div>
            <div class="buy">购买</div>
        </div>
        <!-- <sport-ball ref="ball" class="sport-ball"></sport-ball> -->
    </div>
</template>

<script>
    export default {
        name:"DetailBottomBar",
        methods:{
            addToCart(){
                // console.log('点击添加到购物车');
                // 例如
                // 父传子  <children @clickTest="test" /> 子调用 this.$emit("clickTest") 懂？啥不是test吗
                // test是父组件得方法 @clickTest="test" 
                // clickTest是给子组件调用得 子组件调用这个方法时 触发哪个方法 就是test
                // 你否管奇怪不奇怪 你就说你还改不改！我不服哼 😕
                // 你倒是改啊！好吧 我改上面吧我受不了改下面 拿你改 你信不信我拿刀砍你不是说是前面哪个吗
                // 你这改得是父组件吗！？？？
                this.$emit('addCart')
            }
        }
    }
</script>

<style scoped>
    .bottom-bar{
        height: 49px;
        background-color: #999;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;

        display: flex;
        text-align: center;
    }

    .bar-item{
        flex: 1;
        display: flex;
    }
    .bar-item>div{
        flex: 1;
    }
    .bar-left .icon{
        display: block;
        width: 22px;
        height: 22px;
        margin: 10px auto 3px;
        background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
    }
    .bar-left .service{
        background-position: 0 -54px;

    }
    .bar-left .shop{
        background-position: 0 -98px;
    }
    .bar-right{
        font-size: 15px;
        color: #fff;
        line-height: 49px;
    }
    .bar-right .cart{
        background-color: #ffe817;
        color: #333;
    }
    .bar-right .bug{
        background-color: red;

    }
    .sport-ball{
        position: absolute;
        left: 225px;
        bottom: 20px;
    }
</style>