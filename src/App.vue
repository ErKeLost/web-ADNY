<template>
  <div id="app">
    <keep-alive>
      <Header></Header>
    </keep-alive>
    <keep-alive exclude="MyMusic,LogIn,Friend">
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>
<script>
import Header from "./components/Header";
import Player from "./views/Player";
export default {
  name: "App",
  components: {
    Header,
    Player,
  },
};
</script>
<style lang="scss">
// .v-enter {
//   transform: translateX(100%);
// }
// .v-enter-to {
//   transform: translateX(0%);
// }
// .v-enter-active {
//   transition: all 2s;
// }
// .v-leave {
//   transform: translateX(0%);
// }
// .v-leave-to {
//   transform: translateX(100%);
// }
// .v-leave-active {
//   transition: all 2s;
// }
</style>
