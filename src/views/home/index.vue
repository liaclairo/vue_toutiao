<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <!-- 搜索按钮 -->
      <div class="title" slot="title">
        <van-button
          class="search-btn"
          type="info"
          icon="search"
          round
          size="small"
          to='/search'
        >
          搜索
        </van-button>
      </div>
    </van-nav-bar>
    <!-- 频道列表标签导航栏 -->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 文章列表组件 -->
        <ArticleList :channel="channel" />
      </van-tab>
      <!-- 右侧汉堡按钮 -->
      <div slot="nav-right" class="hamburger" @click="isPopupShow = true">
        <van-icon name="wap-nav" />
      </div>
      <!-- 放一个和汉堡按钮同等大小的盒子占位，防止其遮挡其他标签 -->
      <div slot="nav-right" class="hamburger-copy"></div>
    </van-tabs>
    <!-- 频道弹出层 -->
    <van-popup
      v-model="isPopupShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      get-container="body"
      :style="{ height: '100%' }"
    >
      <EditChannel
        @closeEdit="isPopupShow = false"
        @tabActive="active = $event"
        :userChannels="channels"
        :active="active"
      />
    </van-popup>
  </div>
</template>
<script>
import { getUserChannels } from "@/api/user";
import ArticleList from "./components/ArticleList";
import EditChannel from "./components/EditChannel";
import { mapState } from "vuex";
import { getItem, setItem } from "@/utils/storage";
export default {
  name: "Home",
  components: { ArticleList, EditChannel },
  data() {
    return {
      active: 0,
      // 用户频道列表数据
      channels: [],
      // 控制编辑频道弹出层
      isPopupShow: false,
    };
  },
  created() {
    this.onloadChannels();
  },
  methods: {
    //   加载频道列表
    async onloadChannels() {
      let channels = [];
      if (this.user) {
        //  如果用户已登录,则获取线上用户频道列表
        const { data: res } = await getUserChannels();
        channels = res.data.channels;
      } else {
        // 用户未登录，则判断本地是否有频道列表数据
        const localChannels = getItem("userChannels");
        if (localChannels) {
          // 若本地有频道列表数据，就从本地读取数据
          channels = localChannels;
        } else {
          // 若本地没有数据，就获取线上默认返回的频道列表数据
          const { data: res } = await getUserChannels();
          channels = res.data.channels;
        }
      }
      // 将频道列把数据给data以供模板展示
      this.channels=channels
      // // 获取用户列表数据
      // const { data: res } = await getUserChannels();
      // //   console.log(res.data);
      // this.channels = res.data.channels;
    },
  },
  computed: {
    // 用户登录状态
    ...mapState(["user"]),
  },
};
</script>
<style lang="less" scoped>
.home-container {
  /deep/.van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    color: #fff;
    width: 273px;
    background-color: #53a8ff;
    font-size: 14px;
    .van-icon {
      color: #fff;
      font-size: 16px;
    }
  }
  .channel-tabs {
    /deep/.van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/.van-tabs__line {
      width: 15px !important;
      height: 3px;
      bottom: 20px;
      background: cornflowerblue;
    }
    .hamburger {
      position: fixed;
      right: 0;
      width: 33px;
      height: 43px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.9;
      .van-icon {
        color: #585858;
      }
      border-bottom: 1px solid #f2f3f6;
      &::before {
        content: "";
        position: absolute;
        width: 1px;
        height: 33px;
        left: 0;
        background: url("./line.png") no-repeat;
        background-size: contain;
      }
    }
    .hamburger-copy {
      width: 25px;
      height: 43px;
      flex-shrink: 0;
    }
  }
}
</style>