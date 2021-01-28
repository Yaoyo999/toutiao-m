<template>
  <div id="app">
    <div id="nav">
      <h3>黑马头条</h3>
    </div>
    <!-- 路由的出口 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  // 取名字方便我们在调试工具中搜索该组件
  name: 'App'
}
</script>

<style lang="less"></style>
