import Toast from './Toast'

const obj={}

obj.install =function (Vue) {
    // Vue.extend(Toast)
    // document.body.appendChild(Toast.$el)

    // 1.创建组件构造器
    const toastConstrustor=Vue.extend(Toast)
    // 2.根据new得方式。根来据组件构造器，可以创建出一个组件对象
    const toast=new toastConstrustor()

    // 3.将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    // 4.toast.$el对应得就是div
    document.body.appendChild(toast.$el)

    // console.log('执行obj函数',Vue);
    // Toast toast
    Vue.prototype.$toast=toast;
}

export default obj