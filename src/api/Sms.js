// 发送短信验证码的请求
import request from '../utils/request'

export const SendSms = data => {
    return request({
        method:'GET',
        url:`/app/v1_0/sms/codes/ss${data}`,
        data
    })
}