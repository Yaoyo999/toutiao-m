<template>
    <div class="search-container">
        <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS (安卓中一样会显示)输入法中显示搜索按钮。 -->
        <!-- 搜索栏 -->
        <form action="/">
        <van-search 
        v-model="searchText" 
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isShowResult = false"
        />
        </form>
        <!-- 搜索结果 -->
        <SearchResult  v-if="isShowResult" :searchText="searchText"/>
        <!-- 搜索联想建议 -->
        <SearchSuggettion v-else-if="searchText" :searchText="searchText" @search="onSearch"/>
        <!-- 搜索历史记录 -->
        <SearchHistory  
        v-else 
        :searchHistories="searchHistories" 
        @search="onSearch"
        @delete-histories="searchHistories = $event"/>
    </div>
</template>
<script>
import SearchSuggettion from './components/search-suggesttion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
// import { getSearchHistories } from '../../api/search'
import { setItem, getItem } from '../../utils/storage'
import { mapState } from 'vuex'
export default {
 
name:'SearchIndex',
 
components: {
    SearchSuggettion,
    SearchHistory,
    SearchResult
},
 
props: {},
 
data () {
return {
    searchText: '', //绑定输入框的文本
    isShowResult: false, //搜索结果设定为false
    searchHistories: [] //搜索历史记录的数组
}
},
created () {
     this.loadSearchHistories()
 },

computed: {
    ...mapState(['user'])
},
 
watch: {
    // 统一监视历史记录的变化，存储到本地存储
    searchHistories () {
        setItem('search-histories',this.searchHistories)
    }
},
 
methods: {
    // 默认会有一个参数，输入框的值，用一个变量来接受
    onSearch (searchText) {
        // 把输入框这是为你想要搜索的文本
        this.searchText = searchText
        // console.log(searchText);
        const index = this.searchHistories.indexOf(searchText)
        if (index !== -1) {
            this.searchHistories.splice(index,1)
        }
        this.searchHistories.unshift(searchText)
        // 将搜索的历史纪录存储在本地
        // setItem('search-histories',this.searchHistories)
        // 显示搜索结果
        this.isShowResult = true
    },
    // 获取用户历史记录
    async loadSearchHistories () {
        let searchHistories = getItem('search-histories') || []
        //   console.log(searchHistories);  
            // if (this.user) {
            //     const { data } = await getSearchHistories()
            //     // console.log(data);
            //     searchHistories = [...new Set([...searchHistories,...data.data.keywords])];
            // }
        return this.searchHistories = searchHistories
    }
   
}
 
}
</script>
<style scoped lang='less'>
 
</style>