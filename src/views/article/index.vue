<template>
  <div class="article-container">
    <!-- 文章详情顶部导航栏 -->
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />
    <!-- 文章页面内容 -->
    <div class="article-wrap">
      <!-- 文章标题 -->
    <div class="title">{{ article.title }}</div>
    <!-- 文章作者信息 -->
    <van-cell center class="author-info">
      <van-image
        slot="icon"
        class="portrait"
        round
        fit="cover"
        :src="article.aut_photo"
      />
      <div slot="title" class="name">{{ article.aut_name }}</div>
      <div slot="label" class="pubTime">{{ pubTime }}</div>
      <van-button
        class="follow-btn"
        size="small"
        :icon="article.is_followed ? '' : 'plus'"
        :type="article.is_followed ? 'default' : 'info'"
        round
        :loading="isLoading"
        @click="handleFollow"
        >{{ article.is_followed ? "已关注" : "关注" }}</van-button
      >
    </van-cell>
    <!-- 文章内容 -->
    <div class="markdown-body" 
    v-html="article.content" 
    ref="content"></div>
    <!-- 评论区 -->
    <van-cell title="全部评论"></van-cell>
    <CommentList
    :source="articleId"
    :commentList="commentList"
    type='a'
    @total_com_count="total_com_count=$event"
    @handleReplyShow="handleReplyShow"
    />

    <!-- 回复评论区 -->
    <van-popup position="bottom">
      
    </van-popup>
    </div>
     
    <!-- 底部评论点赞分享区域 -->
    <div class="footer">
      <van-button 
      class="comm-btn" 
      type="default" 
      size="small" round
      @click="isPopShow=true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="total_com_count" />
      <van-icon
        :name="article.is_collected ? 'star' : 'star-o'"
        :color="article.is_collected ? 'orange' : '#777'"
        @click="handleCollect"
      />
      <van-icon
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="article.attitude === 1 ? '#F73B61' : '#777'"
        @click="handleLike"
      />
      <van-icon name="share" />
    </div>
    <!-- 底部评论点赞分享区域占位 -->
    <div class="footer-copy"></div>
    <!-- 发布评论区域 -->
    <van-popup 
    v-model="isPopShow" 
    position="bottom" 
    >
    <PubComment
    :target="articleId"
    @pubComment="onPubComment"
    />
    </van-popup>
    <!-- 回复评论区 -->
     <van-popup 
    v-model="isReplyShow" 
    position="bottom" 
    
    >
    <ReplyList
      v-if="isReplyShow"
     :comment="comment"
     @closeReply="isReplyShow=false"
     :articleId="articleId"
    />
    </van-popup>
  </div>
</template>
<script>
import "./github-markdown.css";
import { getArticleById } from "@/api/article";
import { bettweenTime } from "@/utils/dayjs";
import { ImagePreview } from "vant";
import { addFollow, deleteFollow } from "@/api/user";
import CommentList from './components/CommentList' 
import PubComment from './components/PubComment' 
import ReplyList from './components/ReplyList' 
import {
  addArticleCollect,
  deleteArticleCollect,
  addArticleLike,
  deleteArticleLike,
} from "@/api/article";
export default {
  name: "Article",
  props: ["articleId"],
  components:{CommentList,PubComment,ReplyList},
  data() {
    return {
      // 文章
      article: {},
      //   控制关注按钮加载状态
      isLoading: false,
      // 控制弹出层
      isPopShow:false,
      //评论列表
      commentList:[],
      total_com_count:0,
      // 控制评论回复弹出层
      isReplyShow:false,
      // 子组件传过来的评论信息
      comment:{}
    };
  },
  created() {
    this.onloadArticle()
  },
  computed: {
    //   获取文章发布相对时间
    pubTime() {
      return bettweenTime(this.article.pubdate);
    },
  },
  methods: {
    //   加载文章
    async onloadArticle() {
      const { data: res } = await getArticleById(this.articleId);
      // console.log(res);
      this.article = res.data;
      // console.log(this.article.art_id)
      // 更新数据后产生新的DOM，
      // 要立即对新产生的DOM视图结点进行操作，要使用$nextTick方法
      // 图片预览
      this.$nextTick(() => {
        this.handleImgPreview();
      });
    },
    
  
    // 处理图片预览
    handleImgPreview() {
      // 获取所有的img结点
      const content = this.$refs["content"];
      const imgs = content.querySelectorAll("img");
      // console.log(imgs)
      //  所有图片的路径数组
      const imgPaths = [];
      //  给每个图片绑定点击事件，一点击就进行图片预览
      imgs.forEach((img, index) => {
        imgPaths.push(img.src);
        img.onclick = () => {
          console.log(index);
          ImagePreview({
            images: imgPaths,
            startPosition: index,
          });
        };
      });
    },
    // 关注的点击事件
    async handleFollow() {
      // 关注按钮开启加载状态
      this.isLoading = true;
      if (this.article.is_followed) {
        // 如果已关注，点击就调接口取消关注
        await deleteFollow(this.article.aut_id);
      } else {
        // 如果还没关注，点击就调接口关注
        await addFollow(this.article.aut_id);
      }
      this.article.is_followed = !this.article.is_followed;
      //关闭关注按钮加载状态
      this.isLoading = false;
    },
    // 处理收藏按钮
    async handleCollect() {
      // this.$toast.loading({
      //   message: "正在处理中...",
      //   forbidClick: true,
      // });
      if (this.article.is_collected) {
        // 如果已收藏，就调接口取消收藏
        await deleteArticleCollect(this.article.art_id);
        // this.$toast.success({
        //   message: "取消收藏",
        //   position: "bottom",
        // });
      } else {
        // 如果未收藏，就调接口收藏
        await addArticleCollect(this.article.art_id);
        // this.$toast.success({
        //   message: "收藏成功",
        //   position: "bottom",
        // });
      }
      this.article.is_collected = !this.article.is_collected;
    },
    // 处理点赞按钮
    async handleLike() {
      //  this.$toast.loading({
      //   message: "网络较慢，正在处理中...",
      //   forbidClick: true,
      // });
      if (this.article.attitude===1) {
         
        // 如果已点赞，就调接口取消点赞
        await deleteArticleLike(this.article.art_id);
        // this.$toast.success({
        //   message: "取消点赞",
        //   position: "bottom",
         
        // });
        this.article.attitude=0
      } else {
        
        // 如果未点赞，就调接口点赞
        await addArticleLike(this.article.art_id);
        // this.$toast.success({
        //   message: "点赞成功",
        //   position: "bottom",
        // });
         this.article.attitude=1
      }
    },
    // 发布评论
    onPubComment(comment){
      // 修改评论列表，将新发布的评论放到顶部
      this.commentList.unshift(comment)
    //  评论数量加一
    this.total_com_count++
      // 关闭写评论弹出层
      this.isPopShow=false
    },
    // 处理评论回复弹出层
    handleReplyShow(comment){
      // 打开评论回复弹出层
      this.isReplyShow=true
      this.comment=comment
    }
  },
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #2892ff;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
  /deep/.van-icon {
    color: #fff;
  }
}
.title {
  font-size: 20px;
  word-wrap: break-word;
  padding: 20px;
  background-color: #fff;
}
.author-info {
  .portrait {
    width: 35px;
    height: 35px;
    margin-right: 12px;
    border: 1px solid rgb(235, 221, 221);
  }
  .name {
    font-size: 12px;
  }
  .pubTime {
    font-size: 12px;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
}
.markdown-body {
  background-color: #fff;
  padding: 20px;
}
.footer {
  position: fixed;
  height: 51px;
  box-sizing: border-box;
  right: 0;
  bottom: -1px;
  left: 0;
  // padding:-10px 20px;
  color: #777;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #eff1f3;
  .comm-btn {
    flex-basis: 40%;
    color: gray;
  }
}
.footer-copy {
  width: 100%;
  height: 50px;
}
.article-wrap{
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 50px;
  overflow-y: auto;
  word-wrap: break-word;
}
</style>
