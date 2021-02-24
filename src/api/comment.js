// 评论相关的请求模块
import request from '../utils/request'

// 获取评论
export const getComments = params => {
    return request({
        type: 'GET',
        url:'/app/v1_0/comments',
        params
    })
}

// 添加点赞的请求函数
export const addCommentLike = commentId => {
    return request({
        method: 'POST',
        url:'/app/v1_0/comment/likings',
        data: {
            target: commentId
        }
    })
}

// 取消点赞的请求函数
export const deleteCommentLike = commentId => {
    return request({
        method: 'DELETE',
        url:`/app/v1_0/article/likings/${commentId}`
    })
}

// 发布评论
export const addComment = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/comments',
        data
    })
}