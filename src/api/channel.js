// 频道相关的接口
import request from '../utils/request'

// 获取所有频道列表
export const getAllChannels = () => {
    return request({
        url: '/app/v1_0/channels',
        method: 'GET'
    })
}

// 存储用户频道接口
export const addUserChannel = data => {
    return request({
        url: '/app/v1_0/user/channels',
        method: 'PATCH',
        data
    })
}

// 删除用户频道接口
export const deleteUserChannel = channelID => {
    return request({
        url: `/app/v1_0/user/channels/${channelID}`,
        method: 'DELETE',
    })
}