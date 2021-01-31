<template>
    <div class="login-container">
    <van-cell-group>
       <van-cell 
       center
       >
        <van-image
          slot="icon"
          width="50"
          height="50"
          fit="cover"
          round
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <div slot="title">黑马头条号</div>
        <van-button 
        slot="default"
        size="small"
        round
        >编辑资料
        </van-button>
       </van-cell>
   <van-grid>
    <van-grid-item text="文字" >
      <div slot="text">
        <div>123</div>
        <div>头条</div>
      </div>
    </van-grid-item>
    <van-grid-item text="文字" >
      <div slot="text">
        <div>123</div>
        <div>关注</div>
      </div>
    </van-grid-item>
    <van-grid-item text="文字" >
      <div slot="text">
        <div>123</div>
        <div>粉丝</div>
      </div>
    </van-grid-item>
    <van-grid-item text="文字" >
      <div slot="text">
        <div>123</div>
        <div>获赞</div>
      </div>
    </van-grid-item>
  </van-grid>
</van-cell-group>
<van-grid :column-num="2">
  <van-grid-item icon-prefix="toutiao" icon="shoucang" text="收藏" />
  <van-grid-item icon-prefix="toutiao" icon="lishi" text="历史" />
</van-grid>
<van-cell-group>
  <van-cell title="消息通知" is-link/>
  <van-cell title="小智同学" is-link/>
</van-cell-group>
<van-button type="default" size="large">退出登录</van-button>
</div>
</template>
<script>
export default {
  name: 'myIndex'
}
</script>
<style scoped lang='less'>
</style>
