<template>
  <div id="app">
    <div id="nav">
      <h1>头条新闻</h1>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="less">
h1{
  font-size: 30px;
}
</style>
