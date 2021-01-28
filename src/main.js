import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式文件
import './styles/index.less'

// 配置生产环境提示
Vue.config.productionTip = false
// 创建Vue根实例 将router,store配置到根实例中
// 把App 根组件渲染到#app节点上
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
