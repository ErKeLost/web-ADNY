<template>
  <div class="mvd">
    <div class="center">
      <div class="ce">
        <video :src="video.url" controls autoplay ></video>
        <div class="title">
          <div>
            <span class="q">{{ item.name }}</span>
            <span class="you">-</span>
            <span class="w">{{ item.artistName }}</span>
            <span class="count">播放量 : {{ item.playCount }}</span>
          </div>
          <div class="u">
            <i class="iconfont icon-ico a"></i>
            <span class="b">在手机上看</span>
            <i class="iconfont el-icon-setting"></i>
            <span class="time">发行时间 ：{{ item.publishTime }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bot">
      <p class="po">大家还喜欢看</p>
      <ul class="all">
        <li
          class="list"
          v-for="(o, index) in simi"
          :key="index.id"
          @click="selectMv(o.id)"
        >
          <div class="pic">
            <img :src="o.cover" alt="" />
            <!-- <img
              class="ip"
              src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006"
              alt=""
            /> -->
          </div>
          <p>{{ o.name }}</p>
          <p class="o">{{ o.artistName }}</p>
          <p class="p">
            <i class="iconfont icon-shipinbofang"></i>{{ o.playCount }}
          </p>
        </li>
      </ul>
      <p class="po">网易原创</p>
      <ul class="obj">
        <li
          class="list"
          v-for="(o, index) in hot"
          :key="index.id"
          @click="selectMv(o.id)"
        >
          <div class="pic">
            <img :src="o.cover" alt="" />
            <!-- <img
              class="ip"
              src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006"
              alt=""
            /> -->
          </div>
          <p>{{ o.name }}</p>
          <p class="o">{{ o.artistName }}</p>
          <p class="p">
            <i class="iconfont icon-shipinbofang"></i>{{ o.playCount }}
          </p>
        </li>
      </ul>
    </div>
    <div class="down">
      <p class="ppp">视频简介：</p>
      <p class="pppp">{{ item.desc == null ? name : item.desc }}</p>
    </div>
    <div class="do">
      <mvComment :comment="mvComment"></mvComment>
    </div>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import mvComment from '../components/MV/mvComment'
import {mapActions, mapState} from 'vuex'

import { getMv, getMvData, getMvUrl, getMvsimi, getMvsear } from "../api/index";
export default {
  name: "MvDetail",
    computed: {
    ...mapState(['mvComment'])
  },
  components:{
    mvComment
  },
  data() {
    return {
      name: "ERKELOST",
      item: {},
      video: {},
      simi: [],
      isRouterAlive: true,
      hot: [],
    };
  },
  async created() {
    await getMvData({ mvid: this.$route.params.id }).then((data) => {
      // console.log(data.data);
      this.item = data.data;
    });
    await getMvUrl({ id: this.$route.params.id }).then((data) => {
      // console.log(data);
      this.video = data.data;
    });
    await getMvsimi({ mvid: this.$route.params.id }).then((data) => {
      // console.log(data);
      this.simi = data.mvs;
    });
    await getMvsear().then((data) => {
      // console.log(data);
      this.hot = data.data;
    });
  },
  mounted() {
    window.addEventListener("scroll", this.scrolltoTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrolltoTop);
  },
  methods: {
    async selectMv(id) {
      // console.log(id);
      await getMvData({ mvid: id }).then((data) => {
        // console.log(data.data);
        this.mvData = data.data;
      });
      // this.$router.push({
      //   path:`/mv/mvdetail/${id}`
      // })
      this.$router.push({
        path: `/Mv/MvDetail/${id}`,
      });
      this.$router.go(0);
// 
        let timer = setInterval(() => {
        let speed = Math.floor(-this.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          this.scrollTop + speed;
          // console.log(this.scrollTop);
          // console.log(speed);
        if (this.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 10);
      // console.log(id);
      //页面刷新的方式
      // Location.reload()
      // this.isRouterAlive = false;
      // this.$nextTick(function () {
      // this.isRouterAlive = true;
      // });
    
    },
    scrolltoTop() {
      let scrollDis =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollDis;
    },
  },
  
};
</script>

<style lang="scss" scoped>
.do{
  margin-top: 200px;
}
.mvd .obj {
  // margin-left: -300px;
  // position: relative;
  // top: 0;
  list-style-type: none;
  display: flex;
  justify-content: center;
  // margin-left: -300px;
  flex-wrap: wrap;
  margin-left: 50px;
}
.mvd {
  // width: 100vw;
  width: 100%;
}
.bot {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  .po {
    // transform: translateX(5%);
    // position: absolute;
    // left: 5%;
    width: 90%;

    margin-bottom: 30px;
    font-size: 25px;
    font-weight: bold;
  }
}
.down {
  position: absolute;
  left: 50%;
  width: 90%;

  transform: translateX(-50%);
  .ppp {
    font-size: 25px;
    font-weight: bold;
    margin: 20px 0;
  }
  .pppp {
    opacity: 0.5;
  }
}
.bot {
  margin-top: 50px;
}
.q,
.w {
  font-weight: bold;
  font-size: 23px;
}
.u {
  display: flex;
  align-items: center;
}
.b {
  margin-right: 80px;
  font-size: 15px;
  opacity: 0.5;
  margin-left: 20px;
}
.icon-ico {
  font-size: 25px;
}

.el-icon-setting {
  font-size: 25px;
  margin-right: 30px;
  &:hover {
    transform: scale(2);
    transform: rotate(90deg);
  }
}
.time {
  font-size: 15px;
  font-weight: normal;
  opacity: 0.5;
}
.count {
  margin-left: 50px;
  font-size: 15px;
  opacity: 0.5;
}
.you {
  margin: 0 20px;
}
.mvd {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 99;
  background: rgb(245, 245, 245);
}
.center {
  margin-top: 10px;

  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}
video {
  width: 1200px;
  // height: 650px;
  outline: none;
}
.ce {
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
}
.title {
  height: 80px;
  color: white;
  line-height: 80px;
  font-size: 25px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  &:hover {
    transform: scale(1.1);
    transition: all 1s linear;
  }
  &:hover + .ip {
    opacity: 1;
    transform: scale(1.5);
    transition: all 0.5s linear;
  }
}
.ip {
  position: absolute;
  width: 50px;
  height: 50px;
  // top: 0;
  left: 40%;
  top: 40%;
  opacity: 0;
  transform: scale(0);
  // transform: translate(-50%, -50%);
  &:hover {
    opacity: 1;
    // transition: all 1s linear;
  }
}
.mv {
  // transform: translateY(100px);
  position: absolute;
  top: 80px;
}
.PP {
  margin: 30px 100px;
  font-weight: bold;
  font-size: 25px;
}
.all {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin-left: 50px;
}
li {
  width: 300px;
  height: 280px;
  margin-right: 50px;
}
.pic {
  width: 300px;
  height: 170px;
  overflow: hidden;
}

p {
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
  margin-top: 3px;
  font-size: 15px;
}
.o {
  opacity: 0.7;
}
.p {
  opacity: 0.7;
  display: flex;
  align-items: center;
  i {
    margin-right: 10px;
    font-size: 20px;
  }
}
</style>