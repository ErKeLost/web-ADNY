<template>
  <div class="it">
    <img class="bg" src="../assets/img/996.jpg" alt="">

    <div class="lanbo">
      <div class="left">
        <div class="top">
          <p class="te">云音乐特色榜</p>
          <ul>
            <li
              v-for="(o, i) in listc"
              :key="i"
              @click="select(i, o.id)"
              :class="{ ac: currentIndex == i }"
            >
              <img :src="o.coverImgUrl" alt="" />
              <div class="r">
                <p class="m">{{ o.name }}</p>
                <p class="n">{{ o.updateFrequency }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="center">
          <p class="te">全球媒体榜</p>
          <ul>
            <li
              v-for="(o, p) in listu"
              :key="p"
              :class="{ act: outIndex == p }"
              @click="selecta(p, o.id)"
            >
              <img :src="o.coverImgUrl" alt="" />
              <div class="r">
                <p class="m">{{ o.name }}</p>
                <p class="n">{{ o.updateFrequency }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <keep-alive>
    <router-view></router-view>

    </keep-alive>
  </div>
</template>

<script>
import { getTop } from "../api/index";
import { mapState } from "vuex";
export default {
  name: "Top",

  data() {
    return {
      listc: [],
      listu: [],
      currentIndex: null,
      outIndex: null,
    };
  },
  computed: {
    ...mapState(["top"]),
  },
  async created() {
    let res = await getTop();
    this.listc = res.list.splice(0, 6);
    this.listu = res.list.splice(6, 30);
  },
  methods: {
    
    select(index, id) {
      this.currentIndex = index;
      // if(this.currentIndex = index){
      //   document.querySelector('.act').removeAttribute('class','act')
      // }
      this.$router.push({
        path: `/Top/TopDetail/${id}`,
      });
      this.$router.go(0);
      if(id == this.$route.params.id){
        setTimeout(() => {
          console.log("aaa");
        },2000)
      }

    },
    selecta(index,id) {
      this.outIndex = index;
      // if(this.outIndex = index){
      //   document.querySelector('.ac').removeAttribute('class','ac')
      // }
      this.$router.push({
        path: `/Top/TopDetail/${id}`,
      });
      this.$router.go(0);

    },
  },
};
</script>

<style lang="scss" scoped>
.bg{
  position: fixed;
  top: 0;
  opacity: .8;
}
.m {
  font-weight: bold;
}
.n {
  font-weight: bold;
  color: rgb(131, 131, 131);
}
.ac {
  background: #bbb;
}
.act {
  background: #bbb;
}
.r {
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}
.te {
  margin-left: 30px;
  margin-top: 30px;
  font-weight: bold;
}
li {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  img {
    margin-right: 25px;
    width: 80px;
    height: 80px;
  }
}
ul {
  margin-top: 30px;
  list-style-type: none;
}
.it {
  display: flex;
  justify-content: center;

}
.lanbo {
  position: absolute;
  top: 80px;
  width: 80%;
  display: flex;
  .left {
    width: 25%;
    border: 1px solid #bbb;
  }
  .right {
    width: 75%;
    height: 10%;
    // background: pink;
    border-right: 1px solid #bbb;
  }
}
</style>