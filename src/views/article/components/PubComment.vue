<template>
  <div class="pub-commend">
    <van-field
      class="comment"
      v-model.trim="message"
      autosize
      border
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <van-button 
    class="pub-btn" 
    size="small" 
    type="info" 
    :disabled="!message"
    @click="pubComment"
      >发布</van-button
    >
  </div>
</template>
<script>
import {pubComment} from '@/api/comment'
export default {
  name: "PubComment",
  data() {
    return {
    // 评论内容
      message: "", 
    };
  },
  props:{
      //评论的目标id
      target:{
          required:true
      },
      //文章id
      art_id:{
          default:null
      }
  },
  created() {},
  computed: {},
  methods: {
    //   发布评论
    async pubComment(){
        this.$toast.loading('正在发布中...')
        // 调发布评论接口
     const{data:res}=  await pubComment({
            target:this.target.toString(),//评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
            content:this.message,//评论内容	
            art_id:this.art_id?this.art_id.toString():null//文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。	
        })
        console.log(res)
        // 触发处理发布评论接口
        this.$emit('pubComment',res.data.new_obj)
        this.message=''
         this.$toast.success('发布成功')
    }
  },
};
</script>
<style lang="less" scoped>
.pub-commend {
  display: flex;
  align-items: center;
  padding: 14px;
  .pub-btn {
    width: 50px;
    // color: #989a9e;
  }
  .comment {
    background-color: #f1f3f4;
    margin-right: 10px;
  }
}
</style>
