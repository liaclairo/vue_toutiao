<template>
  <div>
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="编辑昵称"
      left-text="返回"
      right-text="完成"
      left-arrow
      @click-left="$emit('close')"
      @click-right="editName"
    />
    <!-- 编辑框 -->
    <div class="edit-wrap">
      <van-field
        class="eidt"
        v-model="localName"
        rows="1"
        autosize
        type="textarea"
        maxlength="10"
        show-word-limit
        placeholder="请输入新昵称"
      />
    </div>
  </div>
</template>
<script>
import { editProfile } from "@/api/user";
export default {
  name: "EditName",
  components: {},
  props: ["name"],
  data() {
    return {
      localName: this.name,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async editName() {
        this.$toast.loading('保存中...')
      // 发送请求，修改昵称
     try{
        const{data:res}=  await editProfile({
        name: this.localName,
      });
    //   console.log(res)
      // 修改成功，关闭编辑昵称弹出层,修改父组件中name
      this.$emit("close");
      this.$emit('editName',this.localName)
      this.$toast.success('修改成功')
     }catch(err){
        //  修改失败
         if(err && err.response && err.response.status===409){
             this.$toast.fail('该昵称已存在')
         }
     }
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.edit-wrap {
  padding: 20px;
}
.eidt {
  background-color: #f1f3f4;
}
</style>
