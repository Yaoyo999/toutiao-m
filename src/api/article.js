// 包含所有文章列表的请求函数
import request from '../utils/request'

// 获取文章列表
export const getArticles = params => {
    return request({
        type: 'GET',
        url: '/app/v1_1/articles',
        params
    })
}