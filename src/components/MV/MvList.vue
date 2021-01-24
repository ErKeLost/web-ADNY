<template>
  <div class="paihang">
    <div class="top">
      <ul class="list">
        <li v-for="(o, i) in tit" :key="i" @click="current(i)" :class="{active:currentIndex == i}">
          {{ o }}
        </li>
      </ul>
      <div>
        <p class="b" v-if="currentIndex == 0">{{ tit[0] }}</p>
        <p class="b" v-if="currentIndex == 1">{{ tit[1] }}</p>
        <p class="b" v-if="currentIndex == 2">{{ tit[2] }}</p>
        <p class="b" v-if="currentIndex == 3">{{ tit[3] }}</p>
        <p class="b" v-if="currentIndex == 4">{{ tit[4] }}</p>
      </div>
      <div v-if="currentIndex == 0">
        <ul class="all">
          <li
            class="list"
            v-for="(o, index) in neidi"
            :key="index.id"
            @click="select(o.id, $event)"
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
      <div v-if="currentIndex == 1">
        <ul class="all">
          <li
            class="list"
            v-for="(o, index) in gangtai"
            :key="index.id"
            @click="select(o.id, $event)"
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
      <div v-if="currentIndex == 2">
        <ul class="all">
          <li
            class="list"
            v-for="(o, index) in oumei"
            :key="index.id"
            @click="select(o.id, $event)"
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
      <div v-if="currentIndex == 3">
        <ul class="all">
          <li
            class="list"
            v-for="(o, index) in riben"
            :key="index.id"
            @click="select(o.id, $event)"
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
      <div v-if="currentIndex == 4">
        <ul class="all">
          <li
            class="list"
            v-for="(o, index) in hanguo"
            :key="index.id"
            @click="select(o.id, $event)"
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
    </div>
  </div>
</template>

<script>
import { getMvrace } from "../../api/index";
export default {
  name: "MvList",
  data() {
    return {
      neidi: [],
      gangtai: [],
      oumei: [],
      riben: [],
      hanguo: [],
      tit: ["内地", "港台", "欧美", "日本", "韩国"],
      currentIndex: 0,
    };
  },
  methods: {
    current(index) {
      this.currentIndex = index;
      // console.log(this.currentIndex);
    },
    select(id){
      this.$emit('open',id)
      console.log(id);
    }
  },
  async created() {
    await getMvrace({ area: "内地" }).then((data) => {
      // console.log(data);
      this.neidi = data.data;
    });
    await getMvrace({ area: "港台" }).then((data) => {
      // console.log(data);
      this.gangtai = data.data;
    });
    await getMvrace({ area: "欧美" }).then((data) => {
      // console.log(data);
      this.oumei = data.data;
    });
    await getMvrace({ area: "日本" }).then((data) => {
      // console.log(data);
      this.riben = data.data;
    });
    await getMvrace({ area: "韩国" }).then((data) => {
      // console.log(data);
      this.hanguo = data.data;
    });
  },
  // mounted () {
  //   if(this.currentIndex == 0){
  //     this.$refs.p.innerHTML = this.tit[1]
  //   }else if(this.currentIndex == 1){
  //     this.$refs.p.innerHTML = this.tit[1]
  //   }else if(this.currentIndex == 2){
  //     this.$refs.p.innerHTML = this.tit[2]
  //   }else if(this.currentIndex == 3){
  //     this.$refs.p.innerHTML = this.tit[3]
  //   }else if(this.currentIndex == 4){
  //     this.$refs.p.innerHTML = this.tit[4]
  //   }
  // },
};
</script>

<style lang="scss" scoped>
.all{
  display: flex;
  flex-wrap: wrap;
  li{
    display: flex;
    flex-direction: column;
    list-style-type: none;
    width: 300px;
    height: 280px;
    margin-right: -50px;
  }
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
.pic {
  width: 300px;
  height: 170px;
  overflow: hidden;
  position: relative;
}
p {
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
  margin-top: 3px;
  font-size: 15px;
}
.paihang {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  .list {
    display: flex;
    list-style-type: none;
    margin-left: 100px;
    li {
      padding: 5px 10px;
      margin-right: 30px;
      // background: lightcoral; 

    }
  }
  .b{
    margin: 30px 0 0 100px;
    font-size: 30px;
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 30px;
  }
}
.active{
  background: #000;
  color: white;
  font-weight: bold;
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
.ip{
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 999999;
  top: 0;
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
// .ip {
//   position: absolute;
//   width: 50px;
//   height: 50px;
//   // top: 0;
//   left: 40%;
//   top: 40%;
//   opacity: 0;
//   transform: scale(0);
//   // transform: translate(-50%, -50%);
//   &:hover {
//     opacity: 1;
//     // transition: all 1s linear;
//   }
// }
</style>