<template>
  <div>
    <full-page :options="options">
      <div class="section">
        <div class="box1">
          <video
            data-autoplay
            autoplay=""
            muted=""
            loop=""
            playsinline=""
            preload="auto"
            poster="https://p1.music.126.net/Oq3EQRMgwK2AYvp3hlXlpQ==/109951165418425655"
          >
            <source
              src="https://vodkgeyttp9c.vod.126.net/vodkgeyttp8/LvC1f4Ay_3178552633_shd.mp4?ts=1919130567&amp;rid=7859AE92117216E8AD0E345795682128&amp;rl=0&amp;rs=hshSERxELyHpcTtlhBmAihKBMJdHpCDj&amp;sign=6ef716a5997cbbfd306f07f45a9c4abf&amp;coverId=Oq3EQRMgwK2AYvp3hlXlpQ==/109951165418425655&amp;infoId=265044"
              type="video/mp4"
            />
          </video>
          <div class="mark"></div>
          <div class="text">
            <div class="item">
              <img src="../assets/img/55.png" alt="" />
              <p class="p">20w+音乐人的选择 中国领先的原创音乐人平台</p>
              <div class="but">
                <button>音乐人</button>
                <button>词曲作者</button>
              </div>
              <p class="q">Apply For Netease Artists</p>
              <img src="../assets/img/6.png" class="down" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="box2">
          <div class="all">
            <div class="top" ref="box">
              <p>这里为起点</p>
              <p>开启你的音乐事业</p>
            </div>
            <div class="center">
              <p class="b">音乐发行</p>
              <p class="a">全网领先的一站式发行服务，护航你的音乐之路</p>
            </div>
            <div class="bottom">
              <img
                src="https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4607349479/a33e/b8c4/a033/1d2a470d41c62cc60de88248a30189e5.png?imageView&thumbnail=274x562&type=webp"
                alt=""
                ref="a"
              />
              <img
                src="https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4607349464/1c96/bc31/8b40/469a1916a6e51ea8a3960b6d662ad919.png?imageView&thumbnail=274x562&type=webp"
                alt=""
                ref="b"
              />
              <img
                src="https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4627451307/4774/5623/070b/91de6ca523b708c2fe2f120a2560d689.png?imageView&thumbnail=274x562&type=webp"
                alt=""
                ref="c"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="box3">
          <div class="a">
            <el-carousel :interval="4000" type="card" height="600px">
            <el-carousel-item v-for="item in arr" :key="item">
              <div class="medium b" v-for="(o,i) in item" :key="i">
                <div class="in">
                  <img :src="o.simpleUserInfo.avatar" alt="">
                  <div class="out">
                    <span class="io">{{o.content}}</span>
                    <span class="xuanzi" @click="select(o.simpleResourceInfo.songId)">选自:{{o.simpleResourceInfo.name}}</span>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
          </div>
        </div>
      </div>
    </full-page>
  </div>
</template>

<script>
import gsap from "gsap";
import { TimelineLite } from "gsap";
import { mapGetters, mapActions } from "vuex";
import {getCloudComment} from '../api/index'
export default {
  name: "Friend",
  created () {
    getCloudComment().then((data) => {
      // console.log(data);
      this.comment = data.data
      console.log(this.comment);
      let length = this.comment.length
      console.log(length);
      let long = 5
      let line = length / 5 
      let res = []
      for(let i = 0 ;i < line ; i++){
        let temp = this.comment.slice(i*long,i*long+long)
        console.log(temp);
        res.push(temp)
      }
      console.log(res);
      this.arr = res
    });
  },
  data() {
    return {
      comment:[],
      arr:[],
      options: {
        licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
        afterLoad: this.afterLoad,
        scrollOverflow: true,
        scrollBar: false,
        navigationPosition: "right",
        menu: "#menu",
        // continuousVertical: true,
        // navigation: true,
        // anchors: ['page1', 'page2', 'page3'],
        sectionsColor: [
          // "#41b883",
          // "#ff5f45",
          // "#0798ec",
          // "#fec401",
          // "#1bcee6",
          // "#ee1a59",
          // "#2c3e4f",
          // "#ba5be9",
          // "#b4b8ab",
        ],
      },
    };
  },
  mounted() {
    // const { box } = this.$refs;
    // const timeline = new TimelineLite({ defaults: { ease: "power1.out" } });
    // timeline.to(box, {
    //   y: "100%",
    //   duration: 5,
    //   stagger: 0.55,
    //   opacity: 1,
    //   color: "#fba",
    // });
  },
  methods: {
    ...mapActions(["setTitleIndex",'setSongDetail']),
    select(id){
      this.setSongDetail([id])  
      console.log();
    },
    afterLoad(anchorLink, index) {
      // alert(index)
      console.log(index.index);
      const { box, a, b, c } = this.$refs;
      const timeline = new TimelineLite({ defaults: { ease: "power1.out" } });
      timeline.to(box, {
        y: "25%",
        duration: 1,
        stagger: 0.55,
        opacity: 1,
        color: "#fba",
      });
      timeline
        .to(a, { opacity: 1, duration: 2, y: "0" })
        .to(b, { opacity: 1, duration: 2, y: "0" })
        .to(c, { opacity: 1, duration: 2, y: "0" });
    },
  },
  mounted() {},
  computed: {
    ...mapGetters(["titleIndex"]),
  },
  watch: {
    $route() {
      this._initData();
    },
  },
};
</script>

<style lang="scss" scoped>
.xuanzi{
  color: rgb(235, 146, 62);
}
.io{
  // background: red;
  display: flex;
  width: 39vw;
  margin-left: 30px;
}
.b{
  // align-items: center;
  // background: red;
  display: flex;
  align-items: center;
  // width: 100%;
  position: relative;
  // top: 10%;
}
.in{
  display: flex;
  margin: 28px 0;
  justify-content: flex-start;
  color: rgb(196, 196, 196);
  .out{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
}
.in{
  img{
    width: 50px;
    height: 50px;
  }
}
.box3{
  display: flex;
  
  // position: absolute;
  justify-content: center;
  align-items: center;
}
.a{
  width: 100%;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color:rgba($color: #5c5c5c, $alpha: .3);
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color:rgba($color: #646363, $alpha: .5);

  }
.all {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 43%;
  left: 50%;
  transform: translateX(-50%);
  img {
    margin: 30px 70px;
    opacity: 0;
    position: absolute;
    // top: 0%;
  }
  .bottom {
    background: url("../assets/img/r.png");
    width: 100%;
    height: 100%;
    background-size: cover;
    display: flex;
    justify-content: center;
  }
  .top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    margin-top: -200px;
    p {
      font-weight: bold;
      font-size: 40px;
    }
  }
  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    .b {
      font-weight: bold;
      font-size: 25px;
    }
    .a {
      margin-top: 20px;
      font-size: 20px;
      font-weight: bold;
    }
  }
}
.text .down {
  margin-top: 60px;
  width: 30px;
  height: 20px;
  animation: fly 2s linear infinite;
}
@keyframes fly {
  0% {
    opacity: 0;
    margin-top: 60px;
  }
  50% {
    opacity: 1;
    margin-top: 150px;
  }
  100% {
    opacity: 0;
    margin-top: 60px;
  }
}
.mark {
  width: 100%;
  height: 100vh;
  background: #000;
  position: absolute;
  top: 35%;
  z-index: 999999;
  opacity: 0.5;
  text-align: center;
}
.text {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 36%;
  z-index: 99999999;
  // text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
  .item {
    position: absolute;
    top: 8%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .p {
      color: white;
      margin-top: 20px;
      font-size: 25px;
    }
    .but {
      margin-top: 100px;
      button {
        margin: 0 60px;
        color: white;
        background: red;
        border: none;
        padding: 15px 50px;
        border-radius: 50px;
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
  img {
    height: 100px;
  }
  .q {
    color: red;
    margin-top: 30px;
  }
}
video {
  width: 100%;
  height: 100%;
}
.section {
}
.box1 {
  // background: url('../assets/img/1.jpg');
  width: 100%;
  background-size: cover;
  height: 100%;
  // background: #000;
  position: absolute;
  top: -33%;
  z-index: 999;
}
.box2 {
  // background: url("../assets/img/2.jpg");
  width: 100%;
  height: 100%;
  background-size: cover;
}
.box3 {
  background: url("../assets/img/3.jpg");
  width: 100%;
  height: 100%;
  background-size: cover;
}
</style>