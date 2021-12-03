<template>
  <div class="article-list">
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
    };
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