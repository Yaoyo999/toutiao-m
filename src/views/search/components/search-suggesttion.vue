<template>
    <div class="search-sug-wrap">
        <van-cell 
        v-for="(str,index) in suggestions"
        :key="index"
        icon="search"
        @click="$emit('search',str)"
        >
        <div slot="title" 
        v-html="lightText(str)"
        >
        </div>
        </van-cell>
    </div>
</template>
<script>
import { debounce } from 'lodash'
import { getAllSearchSuggestions } from '../../../api/search'
export default {
 
name:'SearchSuggettion',
 
components: {},
 
props: {
    searchText: {
        type: String,
        required: true
    }
},
 
data () {
return {
    suggestions: [] //联想建议数据
}
} ,
 
computed: {},
 
watch: {
    // 属性名：要监视的数据名称 这种写法为简写，当组件渲染完成时才会开始监视数据会导致最先的数据无法被监视到
    // searchText () {
    //     console.log("hello");
    // }
    // 这才是监视的完整写法，可以根据需要配置
    searchText: {
        // 当数据发生变化 会执行 handler处理函数
        // async handler () {
        //     // 发送请求
        //    const {data} = await getAllSearchSuggestions(this.searchText)
        //     // 获取数据
        //     this.suggestions = data.data.options
        //     consol   e.log(data);
        // },
        // 函数防抖减少请求的次数
        handler: debounce(async function () {
            // 发送请求 
           const { data } = await getAllSearchSuggestions(this.searchText)
            // 获取数据
            this.suggestions = data.data.options
        },200),
        // 该回调将会在侦听开始之后立即被调用
        immediate: true
    }
},
 
methods: {
    lightText (str) {
       return str.replace(new RegExp(this.searchText,'gi'),`<span style="color: red">${this.searchText}</span>`)
    }
},
 
}
</script>
<style scoped lang='less'>
 
</style>