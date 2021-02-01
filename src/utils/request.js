/**
 * 
 * 请求模块
 */
// 在非组件模块中获取store必须通过这种方式
// 这里单独加载store，和在组件中this.$store是一个东西
import store from '../store/'
import axios from 'axios'

// 创建一个axios实例
const request = axios.create({
    baseURL:'http://ttapi.research.itcast.cn/' // 基础路径
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    const { user } = store.state
    // 如果用户已经登录，统一给接口设置token信息
    if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
    }
    // console.log(config); 
    // 处理完之后一定要把config返回
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
// 响应拦截器

// 导出
export default request
