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

// 获取文章详情
export const getArticleById = articleId => {
   return request({
        url: `/app/v1_0/articles/${articleId}`,
        method: 'GET'
    })
}

//  添加收藏
export const addCollect = articleId => {
    return request({
         url: `/app/v1_0/article/collections`,
         method: 'POST',
         data: {
            target: articleId
         }
     })
 }

// 取消收藏
export const deleteCollcet = articleId => {
    return request({
         url: `/app/v1_0/article/collections/${articleId}`,
         method: 'DELETE'
     })
 }

//点赞
export const addLike = articleId => {
    return request({
         url: `/app/v1_0/article/likings`,
         method: 'POST',
         data: {
            target: articleId
         }
     })
 }

// 取消点赞
export const deleteLike = articleId => {
    return request({
         url: `/app/v1_0/article/likings/${articleId}`,
         method: 'DELETE'
     })
 }