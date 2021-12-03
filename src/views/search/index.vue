<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--  在 van-search 外层增加 form 标签，
    且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus='isResultShow=false'
        
      />
    </form>
    <!-- 搜索结果 -->
    <!-- isResultShow为true时显示 -->
    <SearchResult v-if='isResultShow'
    :searchText='searchText'
    />

    <!-- 搜索联想建议 -->
    <!-- 当输入框有值时显示或所搜输入框获取焦点时显示 -->
    <SearchSuggest 
    v-else-if='searchText' 
    :searchText='searchText'
    @searchSuggest="onSearch"
    />

    <!-- 搜索历史 -->
    <!-- 当用户未搜索 -->
    <SearchHistory v-else
    :serachHistory='serachHistory'
    @search='onSearch'
    @deleteAllHistory='serachHistory=[]'
    />
  </div>
</template>
<script>
import SearchSuggest from "./components/SearchSuggest"
import SearchHistory from "./components/SearchHistory"
import SearchResult from "./components/SearchResult"
import {setItem,getItem} from '@/utils/storage'

export default {
  name: "Search",
  data() {
    return {
      // 搜索框框内容
      searchText: "",
      // 控制搜索结果组件
      isResultShow: false,
      // 搜索历史
      serachHistory:getItem('serachHistory') || []
    }
  },
  components: { SearchSuggest, SearchHistory, SearchResult },

  methods: {
    // 处理确定搜索的回调函数
    onSearch(searchText) {
      this.searchText=searchText
      // 确保历史记录没有重复的
      let index=this.serachHistory.indexOf(searchText)
      if(index!==-1){
        // 把重复项去掉
        this.serachHistory.splice(index,1)
      }
      // 把搜索内容加到历史记录的顶部
      this.serachHistory.unshift(searchText)

        // 如果已经登录请求搜索历史接口，存储到线上，但此接口已经挂了
        // 如果未登录就储存到本地
        // setItem('serachHistory',this.serachHistory)


        
        // 显示搜索结果
        this.isResultShow=true
    } 
  },
  watch:{
    // 监视搜索历史的改变，进行数据持久化
    serachHistory(){
      setItem('serachHistory',this.serachHistory)
    }
  }
};
</script>
<style lang="less" scoped>
</style>