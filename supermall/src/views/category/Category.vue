<template>
    <div class="category">
        <nav-bar class="nav-bar">
            <div slot="center">商品分类</div>
        </nav-bar>
        <div class="flex">
            <scroll class="content-nav" ref="scrollnav">
                <tabContent :titles="titles" @tabClick="tabClick"></tabContent>
            </scroll>

            <scroll class="content" 
                    ref="scroll"
                    :probe-type="3" 
                    @scroll="contentScroll"
                    :pull-up-load="true"
                    @pullingUp="loadMore">
                    
                <goods-list :goods="showGoods" ></goods-list>
            </scroll>
            <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
        </div>
    </div>
</template>

<script>
    import Scroll from 'components/common/scroll/Scroll'

    import NavBar from 'components/common/navbar/NavBar'
    import tabContent from 'components/content/tabContent'
    import GoodsList from 'components/content/goods/GoodsList'
    import BackTop from 'components/content/backtop/BackTop'

    import {getHomeGoods} from "network/home";
    import {debounce} from "common/utils";

    export default {
        name:"Category",
        components:{
            NavBar,
            Scroll,
            tabContent,
            GoodsList,
            BackTop,
        },
        data(){
            return {
                titles:['正在流行','上衣','裤子','裙子','内衣','女鞋','包包','运动','配饰','美妆'],
                goods:{
                    'pop':{page:0,list:[]},
                    'new':{page:0,list:[]},
                    'sell':{page:0,list:[]},
                },
                currentType:'pop',
                isShowBackTop:false,
                saveY:0,
            }
        },
        // 组件完成后调用
        mounted(){
            // func=this.$refs.scroll.refresh
            const refresh=debounce(this.$refs.scroll.refresh,500)

            // 1.监听item中图片加载完成
            this.$bus.$on('itemImageLoad',()=>{
                // console.log('this.$refs.scroll.refresh');
                console.log('-------');
                refresh() 
            })
        },
        created(){
            // 请求商品
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')

  
            // // 监听图片加载完成
            // this.$bus.$on('itemImageLoad',()=>{
            //     console.log('-------');
            //     this.$refs.scroll.refresh()
            // })
        },
        activated(){
            console.log('category activated');
            this.$refs.scroll.scrollTo(0,this.saveY,0)
            this.$refs.scroll.refresh()
        },
        deactivated(){
            console.log('category deactivated');
            this.saveY=this.$refs.scroll.getScrollY()
        },
        methods:{
            // 网络请求相关方法
            getHomeGoods(type) {
                const page =this.goods[type].page+1;
                getHomeGoods(type,page).then(res=>{
                    this.goods[type].list.push(...res.data.list)  //...遍历一个一个取出来放进去
                    this.goods[type].page+=1
                    console.log(res);

                    this.$refs.scroll.finishPullUp()//完成上拉加载更多
                })
            },  


            // 事件监听相关方法
            tabClick(index){
                console.log(index);
                switch(index){
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
            },
            backClick(){
                this.$refs.scroll.scrollTo(0,0)  
                this.$refs.scrollnav.scrollTo(0,0)
            },
            contentScroll(position){
                this.isShowBackTop=(-position.y)>1000
            },
            loadMore(){
                this.getHomeGoods(this.currentType)
                this.$refs.scroll.refresh
            }
        },
        computed:{
            showGoods(){
                return this.goods[this.currentType].list
            }
        },
    }
</script>

<style scoped>
.flex{
    display: flex;
}
    .content-nav{
        overflow: hidden;
        height: 84vh;
        flex-shrink: 0;
    }
    .content{
        position: relative;
        top: 5px;
        left: 0;
        height: 84vh;
        overflow: hidden;
        background-color: #fff;
        /* margin-top: 5px; */
    }
    .content >>> .content {
        /* 因为在scroll里面还有一层content */
        display: flex;
    }
    .content >>> .content > .tabContent {
        flex-shrink: 0;
        /* 这个是啥啊 收缩 默认值是1 也就是可以被收缩（挤压状态） 0指的是不能 这咋控制图片一定是两个啊 */
        /* 啥就是左边不能挤压，所以挤压右边嘛 不是 这意思是 */
        /* 你左边本来是有设置宽度的 但是因为右边宽度大于左边 所以左边要收缩空间留给右边 */
        /* 这个属性就是说 按照设置的宽度来 不收缩 是啊  so?但是图片变小了啊 那是你设置的问题啊 不是啊 */
        /* 就是为什么我不用调图片的宽度，就是她不会变成一个或者三个 就是还是两个 然后很正常的显示 */
        /* 因为这是rem啊。。。。。你设置了两行 就是两行 她会根据屏幕变小而缩小 我设置的div是占48% 现在空间变小了 */
        /* 他是根据屏幕一起变小吗 不是啊  不是这个意思 就是她原本不是一个100%的空间，所以一行两个一个48% 现在她的空间变小了*/
        /* 她怎么不会就是说 一行只能装下一个了呢 还是说 她占的大小 根据他所拥有的空间的48% */
    }
    /* where */
    /* .category >>> .goods-item{ */
        /* width: 30%; */
        /* position: absolute; */
    /* } */
    /* .tabcontent{
        flex: 1;
    }
    .goodslist{
        flex: 1;
    } */
</style>