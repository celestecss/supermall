<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
        <scroll class="content" 
                ref="scroll" 
                :probe-type="3" 
                @scroll="contentScroll">

            <!-- <ul>
                <li v-for="(item,index) in $store.state.cartList" :key="index">
                    {{item}}
                </li>
            </ul> -->

            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
        </scroll>

        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

        <!-- <toast :message="message" :show="show"></toast> -->
    </div>
</template>

<script>

    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import DetailBottomBar from './childComps/DetailBottomBar'
    // import Toast from 'components/common/toast/Toast'

    import Scroll from  'components/common/scroll/Scroll'

    import {getDetail,Goods,Shop,GoodsParam} from "network/detail"
    import {debounce} from "common/utils"

    export default{
        name:"Detail",
        components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            // Toast

        },
        data(){
            return{
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{},/* 不是都是对象吗 */
                themeTopYs:[],
                getThemeTopY:null,
                currentIndex:0,
                // 是这里定义吗
                // 不是啊 你这个不是参数吗 没明白吗有点懵
                // message:'',
                // show:false

            }
        },
        created(){
            // 1.保存传入的iid
            this.iid=this.$route.params.iid
            // 2.根据iid请求详情数据
            getDetail(this.iid).then(res=>{
                console.log(res);
                // 1.获取顶部轮播图
                const data = res.result;
                // 这个res是自己定义得参数吗 不然呢 为啥他可以拿到ressult 你请求得你问我为什么
                this.topImages=data.itemInfo.topImages

                // 2.获取商品信息
                // 找到没嗯嗯吧
                this.goods=new Goods(data.itemInfo,data.colums,data.shopInfo.services)

                // 3.创建店铺信息的对象
                this.shop=new Shop(data.shopInfo)

                // 4.保存商品详情数据
                this.detailInfo=data.detailInfo

                // 5.获取参数的信息
                this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
                console.log(this.paramInfo)
                // 6.获取评论信息
                // if(data.rate.cRate !==0){
                //     this.commentInfo=data.rate.list[0]
                // }

           
            })
            // 3.给getThemeTopY赋值
            this.getThemeTopY=debounce(()=>{
                this.themeTopYs=[]

                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(Number.MAX_VALUE)

                console.log(this.themeTopYs);
            },1000)
        },
       

        methods:{
            imageLoad(){
                // this.$refs.scroll.refresh()
                this.getThemeTopY()
            },
            titleClick(index){
                console.log(index);
                this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
                
            },
            contentScroll(position){
                // console.log(position);
                // 1.获取y值
                const positionY=-position.y
                // 2.positionY和主题中值进行对比
                // 假设数据：【0，7938，9102，9453】
                // 在0-7938之间，index=0
                // 7938-9102之间，index=1
                // 9102-9453之间，index=2  超出index=3
                // for(let i=0;i<this.themeTopYs.length;i++){
                //     if(positionY>this.themeTopYs[i] && positionY<this.themeTopYs[i+1]){
                //         console.log(i);
                        
                //     }
                // }


                let length=this.themeTopYs.length
                for (let i = 0; i < length-1; i++) {
                    if (this.currentIndex !== i && (positionY>=this.themeTopYs[i] && positionY<
                    this.themeTopYs[i+1])) {
                        this.currentIndex=i
                        this.$refs.nav.currentIndex=this.currentIndex
                    }                 
                }


            },
            addToCart(){
                // console.log('------');
                // 1.获取购物车需要展示得信息
                const product ={}
                // 不是 你就这么输出！？你不是这样说的吗
                // 你不觉得她少了点啥吗this 加上没定义呢
                // 那你定义
                // 看看结果
                
                product.image=this.topImages[0] //没问题啊 我 真的 你为什么不在我旁边
                // 你倒是看子组件啊你看这个干哈
                // 这里报错了 提示是啥 我们复制来看看
                // Cannot read property 'title' of undefined
                // 我们来看这个 这个 是请求得参数是吗是
                // 哪这个参数 从哪来js里面请求得
                // 那你之前存哪了 你现在知道你肯定存得不是goodsInfo了嘛是那个吗
                // 那你肯定存过 对吧是啊 那你找找 
                // 你想一下 既然你是可以new Goods去换参数得
                // 那你是不是可以直接在这个页面找Goods就可以找到你存得那个参数是哇你咋这么厉害
                // 你先解决完在说!
                product.title=this.goods.title
                // 那么可以想的到 这行是
                // Cannot read property 'desc' of undefined
                product.desc=this.goods.desc
                // 那这行肯定也不例外
                // Cannot read property 'newPrice' of undefined
                // 那为啥啊为啥啊
                // ？？？为什么会是undefined呢没定义
                // 那源头出哪了 你放屁 当前得源头在哪在
                // 你脑子懵了吗对 她是谁得属性 我在给你一次机会你等一下我看一眼
                // 你这还需要翻啥！？ title除了produce 还有谁有goodsinfo
                // 那问题不就找到了吗 好像是
                // 那咋办啊 输出一下goodsinfo呗 动手吧
                
                product.price=this.goods.lowPrice
                product.iid=this.iid
                // 2.将商品加入购物车里面
                // this.$store.commit('addCart',product)
                // 你我发现这个title没问题啊在看啥
                // 你看能看出个花来 你注释掉她  不iu知道是不是是她得问题了不是他的问题啊
                // 信不信我锤爆你狗头 你注释了 她是不是没报错了报错了啊
                // 你在看一次 你看报错信息改了没改了啊
                // 拿不就是她得问题但是是一样得问题啊
                // 那你还分析出问题吗有点懵
                this.$store.dispatch('addCart',product).then(res=>{
                    console.log(res);

                    // console.log(this.$toast.methods.show);
                    // 是不是调用了对啊这个
                    // 哪不就是这个方法有问题吗 但是昨天刚刚改得这个方法
                    // 哪还是这个方法有问题啊还能有啥问题ww
                    // 无法想象 ???
                    // 调用了 但是没显示 哪不就是写得有问题吗嗯嗯
                    // 哪呢这玩意 我找不到
                    
                    this.$toast.show(res,1500)
                     //这个报错咋解决啊
                    // ... 报错啥 拿过来瞧瞧 分析
                    // _this2.$toast.show is not a function
                    // show不是一个函数 源头出谁上 你在说一遍toast
                    // 那源头处在toast上 那这个东西 是个啥是个封装得插件
                    // 那她现在是啥 给你在一次机会 输出一下看看
                    // 源头在她身上 不输出她输出谁
                    // 不是 上面报错 你在下面输出
                    // 她是一个函数啊星星眼 爆锤狗头???????????我知道为什么这么多bug了我写代码漏东西
                    // bug多不要紧 是你要会解决感觉会了很多呢
                    // 我信你个鬼 你个遭女子哼脑子是会了得
                    // 那你继续吧 应该可以了吧还没呢你先玩你的我看看后面得错误
                    // 行吧!哼 我挂了!等下再找你不急! ok! 我挂 !有事call!行吧吧吧!嗯!


                    // 你干嘛全关了啊 ？？？ 习惯性关闭哇你的习惯有毒还有问题哪
                    // 写个代码哪来那么多屁话！ 快解决下一个！这个按钮点不动然后添加购物车也没有弹窗显示成功
                    // 哪你写得 我砸知道为啥呢 你不知道谁知道呢 ...  ！！！ 
                    
                })
            },
        }
    }
</script>

<style scoped>
   #detail{
       position: relative;
       z-index:9;
       background-color: #fff;

       height: 100vh;
   }
   .content{
       height: calc(100% - 44px);
   }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
</style>