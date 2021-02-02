<template>
    <div class="article-list-wrap">
      <van-pull-refresh 
      v-model="isRefreshLoading"
      :success-text="refreshSuccessText"
      success-duration="1400"
      @refresh="onRefresh">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
>   
    <ArticleItem  v-for="(article,index) in articles" :key="index" :article="article"/>
    <!-- <van-cell v-for="(article,index) in articles" :key="index" :title="article.title" /> -->
</van-list>
</van-pull-refresh>
    </div>
</template>
<script>
import { getArticles } from '../../../api/article'
import ArticleItem from '../../../components/article-item/index'
export default { 
name:'ArticleList',
data () {
return {
    articles: [], //数据列表
    loading: false, //控制加载中的数据状态
    finished: false, //控制加载结束的状态，不再触发加载更多onload
    timestamp: null, //获取下一页数据时间戳
    isRefreshLoading: false, //刷新的提示
    refreshSuccessText: ''
}
},
props: {
    channel: {
        type: Object,
        required: true
    }
},
components: {
  ArticleItem
},
methods: {
    //1.请求获取数据 
     async onLoad() {
       const { data } = await getArticles({
      channel_id: this.channel.id, //频道ID
      timestamp:this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
      with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
    })
       console.log(data);
       const { results } = data.data
    // 2.把数据放在articles数组中
    // console.log(results);
    this.articles.push(...results)
    // 3.设置本次加载状态结束，它才可以判断是否需要加载下一次 ，否则就永远会停在这里
    this.loading = false
    //4.数据全部加载完成
    if (results.length) {
      // 如果还有数据 更新获取下一页数据的页码
      this.timestamp = data.data.pre_timestamp
    } else {
      // 没有数据了就完成
      this.finished = true
    }
},
  async onRefresh () {
      const { data } = await getArticles({
      channel_id: this.channel.id,
      timestamp:Date.now(), // 当前时间的数据，后台接口设计
      with_top: 1 
    })
    const { results } = data.data
    this.articles.unshift(...results)
    // 刷新成功的文字提示
    this.refreshSuccessText = `刷新了${results.length}条数据`
    this.isRefreshLoading = false //刷新完成，设置为false 关闭刷新的状态
    
}
}
}
</script>
<style scoped lang='less'>
 .article-list-wrap {
   position: fixed;
   left: 0;
   right: 0;
   top:90px;
   bottom: 50px;
   overflow-y: auto;
 }
</style>