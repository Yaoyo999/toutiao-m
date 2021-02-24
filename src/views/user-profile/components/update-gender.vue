<template>
    <div class="update-gender">
    <van-picker
        show-toolbar
        :columns="columns"
        @cancel="$emit('close')"
        @confirm="onConfirm"
        @change="onChangeGender"
        :default-index="defaultIndex"
  />
    </div>
</template>
<script>
import { editUserFrofile } from '../../../api/user'
export default {
 
name:'updateGender',
 
components: {},
 
props: {
    value: {
        type:Number,
        required:true
    }
},
 
data () {
return {
    columns: ['男','女'],//列表选项
    defaultIndex:this.value
}
} ,
 
computed: {},
 
watch: {},
 
methods: {
    onChangeGender(picker,value,index){
       this.defaultIndex = index
    },
     async onConfirm() {
    // 发送请求更新昵称
        await editUserFrofile({
          gender: this.defaultIndex,
        });
        // 更新父组件传过来的name
        this.$emit('input', this.defaultIndex)
        // 提示
        this.$toast.success({
          message: '更新成功',
        });
        // 关闭弹出层
        this.$emit('close');
    }
},
 
}
</script>
<style scoped lang='less'>
 
</style>