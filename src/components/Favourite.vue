<template>
  <div class="fav">
    <div class="top">
      <ul>
        <li
          v-for="(item, index) in tit"
          :key="index"
          @click.stop="select(index)"
          :class="{ active: currentIndex === index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="center" v-if="currentIndex == 0">
      <ul>
        <li class="ti">
          <span class="a"> 序号 </span>
          <span class="b"> 歌名 </span>
          <span class="c"> 歌手 </span>
          <span class="d"> 时长 </span>
        </li>
      </ul>
      <ul
        class="right"
        style="overflow: auto; height: 400px"
      >
        <li
          v-for="(item, index) in recentList"
          :key="index"
          :class="{ac:index % 2 == 0}"
          @click="play(item.song.id)"
        >
          <span class="a">
            {{ index + 1 }}
          </span>
          <span class="b">
            {{ item.song.name }}
            <i  @click.stop="mv(item.song.mv)" v-show="item.song.mv !== 0" class="iconfont icon-video lk"></i>
          </span>
          <span class="c">
            {{ item.song.ar[0].name }}
          </span>
          <span class="d">
            {{ formatTime(item.song.dt) }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Favourite",
  data() {
    return {
      tit: ["我喜欢", "我创建的歌单", "关注", "粉丝", "我喜欢的MV", "我的已购"],
      currentIndex: 0,
      love: [],
    };
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setMiniPlayer',
      'setFullPlayer',
      'setSongDetail',
      'setCoData'
    ]),
    mv(id) {
      this.$router.push({
        path: `/Mv/MvDetail/${id}`,
      });
      setTimeout(() => {
        this.$router.go(0);
      }, 500);
    },
    play(id) {
      this.setIsPlaying(false);

      this.$store.dispatch("setFullPlayer", true);
      // console.log("aa");
      // console.log(id);
      this.setSongDetail([id]);
      this.setCoData([id])
      this.setMiniPlayer(false);
      setTimeout(() => {
        this.setIsPlaying(true);
      }, 500);
    },
    select(index) {
      this.currentIndex = index;
      // console.log(this.currentIndex);
    },
    formatTime(time) {
      let diffTime = time / 1000;
      let minute = Math.floor((diffTime / 60) % 60);
      minute = minute >= 10 ? minute : "0" + minute;
      let second = Math.floor(diffTime % 60);
      second = second >= 10 ? second : "0" + second;
      return minute + ":" + second;
    },
  },
  props: {
    recentList: {
      type: Array,
    },
  },
  computed: {
    auto() {
      if (index < 10) {
        return "0" + index;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.center{
  color: white;
  background:url('../assets/img/963.jpg') center center ;
  ul{
    margin-left: 15vw;
  }
  height: 50vh;
}
.fav{
  background: url('../assets/img/789.png');
}
.icon-video{
  font-size: 25px;
  color: black;
  // transform: translateX(5px);
}
.lk{
  color: red;
  display: inline-block;
  position: absolute;
  // left: 100px;
  margin-left: 20px;
  top: 2px;
}
.it {
  // margin-bottom: 2vh;

}
.ac{
  // background: rgb(248, 248, 248);
}
li{
  height: 50px;
  line-height: 50px;
  cursor: pointer;
  width: 55vw;

}
.ti {
  border-bottom: 2px solid black;
  width: 65%;
  height: 80px;
  line-height: 80px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2vh;
}

span {
  display: inline-block;
}
.a {
  width: 4vw;
  text-align: center;
  margin-right: 2vw;
}
.b {
  width: 27vw;
  // display: flex;
  position: relative;

}
.c {
  width: 17vw;
}

.center {
  display: flex;
  flex-direction: column;
  // margin-left: 15vw;
  // background: red;
  li {
    list-style: none;
  }
}
.fav {
  width: 100%;
  height: 78%;
  // background: red;
  // background: red;
}
.top {
  ul {
    display: flex;
    list-style: none;
    margin-left: 15vw;
  }
  li {
    margin-right: 2vw;
    font-size: 18px;
    font-weight: bold;
    color: rgb(80, 80, 80);
    padding-bottom: 2vh;
  }
}
.active {
  border-bottom: 3px solid black;
}
</style>