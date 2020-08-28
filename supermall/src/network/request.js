import axios from 'axios'

  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 5000
  })
    // return instance (config)
    // instance的返回值是一个promise  所以不需要再封装成promise对象


  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    // console.log(config);
    // 表示发送成功,打印的信息就是配置的请求信息config所以直接写config这个参数
    return config
    // 如果不返回，就被拦截下来了，后面拿不到config，所以要返回出去

    // 1.假设config中的信息不符合服务器的要求，通过拦截的形式给config多配置一些需要的信息
    // 或者对于某些信息做一些转化

    // 2.假设希望在每次请求时，都在界面显示一个请求图标

    // 3.某些请求（例如登录（需携带token令牌）），必须携带一些特殊的信息
    // 可以提示用户先登录
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })
  
  export {instance as request}