<template>
 <div class="article-warp">
      <van-nav-bar
        class="app-nav-bar" 
        title="文章详情"
        left-arrow
        @click-left="$router.back()"
/>
    <div class="content-wrap">
    <h1 class="title">{{article.title}}</h1>

    <van-cell
    class="user-info"
    center
    >
    <van-image
    class="avatar"
    slot="icon"
    round
    size="small"
    :src="article.aut_photo"
/>
    <div slot="title" class="name">{{article.aut_name}}</div>
    <div class="pubdate" slot="label">{{article.pubdate | relativeTime }}</div>

    <van-button
    :loading="isFollowTrue"
    @click="onFollow"
    class="follow-btn"
    :type="article.is_followed ? 'default' : 'info'"
    :icon="article.is_followed ? '' : 'plus'"
    slot="default"
    round
    size="small"
    >{{article.is_followed ? '已关注': '关注'}}</van-button>
    </van-cell>
    <div class="content markdown-body" v-html="article.content" ref="content-wrap">
    </div>

    <!-- 文章底部 -->
    <div center class="article-bottom">
      <van-button class="comment-btn" 
      round 
      @click="isPostShow = true"
      >写评论</van-button>
      <van-icon name="comment-o" :badge="commentTotalCount" />
      <van-icon
      @click="onCollect"
      :name="article.is_collected ? 'star' : 'star-o'" 
      :color="article.is_collected ? 'orange':'#777'  "/>
      <van-icon
      @click="onLike" 
      :name="article.attitude === 1 ? 'good-job' : 'good-job-o'" 
      :color="article.attitude === 1 ? 'hotpink' : '#777'" />
      <van-icon name="share-o" color="#777" />
    </div>

    <CommentList
    @reply-click="onReply"
    :source="articleId"
    :list="CommentList"
    @update-total-count="commentTotalCount = $event"
    />
    </div>
    <!-- 发表评论的弹出层 -->
    <van-popup 
    v-model="isPostShow" 
    position="bottom">
    <PostComment 
    :target="articleId"
    @post-success="onPostComment"
    />
    </van-popup>
    <!-- 回复评论的弹出层 -->
      <van-popup 
    v-model="isReplyShow" 
    position="bottom">
    <!-- 这里使用v-if的目的是让组件随着弹出层的显示进行渲染和销毁，得到不同的数据，解决组件懒加载 防止加载过得组件不重新渲染导致数据不会重新加载的问题 -->
    <CommentReply
    :articleId="articleId"
    v-if="isReplyShow"
    :comment="replyComment"               
    @close="isReplyShow=false"   
    />
    </van-popup>
 </div> 
</template>
<script>
import './github-makdown-css.css'
import {
    getArticleById,
    addCollect,
    deleteCollcet,
    addLike,
    deleteLike
} from '../../api/article'
import { addFollow, deleteFollow } from '../../api/user'
import { ImagePreview } from 'vant';
import CommentList from './component/comment-list'
import PostComment from './component/post-comment'
import CommentReply from './component/comment-reply'
export default {
//  在组件中获取动态路由参数
// 方式一:this.$route.params.xxx
// 方式二:props传参 (推荐)
name:'ArticleIndex',
 
components: {
    CommentList,
    PostComment,
    CommentReply
},
 
props: {
    articleId: {
        type: [String,Number,Object],
        required: true
    }
},
 
data () {
return {
    article:{}, //文章详情
    isFollowTrue: false,//设置关注时的加载状态
    isPostShow: false, //控制发表评论的弹出层
    CommentList:[],//评论列表
    commentTotalCount: 0,//评论的总数量
    isReplyShow: false, //评论回复的状态
    replyComment: {}//评论对象
}
} ,
 
computed: {},
 
created () {
    this.loadArticleById()
},

watch: {},
 
methods: {
   async loadArticleById () {
       const { data } = await getArticleById(this.articleId)
    //    console.log(data);
    this.article = data.data
    // 数据改变影响视图更新（DOM）数据 不是立即的
    // 所以如果需要在修改数据之后马上操作该数据影响的视图 DOM，需要把这个代码放到$nextTick中
    this.$nextTick(() => {
        this.getPreveImage()
    })
   },
   getPreveImage () {
    // 得到文档对象
    const preveContentwrap = this.$refs['content-wrap']
    // console.log(preveContentwrap);
    // 得到文档对象中所有的img
    let imgs = preveContentwrap.querySelectorAll('img')
    // console.log(imgs);
    imgs = Array.from(imgs)
    // 得到所有的图片路径
    let newImg = []
    imgs.forEach((img,index) => {
        // 给每个img绑定事件响应函数 
        newImg.push(img.src)
        img.onclick = function () {
        // 在事件处理函数中调用ImagePreview()预览
        ImagePreview({
        images:newImg,//预览图片路径列表
        startPosition: index,//起始位置
});
        }
        
    })
   },
    // 添加关注，取消关注
  async onFollow () {
    // 点击后设置加载状态，防止用户多次点击
    this.isFollowTrue = true
    if (this.article.is_followed) {
    //如果关注用户，取消关注
      await deleteFollow(this.article.aut_id)
    } else {
    // 如果没有关注用户，则关注用户
   await addFollow(this.article.aut_id)
    }
    this.article.is_followed = ! this.article.is_followed
    this.isFollowTrue = false
   },
    // 添加收藏，取消收藏
    async onCollect () {
        this.$toast.loading({
            message:'加载中...',
            forbidClick: true //禁止背景点击
        })
    if (this.article.is_collected) {
        // 如果已经收藏，取消收藏
        await deleteCollcet(this.articleId)
    } else {
        // 如果没有收藏，点击收藏
        await addCollect(this.articleId)
    }
    this.article.is_collected = !this.article.is_collected
    // 提示文本
    this.$toast.success(this.article.is_collected ? '收藏成功': '取消收藏成功')
    },
    // 点赞，取消点赞
    async onLike () {
        this.$toast.loading({
            message: '加载中',
            forbidClick: true //禁止背景点击
        })
    if (this.article.attitude === 1) {
        // 如果已经点赞，取消点赞
        await deleteLike(this.articleId)
        this.article.attitude = -1
    } else {
             // 没有点赞,点赞
         await addLike(this.articleId)
         this.article.attitude = 1
    }
       this.$toast.success(`${this.article.attitude === 1 ? '' : '取消'}点赞成功`)
    },
    // 将评论的数据放在数组中
    onPostComment (data) {
        // 接受到数据
        // 将数据放在数组中
        this.CommentList.unshift(data)
        //更新评论总数量的值
        this.commentTotalCount++
        // console.log(data);
        // 关闭评论弹出层
        this.isPostShow = false
    },
    // 回复处理函数
    onReply (comment) {
        console.log('reply',comment);
        // 将拿到的回复对象存储到数据中
        this.replyComment = comment
        // 显示评论弹出层
        this.isReplyShow = true
    }
}
}
</script>
<style scoped lang='less'>
 .article-warp {
     .content-wrap {
         position: fixed;
         top: 47px;
         left: 0;
         right: 0;
         bottom: 47px;
         overflow: auto;
     }
     .title {
        font-size: 20px;
        padding: 15px;
        background-color: #fff;
        margin: 0;
        color: #3a3a3a;
     }
    .user-info {
        .avatar {
         width: 35px;
         height: 35px;
         margin-right: 8px;
     }
     .name {
         font-size: 12px;
         color: #333333;
     }
     .pubdate {
         font-size: 11px;
         color: #b4b4b4;
     }
     .follow-btn {
         width: 85px;
         height: 29px;
     }
    }
    .markdown-body {
        background-color: #fff;
        padding: 14px;
    }
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
      width: 141px;
      height: 26px;
      border: 1px solid #eee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 24px;
    }
    }
 }
</style>