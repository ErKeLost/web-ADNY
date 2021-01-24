<template>
  <div>
    <div class="a"></div>
    <ul class="detail-center">
      <li class="bottom-top">
        <span class="play">播放</span>
        <span class="singer">歌手</span>
        <span class="time">时长</span>
      </li>
      <!-- <li v-for="value in playlist" :key="value.id" class="item">
        <span class="play">{{ value.name }}</span>
        <span class="singer">{{ value.ar[0].name }}</span>
        <span class="singer">{{ value.name }}</span>
      </li>-->
      <li v-for="(item,index) in song" :key="index" class="item" @click="player(item.id)">
        <!-- <span>{{item.id}}</span> -->
        <span class="play">{{ item.name }}</span>
        <span class="singer">{{ item.ar[0].name }}</span>
      </li>
    </ul>
    <div class="dec">
      <p class="d">简介:</p>
      <p class="c">{{include}}</p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "DetailCenter",
  props: {
    playlist: {
      type: Array,
      default: () => [],
      required: true,
    },
    include: {
      type: String,
      default: "",
      required: true,
    },
    song: {
      // type:{},
      // // default:{},
      // // // default:() => {},
      // // required:true
    },
  },
  computed:{
    ...mapGetters([
      'isMiniPlayer',
      'currentIndex',
      'isPlaying'
    ])
  },
  methods: {
    ...mapActions([
      'setSongDetail',
      'setCurrentIndex',
      'setMiniPlayer',
      'setIsPlaying'
      
    ]),
    player(id){
      this.setIsPlaying(false)

      this.$store.dispatch('setFullPlayer',true)
      // console.log("aa");
      // console.log(id);
      this.setSongDetail([id])
      this.setMiniPlayer(false)
      setTimeout(() => {
      this.setIsPlaying(true)
      },500)
    }
  },
};
</script>

<style lang="scss" scoped>
div {
  margin-left: 12%;
  width: 65%;
}
.a{
  // background:url("../assets/css/1.jpg");
  position: absolute;
  left: -12%;
  // background-color: #ddd;
}
.play {
  width: 500px;
  // background: #bfa;
}
.singer {
  width: 20%;
}
.bb {
  // width: 100%;
  height: 2800px;
  // background: #abf;
}
li{
  color: white;
}
.album {
  width: 35%;
  white-space: nowrap;
}
.time {
  width: 10%;
}
li {
  list-style: none;
}
div {
  height: 2000px;
}
.bottom-top {
  height: 50px;
  line-height: 50px;
  display: flex;
  // background: #abf;
}
.item {
  display: flex;
  height: 50px;
  line-height: 50px;
}
.dec {
  position: relative;
  width: 300px;
  // top: 70%;
  right: -90%;
  top: -100%;
  .d {
    margin-bottom: 2vh;
    font-size: 20px;
    font-weight: bold;
  }
  .c {
    letter-spacing: 3px;
  }
}
.detail-center {
  // margin-right: 100px;
  transform: translateX(-100px);
}
</style>