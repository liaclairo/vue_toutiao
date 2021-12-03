<template>
  <van-cell
    class="article-item"
    :to="{
      name: 'article',
      params: { articleId: article.art_id }
    }"
  >
    <!-- 显示文章标题 -->
    <div class="title van-multi-ellipsis--l3" slot="title">
      {{ article.title }}
    </div>
    <div class="lable" slot="label">
      <!-- 显示三张封面区域 -->
      <div v-if="article.cover.type === 3" class="covers">
        <div class="cover-item" v-for="img in article.cover.images" :key="img">
          <van-image fit="cover" :src="img" />
        </div>
      </div>
      <!-- 显示文章详情 -->
      <div class="article-detail">
        <span class="van-ellipsis">{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ articleTime }}</span>
      </div>
    </div>
    <!-- 显示一张封面区域 -->
    <div class="one-cover" v-if="article.cover.type === 1" slot="default">
      <van-image fit="cover" :src="article.cover.images[0]" />
    </div>
  </van-cell>
</template>
<script>
import { bettweenTime } from "@/utils/dayjs";
export default {
  name: "ArticleItem",
  props: ["article"],
  computed: {
    articleTime() {
      return bettweenTime(this.article.pubdate);
    },
  },
};
</script>
<style lang="less" scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #525252;
  }
  .covers {
    display: flex;
    padding: 15px 0;
    .cover-item {
      flex: 1;
      /deep/.van-image__img {
        width: 111px;
        height: 73px;
      }
    }
  }
  .article-detail {
    span {
      margin-right: 5px;
      color: #bababa;
      font-size: 11px;
    }
  }
  /deep/.van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
}
</style>