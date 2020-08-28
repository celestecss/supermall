<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

        <tab-control 
            class="tab-control" 
            :titles="['流行','新款','精选']"
            @tabClick="tabClick"
            ref="tabControl1"       
            v-show="isTabFixed">
        </tab-control>

        <scroll class="content" 
                ref="scroll" 
                :probe-type="3" 
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control 
            class="tab-control" 
            :titles="['流行','新款','精选']"
            @tabClick="tabClick"
            ref="tabControl2"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>

        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>  
        <!-- 监听组件的时候需要用native属性 (监听组件根元素的原生事件)-->
    </div>

    
</template>

<script>
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FeatureView from './childComps/FeatureView'

    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'

    import GoodsList from 'components/content/goods/GoodsList'

    import Scroll from 'components/common/scroll/Scroll'
    import BackTop from 'components/content/backtop/BackTop'

    import {getHomeMultidata,
            getHomeGoods}
            from "network/home"; //加大括号是因为没有加default导出
    
    import {debounce} from "common/utils";


export default {
    name:"Home",
    components:{
        
        HomeSwiper,
        RecommendView,
        FeatureView,
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop,
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
    //这两个函数只有在keep-alive的情况下才会被调用  
    activated(){
        console.log('home activated');
        // 回来时回到离开的位置
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.refresh()
    },
    deactivated(){
        console.log('home deactivated');
        // 将当前的位置保存下来
        this.saveY=this.$refs.scroll.getScrollY()
    },

    created(){
        // 使得当首页组件创建完成之后就可以发送请求，，使用生命周期函数
        // 1.请求多个数据
        this.getHomeMultidata()
        

        // 2.请求商品数量
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

        // 3.监听图片加载完成
        // this.$bus.$on('itemImageLoad',()=>{
        //     console.log('-------');
        //     // 在created里面拿scroll里面的东西很有可能为空拿不到所以去mounted
        //     this.$refs.scroll.refresh()
        // })
        
    },

    mounted(){
        // func=this.$refs.scroll.refresh
        const refresh=debounce(this.$refs.scroll.refresh,500)

        // 1.监听item中图片加载完成
        this.$bus.$on('itemImageLoad',()=>{
            // console.log('this.$refs.scroll.refresh');
            refresh() 
        })

        // 2.获取tabControl的offsettop
        // 所有组件中都有一个属性$el:用于获取组件中的元素
        // this.tabOffsetTop=this.$refs.TabControl.$el.tabOffsetTop
    },

     methods:{
        //  事件监听相关方法
        tabClick(index){
            console.log(index);
            switch (index) {
                case 0:
                    this.currentType='pop'
                    break;
                case 1:
                    this.currentType='new'
                    break;
                case 2:
                    this.currentType='sell'
                    break;
            }

            this.$refs.tabControl1.currentIndex=index;
            this.$refs.tabControl2.currentIndex=index;
        },

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
        swiperImageLoad(){
            // console.log(this.$refs.TabControl.$el.tabOffsetTop);
            this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
        },


        // 网络请求相关方法
        getHomeMultidata() {
             getHomeMultidata().then(res=>{
                console.log(res);
                // 函数调用-》压入函数栈（保存函数调用过程中所有变量）
                // 函数调用结束-》弹出函数栈（释放函数所有的变量）
                // this.result=res;使用result指向他，不会被释放掉
                this.banners=res.data.banner.list;
                this.recommends=res.data.recommend.list;
                })
            },
        getHomeGoods(type) {
            const page =this.goods[type].page+1;
            getHomeGoods(type,page).then(res=>{
                this.goods[type].list.push(...res.data.list)  //...遍历一个一个取出来放进去
                this.goods[type].page+=1


                this.$refs.scroll.finishPullUp()//完成上拉加载更多
            })
            },    
        },  
        computed:{
            showGoods(){
                return this.goods[this.currentType].list
            }
        },

        
}
</script>

<style scoped>
    #home{
        /* padding-top: 44px; */
        height: 105vh;
    }

    .home-nav{
        background-color: var(--color-tint);
        color: #ffffff;


        position:fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }

    .tab-control{
        position: sticky; 
         top: 44px;
        z-index: 9;
    }

    .content{
        overflow: hidden;
/* 方法一控制高度 */
        height: calc(100% - 93px);
         /* 切记使用 calc 的时候，里面的 - 左右两边一定要有个空格，快被这个bug搞死了; */
        margin-top: 44px;
/* 方法2确定高度 */
        /* position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0; */
    }
    .fixed{
        position: fixed;
        left: 0;
        right: 0;
        top: 44px;
    }
    
</style>>

