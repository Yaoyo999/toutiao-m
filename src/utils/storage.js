// 本地存储封装模块

export const getItem = name => {
    const data = window.localStorage.getItem(name)
    // 为什么把JSON.parse放到try--catch中 ?
    // 因为data可能不是 JSON 格式字符串
    try {
        // 尝试把data转为javascript对象
        return JSON.parse(data)
    } catch (err) {
        // data不是JSON格式字符串直接原样返回
        return data
    }
}
export const setItem = (name,value) => {
    // 如果value是对象就将value转为JSON格式字符串再进行存储
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(name,value)
}
export const removeItem = name => {
    window.localStorage.removeItem(name)
}