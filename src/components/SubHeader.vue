<template>
  <div class="header">
    <div class="header-left" @click="back">
      <i class="iconfont icon-shanchu1"></i>
    </div>
    <p class="header-title">
      <span>'ADNY'</span>
      {{title}}
      <span>'ERKELOST'</span>
    </p>
    <div class="header-right">
      <i class="iconfont icon-diantai"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubHeader",
  props: {
    title: {
      type: String,
      default: "",
      required: true,
    },
  },
  methods: {
    back() {
      window.history.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  color: rgb(167, 164, 164);
  font-family: "Anton", sans-serif;
  align-items: center;
  height: 80px;
  background: #333;
  display: flex;
  justify-content: space-between;
}
.icon-shanchu1 {
  font-size: 30px;
  margin-left: 5vh;
}
.header-title {
  font-size: 20px;
}
.icon-diantai {
  font-size: 30px;
  margin-right: 5vh;
}
span {
  background: linear-gradient(to right, #fba, #abf);
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: 5px;
  margin: 0 15px;
}
</style>