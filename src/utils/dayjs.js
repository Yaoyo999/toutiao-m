// dayjs时间库
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 导入中文语言
// 相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // 全局使用简体中文

// 把处理相对时间的代码包包装为全局过滤器
// 然后就可以在任何的组件模板中使用了
//所谓过滤器其实就是一个可以在模板中调用的函数而已
// 在组件的模板中使用过滤器：{{xxx | 过滤器的名字函数名relativeTime}}
// 管道符前面的内容会作为参数传递给过滤器函数
// 过滤器返回值会渲染到使用过滤器的模板中
Vue.filter('relativeTime',val => {
    return dayjs().to(dayjs(val))
})

Vue.filter('date-time',(val,format='YYYY-MM-DD HH:mm:ss') => {
    return dayjs(val).format(format)
})

// 日期格式化
// console.log(dayjs().format('YYYY-MM-DD HH:MM:ss'));

// console.log(dayjs().to(dayjs('2021-1-1')));