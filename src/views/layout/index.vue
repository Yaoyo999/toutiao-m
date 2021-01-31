<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 底部导航 -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" @click="changeNav('/')">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" @click="changeNav('/qa')">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" @click="changeNav('video')">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o" @click="changeNav('my')">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'layoutIndex',
  data () {
    return {
      active: 0
    }
  },
  methods: {
    changeNav (key) {
      if (key) {
        this.$router.replace(key)
      }
    }
  }
}
</script>
<style scoped lang='less'>
</style>
