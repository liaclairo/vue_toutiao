<template>
  <van-cell>
    <div slot="icon">
      <van-image class="portrait" fit="cover" round :src="comment.aut_photo" />
    </div>
    <div slot="title" class="title">
      <div class="title-wrap">
        <div class="name">{{ comment.aut_name }}</div>
        <div @click="handleLike">  
          <!-- 点赞 -->
          <van-icon
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
            :class="{ like: comment.is_liking }"   
          />
          <span>{{ comment.like_count }}</span>
        </div>
      </div>
      <div class="content">{{ comment.content }}</div>
      <div class="footer">
        <span class="time">{{ pubTime }}</span>
        <van-button 
        size="mini" 
        round
        @click="$emit('handleReplyShow')"
          >{{ comment.reply_count }} 回复</van-button
        >
      </div>
    </div>
  </van-cell>
</template>
<script>
import { formatTime } from "@/utils/dayjs"
import {addCommentLike,deleteCommentLike} from '@/api/comment'
export default {
  name: "CommentItem",
  data() {
    return {
    
    };
  },
  props: ["comment"],
  created() {},
  computed: {
    // 格式化时间
    pubTime() {
      return formatTime(this.comment.pubdate, "MM-DD HH:mm");
    },
  },
  methods: {
    // 点赞评论按钮业务
   async handleLike() {
      if (this.comment.is_liking) {
        // 如果已经点赞，就调接口取消点赞
        await deleteCommentLike(this.comment.com_id)
        this.comment.like_count--
      } else {
        // 如果没有点赞，就调接口点赞
        await addCommentLike(this.comment.com_id)
        this.comment.like_count++
      }
      this.comment.is_liking = !this.comment.is_liking;     
    },
  },
};
</script>
<style lang="less" scoped>
.portrait {
  width: 36px;
  height: 36px;
  margin-right: 14px;
}
.title-wrap {
  display: flex;
  justify-content: space-between;
  .name {
    color: #7185a1;
    font-size: 14px;
  }
}
.content {
  font-size: 16px;
  color: #232323;
}
.footer {
  display: flex;
  .time {
    margin-right: 10px;
  }
}
.like {
  color: #f73b61;
}
</style>
