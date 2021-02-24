<template>
  <div id="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "BetterScroll",
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      scrollX :true,
      scrollY :true,
      probeType:3,
      mouseWheel: true, //开启鼠标滚轮
      disableMouse: false, //启用鼠标拖动
      disableTouch: false, //启用手指触摸
      pullUpLoad:true
    });
    setTimeout(() => {
      // console.log(this.scroll.maxScrollY);

      this.scroll.refresh();
      // console.log(this.scroll.maxScrollY);
    }, 10);
    this.scroll.on('pullingUp',() => {
      console.log("aaa");
      this.scroll.refresh()
    })
  },
};
</script>

<style lang="scss" scoped>
#wrapper {
  width: 100%;
  height: 100%;
}
</style>