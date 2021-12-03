<template>
  <div>
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 头像 -->
    <input type="file" hidden ref="file" accept="image/*" @change="onChange" />
    <van-cell center title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <!-- 昵称 -->
    <van-cell
      center
      title="昵称"
      is-link
      :value="user.name"
      @click="isNamePopShow = true"
    />
    <!-- 性别 -->
    <van-cell
      center
      title="性别"
      is-link
      :value="user.gender === 1 ? '女' : '男'"
      @click="isGenderPopShow = true"
    />
    <!-- 生日 -->
    <van-cell
      center
      title="生日"
      is-link
      :value="user.birthday"
      @click="isBirthPopShow = true"
    />

    <!-- 编辑头像弹出层 -->
    <van-popup
    class="edit-photo"
      v-model="isPhotoPopShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <EditPhoto
        v-if="isPhotoPopShow"
        :imgFile="imgFile"
        @close="isPhotoPopShow = false"
        @editPhoto="user.photo = $event"
      />
    </van-popup>
    <!-- 编辑昵称弹出层 -->
    <van-popup
      v-model="isNamePopShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <EditName
        v-if="isNamePopShow"
        :name="user.name"
        @close="isNamePopShow = false"
        @editName="user.name = $event"
      />
    </van-popup>
    <!-- 编辑性别弹出层 -->
    <van-popup v-model="isGenderPopShow" position="bottom" round>
      <EditGender
        v-if="isGenderPopShow"
        :gender="user.gender"
        @close="isGenderPopShow = false"
        @editGender="user.gender = $event"
      />
    </van-popup>
    <!-- 编辑生日弹出层 -->
    <van-popup v-model="isBirthPopShow" position="bottom" round>
      <EditBirth
        v-if="isBirthPopShow"
        :birthday="user.birthday"
        @close="isBirthPopShow = false"
        @editBirth="user.birthday = $event"
      />
    </van-popup>
  </div>
</template>
<script>
import { getProfile } from "@/api/user";
import EditName from "./components/EditName";
import EditGender from "./components/EditGender";
import EditBirth from "./components/EditBirth";
import EditPhoto from "./components/EditPhoto";
export default {
  name: "Profile",
  components: { EditName, EditGender, EditBirth,EditPhoto },
  props: {},
  data() {
    return {
      // 用户信息
      user: {},
      // 控制编辑姓名弹出层
      isNamePopShow: false,
      // 控制编辑性别弹出层
      isGenderPopShow: false,
      // 控制编辑生日弹出层
      isBirthPopShow: false,
      // 控制编辑头像弹出层
      isPhotoPopShow: false,
      // 新选头像文件路径
      imgFile: null,
    };
  },
  computed: {},
  created() {
    this.onloadUser();
  },
  mounted() {},
  methods: {
    //   加载用户信息
    async onloadUser() {
      //   发送请求，获取用户信息
      const { data: res } = await getProfile();
      console.log(res);
      this.user = res.data;
    },
    // 当用户选好头像文件，触发改时间
    onChange() {
      // 显示修建头像弹窗层
      this.isPhotoPopShow = true;
      // 在弹窗层预览图片
      // 获取新选的头像文件
      const imgFile = this.$refs.file.files[0]
      // const imgFile = window.URL.createObjectURL(this.$refs.file.files[0]);
      this.imgFile=imgFile
      // 防止选择同一张图不触发change事件
      this.$refs.file.value = "";
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.avatar {
  height: 30px;
  width: 30px;
}
.edit-photo{
    background-color: #000;
}
</style>
