<template>
    <div id="shop-item">
        <div class="item-selector">
            <CheckButton @click.native="checkedChange" :is-checked="itemInfo.checked"></CheckButton>
        </div>
        <div class="item-img">
            <img :src="itemInfo.image" alt="商品图片">
        </div>
        <div class="item-info">
            <div class="item-title">{{itemInfo.title}}</div>
            <div class="item-desc">{{itemInfo.desc}}</div>

            <div class="item-bottom">
                <div class="item-price left">{{itemInfo.price}}</div>
                <div class="item-count right">x{{itemInfo.count}}</div>
            </div>

        </div>
    </div>
</template>

<script>
    import CheckButton from 'components/content/checkButton/CheckButton'

    export default {
        name:"CartListItem",
        components:{
            CheckButton
        },
        props:{
            // 字段名字不一样，好像是我们要换成product？
            // 这时候不要去改子组件去改父组件
            // 去某个方法里面打印吗 我想锤你
            itemInfo:{
                type:Object,
                default(){
                    return {}
                }
            },

        },
        created(){
            console.log(this.itemInfo);
            
            
        },
        methods:{
            checkedChange(){
                this.itemInfo.checked=!this.itemInfo.checked
            }
        }
    }
</script>

<style scoped>
    #shop-item{
        width: 100%;
        display: flex;
        font-size: 0;
        padding: 5px;
        border-bottom: 1px solid #ccc;
    }
    .item-selector{
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .item-title, .item-desc{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .img{
        padding: 5px;

    }
    .item-img img{
        width: 80px;
        height: 100px;
        display: flex;
        border-radius: 5px;
    }
    .item-info{
        font-size: 17px;
        color: #333;
        padding: 5px 10px;
        position: relative;
        overflow: hidden;
    }
    .item-info, .item-desc{
        font-size: 14px;
        color: #666;
        margin-top: 15px;
    }
    .info-bottom{
        margin-top: 20px;
        position: absolute;
        bottom: 10px;
        left: 10px;
        right: 10px;
    }
    .info-bottom, .item-price{
        color: orange;
        margin-top: 10px;
    }
    .item-count{
        margin-top: 10px;
    }
</style>