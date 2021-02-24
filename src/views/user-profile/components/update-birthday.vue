<template>
 <div class="update-birthday">
     <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
/>
 </div>
</template>
<script>
import { editUserFrofile } from '../../../api/user'
export default {
 
name:'',
 
components: {},
 
props: {
    value: {
        type: String,
        required: true
    }
},
data () {
return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
}
} ,
 
computed: {},
 
watch: {},

methods: {
   async onConfirm () {
       this.$toast.loading({
           message: '保存中',
           forbidClick: true //禁止背景点击
       })
        const date = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth()+1}-${this.currentDate.getDate()}`
        console.log(date);
        // 发送请求
       await editUserFrofile({
           birthday: date
       })
       this.$toast.success('保存成功')
    //通知父组件更新日期
    this.$emit('input',date)
    // 关闭弹出层
    this.$emit('close')
   }
},
 
}
</script>
<style scoped lang='less'>
 
</style>