<template>
  <div>
    <div>
      <NormalPlayer :currenttime="currentTime"></NormalPlayer>
    </div>
    <div class="mini">
      <MiniPlayer></MiniPlayer>
    </div>
    <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="end"></audio>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MiniPlayer from "../components/Player/MiniPlayer";
import NormalPlayer from "../components/Player/NormalPlayer";
export default {
  name: "Player",
  components: {
    NormalPlayer,
    MiniPlayer,
  },
  computed: {
    ...mapGetters(["currentSong", "isPlaying", "currentIndex",'curtime']),
  },
  methods: {
    ...mapActions(["setIsPlaying",'setCurrentIndex']),
     timeupdate(e){
        // e.target.currentTime
    //   console.log(e);
      this.currentTime = e.target.currentTime
    //   console.log(this.currentTime);
    },
    end(){
        // console.log("aaweqw");
        this.setCurrentIndex(this.currentIndex + 1)
    }
  },
  watch: {
      curtime(newvalue,oldv){
      this.$refs.audio.currentTime = newvalue
    },
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.setIsPlaying(true);

        this.$refs.audio.play();

      } else {
        this.$refs.audio.pause();
      }
    },
    currentIndex(newvalue, oldv) {
      this.$refs.audio.oncanplay = () => {
        if (this.isPlaying) {
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      };
    },
  },
  data(){
      return{
          currentTime:0
      }
  }
};
</script>

<style lang="scss" scoped>
.mini {
  z-index: 9999;
}
</style>