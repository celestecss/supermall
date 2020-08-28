import Vue from 'vue'
import VueRouter from 'vue-router'

const routerPush = VueRouter.prototype.push
const routerReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
VueRouter.prototype.replace = function push(location) {
  return routerReplace.call(this, location).catch(error=> error)
}

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

// 安装插件
Vue.use(VueRouter)



// 创建router
const routers=[
    {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/category',
        component: Category
      },
      {
        path: '/cart',
        component: Cart
      },
      {
        path: '/profile',
        component: Profile
      },
      {
        path: '/detail/:iid',
        component: Detail
      },
      
]


const router =new VueRouter({
    routes: routers,
    mode:'history'
})

export default router