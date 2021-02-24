<template>
    <div class="update-photo">
        <img :src="image" ref="image">
        <!-- 底部内容 -->
        <van-nav-bar
            class="nav-bar-photo"
            left-text="取消"
            right-text="确定"
            @click-left="$emit('close')"
            @click-right="onConfrim"
            />
    </div>
</template>
<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '../../../api/user'
export default {
 
name:'updatePhoto',
 
components: {},
 
props: {
    file:{
        required: true
    }
},
 
data () {
return {
    image: window.URL.createObjectURL(this.file),
    cropper: null //裁切器示例
}
} ,
 
computed: {},
 
watch: {},

mounted (){
   const image = this.$refs.image
   this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
  })
},
 
methods: {
    getCroppedCanvas (){
    return new Promise((resolve) => {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        resolve(blob)
      })
    })
  },
    async onConfrim () {
        this.$toast.loading({
            message: '保存中',
            forbidClick: true,
            duration: 0 //持续展示 0 表示持续展示
        })
        const file = await this.getCroppedCanvas()
        const fd = new FormData
        fd.append('photo',file)
        // Content-Type 是 multipart/form-data 不能传递{} 一定要传递FormData数据对象 专门用于数据上传

        // const fd = new FormData
        // fd.append('photo',this.file)
        await updateUserPhoto(file)
        // 更新父组件头像
        this.$emit('update-photo',window.URL.createObjectURL(file))
        // 提示
        this.$toast.success('更新成功')
        //关闭弹出层
        this.$emit('close')
    }
},
 
}
</script>
<style scoped lang='less'>
    .nav-bar-photo{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #000;
        .van-nav-bar__text {
          color: #fff!important;
    }
    }
  
</style>