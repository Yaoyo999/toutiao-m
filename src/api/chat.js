// 发送消息的请求函数
import request from '../utils/request'

export const reqSendMessage = data => {
    return request({
        url: '/app/socket.io',
        method:'POST',
        data
    })
}