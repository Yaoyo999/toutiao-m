<template>
<!-- 导航栏 -->
 <div class="user-profile">
     <van-nav-bar
        class="app-nav-bar"
        title="个人中心"
        left-arrow  
        @click-left="$router.back()"
/>
  <input 
  type="file" 
  hidden 
  ref="file" 
  accept="image/*"
  @change="onFileChange"
  />
    <van-cell
    @click="$refs.file.click()" 
    title="头像" 
    is-link 
    center
    >
    <van-image
        width="35"
        height="35"
        fit="cover"
        round
        :src="user.photo"
/>
    </van-cell>
    <van-cell 
      title="昵称" 
      is-link 
      :value="user.name"
      @click="isEditNameShow = true"
    ></van-cell>
    <van-cell 
    title="性别" 
    @click="isEditGenderShow=true"
    is-link 
    :value="user.gender === 1 ? '女' : '男' "
     ></van-cell>
    <van-cell 
    title="生日" 
    is-link 
    :value="user.birthday"
    @click="isEditBirthdayShow=true"
    ></van-cell>
<!-- 修改昵称的弹出层 -->
    <van-popup 
    v-model="isEditNameShow" 
    position="bottom" 
    :style="{ height: '100%' }"
    >
    <updateName
    v-if="isEditNameShow"
     @close="isEditNameShow = false"
     :name="user.name"
     @update-name="user.name = $event"
    />
    </van-popup>
<!-- 修改性别的弹出层 -->
    <van-popup 
    v-model="isEditGenderShow" 
    position="bottom"
    >
    <updateGender
      @close="isEditGenderShow=false"
      v-model="user.gender"
     />
    </van-popup>
  <!-- 修改生日的弹出层 -->
  <van-popup 
  v-model="isEditBirthdayShow" 
  position="bottom" 
  >
  <updateBirthday
  v-if="isEditBirthdayShow"
  v-model="user.birthday"
  @close="isEditBirthdayShow=false"
  />
  </van-popup>
  <!-- 修改头像的弹出层 -->
  <van-popup 
    v-model="isEditPhotoShow" 
    position="bottom" 
    :style="{ height: '100%' }" 
    >
    <updatePhoto
    v-if="isEditPhotoShow"
    :file="preImage"
    @close="isEditPhotoShow=false"
    @update-photo="user.photo=$event"
    />
    </van-popup>
 </div>
</template>
<script>
import { getUserProfile } from '../../api/user'
import updateName from './components/update-name'
import updateGender from './components/update-gender'
import updateBirthday from './components/update-birthday'
import updatePhoto from './components/update-photo'
export default {
 
name:'userProfile',
 
components: {
  updateName,
  updateGender,
  updateBirthday,
  updatePhoto
},
 
props: {},
 
data () {
return {
    user: {}, //用户个人信息
    isEditNameShow: false, //控制昵称的弹出层
    isEditGenderShow: false, //修改性别的显示状态
    isEditBirthdayShow: false,//修改生日的显示状态
    isEditPhotoShow: false, //修改头像的显示状态
    preImage: null //预览的图片
}
} ,
 
computed: {},

created (){
  this.loadUserProfile()
},
watch: {},
 
methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
    //   console.log(data);
      this.user = data.data
    },
    // 当input选择文件的时候触发
    onFileChange(){
      // 展示弹出层
      this.isEditPhotoShow = true
      // 获取到input选择的值
      // const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      // console.log(blob);
      const file = this.$refs.file.files[0]
      this.preImage = file
      // 解决选择相同的图片时不触发的问题
      this.$refs.file.value = ''
    }
},
 
}
</script>
<style scoped lang='less'>
 .van-popup{
     background-color: #000;
 }
</style>