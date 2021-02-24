<template>
 <div class="comment-reply">
     <!-- 头部信息 -->
     <van-nav-bar
        :title="`${comment.reply_count}条回复`"
     >
         <van-icon
         @click="$emit('close')" 
         name="cross" 
         slot="left"/>
     </van-nav-bar>
     <!-- 查看回复的人 -->
     <CommentItem 
     :comment="comment"
     />
     <!-- 回复的列表 -->
     <CommentList
     :list="replyComment"
     :source="comment.com_id"
     type="c"
      />
        <!-- 点击发布回复的弹出层 -->
    <div center class="article-bottom">
      <van-button class="comment-btn" 
      round
      @click="isPostShow=true"
    >
      写评论
      </van-button>
    </div>

    <!-- 评论回复的弹出层 -->
       <van-popup 
        v-model="isPostShow" 
        position="bottom">
       <PostComment 
       :target="comment.com_id"
       :articleId="articleId"
       @post-success="PostSuccess"
       />
    </van-popup>
 </div>
 
</template>
<script>
import CommentItem from '../component/comment-item'
import CommentList from '../component/comment-list'
import PostComment from '../component/post-comment'
export default {
 
name:'CommentReply',
 
components: {
    CommentItem,
    CommentList,
    PostComment
},
 
props: {
    comment: {
        type: Object,
        required: true
    },
    articleId: {
        type: [Number,String,Object],
        required: true
    }
},
 
data () {
return {
    isPostShow:false,
    replyComment:[] //回复评论数组
}
} ,
 
computed: {},
 
watch: {},
 
methods: {
    // 评论回复成功
    PostSuccess (comment) {
        // 更新评论数组
        this.replyComment.unshift(comment)
        // 更新评论数量
        this.comment.reply_count++
        // 关闭弹出层
        this.isPostShow = false
    }
},
 
}
</script>
<style scoped lang='less'>
 .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 200px;
      height: 30px;
      border: 1px solid #eee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    }
</style>