<template>
    <div class="cart-list">
        <scroll 
        class="content"
        ref="scroll" 
        :probe-type="3" 
        @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp="loadMore"
        >
        <!-- 这里for循环出来了 但是显示错误了 我们再看看  -->
        <!-- 这时候我们看一下 绑定得字段 :product="item" product这个 -->
        <!-- 为啥啊 因为你改子组件得画 你要是其他地方又用到 -->
        <!-- 那你所有都要改 但是你咋知道其他地方用的是子组件得名字呢 不要一个一个去看看嘛 -->
        <!-- 啥玩意 额 我也不知道我说的啥玩意就是这个意思hhh -->
        <!-- 反正 所有东西都以子组件为原则 子组件定义了啥名字 -->
        <!-- 父组件就用啥名字 所以不可能改子组件 yes sir 那你倒是动手啊！ 酱紫吗 确认一下名字对不对 一样啊-->
        <!-- 一样你倒是看结果啊 还要我给你看嘛是的 -->
        <!-- 为啥图片出不来呀 现在文字是不是出来了是 那图片为啥没出来 你自己心里没点AC数嘛 -->
        <!-- 你现在发现 文字她出来了 那就证明数据对了 那无非就是图片得不对 -->
        <!-- 你打印一下那个值 不久知道了 我先去洗个碗 你琢磨一下啊大半夜洗碗，你吃的夜宵嘛 是得。。。。你说的是哪个值啊 想锤你狗头 不然呢 在哪打印啊 子组件-->
            <cart-list-item 
            v-for="(item,index) in cartList" 
            :key="index"
            :item-info="item">
            
            </cart-list-item>
        </scroll>
    </div>
</template>

<script>
    import Scroll from 'components/common/scroll/Scroll'
    import CartListItem from './CartListItem'    
    import {debounce} from "common/utils";

    export default {
        name:"CartList",
        components:{
            Scroll,
            CartListItem
        },
        props:{
            cartList:{
                type:Array,
                default: ()=>[]
            }
        },
        data() {
            return {
                banners:[],
                recommends:[],
                goods:{
                    'pop':{page:0,list:[]},
                    'new':{page:0,list:[]},
                    'sell':{page:0,list:[]},
                },
                currentType:'pop',
                isShowBackTop:false,
                tabOffsetTop:0,
                isTabFixed:false,
                saveY:0
            }
        },

    destroyed(){
        console.log('home destroyed');
        
    },

    activated(){
        console.log('home activated');
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.refresh()
    },
    deactivated(){
        console.log('home deactivated');
        this.saveY=this.$refs.scroll.getScrollY()
    },

    mounted(){
        // func=this.$refs.scroll.refresh
        const refresh=debounce(this.$refs.scroll.refresh,500)

        // 1.监听item中图片加载完成
        this.$bus.$on('itemImageLoad',()=>{
            console.log('this.$refs.scroll.refresh');
            refresh() 
        })

        // 2.获取tabControl的offsettop
        // 所有组件中都有一个属性$el:用于获取组件中的元素
        // this.tabOffsetTop=this.$refs.TabControl.$el.tabOffsetTop
    },

    methods:{
        //  事件监听相关方法

            backClick(){
                this.$refs.scroll.scrollTo(0,0)  
            },
            contentScroll(position){
                // console.log(position);
                this.isShowBackTop=(-position.y)>1000

                // 决定tabControl是否吸顶（position：fixed）
                this.isTabFixed=(-position.y)>this.tabOffsetTop
            },
            loadMore(){
                // console.log("上拉加载更多");
                this.getHomeGoods(this.currentType)

                this.$refs.scroll.scroll.refresh()//刷新，重新计算可滚动的区域
            },
        },    
    }
</script>

<style scoped>
    .cart-list{
        height: 100vh;
    }
    .content{
        height: calc(100% - 93px);
        overflow: hidden;
    }
</style>