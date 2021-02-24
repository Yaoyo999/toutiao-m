<template>
    <div class="comment-wrap">
     <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
>
<van-cell>评论列表</van-cell>
<CommentItem 
  v-for="(comment,index) in list"
  :key="index"
  :comment="comment"
  @reply-click="$emit('reply-click',$event)"
/>
  <!-- <van-cell 
  v-for="(comment,index) in list"
  :title="comment.content"
  :key="index"/> -->
</van-list>
    </div>

</template>
<script>
import { getComments } from '../../../api/comment'
import CommentItem from './comment-item'
export default {
name:'CommentList',
components: {
    CommentItem
},
 
props: {
    source: {
        type:[Number, String, Object],
        required: true
    },
    list: {
        type: Array,
        // 数组和对象的默认值只能通过函数返回
        default: () => [],
        // default: function () {
        //     return []
        // }
    },
    type: {
        type: String,
        default: 'a'
    }
},
 
data () {
return {
    //   list:[],
      loading: false,
      finished: false,
      offset: null, //页码
      limit: 10 //每页展示的条数.

      
}
} ,
 
computed: {},
 
watch: {},
 
methods: {
 async onLoad() {
    //  发送请求获取数据
   const { data } = await getComments({
       type:this.type,//评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
       source: this.source.toString(),//源id，文章id或评论id
       offset: this.offset,//获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
       limit: this.limit //获取的评论数据个数，不传表示采用后端服务设定的默认每页数据
   })
      console.log(data);
        // 将评论的总数量传递给父组件
      this.$emit('update-total-count',data.data.total_count)
    // 将数据放在list中
    const { results } = data.data
    this.list.push(...results)
    // 关闭loading状态
   this.loading = false
    // 判断是否还有数据
    if (results.length){
        this.offset = data.data.last_id
    }
    this.finished = true
    }
},
 
}
</script>
<style scoped lang='less'>
 
</style>