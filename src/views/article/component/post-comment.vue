<template>
    <div class="post-wrap">
        <van-field
        v-model="message"
        autosize
        type="textarea"
        maxlength="150"
        placeholder="优质的评论"
        show-word-limit
        />
        <van-button
            @click="onPost"
            size="mini"
            class="com-btn"
            :disabled="!message"
        >发布</van-button>
    </div>
</template>
<script>
import { addComment } from '../../../api/comment'
export default {
 
name:'PostComment',
 
components: {},
 
props: {
    // 如果是发布文章评论，则传递文章id
    // 如果是发布评论回复，则传递评论id
    target: {
        type: [Number,String,Object],
        required: true
    },
    // 如果是发布评论回复，则也需要传递文章id
    articleId: {
        type: [Number,String,Object],
        default: null
    }
},
 
data () {
return {
    message: '' //输入的评论内容
}
} ,
 
computed: {},
 
watch: {},
 
methods: {
    // 发布评论
    async onPost () {
        this.$toast.loading({
            message: '发布中....',
            forbidClick: true
        })
        const { data } = await addComment({
        target: this.target.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
        content: this.message, // 评论内容
        art_id: this.articleId ? this.articleId.toString() : null //文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        console.log(data);
        this.$emit('post-success',data.data.new_obj)
        // 发布成功提示
        this.$toast.success('发布成功')
        // 清空输入框的内容
        this.message = ''
    }
},
 
}
</script>
<style scoped lang='less'>
 .post-wrap {
     display: flex;
     align-items: center;
     padding: 14px;
 }
</style>