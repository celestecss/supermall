<template>
    <div id="app">
      <keep-alive exclude="Detail">
        <router-view></router-view>
      </keep-alive>
      <main-tab-bar></main-tab-bar>
      <!-- <home></home> -->
    </div>
</template>

<script>
import MainTabBar from 'components/content/tabbar/MainTabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
import Home from 'views/home/Home'
import Category from 'views/category/Category'
import Detail from 'views/detail/Detail'
import Cart from 'views/cart/Cart'

export default {
  name: 'App',
  components: {
     MainTabBar,
     Home,
     Category,
     Detail,
     Cart
  }
}
</script>

<style>
@import "assets/css/base.css";

</style>
