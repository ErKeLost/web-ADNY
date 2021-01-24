<template>
  <div class="song">
    <div class="song-top">
      <h3>最新音乐</h3>
    </div>
    <ul class="song-list">
      <li
        class="item"
        v-for="value in newsong"
        :key="value.id"
        @click="selectMusic(value.id)"
      >
        <img v-lazy="value.song.album.picUrl" alt />
        <div class="font">
          <h3>{{ value.name }}</h3>
          <div class="bbq">
            <p>{{ value.song.artists[0].name }}</p>
          </div>
        </div>
        <span ref="totalTime">{{ formatTime(value.song.duration) }}</span>
        <i class="iconfont icon-iconset0481"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SongList",
  methods: {
    formatTime(time) {
      let diffTime = time / 1000;
      let minute = Math.floor((diffTime / 60) % 60);
      minute = minute >= 10 ? minute : "0" + minute;
      let second = Math.floor(diffTime % 60);
      second = second >= 10 ? second : "0" + second;
      return minute + ":" + second;
    },
    ...mapActions(["setFullPlayer", "setMiniPlayer", "setSongDetail"]),
    selectMusic(id) {
      this.setFullPlayer(true);
      this.setMiniPlayer(false);
      this.setSongDetail([id]);
    },
  },
  props: {
    newsong: {
      type: Array,
      default: () => [],
      required: true,
    },
    date: {
      type: Number,
      default: 0,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.song {
  width: 90%;
  // display: flex;
  position: relative;
  left: 5%;
  justify-content: flex-start;
  li {
    list-style: none;
  }
}
.song-list {
  width: 100%;
  height: 200px;
  .item {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 50px 0;
    img {
      width: 100px;
      height: 100px;
      border-radius: 20px;
    }
    span {
      position: absolute;
      right: 10vw;
      font-size: 17px;
    }
  }
}
.font {
  height: 70px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
i {
  position: absolute;
  right: 0;
  font-size: 30px;
}
.item .bbq {
  position: relative;
  display: flex;
  align-items: center;
  // span {
  //   display: inline-block;
  //   position: absolute;
  //   left: 6vw;
  //   letter-spacing: 2px;
  //   text-transform: uppercase;
  //   font-size: 10px;
  //   color: red;
  // }
}
</style>