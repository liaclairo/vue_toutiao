<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(article,index) in searchResult" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>
<script>
import {getSearchResult} from '@/api/search'
export default {
  name: "SearchResult",
  data() {
    return {
      searchResult: [],
      loading: false,
      finished: false,
      // 获取第1页的数据
      page:1,
      // 每页有10条数据
      per_page:10
    }
  },
  props:['searchText'],
  methods:{
       async onLoad() {
        // 1.发送请求， 获取搜索结果
       const {data:res} = await getSearchResult({
          page:this.page,
          per_page:this.per_page,
          q:this.searchText
        })
        // console.log(res)
        // 2.将搜索结果放进list
        const {results}=res.data
        this.searchResult.push(...results)
        // 3.关闭list的加载状态
        this.loading=false
        // 4.若还有未加载完的数据就更新页数
          // 若所有的数据都已更新完毕,则将加载完成状态设为true
          if(results.length){
            this.page++
          }else{
            this.finished=true
          }
    },
  }
};
</script>
<style lang="less" scoped>
.search-result{
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    top: 54px;
    overflow-y: auto;
}
</style>