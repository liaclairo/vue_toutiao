<template>
  <div class="search-history">
    <van-cell>
      <div slot="title">搜索历史</div>
      <div v-if="isDelete">
        <span @click="$emit('deleteAllHistory')">全部删除</span>&nbsp;&nbsp;
        <span @click="isDelete = false">完成</span>
      </div>
      <van-icon @click="isDelete = true" v-else name="delete" />
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history, index) in serachHistory"
      :key="index"
      @click="deleteHisory(history, index)"
    >
      <div v-if="isDelete">
        <van-icon name="close" />
      </div>
    </van-cell>
  </div>
</template>
<script>
import { setItem } from "@/utils/storage";
export default {
  name: "SearchHistory",
  data() {
    return {
      isDelete: false,
    }
  },
  props: ["serachHistory"],
  methods: {
    deleteHisory(history, index) {
      if (this.isDelete) {
        // 如果处于删除状态，点击搜索历史内容，就删除，对应的搜索历史
        this.serachHistory.splice(index, 1);
        // 数据持久化
        setItem("serachHistory", this.serachHistory);
      } else {
        // 未处于删除状态，点击搜索历史内容，就展示对应的搜索结果
        this.$emit("search", history);
      }
    },
  },
}
</script>
