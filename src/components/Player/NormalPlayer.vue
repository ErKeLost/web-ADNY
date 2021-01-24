<template>
    <div v-show="this.isFullPlayer" ref="normalPlayer" class="a">
      <div class="player">
        <img :src="currentSong.picUrl" alt="" />

        <div class="flex">
          <PlayerLeft></PlayerLeft>
          <PlayerRight :currenttime="currenttime"></PlayerRight>
        </div>
        <PlayerBottom :currenttime="currenttime"></PlayerBottom>
      </div>
      <Comment></Comment>
    </div>
</template>

<script>
import PlayerLeft from "../Player/PlayerLeft";
import PlayerRight from "../Player/PlayerRight";
import PlayerBottom from "../Player/PlayerBottom";
import Comment from '../Comment/Comment'

import { mapGetters, mapActions } from "vuex";
export default {
  name: "NormalPlayer",
  components: {
    PlayerLeft,
    PlayerRight,
    PlayerBottom,
    Comment

  },
  props: {
    currenttime: {},
  },
  computed: {
    ...mapGetters(["isFullPlayer", "currentSong"]),
  },
  methods: {
    ...mapActions(["setSongLyric"]),
  },
  watch: {
    currentSong(newvalue, oldvalue) {
      // console.log(newvalue.id);
      // console.log(newvalue);
      this.setSongLyric(newvalue.id);
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -9;
  object-fit: cover;
  opacity: .5;
  filter: blur(30px);
}
.player {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgb(0, 0, 0);
  z-index: 9999;
}
.flex {
  display: flex;
  // background: #000;
}
.a{
  // background: #000;

}
</style>