<template>
  <div class="all">
    <div class="item" v-if="erke == null">
      <div ref="box" class="box">
        <h1>私人音乐空间,听我想听的歌</h1>
        <h3>登录管理我的音乐,多终端同步</h3>
        <button @click="log" class="btn">立即登录</button>
      </div>
    </div>
    <div v-else class="obj">
      
      <div class="top">
        <img class="img" :src="erke.profile.backgroundUrl" alt="" />
        <div class="cen">
          <img class="pop" :src="pro.avatarUrl" alt="" />
          <div class="ib">
            <span class="io">{{ pro.nickname }}</span>
            <span class="po"></span>
          </div>
          <div class="ob">
            <div class="left">
              <span>粉丝</span>
              <span>{{ pro.followeds }}</span>
            </div>
            <div class="right">
              <span>关注</span>
              <span>{{ pro.follows }}</span>
            </div>
          </div>
        </div>
      </div>
      <Favourite class="my" :recentList="recentPlayList"></Favourite>
    </div>
    
  </div>
</template>

<script>
import Favourite from "../components/Favourite";
import { getSongRecord, getMv } from "../api/index";
import gsap from "gsap";
import { TimelineLite } from "gsap";
export default {
  name: "MyMusic",
  components: {
    Favourite,
  },
  data() {
    return {
      erke: {},
      profile: {},
      recentPlayList: [],
      gender:""
    };
  },
  methods: {
    log() {
      this.$router.push("/Login");
    },
  },
  created() {
    let music = localStorage.getItem("profile");
    this.erke = JSON.parse(music);
    //  console.log(this.erke);
    //  console.log(this.erke.profile);
    console.log(this.erke.profile.userId);
    getSongRecord({ uid: this.erke.profile.userId }).then((resolve) => {
      // console.log(resolve);
      this.recentPlayList = resolve.allData;
      console.log(this.recentPlayList);
    });
    getMv().then((resolve) => {
      // console.log(resolve);
    });
  },
  mounted() {
    //  document.querySelector('.obj').style.backgroundImage = "this.erke.backgroundUrl" //>??????????????????????????

    const { box } = this.$refs;
    const timeline = new TimelineLite({ defaults: { ease: "power1.out" } });

    timeline.to(box, {
      y: "0%",
      duration: 1.3,
      stagger: 0.55,
      opacity: 1,
      color: "#fba",
    });
  },
  computed: {
    pro() {
      return this.erke.profile;
    },
  },
};
</script>

<style lang="scss" scoped>

.io {
  font-size: 25px;
  font-weight: bold;
  margin-right: 20px;
}
.ob {
  display: flex;
  .left,
  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      font-size: 20px;
      margin: 10px 10px 0px 10px;
    }
  }
}
.ib {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cen {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .pop {
    margin-bottom: 20px;
    opacity: 1;
    box-sizing: border-box;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 5px solid white;
  }
  .po {
    display: inline-block;
    width: 100px;
    height: 50px;
    background: url("../assets/img/33.png") no-repeat center;
    object-fit: cover;
    object-position: center;
  }
}
.box {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  justify-content: space-between;
}
.img {
  // position: absolute;
  position: relative;
  // opacity: ;
  // background: red;
  position: absolute;
  z-index: -9;
  object-fit: cover;

  height: 100vh;
  object-position:0 -300px;
}
.my {
  position: absolute;
  top: 38vh;
}
.top {
  width: 100%;
  height: 45vh;
  // background: red;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
h1 {
  font-size: 60px;
}
h3 {
  font-size: 30px;
}
button {
  font-size: 15px;
  padding: 12px 25px;
  background: red;
  border: none;
  color: white;
  border-radius: 10px;
}
.item {
  position: relative;
  top: 80px;
  background: url("../assets/css/6.jpg") center center;
  width: 100%;
  height: calc(100vh - 80px);
  // object-fit: cover;
  // object-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.obj {
  position: relative;
  top: 80px;
  // background: red;
}
.box {
  transform: translateY(100%);
  opacity: 0;
  color: rgb(255, 0, 0);
}

.obj {
  // background: url('../assets/img/66.png');
  img {
    width: 100%;
    // height: calc(100% - 80px);
    // height:calc( 100vh - 84px);
    height: 100%;
    opacity: 0.6;
    object-fit: cover;
  }
}
</style>