<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="editBirth"
      visible-item-count="5"
    />
  </div>
</template>
<script>
import { editProfile } from "@/api/user";
import dayjs from "dayjs";
export default {
  name: "EditBirth",
  components: {},
  props: ["birthday"],
  data() {
    return {
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.birthday),
    };
  },
  computed: {},
  created() {
    console.log(this.birthday);
  },
  mounted() {},
  methods: {
    async editBirth() {
      const date = dayjs(this.currentDate).format("YYYY-MM-DD");
      this.$toast.loading("保存中...");
      // 发送请求，修改性别
      await editProfile({
        birthday: date,
      });
      console.log(date);
      // 修改成功，关闭编辑昵称弹出层,修改父组件中gender
      this.$emit("close");
      this.$emit("editBirth", date);
      this.$toast.success("修改成功");
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
</style>
