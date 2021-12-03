<template>
  <div class="reply-list">
      <!-- 头部信息 -->
    <van-nav-bar >
    <van-icon 
    slot="left" 
    name="cross"
    @click="$emit('closeReply')"
    ></van-icon>
    <div slot="title">{{comment.reply_count}}条评论</div>
    </van-nav-bar>
    <CommentItem
    :comment="comment"
    />
    <van-cell title="全部回复"></van-cell>

    <!-- 回复列表区 -->
    <CommentList
    type='c'
    :source="comment.com_id"
    :commentList="commentList"
    />
    <!-- 底部发表回复 -->
    <div class="footer">
      <van-button 
      class="comm-btn" 
      type="default" 
      size="small" round
      @click="isPopShow=true"
        >写评论</van-button
      > 
    </div>
      <!-- 底部评论点赞分享区域占位 -->
    <div class="footer-copy"></div>
     <!-- 发布评论区域 -->
    <van-popup 
    v-model="isPopShow" 
    position="bottom" 
    >
    <PubComment
    :target="comment.com_id"
    :art_id="articleId"
    @pubComment="onPubComment"
    />
    </van-popup>
  </div>
</template>
<script>
import CommentItem from './CommentItem'
import CommentList from './CommentList'
import PubComment from './PubComment'
export default {
  name: "ReplyList",
  data() {
    return {
        // 评论回复列表
        commentList:[],
        isPopShow:false
    }
  },
  props:['comment','articleId'],
  components:{CommentItem,CommentList,PubComment},
  created() {},
  computed: {},
  methods: {
      onPubComment(comment){
        //   发布成功的评论回复，放到列表顶部
        this.commentList.unshift(comment)
        // 评论回复数量加一
        this.comment.reply_count++
        // 关闭发布评论弹出层
          this.isPopShow=false
      }
  },
};
</script>
<style lang="less" scoped>
.van-icon{
    font-size: 20px;
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
    flex-basis: 60%;
    color: gray;
  }
}
.footer-copy {
  width: 100%;
  height: 50px;
}
</style>
