<template>
    <div class="tabContent">
        <div v-for="(item,index) in titles" :key="index" 
        class="tab-content-item" 
        :class="{active:index===currentIndex}"
        @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name:"tabContent",
        props:{
            titles:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return{
                currentIndex:0
            }
        },
        methods:{
            itemClick(index){
                // console.log(index);
                this.currentIndex=index
                this.$emit('tabClick',index)
            }
        },
    }
</script>

<style scoped>
    .tabContent{
        width: 80px;
        background-color: rgb(233, 232, 232);
        text-align: center;
        margin-right: 5px; 
        /* position: fixed;
        top: 0;
        left: 0; */
    }
    .tab-content-item{
        height: 60px;
        line-height: 60px;
        font-size: 14px;
    }
    .active{
        background-color: rgb(252, 252, 207);
    }
</style>