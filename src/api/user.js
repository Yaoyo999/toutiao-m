// 用户相关请求模块
import request from '../utils/request'

// 登录/注册

export const login = data => {
    return request({
        method:'POST',
        url:'/app/v1_0/authorizations',
        data
    })
}

// 获取用户信息
export const getCurrentUserInfo = () => {
    return request({
        method:'GET',
        url:'/app/v1_0/user'
        // headers: { 
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}