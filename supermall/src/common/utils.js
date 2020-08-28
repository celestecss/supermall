export function debounce(func,delay){
    let timer=null

    return function(...agrs){  //...代表可以传入多个参数
        if(timer) clearTimeout(timer)

        timer=setTimeout(()=>{
            func.apply(this,agrs) //apply改变this指定
        },delay)
    }
}