<template>
  <div>
    <div class="editImg">
      <img :src="image" ref="image" />
    </div>
    <!-- 底部导航栏 -->
    <van-nav-bar
      class="footer"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="editPhoto"
    />
  </div>
</template>
<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { editPhoto } from "@/api/user";
export default {
  name: "EditPhoto",
  components: {},
  props: ["imgFile"],
  data() {
    return {
      // 头像文件路径
      image: window.URL.createObjectURL(this.imgFile),
      //   裁剪实例
      cropper: null,
    };
  },
  computed: {},
  created() {},
  mounted() {
    //   获取装图片的容器
    const image = this.$refs.image;
    this.cropper = new Cropper(image, {
      aspectRatio: 16 / 9,
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      //   autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
  },
  methods: {
    //   获取裁切后图像文件
    async getCropper(){
        return new Promise(resolve=>{
            this.cropper.getCroppedCanvas().toBlob(blob=>{
                resolve(blob)
            })
        })
    },
    async editPhoto() {
      this.$toast.loading({
          message:"正在保存...",
          duration:0
      });
      //   获取裁切后图像文件
      const file=await this.getCropper()
      const fd = new FormData();
      fd.append("photo", file);
      //    发送请求，修改头像
      // 如果要求Content-Type是multipart/form-data，
      // 这一定要提交FormData数据对象，专门用于文件的上传，不能提交{}
    //   const fd = new FormData();
    //   fd.append("photo", this.imgFile);
      await editPhoto(fd);
      // 关闭编辑头像弹出层
      this.$emit("close");
      // 更新父组件头像信息
      this.$emit("editPhoto", window.URL.createObjectURL(file));
      this.$toast.success("修改成功");
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
/deep/.cropper-container {
  position: absolute;
  top: 50%;
  right: -50%;
  transform: translate(-50%, -50%);
}
/deep/ .cropper-face {
    border-radius: 50%;
}
img {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
.footer {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
//   border: 1px solid #f9fafa;
background-color: #000;
}
</style>
