<template>
  <div class="header" :class="{ act: currentIndex == 2 }" ref="aab" >
    <div class="headerleft">
      <span class="allName">{{ name }}</span>
      <i class="iconfont icon-wangyiyunyinleclick" @click="changeTheme"></i>
      <router-link to="" tag="div">
        <span
          class="item"
          v-for="(item, index) in titleList"
          :key="index"
          @click.stop="changeItem(index)"
          :class="{ active: currentIndex === index }"
        >
          {{ item }}
        </span>
      </router-link>
    </div>
    <div class="headercenter">
      <div class="iu">
        <input
          type="text"
          v-if="flag"
          ref="input"
          v-throttle="search"
          @input="check"
          :class="{ ac: flag === true }"
          :placeholder="place"
          v-model="keywords"
        />
        <span class="oiu" v-if="flag === false">{{ place }}</span>
        <i
          class="iconfont icon-sousuo"
          @click.stop="onfocus"
          v-if="flag == false"
        ></i>
      </div>
      <div class="search right" v-show="temp == true">
        <ul class="" v-show="keywords === ''">
          <!-- <li class="gang">
            <span class="r"
              ><i class="iconfont icon-wangyiyunyinleclick"></i
            ></span>
            <span class="t">单曲</span>
          </li> -->
          <div class="iuy">
            <span class="remen">热门搜索</span>
            <img :src="img" alt="" />
          </div>
          <li
            v-for="(o, i) in hotSearch"
            :key="i"
            class="jj"
            @click="Song(o.searchWord)"
          >
            <!-- <span class="q">{{ i + 1 }}</span> -->
            <div class="we">
              <span class="pop">{{ i + 1 }}</span>
              <span class="popo">{{ o.searchWord }}</span>
            </div>
            <!-- <span class="e" v-show="o.mv === 0"
              ><i class="iconfont icon-erji"></i
            ></span> -->
          </li>
        </ul>
        <ul>
          <li
            v-for="(o, i) in sear"
            :key="i"
            class="jj"
            @click="openSong(o.id)"
          >
            <!-- <span class="q">{{ i + 1 }}</span> -->
            <div class="erke">
              <span class="w">{{ o.name }}-{{ o.ar[0].name }}</span>
              <div class="adny" v-show="o.mv !== 0">
                <span class="e">
                  <img :src="o.al.picUrl" alt="" />
                </span>
                <span class="opo" @click.stop="openMv(o.mv)">立即播放</span>
              </div>
            </div>
            <!-- <span class="e" v-show="o.mv === 0"
              ><i class="iconfont icon-erji"></i
            ></span> -->
          </li>
        </ul>
      </div>
    </div>

    <!-- if else 的  true  和  false ****************************************************** -->
    <div class="headerright" v-if="!user.profile" @click.stop="close()">
      <!--  v-if="user.profile.nickname" -->
      <span @click.stop="login">登陆</span>
      <span>注册</span>
    </div>
    <div class="headerright" v-else>
      <img class="img" :src="user.profile.avatarUrl" alt="" />
      <span>{{ user.profile.nickname }}</span>
      <span @click="remove">退出</span>
    </div>

    <!-- <div class="headerright">
      <img class="img" :src="user.profile.avatarUrl == undefined?'../assets/css/a.png':user.profile.avatarUrl" alt="">
      <span @click.stop="login">{{user.profile.nickname ? user.profile.nickname : '登陆'}}</span>

    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { TimelineLite } from "gsap";
import {
  getSearch,
  getMvData,
  getHotSearch,
  getDefaultSearch,
} from "../api/index";
export default {
  name: "Header",
  data() {
    return {
      name: "EVERY DOG HAS ITS DAY",
      keywords: "",
      titleList: [
        "发现音乐",
        "我的音乐",
        "音乐人",
        "MV",
        "排行榜",
        "下载客户端",
      ],
      currentIndex: 0,
      index: 0,
      themes: ["theme", "theme1", "theme2"],
      flag: false,
      obj: false,
      user: {},
      sear: [],
      mvdata: [],
      mvid: [],
      hotSearch: [],
      place: "",
      img: "",
      temp: false,
    };
  },
  directives: {
    throttle: {
      inserted: function (el, obj) {
        let timerId = null;
        let flag = true;
        el.addEventListener("input", function () {
          if (!flag) return;
          flag = false;
          timerId && clearTimeout(timerId);
          timerId = setTimeout(function () {
            flag = true;
            obj.value();
          }, 1);
        });
      },
    },
  },
  //不限于使用this.$router.push
  // created() {
  //   //读取本地数据
  //   let pro = localStorage.getItem("profile");
  //   console.log(typeof pro);
  //   // console.log(profile);
  //   if (pro) {
  //     //必须要现转化成json数据 我服了 *************************************************************
  //     this.user = JSON.parse(pro);
  //   }
  //   // console.log(JSON.parse(this.user));
  //   console.log(this.user);
  //   console.log(typeof this.user);
  //   console.log(this.user instanceof String);
  //   console.log(typeof this.user.profile);
  // },
  //watch 可以重新刷新 侦听器  限于this.$router.push
  watch: {
    $route() {
      //读取本地数据
      let pro = localStorage.getItem("profile");
      // console.log(typeof pro);
      // console.log(profile);
      if (pro) {
        //必须要现转化成json数据 我服了 *************************************************************
        this.user = JSON.parse(pro);
      }
      // console.log(JSON.parse(this.user));
      // console.log(this.user);
      // console.log(typeof this.user);
      // console.log(this.user instanceof String);
      // console.log(typeof this.user.profile);
    },
  },
  mounted() {
    if (this.currentIndex == 1) {
      this.$refs.aab.classList.remove("act");
    }
  },
  methods: {
    ...mapActions([
      "setIsPlaying",
      "setMiniPlayer",
      "setFullPlayer",
      "setSongDetail",
      'setMvComment',
      "setTop",
    ]),
    close(){
    this.flag = false
    this.temp = false
    },
    Song(word) {
      this.keywords = word;
      this.search();
    },
    ...mapActions(["setTitleIndex"]),
    // cancle(){
    //   this.keywords = ""
    // },
    openMv(id) {
      this.setMvComment(id)

      this.$router.push({
        path: `/Mv/MvDetail/${id}`,
      });
      this.keywords = "";
      setTimeout(() => {
        this.$router.go(0);
      }, 500);
      getMvData({ mvid: id }).then((data) => {
        console.log(data);
        this.mvdata = data.data;
      });
    },
    openSong(id) {
      this.setIsPlaying(false);

      this.$store.dispatch("setFullPlayer", true);
      // console.log("aa");
      // console.log(id);
      this.setSongDetail([id]);
      this.setMiniPlayer(false);
      setTimeout(() => {
        this.setIsPlaying(true);
      }, 500);
    },
    async check() {
      await getSearch({ keywords: this.keywords }).then((data) => {
        // console.log(data);
      });
      //  await getMvData({mvid:this.sear.mv}).then((data) => {
      //    console.log(data);
      //  })
    },
    async search() {
      await getSearch({ keywords: this.keywords }).then((data) => {
        // console.log(data);
        this.sear = data.result.songs;
        data.result.songs.forEach((i) => {
          console.log(i.mv);
          this.mvid.push(i.mv);
        });
      });
      //   await getMvData({mvid:this.sear.mv}).then((data) => {
      //  console.log(data);
      //  })
    },
    remove() {
      window.localStorage.removeItem("profile");
      window.localStorage.removeItem("cookies");
      this.user.profile = false;
      this.$router.push("/FindMusic");
      this.$router.go(0);
    },
    changeItem(index) {
      this.currentIndex = index;
      window.localStorage.setItem("index", this.currentIndex);
      // this.setTitleIndex(this.currentIndex),
      console.log(this.currentIndex);
      if (this.currentIndex == 0) {
        this.$router.push("/FindMusic");
        // this.$router.go(0)
        let a = localStorage.getItem("profile");

        if (a !== null) {
          setInterval(() => {
            // this.$router.go(0);
          },10);
        }
      }
      if (this.currentIndex == 1) {
        this.$router.push("/MyMusic");
      }
      if (this.currentIndex == 2) {
        this.$router.push("/Friend");
      }
      if (this.currentIndex == 3) {
        this.$router.push("/MV");
      }
      if (this.currentIndex == 4) {
        this.$router.push("/Top/TopDetail/19723756");
        // this.setTop()
      }
    },
    changeTheme() {
      this.index++;
      if (this.index >= this.themes.length) {
        this.index = 0;
      }
      document.documentElement.setAttribute(
        "data-theme",
        this.themes[this.index]
      );
    },
    onfocus() {
      getHotSearch().then((data) => {
        console.log(data);
        this.hotSearch = data.data;
        this.img = data.data[2].iconUrl;
        console.log(this.img);
      });
      // this.keywords == ''
      this.temp = true;

      getDefaultSearch().then((data) => {
        console.log(data);
        this.place = data.data.showKeyword;
      });
      this.flag = !this.flag;
      this.$nextTick(() => {
        this.$refs.input.focus();
        // this.keywords = ''
      });
      if (this.flag == false) {
        console.log("this flag = true");
        const box = document.querySelector("input");
        const tl = new TimelineLite();
        tl.to(box, 2, { x: 900 });
      }
    },
    login() {
      this.$router.push("/LogIn");
    },
  },
};
</script>
<style scoped lang="scss">
.iuy {
  // margin-left: 30px;
  margin: 10px 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .remen {
    font-size: 15px;
  }
  img {
    width: 50px;
  }
}
.we {
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 16px;
  }
  .pop {
    display: inline-block;
    // padding-right: 20px;
    margin-right: 0px;
    width: 30px;
    height: 30px;
    font-size: 16px;
    background: #bbb;
    line-height: 30px;
  }
}
.oiu {
  color: white;
  font-size: 15px;
}
.adny {
  display: flex;
  align-items: center;
  .opo {
    font-size: 13px;
    padding: 5px 15px;
    background: linear-gradient(to right, #fba, #abf);
    border-radius: 15px;
    color: white;
  }
}
.jj .erke {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.e {
  width: 100px;
  img {
    width: 100px;
    height: 50px;
    object-fit: cover;
  }
}
@import "../assets/css/variable";
@import "../assets/css/mixin";
.gang {
  border-bottom: 1px solid black;
  padding: 10px;
  display: flex;
  align-items: center;
  i {
    font-size: 10px;
    color: lightcoral;
    margin: 0 20px;
  }
  .t {
    font-size: 15px;
    font-weight: bold;
  }
}
.q {
  color: rgb(241, 86, 86);
  width: 50px;
  text-align: center;
  font-size: 15px;
}
.w {
  // width: 250px;
  font-size: 15px;
}
.e {
  width: 100px;
  i {
    color: rgb(241, 86, 86);
    font-size: 100px;
  }
}
.right::-webkit-scrollbar {
  /*滚动条整体样式*/

  width: 7px; /*高宽分别对应横竖滚动条的尺寸*/

  height: 1px;
}

.right::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/

  border-radius: 10px;

  -webkit-box-shadow: inset 0 0 5px rgba(184, 44, 44, 0.2);

  background: rgb(231, 231, 231);
}

.right::-webkit-scrollbar-track {
  /*滚动条里面轨道*/

  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

  border-radius: 10px;

  background: #ededed;
}
.jj {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    // display: inline-block;
    // width: 20%;

    margin: 10px 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
.iu {
  display: flex;
  align-items: center;
}
.headercenter {
  display: flex;
  flex-direction: column;
  position: relative;
}
.search {
  width: 330px;
  height: 500px;
  background: white;
  z-index: 9999999;
  position: absolute;
  top: 40px;
  left: 10px;
  // border: 1px solid black;
  border-radius: 5px;
  border-top: none;
  box-shadow: 0px 0px 10px inset;
  overflow: auto;
  ul {
    // overflow: hidden;
    li {
      color: black;
    }
  }
}
ul {
  list-style-type: none;
}
.ac {
  // width: 1000px ;
}
.header .allName {
  background: linear-gradient(to right, rgb(250, 162, 139), rgb(139, 162, 255));
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: 5px;
  font-size: 25px;
}
.bc {
  width: 1000px;
  height: 30px;
  padding: 15px 20px;
  border-radius: 20px;
  outline: none;
  animation: search 1s linear;
}
@keyframes down {
  from {
    width: 1000px;
  }
  to {
    width: 0px;
  }
}
.ac {
  width: 360px;
  height: 30px;
  padding: 20px 20px;
  border-radius: 20px;
  outline: none;
  // border: 10px solid black;
  animation: search 0.5s linear;
}
@keyframes search {
  from {
    width: 0px;
  }
  to {
    width: 360px;
  }
}
.act {
  // display: none;
  // position: absolute;
  // top: -20%;
  // opacity: 0;
  // display: none;
  // z-index: -999;
  // background:rgba(255,255,255,.5);
  // background: white;
}
.header {
  font-size: 20px;
  width: 100%;
  height: 80px;
  position: fixed;
  z-index: 999;
  //  background: lightpink;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  @include bg_color();
  color: #ccc;
}
.headercenter {
  width: 20%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 25px;
    transition: all 2.5s ease-in-out;
  }
  input {
    margin-right: 20px;
    border: none;
    height: 20px;
  }
}
.headerright {
  width: 20%;
  text-align: center;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  span {
    margin-left: 30px;
  }
}
.headerleft {
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.allName {
  font-family: "Kirang Haerang", cursive;
  font-size: 50px;
  text-transform: uppercase;
}
.icon-wangyiyunyinleclick {
  font-size: 25px;
  // color:rgb(255, 37, 37);
}
.item {
  font-size: 16px;
  cursor: pointer;
  margin-left: 30px;
}
.active {
  padding-bottom: 20px;
  border-bottom: 3px solid #fff;

  // color: red;
  // font-size: 20px;
}
.wallPaper {
  display: flex;
}
.img {
  width: 50px;
  height: 50px;
}
@media screen and (max-width: 1350px) {
  .item {
    display: none;
  }
}
</style>