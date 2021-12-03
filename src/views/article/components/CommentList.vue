<template>
  
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <CommentItem
  v-for="(comment,index) in commentList"
  :key="index"
  :comment="comment"
  @handleReplyShow="$emit('handleReplyShow',comment)"
  />
</van-list>
</template>
<script>
import {getComments} from '@/api/comment'
import CommentItem from './CommentItem'
export default {
  name: "CommentList",
  data() {
    return {
      loading: false,
      finished: false,
      offset:null,
      limit:10,
    }
  },
  props:['source','commentList','type'],
  components:{CommentItem},
  created() {},
  computed: {},
  methods: {
    // 下拉列表
   async onLoad() {
       // 1. 请求获取文章评论数据
      const { data:res } = await getComments({
        type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.source,//Number(this.source), // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit // 每页大小
      })
      // 把评论总数给父组件
      this.$emit('total_com_count',res.data.total_count)
      //  console.log(res)
      const {results}=res.data
      this.commentList.push(...results)
      this.loading=false
      if(results.length){
        this.offset=res.data.last_id
      }else{
        this.finished=true
      }
    },
  },
};
</script>
<style lang="less" scoped>
</style>
