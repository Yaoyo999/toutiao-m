import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载Vant组件库
import Vant from 'vant'

// 加载Vant组件库样式
import 'vant/lib/index.css'

// 加载全局样式文件(最好放到最后，方便覆盖第三方样式)
import './styles/index.less'

// 自动设置rem基准值(html字体大小)
import 'amfe-flexible'

import './utils/dayjs'
// 全局注册Vant中的
Vue.use(Vant)

// 配置生产环境提示
Vue.config.productionTip = false
// 创建Vue根实例 将router,store配置到根实例中
// 把App 根组件渲染到#app节点上
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
