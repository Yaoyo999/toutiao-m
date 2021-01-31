import Vue from 'vue'
import Vuex from 'vuex'
import { getItem,setItem } from '../utils/storage'

Vue.use(Vuex)
const USER_KEY = 'toutiao-user'
export default new Vuex.Store({
  state: {
    // user: JSON.parse(window.localStorage.getItem('user')) //存储后端响应的token等数据 从本地存储里面得到数据这样刷新页面时就不会为空
    user: getItem(USER_KEY)//存储后端响应的token等数据 从本地存储里面得到数据这样刷新页面时就不会为空
  },
  mutations: {
    setUser (state,data) {
      state.user = data
      // 为了防止刷新页面数据丢失，我们还需要把数据放到本地存储中，这里仅仅是为了持久化和得到数据
      // window.localStorage.setItem('user',JSON.stringify(state.user))
      setItem(USER_KEY,state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
