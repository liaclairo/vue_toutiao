<template>
  <div class="chat-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 消息展示区 -->
    <div class="msgList" ref="msgList">
      <van-cell
        v-for="(msg, index) in msgList"
        :key="index"
        :title="msg"
        :class="{ my: !/^小智:/.test(msg) }"
      ></van-cell>
      <!-- <div
        v-for="(msg, index) in msgList"
        :key="index"
        :class="{chatBox:true, my: !/^小智:/.test(msg) }"
      >
        {{ msg }}
      </div>  -->
    </div>

    <!-- 发送消息底部 -->
    <div class="sendMessage">
      <van-field v-model="message" center placeholder="请输入消息" />
      <van-button class="send-btn" size="small" type="info" @click="sendMsg"
        >发送</van-button
      >
    </div>
  </div>
</template>
<script>
import io from "socket.io-client";
import { mapState } from "vuex";
import { setItem, getItem } from "@/utils/storage";
import { getProfile } from "@/api/user";
export default {
  name: "Chat",
  components: {},
  props: {},
  data() {
    return {
      message: "",
      socket: null, //socket实例
      msgList: getItem("msgList") || [],
      photo: null,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    // this.getPhoto()
    this.socket = io("http://toutiao.itheima.net", {
      query: {
        token: this.user.token,
      },
      transports: ["websocket"],
    });

    // 当客户端与服务器建立连接成功，触发 connect 事件
    this.socket.on("connect", () => {
      console.log("建立连接成功！");
    });
    // 当客户端与服务器断开连接，触发disconnect事件
    this.socket.on("disconnect", () => {
      console.log("断开连接了！");
    });
    // 监听message事件，接收服务器发送的消息
    this.socket.on("message", (data) => {
      console.log(data);
      // 将接收到的消息放入消息列表
      this.msgList.push("小智:" + data.msg);
    });
  },
  mounted() {
    this.scrollBottom();
  },
  methods: {
    // 获取用户信息
    async getPhoto() {
      // 获取用户头像信息
      const { data: res } = await getProfile();
      console.log(res);
      this.photo=res.data.photo
    },
    // 处理发送消息
    sendMsg() {
      // 请求发送消息
      this.socket.emit("message", {
        msg: this.message,
        timestamp: Date.now(),
      });
      // 把发送的请求推入信息列表
      this.msgList.push(this.message);
      // 清空发送框内容
      this.message = "";
    },
    // 聊天内容区域随聊天列表滚动
    scrollBottom() {
      // 获取装聊天列表的容器
      const msgList = this.$refs.msgList;
      console.log(msgList);
      // 列表距离顶端的距离=列表的最大移动距离
      msgList.scrollTop = msgList.scrollHeight;
    },
  },
  watch: {
    msgList() {
      //   将聊天记录存储在本地
      setItem("msgList", this.msgList);
      // 聊天内容区域随聊天列表滚动
      this.$nextTick(() => {
        this.scrollBottom();
      });
    },
  },
};
</script>
<style lang="less" scoped>
.sendMessage {
  display: flex;
  align-items: center;
  padding: 10px;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;

  .send-btn {
    margin-left: 10px;
    width: 60px;
  }
}
/deep/.van-cell--center {
  line-height: unset !important;
}
.msgList {
  box-sizing: border-box;
  position: fixed;
  right: 0;
  left: 0;
  top: 46px;
  bottom: 56px;
  padding: 10px;
  overflow-y: auto;
  .van-cell {
    max-width: 70%;
    border-top-left-radius: 2em;
    border-top-right-radius: 2em;
    border-bottom-left-radius: 2em;
    border-bottom-right-radius: 2em;
    margin-bottom: 20px;
    line-height: 20px;
  }
}
.my {
  background-color: #41c94e;
  margin-right: 0;
  margin-left: 110px;
  text-align: right;
}
</style>
