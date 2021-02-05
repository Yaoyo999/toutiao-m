// 搜索相关的请求模块
import request from '../utils/request'

// 搜索联想建议的接口
export const getAllSearchSuggestions = q => {
    return request({
        url: '/app/v1_0/suggestion',
        method: 'GET',
        params: {
            q
        }
    })
}
// 获取搜索结果
export const getAllSearchResults = params => {
    return request({
        url: '/app/v1_0/search',
        method: 'GET',
        params
    })
}

// 获取用户搜索历史
export const getSearchHistories = () => {
    return request({
        url: '/app/v1_0/search/histories',
        method: 'GET'
    })
}