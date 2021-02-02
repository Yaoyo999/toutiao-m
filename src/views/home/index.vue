<template>
    <div class="login-container">
      <van-nav-bar class="app-nav-bar">
        <van-button 
         type="info"
        slot="title"
        icon="search"
        class="search-btn"
        round
        size="small"
        >搜索</van-button>
    </van-nav-bar>
<!-- 文章频道列表 
标签页组件有一个功能，只有你第一次使用查看标签页的时候才会渲染里面的内容第二次查看就不会渲染
-->
    <van-tabs v-model="active" class="channel-wrap">
        <van-tab 
        v-for="(channel,index) in channels"
        :key="index"
        :title="channel.name"
        >
       <ArticleList :channel="channel" />
        </van-tab>
</van-tabs>
    </div>
</template>
<script>
import { getUserChannels } from '../../api/user'
import ArticleList from './components/article-list.vue'
export default {
  name: 'homeIndex',
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  created () {
    this.loadUserChannels()
  },
  methods: {
    async loadUserChannels () {
      const {data} = await getUserChannels()
      console.log(data);
      this.channels = data.data.channels
    }
  },
  components: {
    ArticleList
  }
}
</script>
<style scoped lang='less'>
  .login-container {
    /deep/.van-nav-bar__title{
      max-width: none;
    }
    .search-btn {
      width: 277px;
      height: 32px;
      background-color: #5babfb;
      border:none
      .van-button__icon {
        font-size: 16px;
      }
      .van-button__text{
        font-size: 14px;
      }
    }
    .channel-wrap {
      /deep/.van-tab {
        border-right: 1px solid #faf5f5;
        border-bottom: 1px solid #faf5f5;
      }
      /deep/.van-tabs__line{
        height: 3px;
        width: 15px;
        background: #3296fa;
        bottom: 21px;
      }
    }

  }
</style>
