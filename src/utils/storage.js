// 封装本地存储模块

// 将数据存储到本地
export const setItem=(name,value)=>{
    if(typeof value==='object'){
        // 如果存储的是对象则装换为json类型字符串
        value=JSON.stringify(value)   
    }
    window.localStorage.setItem(name,value)
}

// 从本地存储获取数据
export const getItem=name=>{
    try{
        // 尝试把获取的数据转化为JavaScript对象
        // 如果获取的是非json格式字符串（普通数据类型）则转化失败，执行catch，直接返回获取的数据
        return JSON.parse(window.localStorage.getItem(name))
    }catch(err){
        return window.localStorage.getItem(name)
    }
}

// 从本地存储删除数据
export const removeItem=name=>{
    window.localStorage.removeItem(name)
}