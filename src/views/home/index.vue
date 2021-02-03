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
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 文章频道列表 
标签页组件有一个功能，只有你第一次使用查看标签页的时候才会渲染里面的内容第二次查看就不会渲染
-->
    <van-tabs v-model="active" class="channel-wrap">
      <van-tab
        v-for="(channel, index) in channels"
        :key="index"
        :title="channel.name"
      >
        <ArticleList :channel="channel" />
      </van-tab>

      <!-- 因为汉堡图标fixed脱离了文档流导致最后一个channel显示不完全用一个空的channel进行占位 -->
      <div class="wap-nav-placeholeder" slot="nav-right"></div>
      <div
        class="wap-nav-wrap"
        slot="nav-right"
        @click="isShowChannelEdit = true"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
      get-container="body"
      v-model="isShowChannelEdit"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 模板中的$event 表示事件参数  这里的$event就是传过来的index-->
      <ChannelEdit
        :userChannels="channels"
        @close="isShowChannelEdit = false"
        @update-active="active = $event"
        :active="active"
      />
    </van-popup>
  </div>
</template>
<script>
import { getUserChannels } from '../../api/user';
import ArticleList from './components/article-list.vue';
import ChannelEdit from './components/channel-edit';
import { mapState } from 'vuex';
import { getItem } from '../../utils/storage';
export default {
  name: 'homeIndex',
  data() {
    return {
      active: 0,
      channels: [],
      isShowChannelEdit: true, // 是否显示弹出层
    };
  },
  created() {
    this.loadUserChannels();
  },
  methods: {
    async loadUserChannels() {
      // 如果用户登录了，获取线上用户频道列表
      let channels = [];
      if (this.user) {
        const { data } = await getUserChannels();
        // console.log(data);
        channels = data.data.channels;
      } else {
        // 没有登录，判断用户是否有本地储存
        const localChannels = getItem('user-channels');
        if (localChannels) {
          channels = localChannels;
        } else {
          // 如果用户既没有登录又没有本地储存就获取默认推荐的频道列表
          const { data } = await getUserChannels();
          // console.log(data);
          channels = data.data.channels;
        }
      }
      // 把处理好的数据放到data中一共模板使用
      this.channels = channels;
    },
    // 更新active
    // UpdateActive (index) {
    //   this.active = index
    // }
  },
  components: {
    ArticleList,
    ChannelEdit,
  },
  computed: {
    ...mapState(['user']),
  },
};
</script>
<style scoped lang='less'>
.login-container {
  /deep/.van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background-color: #5babfb;
    border:none .van-button__icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  .channel-wrap {
    /deep/.van-tab {
      border-right: 1px solid #faf5f5;
      border-bottom: 1px solid #faf5f5;
    }
    /deep/.van-tabs__line {
      height: 3px;
      width: 15px;
      background: #3296fa;
      bottom: 21px;
    }
  }
  .wap-nav-placeholeder {
    width: 33px;
    height: 43px;
    flex-shrink: 0;
  }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    background-color: #fff;
    opacity: 0.9;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-icon {
      font-size: 24px;
    }
    &::before {
      content: '';
      background: url('./line.png');
      background-size: contain;
      width: 1px;
      height: 43px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>
