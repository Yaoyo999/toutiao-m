<template>
 <div class="user-chat">
     <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 消息类表 -->
<van-cell-group class="message-list" ref="msgList">
  <van-cell  v-for="(item,index) in messages" :key="index" class="items" center :border="false">
    <div slot="title">{{item.msg}}</div>
    <van-image
     width="30"
     height="30"
     round
     fit="cover"
     :src="user.photo"
/>
  </van-cell>
</van-cell-group>
<!-- 底部发送按钮 -->
<van-cell-group class="send-wrap">
    <van-field v-model="message" :border="false"  placeholder="请输入消息" />
    <van-button type="primary" size="small" @click="onSendMessage">发送</van-button>
</van-cell-group>
 </div>
</template>
<script>
import { io } from "socket.io-client"
import { setItem, getItem } from '../../utils/storage'
import { getCurrentUserInfo } from '../../api/user'
export default {
 
name:'UserChat',
 
components: {},
 
props: {},
 
data () {
return {
    message:'',//输入框的消息,
    socket: null,
    messages:getItem('chat-message') || [], //收发消息的列表
    user: {}
}
} ,
 
computed: {},
 
watch: {
  // 监视messages的变化
  messages () {
    setItem('chat-message',this.messages)
    // 滚动条保持在底部
    // 数据改变影响视图更新这件事不是立即的
    // 如果你要在操作数据之后立即操作影响视图的DOM，那么最好把代码放在nextTick中
   this.$nextTick(()=>{
      this.scorllBottom()
   })
  }
},
created(){
  // const socket = io("http://ttapi.research.itcast.cn/");
  // this.socket = socket
  // // 建立连接的回调函数
  // socket.on('connect',() => {
  //   console.log('建立连接成功');
  // })
  // socket.on('disconnect',() =>{
  //   console.log('连接断开');
  // })
  // socket.on('message',data =>{
  //   // 将服务器返回的消息保存在类表中
  //   this.messages.push(data)
  // })
  this.loadGetUserInfo()
},
mounted(){
  // 挂载时调用
  this.scorllBottom()
},
methods: {
   onSendMessage(){
    const data = {msg: this.message,timestamp: Date.now()}
    //  请求发送消息
    //  this.socket.emit('message',data)
    // 将客户端发送的消息保存到列表中
     this.messages.push(data)
    //  请空输入框
     this.message = ''
    //到达底部
 },
  scorllBottom(){
    // 获取dom
   const list = this.$refs.msgList
  //  让距离顶部的距离等于列表滚动条的高度
   list.scrollTop = list.scrollHeight
  },
async loadGetUserInfo (){
 const {data} = await getCurrentUserInfo()
 console.log(data);
 this.user = data.data

}

},
 
}
</script>
<style scoped lang='less'>
 .message-list{
        position:fixed;
        left:0;
        right:0;
        top:46px;
        bottom:44px;
        overflow-y:auto;
    }
  .send-wrap {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0 10px;
      display: flex;
      align-items: center;
  }
</style>