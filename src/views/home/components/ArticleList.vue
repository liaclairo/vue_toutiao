<template>
  <div class="article-list" ref="artList">
    <van-pull-refresh
      v-model="isRefresh"
      @refresh="onRefresh"
      :success-text="refreshText"
      :success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(article,index) in articles"
          :key="index"
          :article="article"        
        />
        <!-- <van-cell
          v-for="(item, index) in articles"
          :key="index"
          :title="item.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticle } from "@/api/article";
import ArticleItem from "@/components/ArticleItem";
import {debounce} from 'lodash'
export default {
  name: "ArticleList",
  props: ["channel"],
  components: { ArticleItem },
  data() {
    return {
      // 文章列表
      articles: [],
      loading: false,
      finished: false,
      // 获取文章数据时间戳，相当于页码的作用
      timestamp: null,
      // 控制下拉刷新状态
      isRefresh: false,
      // 下拉刷新成功提示文字
      refreshText: "",
      // 记录文章列表下拉的距离
      scrollTop:0
    };
  },
  mounted(){
    const artList=this.$refs.artList
    // 监听文章列表滚动的事件,由于触发太频繁，还要进行防抖
    artList.onscroll=debounce(()=>{
      // console.log(artList.scrollTop)
      // 获得文章列表的下拉距离
      this.scrollTop=artList.scrollTop
    },50)
  },
  // 当缓存的组件被激活时的钩子
  activated(){
    // 文章列表回到之前下拉的距离
    this.$refs.artList.scrollTop=this.scrollTop
  },
  methods: {
    //  获取文章列表数据
    async onLoad() {
      // 1.请求获取数据
      const { data: res } = await getArticle({
        channel_id: this.channel.id,
        timestamp: null || Date.now(),
      });
    //   console.log(res);
      // 2. 把数据放到list数组中
      this.articles.push(...res.data.results);
      // 3.设置本次加载状态结束，他才可以加载下一次,否则会永远听留在这里
      this.loading = false;
      // 4.数据全部加载完成，将完成状态设置为true
      if (res.data.results.length) {
        //   更新时间戳
        this.timestamp = res.data.pre_timestamp;
      } else {
        this.finished = true;
      }
    },
    // 下拉刷新获取文章数据
    async onRefresh() {
      // 只要下拉刷新组件将刷新状态isRefresh自动变为true
      // 1.请求获取数据
      const { data: res } = await getArticle({
        channel_id: this.channel.id,
        timestamp: Date.now()
      });
      //console.log(res);
      const { results } = res.data;
      // 2. 把数据放到list数组中
      this.articles.unshift(...results);
      this.refreshText = `成功刷新${results.length}条数据`;
      // 3.关闭刷新状态
      this.isRefresh = false;
    },
  },
};
</script>
<style lang="less" scoped>
// 将文章列表固定
.article-list {
  position: fixed;
  top: 90px;
  bottom: 50px;
  right: 0;
  left: 0;
  overflow-y: auto;
}
</style>