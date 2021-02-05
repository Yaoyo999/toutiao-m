<template>
 <div class="search-history">
     <van-cell
    title="搜索历史"
     >      
     <!--错误示例 searchHistories = []
        prop 数据如果是引用类型（数组，对象） 可以修改，注意这个修改指的是内部的修改 user.name
        arr.push(123) arr.splice(0,1)

        但是任何 prop 数据都不能重新赋值 xxx = xxx
        如果你想让 prop 数据 = 新的数据 让父组件自己修改
       -->
        <div v-if="isDeleteShow">
            <span @click="$emit('delete-histories',[])">全部删除</span>
            &nbsp; &nbsp; &nbsp;
            <span @click="isDeleteShow=false">完成</span>
        </div>
        <van-icon
        @click="isDeleteShow = true"
        v-else 
        name="delete-o"
        
         />
     </van-cell>

     <van-cell
     @click="deleteHistory(history,index)"
     :title="history"
     v-for="(history,index) in searchHistories"
     :key="index"
     >
    <van-icon name="close" v-show="isDeleteShow"/>
     
     </van-cell>

 </div>
</template>
<script>
import { setItem } from '../../../utils/storage'
export default {
 
name:'SearchHistory',
 
components: {},
 
props: {
    searchHistories: {
        type: Array,
        required: true
    }
},
 
data () {
return {
    isDeleteShow: false //删除的展示状态
}
} ,
 
computed: {},
 
watch: {
},
 
methods: {
    // 删除历史记录
    deleteHistory (history,index) {
        // 如果删除状态下
        if (this.isDeleteShow) {
            // 删除数组中的数据
        this.searchHistories.splice(index,1)
        // 发送请求删除在线数据(接口默认是删除全部的数据，没有意义这里只删除本地的接口)
        // 删除本地存储的数据
        // setItem('search-histories',this.searchHistories)
        return
        }
        // 不是删除状态，点击搜索结果
        this.$emit('search',history)
      
    }
},
 
}
</script>
<style scoped lang='less'>
 
</style>