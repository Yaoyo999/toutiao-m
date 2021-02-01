<template>
  <div class="login-container">
   <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 只有表单验证通过才会触发onLogin事件 -->
    <van-form 
    @submit="onLogin"
    :show-error="false"
    :show-error-message="false"
    @failed="onFailed"
    :validate-first="true"
    ref="login-form"
    >
  <van-field
    center
    v-model="user.mobile"
    icon-prefix="toutiao"
    left-icon="shouji"
    placeholder="请输入手机号"
    name="mobile"
    :rules="FormRules.mobile"
  />
  <van-field
    center
    v-model="user.code"
    clearable
    icon-prefix="toutiao"
    left-icon="yanzhengma"
    placeholder="请输入验证码"
    name="code"
    :rules="FormRules.code"
  >
    <template #button>
    <van-count-down 
     :time="1000*60"
     format="ss s"
     v-if="isCountDownShow"
     @finish="isCountDownShow=false"
      />
    <van-button 
    size="mini" 
    round class="send-btn" 
    @click.prevent="onSendSms"
    v-else
    :loading="isSendSmsLoading"
    loading-type="spinner"
    >发送验证码
    </van-button>
  </template>
  </van-field>
  <div class="login-btn-wrap">
  <van-button type="info" class="login-btn" block>登录</van-button>
</div>
  </van-form>

  </div>
</template>
<script>
import {login} from '../../api/user'
import {SendSms} from '../../api/Sms'
import {Toast} from 'vant'
export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      FormRules:{
        mobile:[
          { required: true, message: '请填写手机号' },
          {pattern:/^1[3,5,7,8,9]\d{9}$/,message:'请输入合法的手机号'}
          ],
        code:[
          { required: true, message: '请填写验证码' },
          {pattern:/^\d{6}$/,message:'验证码格式错误'}
          ]
      },
      // 控制倒计时和发送按钮的显示状态
      isCountDownShow: false,
      // 发送短息验证码时的loading(防止用户网络差或故意点击多次发送多次请求，加载效果与禁用一样)
      isSendSmsLoading:false
    }
  },
  methods: {
   async onLogin () {
     Toast.loading({
       message: '登陆中',// 设置登录文本
      forbidClick: true,// 禁止背景点击
      duration:0 // duration: 0, // 持续展示 toast
})
     try {
        const {data} = await login(this.user)
        Toast.success('登录成功');
        // 将后端返回数据存储在vuex中
        this.$store.commit('setUser',data.data)
        this.$router.back()
         console.log(data);
    } catch (error) {
      Toast.fail('登录失败');
      console.log(error);
      this.user.mobile = ''
      this.user.code = ''
    }
   
    },
    onFailed (error) {
      console.log(error);
      if (error.errors[0]){
        Toast({
          message:error.errors[0].message,
          position:'top'// 防止手机键盘太高看不见
        })
      }
    },
    async onSendSms () {
      // 加了-横线 读取属性采用[]的方式 该方法返回的是一个promice对象
    try {
      // 成功返回的是undefined
      await this.$refs['login-form'].validate('mobile')
      //  验证通过，发送请求获取短信验证码
      this.isSendSmsLoading = true //展示按钮的loading状态
     const result = await SendSms(this.user.mobile)
    //  短信发送出去了，隐藏发送按钮，显示倒计时
     this.isCountDownShow = true
    //  console.log(result);
    //  短信发送出去了，显示倒计时
    } catch (err) {
      // try里面任何代码的错误都会进入catch,不同的错误需要有不同的提示那就需要判断了
      let message = ''
      // 有错误并且是响应的错误，并且响应的错误的状态码是429
      if (err && err.response && err.response.status === 429) {
        message = '发送太频繁了，请稍后重试'
        // 手机号的错误
      } else if (err.name === 'mobile') {
        message = err.message
        this.user.mobile = ''
      } else {
        // 未知错误
        message = '发送失败,请稍后重试'
      }
      console.log('验证失败',err);
      Toast({
        message:message,
        position:'top'
      })
    }
    // 无论发送成功还是失败都要关闭发送按钮的loading 
    this.isSendSmsLoading = false
    }
  }
}
</script>
<style scoped lang='less'>
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__content {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      border-radius: 5px;
      background-color: #6db4fb;
      outline: none;
      border: none;
      .van-button__text{
        font-size: 15px;
      }
    }
  }
}
</style>
