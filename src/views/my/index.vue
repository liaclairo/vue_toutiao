<template>
  <div class="my-container">
    <!-- 个人信息 -->
    <van-cell-group v-if="user" class="my-info">
      <!--头像，昵称等信息  -->
      <van-cell center class="person-data" :border="false">
        <van-image
          class="portrait"
          slot="icon"
          round
          fit="cover"
          :src="userInfo.photo"
        />
        <span class="name" slot="title">{{userInfo.name}}</span>
        <van-button class="edit-btn" slot="right-icon" size="mini" round>
          编辑资料
        </van-button>
      </van-cell>

      <!-- 个人数据 -->
      <van-grid :border="false" class="data-detail">
        <van-grid-item>
          <div class="my-data" slot="text">
            <div class="num">{{userInfo.art_count}}</div>
            <div class="num-type">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="my-data" slot="text">
            <div class="num">{{userInfo.follow_count}}</div>
            <div class="num-type">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="my-data" slot="text">
            <div class="num">{{userInfo.fans_count}}</div>
            <div class="num-type">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="my-data" slot="text">
            <div class="num">{{userInfo.like_count}}</div>
            <div class="num-type">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 未登录显示的头部信息 -->
    <div v-else class="unlogin" @click="$router.push('/login')">
      <div class="img">
        <img src="./手机.png" alt="" />
      </div>
      <div class="text">点击登录</div>
    </div>
    <!-- 收藏、历史 -->
    <van-grid :column-num="2" class="collect-history mb-4">
      <van-grid-item
        class="collect"
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="history"
        icon-prefix="toutiao"
        icon="lishi1"
        text="历史"
      />
    </van-grid>
    <!-- 消息通知、小智同学 -->
    <div class="news-smart mb-4">
      <van-cell v-if="user" title="消息通知" is-link to="/" />
      <van-cell title="小智同学" is-link to="/" />
    </div>
    <!-- 退出登录按钮 -->
    <div v-if="user" class="layout">
      <van-cell @click="layout" title="退出登录" />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/user"
export default {
  name: "My",
  data() {
    return {
      // 用户个人信息
      userInfo:{}
    }
  },

  computed: {
    ...mapState(["user"]),
  },
  created() {
    // 获取当前登录用户信息
    this.getUser()
  },
  methods: {
    // 获取当前登录用户信息
    async getUser() {
      const { data: res } = await getUserInfo()
      this.userInfo=res.data
      console.log(this.userInfo)
    },

    // 处理退出登录的回调函数
    layout() {
      this.$dialog
        .confirm({
          title: "退出提示信息",
          message: "确认退出吗？",
        }) //确认退出
        .then(() => {
          this.$store.commit("setUser", null); //将用户登录状态设为null
        }) //取消退出
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
<style lang="less" scoped>
.my-container {
  // 未登录显示的头部
  .unlogin {
    height: 160px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 66px;
      height: 66px;
    }
    .text {
      color: #fff;
      font-size: 14px;
    }
  }
  // 个人信息
  .my-info {
    background: url("./banner.png") no-repeat;
    background-size: cover;
    .van-cell {
      background-color: unset;
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
    .person-data {
      box-sizing: border-box;
      height: 115px;
      padding-bottom: 11px;
      padding-top: 38px;
      .portrait {
        box-sizing: border-box;
        width: 65px;
        height: 65px;
        border: 1px solid #fff;
        // padding-top: 20px;
      }
      .name {
        color: #ffffff;
        font-size: 16px;
        padding-left: 11px;
      }
      .edit-btn {
        height: 20px;
        color: #666666;
      }
    }
    .data-detail {
      height: 65px;
      .my-data {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        /deep/.van-grid-item__content {
          background-color: unset;
        }
        .num {
          font-size: 18px;
        }
        .num-type {
          font-size: 11px;
        }
      }
    }
  }
  //   收藏、历史
  /deep/.collect-history {
    .collect {
      height: 70px;
      .toutiao-shoucang {
        color: #eb5253;
        font-size: 22px;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
    .history {
      height: 70px;
      .toutiao-lishi1 {
        color: #ff9d1d;
        font-size: 22px;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }
  //   退出按钮
  .layout {
    text-align: center;
    // padding-top: 15px;
    .van-cell__title {
      font-size: 14px;
      color: #d86262;
    }
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>