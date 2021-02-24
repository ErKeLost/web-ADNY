<template>
  <div class="all">
    <div class="top">
      <div class="in">
        <div class="left">
          <img :src="listc.coverImgUrl" alt="" />
        </div>
        <div class="right">
          <div class="t">
            <span>{{ listc.name }}</span>
            <span>最近更新，{{ format(listc.updateTime) }}</span>
          </div>
          <div class="b">
            <span><i class="iconfont el-icon-video-play"></i>播放</span>
            <span
              ><i class="iconfont el-icon-chat-line-square"></i
              >{{ listc.commentCount }}</span
            >
            <span
              ><i class="iconfont el-icon-connection"></i
              >{{ listc.shareCount }}</span
            >
            <span><i class="iconfont el-icon-download"></i>下载</span>
          </div>
        </div>
      </div>
    </div>
    <div class="center">
      <div>
        <span class="a">歌曲列表</span>
        <span>{{ listu.length }}首歌</span>
      </div>
      <span
        >播放次数：<span class="c">{{ listc.playCount }}</span
        >次</span
      >
    </div>
    <div class="bottom">
      <div class="oph">
        <ul>
          <li class="one">
            <span>标题</span>
            <span>时长</span>
            <span>歌手</span>
          </li>
          <li v-for="(o, i) in third" :key="i" class="op po" @click.stop="play(o.id)">
            <span class="i">{{ i + 1 }}</span>
            <span class="u"><img class="yui" :src="o.al.picUrl"></img><i class="iconfont el-icon-video-play rr"></i></span>
            <span class="y yu"
              >{{ o.name
              }}<i  @click="mv(o.mv)" v-show="o.mv !== 0" class="iconfont icon-video"></i
            ></span>
            <span class="t">{{ forma(o.dt) }}</span>
            <span class="r">{{ o.ar[0].name }}</span>
          </li>
          <li v-for="(o, i) in song" :key="i + 6" class="op" @click="play(o.id)">
            <span class="i">{{ i + 4 }}</span>
            <span class="u"><i class="iconfont el-icon-video-play"></i></span>
            <span class="y "
              >{{ o.name
              }}<i  @click.stop="mv(o.mv)" v-show="o.mv !== 0" class="iconfont icon-video"></i
            ></span>
            <span class="t">{{ forma(o.dt) }}</span>
            <span class="r">{{ o.ar[0].name }}</span>
          </li>
          
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import {
  getTop,
  getTopData,
  getPlayList,
  getSongDetail,
  getMusicComment,
} from "../api/index";
export default {
  name: "TopDetail",
  data() {
    return {
      listc: [],
      listu: [],
      trackId: [],
      id: [],
      st: "",
      song: [],
      third: [],
      comment: {},
    };
  },
  async created() {
    let res = await getTop();
    this.listc = res.list.splice(0, 6);
    this.listu = res.list.splice(6, 30);
    let da = await getTopData();
    // console.log(da);
    await getPlayList({ id: this.$route.params.id }).then((data) => {
      // console.log(data);

      this.listc = data.playlist;
      this.listu = data.privileges;
      this.trackId = data.playlist.trackIds;
      this.trackId.forEach((i) => {
        // console.log(i.id);
        let a = i.id;
        // console.log(a);
        this.id.push(a);
      });
      let str = this.id.join(",");
      // console.log(str);
      this.st = str;
    });
    await getSongDetail({ ids: this.st }).then((data) => {
      // console.log(data);
      this.song = data.songs.splice(3, 100);
      this.third = data.songs.splice(0, 3);
    });
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
  methods: {
    ...mapActions([
      "setIsPlaying",
      "setMiniPlayer",
      "setFullPlayer",
      "setSongDetail",
      "setCoData",
      "setMvComment",
    ]),
    async mv(id) {
      this.$router.push({
        path: `/Mv/MvDetail/${id}`,
      });
      await this.setMvComment(id);

      await setTimeout(() => {
        this.$router.go(0);
      }, 200);
      // let timer = setInterval(() => {
      //   let ispeed = Math.floor(-this.scrollTop / 5);
      //   // console.log(this.scrollTop);
      //   // console.log(ispeed);
      //   // console.log(that);
      //   document.documentElement.scrollTop = document.body.scrollTop =
      //     this.scrollTop + ispeed;
      //   if (this.scrollTop === 0) {
      //     clearInterval(timer);
      //   }
      // }, 1);
    },
    // scrollToTop() {
    //   // let that = this;
    //   let scrollTop =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;
    //   this.scrollTop = scrollTop;
    // },
    play(id) {
      this.setIsPlaying(false);
      this.setCoData([id]);
      this.$store.dispatch("setFullPlayer", true);
      // console.log("aa");
      // console.log(id);
      this.setSongDetail([id]);
      this.setMiniPlayer(false);
      setTimeout(() => {
        this.setIsPlaying(true);
      }, 500);
      getMusicComment({ id: id }).then((data) => {
        // console.log(data);
        this.comment = data;
        window.localStorage.setItem("comment", JSON.stringify(this.comment));
      });
    },
    format(time) {
      let date = time;
      let ray = new Date(date);
      let year = ray.getFullYear() + "年";
      let month = ray.getMonth() + 1 + "月";
      let day = ray.getDate() + "日";
      return [month, day].join("") + "更新";
    },
    forma(time) {
      let date = time;
      let ray = new Date(date);
      let year = ray.getFullYear() + "年";
      let month = ray.getMonth() + 1 + "月";
      let day = ray.getDate() + "日";
      let min = ray.getMinutes() + "分";
      let sec = ray.getSeconds() + "秒";
      return [min, sec].join("");
    },
  },
};
</script>

<style lang="scss" scoped>
.all {
  background: transparent;
}
ul .po {
  height: 150px;
  line-height: 150px;
}
.op {
  width: 100%;
  display: flex;
  height: 50px;
  line-height: 50px;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}
.yui {
  width: 120px;
  height: 120px;
  border: none;
}
.yu {
  transform: translateX(100px);
}
.y {
  width: 36%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  align-items: center;
  i {
    margin-left: 30px;
    font-size: 25px;
    color: rgb(255, 0, 0);
    margin-top: 5px;
  }
}
.t {
  width: 20%;
}
.t {
  width: 20%;
}
.i,
.u {
  // display: inline-block;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50px;
  text-align: center;
  i {
    font-size: 20px;
  }
  .rr {
    // margin-left: 20px;
  }
  img {
  }
}
.bottom {
  display: flex;
  justify-content: center;
}
.oph {
  width: 80%;
  height: 100vh;
  margin-top: 30px;
  // background: red;
  border-top: 3px solid rgb(168, 34, 34);
  ul {
    list-style: none;
    .one {
      display: flex;
      margin-top: 15px;
    }
    .one span {
      border-right: 1px solid #bbb;
      padding: 5px 5px;
      &:nth-child(1) {
        width: 50%;
        padding-left: 100px;
      }
      &:nth-child(2) {
        width: 20%;
      }
      &:nth-child(3) {
        width: 30%;
      }
    }
  }
}
.c {
  color: red;
}
.center {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    margin: 0 20px;
    font-weight: bold;
  }
  .a {
    font-size: 20px;
  }
}
.b {
  display: flex;

  span {
    display: flex;
    font-size: 18px;
    align-items: center;
    margin: 39px 39px;
    border: 1px solid #bbb;
    border-radius: 10px;
    padding: 3px 8px;
    &:nth-child(1) {
      background: rgb(27, 162, 224);
      color: white;
    }
    i {
      font-size: 25px;
      margin-right: 10px;
    }
  }
}
.t {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 30px;
  span {
    margin: 10px 20px;
    &:nth-child(1) {
      font-size: 30px;
    }
  }
}
.left {
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 200px;
  height: 200px;
  padding: 10px;
  border: 1px solid #bbb;
}
.all {
  width: 60%;
  border-right: 1px solid #bbb;
  position: absolute;
  top: 80px;
  left: 30%;
  right: 0;
  bottom: 0;
  z-index: 0;
}
.top {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  .in {
    width: 90%;
    height: 80%;
    display: flex;
    .left {
      width: 30%;
      height: 100%;
    }
    .right {
      width: 70%;
      height: 100%;
      .t {
        width: 100%;
        height: 50%;
      }
      .b {
        width: 100%;
        height: 50%;
      }
    }
  }
}
</style>