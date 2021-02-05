<template>
    <div class="search-result">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
>
  <van-cell v-for="(article,index) in articles" 
  :key="index" 
  :title="article.title" 
  />
</van-list>
    </div>
</template>
<script>
import { getAllSearchResults } from '../../../api/search'
export default {
 
name:'SearchResult',
 
components: {},
 
props: {
  searchText: {
    type: String,
    required: true
  }
},
 
data () {
return {
      articles: [], // 搜索结果数据列表
      loading: false, // 加载展示状态
      finished: false, // 全部加载完成 
      page: 1, //页码
      per_page: 10, //每夜的数量
}
} ,
 
computed: {},
 
watch: {},
 
methods: {
    async onLoad() {
      // 异步更新数据
    const {data} = await getAllSearchResults({
      page:this.page, // 页码
      per_page: this.per_page, // 每页的数量
      q:this.searchText // 搜索关键字
    })
      // console.log(data);
    const { results } = data.data
    this.articles.push(...results)
        // 加载状态结束设置为false 下次触底或者没占满屏幕时自动触发
        this.loading = false;
   
        // 数据全部加载完成
        if (results.length) {
          // 还有值让页码加加
          this.page++
        } else {
          // 没有值提示文本
          this.finished = true
        }
     
    }
},
 
}
</script>
<style scoped lang='less'>
 
</style>