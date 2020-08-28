<template>
    <!-- 封装滚动组件 -->
    <div class="wrapper" ref="wrapper">
        <!-- wrapper里面只能放一个元素，就是滚动的 -->
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name:"Scroll",
        props:{
            probeType:{
                type:Number,
                default:0
                //默认是0， 不监听滚动
            },
            pullUpLoad:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                scroll:null
            }
        },
        mounted(){
            // 1.创建BScroll对象
            // console.log(document.querySelector('wrapper'));
            this.scroll=new BScroll(this.$refs.wrapper,{
                click: true,
                probeType: this.probeType,   
                pullUpLoad: this.pullUpLoad
            })
            // 2.实时监听滚动位置
            if(this.probeType===2 || this.probeType===3){
                this.scroll.on('scroll',(position)=>{
                // console.log(position);
                this.$emit('scroll',position)
                    
                })
            }
            // // 3.监听scroll滚动到底部
            if(this.pullUpLoad){
                this.scroll.on('pullingUp',()=>{
                    console.log("监听滚动到底部");
                    //发射一个自定义事件
                    this.$emit('pullingUp')
                })
            }
            
        },

        methods:{
            scrollTo(x,y,time=300){
                // 返回顶部
                this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
            },
            // finishPullUp(){
            //     this.scroll.finishPullUp()
            // },
            refresh(){
                //每当图片加载完成后，重新计算可滚动的区域
                this.scroll && this.scroll.refresh()
                // 因为this.scroll是写在mounted中
                //怕存在 还没有值的情况就调用函数;
                //意思是只有当 this.scroll 创建完成后 才会执行 this.scroll.refresh()
            },
            finishPullUp(){
                this.scroll && this.scroll.finishPullUp()
            },
            getScrollY(){
                return this.scroll ? this.scroll.y : 0
            }
        }
    }
</script>

<style scoped>
    
</style>