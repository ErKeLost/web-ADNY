<template>
  <div class="bottom">
    <div class="left">
      <img :src="currentSong.picUrl" alt="" />
      <div>
        <p>{{ currentSong.name }}</p>
        <p>{{ currentSong.singer }}</p>
      </div>
    </div>
    <div class="center">
      <div class="oppo">
        <!-- <i class="iconfont eee"></i> -->
        <i class="iconfont  rr  ccc" @click="prev"></i>
        <i
          class="iconfont  ppp"
          @click="isplay"
          @keydown.enter="isplay"
          v-show="!this.isPlaying"
        ></i>
        <i
          class="iconfont  bbb"
          @click="isplay"
          v-show="this.isPlaying"
        ></i>
        <i class="iconfont  rr ddd" @click="next"></i>
        <!-- <i class="iconfont icon-diantai rr"></i> -->
      </div>
      <div class="ii">
        <span ref="ele">00:00</span>
        <div class="progressbar" @click="progclick" ref="progressBar">
          <div class="progressline" ref="progress">
            <div class="progressdot"></div>
          </div>
        </div>
        <span ref="timeee">00:00</span>
      </div>
    </div>
    <audio :src="currentSong.url" ref="audio"></audio>

    <div class="right">
      <i class="iconfont"></i>
      <i class="iconfont"></i>
      <i class="iconfont"></i>
      <i class="iconfont"></i>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PlayerBottom",
  methods: {
    ...mapActions(["setIsPlaying", "setCurrentIndex", "setCurTime"]),
    isplay() {
      this.setIsPlaying(!this.isPlaying);
      // console.log("b");
    },

    prev() {
      this.setCurrentIndex(this.currentIndex - 1);
      this.setIsPlaying(!this.isPlaying);

      this.$refs.audio.play();
    },
    progclick(e) {
      let normalleft = e.target.offsetLeft;
      let nowleft = e.pageX;
      let clickleft = nowleft - normalleft;
      let progwidth = this.$refs.progressBar.offsetWidth;
      // console.log(progwidth);
      let val = clickleft / progwidth;
      this.$refs.progress.style.width = val * 100 + "%";
      let currenttime = this.totaltime * val;
      // console.log(parseInt(currenttime));
      // console.log(parseInt(this.totaltime));
      this.setCurTime(currenttime);
      if (parseInt(currenttime) === parseInt(this.totaltime)) {
        // console.log("aaaaaa");
      }
      this.opo = parseInt(currenttime);
    },
    mounted() {
      if (this.opo === parseInt(this.totaltime)) {
        next();
      }
    },
    next() {
      //    this.setIsPlaying(false)

      this.setCurrentIndex(this.currentIndex + 1);
      setTimeout(() => {
        this.setIsPlaying(true);
      }, 0);
      // console.log("a");
    },
    formatTime(time) {
      let diffTime = time;
      let year = Math.floor(diffTime / (60 * 60 * 24 * 30 * 12));
      let month = Math.floor(diffTime / (60 * 60 * 24 * 30));
      let day = Math.floor(diffTime / (60 * 60 * 24));
      let minute = Math.floor((diffTime / 60) % 60);
      minute = minute >= 10 ? minute : "0" + minute;
      let second = Math.floor(diffTime % 60);
      second = second >= 10 ? second : "0" + second;
      return {
        day: day,
        // hour:hour,
        minute: minute,
        second: second,
      };
    },
  },
  computed: {
    ...mapGetters(["isPlaying", "currentSong", "currentIndex", "curtime"]),
  },
  watch: {
    // isPlaying(newvalue,oldv){
    //     if(newvalue){
    //         this.$refs.audio.play()
    //     }else{
    //         this.$refs.audio.pause()
    //     }
    // },
    // currentIndex(newvalue,oldv){
    //    this.$refs.audio.oncanplay = () => {
    //        if(this.isPlaying){
    //            this.$refs.audio.play()
    //        }else{
    //            this.$refs.audio.pause()
    //        }
    //    }
    // }
    totaltime(newvalue, oldv) {
      let t = this.formatTime(newvalue);
      this.$refs.timeee.innerHTML = t.minute + ":" + t.second;
    },
    currenttime(newvalue, oldv) {
      let t = this.formatTime(newvalue);
      this.$refs.ele.innerHTML = t.minute + ":" + t.second;
      //根据播放时间计算比例
      let value = (newvalue / this.totaltime) * 100;
      // console.log(value);
      this.$refs.progress.style.width = value + "%";
    },
  },
  mounted() {
    this.$refs.audio.oncanplay = () => {
      this.totaltime = this.$refs.audio.duration;
      // console.log(this.totaltime);
    };
  },
  data() {
    return {
      totaltime: 0,
      // currentTime :
      opo: 0,
    };
  },
  props: {
    currenttime: {},
  },
};
</script>

<style lang="scss" scoped>
i {
  font-weight: bold;
}
.left {
  width: 20%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.eee{
  width: 50px;
  height: 50px;
  // background: url('../../assets/img/e.png');
}
.ppp{
  width: 30px;
  height: 30px;
  background: url('../../assets/img/1.png');
  background-position: 0 0;
}
.bbb{
  width: 30px;
  height: 30px;
  background: url('../../assets/img/1.png');
  background-position: -30px 0;

}
.ccc{
  width: 20px;
  height: 20px;
  background: url('../../assets/img/1.png') no-repeat;
  background-position: 0 -30px;
  transform: translateX(-10px);

}
.ddd{
  width: 20px;
  height: 20px;
  background: url('../../assets/img/1.png') no-repeat;
  background-position: 0 -52px;
}
.oppo {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-10px);
  .icon-gengduo {
    font-size: 22px;
  }
  .rr {
    font-size: 25px;
  }
  .icon-iconset0481 {
    font-size: 30px;
  }
  .icon-icon_bofang {
    font-size: 30px;
  }
}
i {
  margin: 0 20px;
}
.ii {
  width: 100%;
  display: flex;
  align-items: center;
  .progressbar {
    margin: 0 20px;
    border-radius: 5px;
  }
}
img {
  width: 50px;
  height: 50px;
}
.bottom {
  width: 100%;
  height: 8vh;
  display: flex;
  align-items: center;
  //    background: rgb(145, 145, 145);
  color: white;
}
.progressbar {
  width: 700px;
  height: 5px;
  background: rgb(126, 126, 126);
  .progressline {
    width: 0%;
    height: 5px;
    background: rgb(255, 255, 255);
    position: relative;
    .progressdot {
      width: 15px;
      height: 15px;
      background: rgb(255, 255, 255);
      position: absolute;
      right: 0;
      top: -5px;
      border-radius: 50%;
    }
  }
}
</style>