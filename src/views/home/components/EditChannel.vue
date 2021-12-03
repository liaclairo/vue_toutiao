<template>
  <div class="edit-channel">
    <!-- 顶部标题和编辑按钮 -->
    <van-cell size="large" center :border="false">
      <div slot="title" class="title">我的频道</div>
      <van-button
        class="edit-btn"
        size="mini"
        plain
        round
        type="danger"
        @click="idEdit = !idEdit"
        >{{ idEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <!-- 我的频道 -->
    <van-grid class="my-chanel" :gutter="10" :column-num="4">
      <van-grid-item
        class="grid-item"
        :class="{ active: active === index }"
        :icon="idEdit && index !== 0 ? 'clear' : ''"
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
        @click="handelUserChannel(channel,index)"
      />
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="频道推荐" class="title"></van-cell>
    <van-grid class="my-chanel" :gutter="10" :column-num="4">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="addChannel(channel)"
    /></van-grid>
  </div>
</template>
<script>
import { getAllChannels, addUserChannel,deleteUserChannel } from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  name: "EditChannel",
  props: ["userChannels", "active"],
  data() {
    return {
      // 控制是否编辑频道
      idEdit: false,
      // 所有频道列表
      allChannels: [],
    };
  },
  created() {
    this.onloadAllChannels();
  },
  methods: {
    // 加载所有频道列表
    async onloadAllChannels() {
      const { data: res } = await getAllChannels();
      // console.log(res)
      this.allChannels = res.data.channels;
    },
    // 添加频道
    async addChannel(channel) {
      // console.log(channel)
      this.userChannels.push(channel);
      console.log(channel.id, this.userChannels.length);

      // 数据持久化处理
      if (this.user) {
        // 如果已登录，则将数据添加到线上存储
        await addUserChannel({
          channels:[{
              id: channel.id,
              seq: this.userChannels.length,
            }]
        });
      } else {
        // 如果未登录，则将数据存储到本地
        setItem("userChannels", this.userChannels);
      }
    },
    // 处理我的频道
    handelUserChannel(channel,index) {
      if (this.idEdit && index !== 0) {
        // 处于编辑状态，点击删除频道
        this.deleteChannel(channel,index);
      } else {
        // 未处于编辑状态，点击就跳转到对应的频道
        this.uptoChannel(index);
      }
    },
    // 删除频道
   async deleteChannel(channel,index) {
      console.log(index);
      if (index <= this.active) {
        // 更新激活频道索引
        this.$emit("tabActive", this.active - 1);
      }
      this.userChannels.splice(index, 1);

      // 数据持久化处理
      if (this.user) {
        // 如果已登录，则调用接口将数据更新到线上存储
       await deleteUserChannel(channel.id)
      } else {
        // 如果未登录，则将数据存储到本地
        setItem("userChannels", this.userChannels);
      }

    },
    // 跳转频道
    uptoChannel(index) {
      //触发closeEdit事件,将isPopupShow变为false，关闭编辑弹出框
      this.$emit("closeEdit");
      // 触发tabActive事件，改变active的值，active=index
      this.$emit("tabActive", index);
    },
  },
  computed: {
    // 用户登录状态数据
    ...mapState(["user"]),
    // 频道推荐列表:所有频道列表-我的频道列表
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        return !this.userChannels.find((userChannel) => {
          return userChannel.id === channel.id;
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.edit-channel {
  padding-top: 54px;
  .title {
    font-size: 16px;
    color: #333333;
  }
  .edit-btn {
    width: 60px;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 12px;
        color: #222;
        margin-top: 0;
      }
    }
  }
  /deep/ .van-grid-item__icon {
    position: absolute;
    font-size: 16px;
    right: -6px;
    top: -6px;
    color: #ccc;
  }
  .active {
    /deep/.van-grid-item__text {
      color: red !important;
    }
  }
}
</style>