<template>
  <div>
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      @confirm="editGender"
      @cancel="$emit('close')"
      @change="onChange"
      :default-index="defaultIndex"
    />
  </div>
</template>
<script>
import { editProfile } from "@/api/user";
export default {
  name: "EditGender",
  components: {},
  props: ['gender'],
  data() {
    return {
        columns:['男','女'],
        defaultIndex:this.gender,
        localGender:this.gender
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 监视选择框变化,index为当前选中选项的索引值
      onChange(a,b,index){
          this.localGender=index
        //   console.log(this.localGender)
          console.log(index)
      },
    //   修改性别
      async editGender() {
        this.$toast.loading('保存中...')
      // 发送请求，修改性别
        await editProfile({
        gender: this.localGender
      });
      console.log(this.localGender)
      // 修改成功，关闭编辑昵称弹出层,修改父组件中gender
      this.$emit("close");
      this.$emit('editGender',this.localGender)
      this.$toast.success('修改成功')
     
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
</style>
