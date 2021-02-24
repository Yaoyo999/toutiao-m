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

// 获取频道列表
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/channels'
    })
}

// 添加关注
export const addFollow = userId => {
    return request({
         url: '/app/v1_0/user/followings',
         method: 'POST',
         data: {
            target: userId
         }
     })
 }

 // 取消关注
export const deleteFollow = userId => {
    return request({
         url: `/app/v1_0/user/followings/${userId}`,
         method: 'DELETE'
     })
 }

//获取个人信息
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/profile'
    })
}

//修改个人信息
export const editUserFrofile = data => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/profile',
        data
    })
}

//更新用户头像
export const updateUserPhoto = data => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/photo',
        data
    })
}