<template>
  <div class="item">
    <div class="obj">
      <input type="text" v-model="value" @keydown.enter="login" />
      <img src="../assets/img/963.jpg" alt="" />
      <p @click="go($event)">erkelost</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "down",
  data() {
    return {
      value: 1,
    };
  },
  watch: {
    value(newValue, oldValue) {
      console.log(newValue);
    },
  },
  methods: {
    login() {
      // alert(this.value)
      this.value = "erkelsot";
    },
    go(e) {
      console.log(e.target.scrollTop);
      let timer = setInterval(() => {
        let ispeed = Math.floor(-this.erke / 5);
        // console.log(this.scrollTop);
        // console.log(ispeed);
        // console.log(that);
        console.log(this.erke);
        document.documentElement.scrollTop=this.erke + ispeed;
        if (this.erke === 0) {
        clearInterval(timer);
      }
      }, 1);
      
    },
    toscroll() {
      // let that = this;
      let scrollTop = document.documentElement.scrollTop;
      this.erke = scrollTop;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.toscroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.toscroll);
  },
};
</script>

<style lang="scss" scoped>
.obj {
  position: relative;
  top: 80px;
}
p {
  margin-top: 300px;
}
</style>