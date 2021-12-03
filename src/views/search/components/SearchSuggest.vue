<template>
  <div class="search-suggest">
    <van-cell
      icon="search"
      v-for="(suggest, index) in suggestions"
      :key="index"
      @click="$emit('searchSuggest',suggest)"
    >
      <div slot="title" v-html="sugHighLight(suggest)"></div>
    </van-cell>
  </div>
</template>
<script>
import { getSuggestions } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggest",
  props: ["searchText"],
  data() {
    return {
      suggestions: [],
    };
  },
  methods: {
    // 搜索联想建议关键词部分高亮
    sugHighLight(suggest) {
      return suggest.replace(
        new RegExp(this.searchText, "gi"),
        `<span style="color: red">${this.searchText}</span>`
      )
    },
  },
  watch: {
    searchText: {
      // debounce防抖
      handler: debounce(async function () {
        // 寻找接口，发请求，获取数据
        const { data: res } = await getSuggestions(this.searchText);
        console.log(res);
        this.suggestions = res.data.options;
      }, 200),
      // 开启立即监控
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
</style>