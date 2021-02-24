<template>
  <div class="update-name">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />

    <div class="name-div">
      <van-field
        v-model="localName"
        autosize
        type="textarea"
        maxlength="15"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>
<script>
import { editUserFrofile } from '../../../api/user';
export default {
  name: 'UpdateName',

  components: {},

  props: {
    name: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      localName: this.name, //输入的文字
    };
  },

  computed: {},

  watch: {},

  methods: {
    async onConfirm() {
      try {
        //防止用户多次点击
        this.$toast.loading({
          message: '保存中',
          forbidClick: true, //禁止背景点击
        });
    // 发送请求更新昵称
        await editUserFrofile({
          name: this.localName,
        });
        // 更新父组件传过来的name
        this.$emit('update-name', this.localName)
        // 提示
        this.$toast.success({
          message: '保存成功',
        });
        // 关闭弹出层
        this.$emit('close');
      } catch (err) {
          if (err && err.response && err.response.status === 409) {
              this.$toast.fail("昵称已存在")
          } else {
              this.$toast.fail("保存失败")
          }
      }
    },
  },
};
</script>
<style scoped lang='less'>
.name-div {
  padding: 10px;
}
</style>