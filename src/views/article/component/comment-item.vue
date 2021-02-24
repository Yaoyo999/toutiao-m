<template>
    <van-cell class="comment-wrap">
        <van-image
        class="avatar"
        slot="icon"
        round
        fit="cover"
        :src="comment.aut_photo"
/>
    <div slot="title">
        <div class="title-wrap">
            <div class="name">{{ comment.aut_name}}</div>
            <div slot="default" class="like-wrap" @click="onLike">
            <van-icon  class="like-icon" 
            :class="{active: comment.is_liking}"
            :name="comment.is_liking ? 'good-job' : 'good-job-o'" 
            />
            <span class="like-count" v-show="comment.like_count">{{comment.like_count}}</span>
            </div>
        </div>
        <div class="content">{{ comment.content}}</div>
        <div class="button-wrap">
            <span class="pubdate">{{comment.pubdate | date-time('MM-DD HH:mm')}}</span>
            <van-button
                size="mini"
                round
                class="reply-btn"
                @click="$emit('reply-click',comment)"
            >{{comment.reply_count}} 回复</van-button>
        </div>
    </div>
    </van-cell>
</template>
<script>
import { addCommentLike, deleteCommentLike } from '../../../api/comment'
export default {
 
name:'CommentItem',
 
components: {},
 
props: {
    comment: {
        type: Object,
        required: true
    }
},
 
data () {
return {}
} ,
 
computed: {},
 
methods: {
    async onLike () {
        const commentId = this.comment.com_id.toString()
        if (this.comment.is_liking) {
         // 如果已经点赞，取消点赞
         await deleteCommentLike(commentId)
         this.comment.like_count--
        } else {
         // 如果没有点赞，点赞
         await addCommentLike(commentId)
         this.comment.like_count++
        }
        // 更新视图
        this.comment.is_liking = !this.comment.is_liking
    }
},
 
}
</script>
<style scoped lang='less'>
 .comment-wrap {
     .avatar {
     width: 36px;
     height: 36px;
     margin-right: 13px;
     }
     .name {
         font-size: 14px;
         color: #406599;
     }
     .content {
         font-size: 16px;
         color: #222222;
     }
     .pubdate {
         font-size: 10px;
         margin-right: 10px;
     }
  .title-wrap {
      display: flex;
      justify-content: space-between;
  }
  .like-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .button-wrap {
      display: flex;
      align-items: center;
  }
  .active {
      color: orange;
  }
 }
</style>