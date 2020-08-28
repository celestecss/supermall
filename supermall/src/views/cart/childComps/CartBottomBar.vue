<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button 
            class="check-button" 
            :is-checked="isSelectAll"
            @click.native="checkClick"></check-button>
            <span>全选</span>
        </div>

        <div class="total">
            合计：{{totalPrice}}
        </div>

        <div class="calculate">
            去计算({{checkedLength}})
        </div>
    </div>
</template>

<script>

    import CheckButton from 'components/content/checkButton/CheckButton'

    import { mapGetters } from 'vuex'

    export default {
        name:"CartBottomBar",
        components:{
            CheckButton
        },
        computed:{

            ...mapGetters(['cartList']),

            totalPrice(){
                return '￥'+this.cartList.filter(item=>{
                    return item.checked
                }).reduce((preValue,item)=>{
                    return preValue+item.price*item.count
                },0).toFixed(2)
                // 结果乱码？那个结果啥意思 你是猪得意思 啊你滚哪哼
                // 等等 我仔细看看。。。你是猪 看起来好像没啥问题
                // 我知道了 你是🐖快说啊 
                // 有一个lowprice 我可能忘了用 哪你用呗 好像没请求过来 so？我想看一下商品信息里面有没有lowprice
                // 然后你看出啥了吗然后是打印item Info吗 。。。教你一个新得东西haole ok了是吧wo说价格好了。。
                // 。然后呢合计还没好 ... 看哭了给你递纸巾 样式长度不够 导致他换行了 所以看不见 我他妈安妈妈大数据i殴打事件oi
                // 安啦  但是开始出现得是NaN啊 哪不是因为你没有lowPrice吗噢噢噢 好了 搞定了 样式自己解决去好滴
                // 跑路！ 你最帅 别别别别别碑额别别别 不至于不至于不至于 挂了别关我的东西 。。。不是我关的！！！！
            },

            checkedLength(){
                let cnt = 0
                this.cartList.forEach(item=>{
                    if(item.checked){
                        cnt += item.count
                    }
                    // 这翻译过来 不久这样嘛 为啥我翻译不过来 你别忘记你是猪啊。。。。我真的没翻译过来
                    // 以后会习惯得 为什么加上checked就是加上count 啥意思 没动
                    // cnt += item.checked?item.count: 0
                    // cnt += item.count  cnt += item.checked
                    // 为什么一样得啊 哪里一样了啊  不都是加上数量嘛  然后呢为什么数量就一样了
                    // ？？？？？？？？ item.checked?item.count: 0 你告诉我 checked为true 结果是啥
                    // 我好气 他为true 结果不应该是Item.count嘛是啊 那不就是了嘛 我懂了 dbq 看错了
                    // 没事 我知道你是猪 我忍了 哼 抬走下一个
                })
                 return cnt
                // this.cartList.filter(item=>item.checked).length
                // 这样?cbd 这你过滤出了啥你告诉我，我不会用这个方法，suoyi我不知道咋回事啊
                // 那你都不知道咋回事 你怎么就不知道哪里出问题啥啊
                // 这东西是过滤器 就是筛选出对得条件得元素是啊
                // 所以你这筛选 筛选了啥 选中得元素 那不就3个嘛 有道理 。。。为什么不会加上他们得count
                // 那你写加上了嘛 抬走 下一个问题但是item.count: 0这是啥意思
                // 三元表达式啊我知道啊  你知道你问我啥意思 我一般问你得都是为什么在这里用！!!
                // 没为什么啊 想用就用 这不就是判断又没选中嘛 选中就加上  那在哪里体现了count加进去了
                // 这不cnt 加上了嘛 你眼睛长哪了 他不是加上得是选中得嘛
                // 看得我心肌梗塞
               
                // so 是啥问题
                // 就是这个length还有上面得价格，本来我想拿到所有加入购物车得数量，但是这个只能拿到不同品种商品得长度
                // 看到了趴 啥 看到啥了 ？？？？？？？？？？？你刚刚看屏幕了吗？？？ 看了啊这个去计算只有三个啊但是有六个商品啊
                // 然后呢，就不知道哪里出问题了,等下，我为什么刚刚打印了，他不出现啊，
                // 可能是因为你是猪？？？？！！！滚
                // 然后呢 还有啥为啥你这样就好了
                // 为啥我这样不能好，那刚刚那个哪里得问题你都没告诉我呢
                // 你刚刚怎么写得
            },
            isSelectAll(){
                // 使用filter
                // return !(this.$store.state.cartList.filter(item=> !item.checked).length)
                if(this.cartList.length===0) return false
                
                // 使用find函数
                // return !this.cartList.filter(item => !item.checked)

                let isChecked=false
                for(let item of this.cartList){
                    if(!item.checked){
                        // 如果checked为false 返回false
                        isChecked=false
                        return false
                    }
                }
                // 如果遍历完没有找到checked为false 就返回true
                return true
            }
        },
        methods:{
            checkClick(){
                if(this.isSelectAll){
                    this.cartList.forEach(item =>item.checked=false)
                }else{
                    this.cartList.forEach(item =>item.checked=true)
                }
                // this.$store.state.cartList.forEach(item =>item.checked=!this.isSelectAll)
                // 这个时候不能简化
                
            },
            calcClick(){
                if(!this.isSelectAll){
                    this.$toast.show('请选择购买得商品',2000)
                }
            }
        }
    }
</script>

<style scoped>
    .bottom-bar{
        height: 40px;
        background-color: #eeeeee;
        line-height: 40px;
        position: fixed;
        bottom: 49px;
        left: 0;
        width: 100%;
        display: flex;

    }
    .check-content{
        display: flex;
        align-items: center;
        /* margin-right: 20px; */
        width: 80px;
        text-align: center;
        margin-left: 10px;
    }
    .check-button{
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }
    .total{
        margin-right: 20px;
        flex: 1;
    }
    .calculate{
        background-color: red;
        width: 80px;
        text-align: center;
        color: #fff;
    }
</style>