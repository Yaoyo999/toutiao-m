<template>
    <div class="login-container">
    <van-cell-group class="my_info" v-if="user">
       <van-cell 
       center
       :border="false"
       class="base_info"
       >
        <van-image
        class="avatar"
          slot="icon"
          fit="cover"
          round
          :src="CurrentUser.photo"
        />
        <div slot="title" class="name">{{CurrentUser.name}}</div>
        <van-button 
        class="update-btn"
        slot="default"
        size="small"
        round
        >编辑资料
        </van-button>
       </van-cell>
   <van-grid :border="false" class="data-info">
    <van-grid-item text="文字" class="data-info-item" >
      <div slot="text" class="text-wrap">
        <div class="count">{{CurrentUser.art_count}}</div>
        <div class="text">头条</div>
      </div>
    </van-grid-item>
    <van-grid-item text="文字" class="data-info-item" >
      <div slot="text" class="text-wrap">
        <div class="count" >{{CurrentUser.follow_count}}</div> 
        <div class="text">关注</div>
      </div>
    </van-grid-item>
    <van-grid-item text="文字" class="data-info-item" >
      <div slot="text" class="text-wrap">
        <div class="count" >{{CurrentUser.fans_count}}</div>
        <div class="text">粉丝</div>
      </div>
    </van-grid-item>
    <van-grid-item text="文字" class="data-info-item" >
      <div slot="text" class="text-wrap">
        <div class="count" >{{CurrentUser.like_count}}</div>
        <div class="text">获赞</div>
      </div>
    </van-grid-item>
  </van-grid>
</van-cell-group>

  <div
   class="not-login" 
   v-else
   @click="$router.push('/login')">
    <div>
      <img src="./mobile.png" class="mobile" />
      <div class="text">登录 / 注册</div>
    </div>
  </div>
<van-grid :column-num="2" class="nav-grid mb-4" :border="false">
  <van-grid-item icon-prefix="toutiao" icon="shoucang" text="收藏" class="nav-grid-item" />
  <van-grid-item icon-prefix="toutiao" icon="lishi" text="历史" class="nav-grid-item" />
</van-grid>

<van-cell-group class="mb-4">
  <van-cell title="消息通知" is-link />
  <van-cell title="小智同学" is-link />
</van-cell-group>
  <van-cell 
  v-if="user" 
  title="退出登录" 
  class="logout-cell"
  @click="logout"
  />
</div>
</template>
<script>
import {Dialog} from 'vant'
import { mapState } from 'vuex'
import { getCurrentUserInfo } from '../../api/user'
export default {
  name: 'myIndex',
  data () {
    return {
      CurrentUser: {}
    }
  },
  created () {
    // 创建就会调用这个方法封装成方法
    this.loadCurrentUser()
  },
  mounted () {

  },
  computed:{
    ...mapState(['user'])
  },
  methods:{
    logout() {
      Dialog.confirm({
       title: '退出提示',
      message: '你确定要退出吗?'
})
  .then(() => { //确认时调用
    // on confirm
    this.$store.commit('removeUser','toutiao-user')
  })
  .catch(() => { //取消时调用，不作任何处理
    // on cancel
  })
    },
   async loadCurrentUser () {
     const { data } = await getCurrentUserInfo()
    //  console.log(data);
     this.CurrentUser = data.data
    }
  }
}
</script>
<style scoped lang='less'>
.login-container {
  .my_info { 
    background: url('./banner.png') no-repeat;
    background-size: cover;
      /deep/.van-grid-item__content {
    background-color: unset;
  }
    .base_info {
    background-color: unset;
    height: 115px;
    box-sizing: border-box;
    padding-top: 38px;
    padding-bottom: 11px;
    .avatar {
      width: 66px;
      height: 66px;
      border: 1px solid #fff;
      box-sizing: border-box;
      margin-right: 11px;
    }
    .name {
      color: #fff;
      font-size: 15px;
    }
    .update-btn {
      height: 16px;
      font-size: 10px;
      color: #666666;
    }
  }
  }
  .data-info {
    .data-info-item {
      height: 65px;
      color: #fff;
    .text-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .count {
        font-size: 18px;
      }
      .text {
        font-size: 11px;
      }
    }
    }
  }
  .not-login {
    height: 180px;
    background: url('./banner.png') no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
  /deep/.nav-grid {
    background-color: #fff;
    .nav-grid-item {
      height: 70px;
      .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }
   .mb-4{
    margin-bottom: 4px; 
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
 
}
</style>
