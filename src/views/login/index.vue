<template>
  <div class="login-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="注册/登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 登录表单 -->
    <van-form
      ref="loginForm"
      :show-error="false"
      :show-error-message="false"
      @failed="failSubmit"
      @submit="onSubmit"
    >
      <van-field
        v-model="user.mobile"
        name="mobile"
       icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        :rules="formRule.mobile"
        center
      />
      <van-field
        v-model="user.code"
        name="code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma1"
        placeholder="请输入验证码"
        :rules="formRule.code"
        center
      >
        <template #button>
          <!-- 倒计时按钮60s -->
          <van-count-down 
          v-if='isCountdownShow'
          :time="1000 * 60" 
           format=" ss s"
           @finish='isCountdownShow=false'
           />
          <!-- 发送验证码按钮 -->
          <van-button
            v-else
            size="mini"
            class="send-btn"
            type="primary"
            round
            :loading='isLoading'
            @click.prevent="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="loginbtn" style="margin: 16px">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { login,sendMessage } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "Login",
  data() {
    return {
      // 用户信息
      user: {
        mobile: "13611111111", //手机号
        code: "246810", //验证码
      },
      // 表单登录校验规则
      formRule: {
        mobile: [
          { required: true, message: "请输入手机号" },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: "手机号格式不正确" },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          { pattern: /^\d{6}$/, message: "验证码格式不正确" },
        ],
      },
      // 控制发送验证码按钮和倒计时按钮的显示与隐藏
      isCountdownShow:false,
      // 控制发送验证码按钮loading状态
      isLoading:false
    };
  },
  methods: {
    // 登录验证
    async onSubmit() {
      Toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0, //展示时长为0时，提示框不会消失
      });
      // 1.找到数据接口，2.封装请求方法
      // 3.请求调用登录
      try {
        const {data:res} = await login(this.user);
        // 4.处理响应结果
        // console.log(res);
        // 把后端返回的用户登录状态（token等数据）存储到vuex仓库中
        this.$store.commit('setUser',res.data)
        // 登录成功提示信息
        Toast.success({
          message: "登录成功",
          forbidClick: true,
        });
        // 在跳转页面之前，先清空之前缓存的组件
        this.$store.commit('removeCachePage','Layout')
        // 跳转到之前的页面
        this.$router.push(this.$route.query.redirect || '/')
        
      } catch (err) {
        console.log(err);
        console.log("登录失败", err);
        Toast.fail({
          message: "登录失败",
          forbidClick: true,
        });
      }
    },
    // 登录表单验证失败的回调函数
    failSubmit(err) {
      if (err.errors[0]) {
        Toast({
          message: err.errors[0].message,
          position: "top", //防止手机键盘太高，看不到提示消息
        });
      }
    },
    // 处理点击发送验证码的回调函数
    async sendCode() {
      // 点击发送验证码按钮，让按钮状态变为loading，防止用户因网络慢多次误点,触发发送行为
      this.isLoading=true
      // 先验证表单中手机号是否输入正确
      try {
        const data = await this.$refs.loginForm.validate("mobile");
        // 验证通过
        // console.log(data)//undefined
        // 1.找到数据接口，2.封装请求方法
        // 3.请求调用发送验证码
        const res=await sendMessage(this.user.mobile)
        console.log(res)
        // 成功发送验证码=>显示倒计时按钮=>隐藏发送按钮
          this.isCountdownShow=true
        // 倒计时结束=>隐藏倒计时按钮=>显示发送按钮


      } catch (err) {
        // console.dir(err)
        let message=''
        if(err && err.response && err.response.status===429){
          // 发送太频繁，导致验证码发送失败
          message='发送太频繁，请稍后重试'
        }else if(err.name==='mobile'){
          // 手机号校验未通过，导致验证码发送失败
          message=err.message
        }else{
          // 未知错误，导致验证码发送失败
          message='发送失败，请稍后重试'
        }
        //  发送验证码失败提示信息
        Toast({
          message:message,
          position:'top'
        })
      }
      // 关闭按钮loading状态
      this.isLoading=false
    },
  },
};
</script>
<style lang="less" scoped>
.login-container {
  .send-btn {
    height: 23px;
    width: 80px;
    background-color: #eeeded;
    border: none;
    color: #9b9b9b;
    font-size: 11px;
  }

  .loginbtn {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>