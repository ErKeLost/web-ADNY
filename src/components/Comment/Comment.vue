<template>
  <div class="all" v-show="this.isComment" ref="comment">
    <img class="icon" :src="currentSong.picUrl" alt="" />
    <div class="top">
      <i class="iconfont el-icon-close" @click="close()"></i>
    </div>
    <div class="center">
      <ul>
        <li v-for="(o, i) in currentSong.comment.comments" :key="i">
          <img :src="o.user.avatarUrl" alt="" />
          <div class="lef">
            <div class="t">
              <span>{{ o.user.nickname }}</span>
              <span> : {{ o.content }}</span>
            </div>
            <span>{{ forma(o.time) }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import gsap from 'gsap'
import BetterScroll from '../BetterScroll'
import { TimelineLite } from "gsap";
import { mapActions, mapMutations } from "vuex";

export default {
  name: "Comment",
  components:{
    BetterScroll
  },
  computed: {
    ...mapGetters(["isComment", "currentSong"]),
  },
  methods: {
    ...mapActions(["setComment"]),
    ...mapMutations(["comment"]),

    close() {
      this.comment(false);
    },
    forma(time) {
      let date = time;
      let ray = new Date(date);
      let year = ray.getFullYear() + "年";
      let month = ray.getMonth() + 1 + "月";
      let day = ray.getDate() + "日";
      let hours = ray.getHours() + "时";
      let min = ray.getMinutes() + "分";
      let sec = ray.getSeconds() + "秒";
      return [year, month, day, hours, min, sec].join("");
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  position: absolute;
  z-index: -99;
  top: 0;
  opacity: .8;
  // filter: blur(10px);
  object-fit: cover;
  object-position: center center;
}
.all::-webkit-scrollbar{
  display: none;
}
.all {
  border: 1px solid #bbb;
  color: rgb(136, 136, 136);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 35%;
  right: 0;
  z-index: 999999;
  // opacity: .5;
  // background: url('../../assets/img/996.jpg');
  background: rgb(39, 39, 39);
  // filter: blur(10px);
  // color: black;
  .top {
    color: black;
    i {
      margin: 10px;
      font-size: 30px;
      font-weight: bold;
    }
  }
  .center {
    margin-left: 50px;
    ul {
      height: 100vh;
      overflow-y: auto;
      // margin-top: 30px;
      margin-left: 30px;
    }
    li {
      list-style: none;
      margin-top: 30px;
      display: flex;
      .lef {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      img {
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>
