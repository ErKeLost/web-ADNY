<template>
  <div class="left">
    <div class="it">
      <div @click="back">
        <i class="iconfont icon-houtui"></i>
      </div>
      <div class="center">
        <img class="g" src="../../assets/img/needle.png" alt="" ref="down" />
        <img class="c" src="../../assets/img/disc.png" alt="" ref="circle" />
      </div>
      <img :src="currentSong.picUrl" alt="" class="url" ref="aa" />
    </div>
    <div class="item">
      <i class="iconfont rr a"></i>
      <i class="iconfont rr b"></i>
      <i class="iconfont rr e"></i>
      <i class="iconfont rr d" @click="love()"></i>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { getMusicComment } from "../../api/index";
import gsap from "gsap";
import { TimelineLite } from "gsap";
export default {
  name: "PlayerLeft",
  created() {},
  mounted() {
    const t = gsap.timeline({ defaults: { ease: "bounce" } });
    const comment = this.$refs;
    t.to(comment, { y: "0%", duration: 1, opacity: 1 });
  },
  methods: {
    ...mapActions(["setFullPlayer", "setMiniPlayer", "setComment",'setCoData']),
    ...mapMutations(["comment"]),
    // back(){
    //     window.history.back()
    //     console.log("bb");
    // }
    back() {
      // this.$store.dispatch('setFullPlayer',false)
      this.setFullPlayer(false);
      this.setMiniPlayer(true);
      this.comment(false);
    },
    love() {
      console.log("aaaa");
      this.comment(true);
      const t = gsap.timeline({ defaults: { ease: "bounce" } });
      const comment = this.$refs;
      t.to(comment, { y: "0%", duration: 1, opacity: 1 });
     
    },
  },
  computed: {
    ...mapGetters(["isPlaying", "currentSong"]),
  },
  watch: {
    isPlaying(newValue, old) {
      if (newValue) {
        setTimeout(() => {
          this.$refs.circle.classList.add("active");
          this.$refs.aa.classList.add("active");
        }, 1000);
        this.$refs.down.classList.add("activ");
      } else {
        this.$refs.circle.classList.remove("active");
        this.$refs.aa.classList.remove("active");

        this.$refs.down.classList.remove("activ");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.rr {
}
.item i {
  color: white;

  font-weight: bold;
}
.url {
  width: 250px;
  height: 250px;
  position: absolute;
  top: 230px;
  // z-index: 9;
  border-radius: 50%;
  // top: 0;
  left: 37%;
  // transform: translateX(-50%);
  &.active {
    animation: oo 5s linear infinite;
  }
}
@keyframes oo {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.left {
  width: 50%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  //    align-items: center;
}
.icon-houtui {
  top: 2vh;
  left: 2vh;
  position: absolute;
  color: white;
  font-size: 40px;
}
.center {
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.it {
  height: 60%;
  width: 100%;
  position: relative;
}
.g {
  width: 172px;
  z-index: 9;
  height: 254px;
  transform: rotate(-30deg);
  transform-origin: 20px -20px;
  transition: all 1s ease;
  //    animation: down 1s linear;
  //    animation-play-state: paused;

  &.activ {
    transform: rotate(0deg);
  }
}
.item {
  height: 40%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  //    color: black;
}
.c {
  width: 400px;
  height: 400px;
  position: relative;
  top: -90px;
  animation: sport 5s linear infinite;
  animation-play-state: paused;
  &.active {
    animation-play-state: running;
  }
}
.rr {
  font-size: 35px;
  font-weight: bold;
}
.a {
  background: url("../../assets/img/1.png") no-repeat;
  width: 30px;
  height: 25px;
  background-position: 0 -205px;
  left: 8%;
}
.b {
  left: 18%;
  background: url("../../assets/img/1.png") no-repeat;
  width: 30px;
  height: 25px;
  background-position: 0 -96px;
}
.e {
  left: 28%;
  background: url("../../assets/img/1.png") no-repeat;
  width: 30px;
  height: 25px;
  background-position: 0 -120px;
}
.d {
  left: 38%;
  background: url("../../assets/img/1.png") no-repeat;
  width: 30px;
  height: 25px;
  background-position: 0 -430px;
}
.d::before {
  content: "I lOVE YOU  WHATEVER  WHERE  I  AM";
  font-size: 10px;
  position: absolute;
  transform: translate(10px, -10px);
}
@keyframes sport {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes down {
  from {
    transform: rotate(-30deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>