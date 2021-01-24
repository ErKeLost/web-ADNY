<template>
  <div class="mv">
    <MvList class="paihang" @open="selectMv"></MvList>
    <!-- <p>全部最新MV</p> -->
    <div>
      <p class="PP">全部最新MV</p>
      <ul class="all">
        <li
          class="list"
          v-for="(o, index) in mvList"
          :key="index.id"
          @click="selectMv(o.id, $event)"
        >
          <div class="pic">
            <img :src="o.cover" alt="" />
            <img
              class="ip"
              src="https://y.gtimg.cn/mediastyle/yqq/img/cover_play.png?max_age=2592000&v=88abebcbc1242dbbbbc836cc3e04a006"
              alt=""
            />
          </div>
          <p>{{ o.name }}</p>
          <p class="o">{{ o.artistName }}</p>
          <p class="p">
            <i class="iconfont icon-shipinbofang"></i>{{ o.playCount }}
          </p>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import MvList from '../components/MV/MvList'
import mvComment from '../components/MV/mvComment'
import { getMv, getMvData, getMvrace } from "../api/index";
import {mapActions, mapState} from 'vuex'
export default {
  name: "MV",
  components:{
   MvList
  },
  data() {
    return {
      mvList: [],
      mvData: [],
      mvid: [],
      // mvc : this.mvComment
    };
  },
  computed: {
    ...mapState(['mvComment'])
  },
  async created() {
    await getMv().then((data) => {
      this.mvList = data.data;
      // console.log(this.mvid);
      this.mvList.forEach((i) => {
        // console.log(i.id);
        this.mvid.push(i.id);
      });
      // console.log(this.mvid);
    });
    await getMvrace({ area: "内地" }).then((data) => {
      // console.log(data);
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
      'setFullPlayer',
      'setMiniPlayer',
      'setIsPlaying',
      'setMvComment'
    ]),
    async selectMv(id, e) {
      this.setMiniPlayer(false)
      this.setFullPlayer(false)
      this.setIsPlaying(false)
      this.setMvComment(id)
      // console.log(id);
      await getMvData({ mvid: id }).then((data) => {
        console.log(data.data);
        this.mvData = data.data;
        window.localStorage.setItem('mv',this.mvData)
      });
      // this.$router.push({
      //   path:`/mv/mvdetail/${id}`
      // })
      this.$router.push({
        path: `/Mv/MvDetail/${id}`,
      });
      // console.log(id);
      // console.log(e.scrollTop);
      // let that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-this.erke / 5);
        // console.log(this.scrollTop);
        // console.log(ispeed);
        // console.log(that);
        document.documentElement.scrollTop = document.body.scrollTop =this.erke + ispeed;
        if (this.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 1);
    },
    scrollToTop() {
      // let that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.erke= scrollTop;
    },
  },
};
</script>
<style scoped lang="scss">
.paihang{
  // margin-top: 100px;
}
.pic {
  position: relative;
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
ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin-left: 100px;
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