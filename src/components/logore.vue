<template>
  <div class="personalized">
    <div v-show="online === null" class="qwe">
      <div class="poi">
        <h3>为你推荐 (需要登录)</h3>
      <span>查看更多</span>
      </div>
      <!-- <span>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</span>
      <p>每日推荐歌单</p> -->
      <img src="../assets/img/669.png" alt="" @click="go()">
    </div>
    <div class="personalized-top"  v-show="online !== null">
      <h3>为你推荐</h3>
      <span>查看更多</span>
    </div>
    <div class="personalized-bottom">
      <div
        class="item"
        v-for="value in ore"
        :key="value.id"
        @click="selectItem(value.id)"
      >
        <img v-lazy="value.picUrl" alt />
        <p>{{ value.name }}</p>
        <span
          ><i class="iconfont icon-erji"></i
          >{{
            value.playCount === undefined
              ? "ERKELOST"
              : Math.round(value.playCount / 10000) + "万"
          }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import {getSong} from '../api/index'
export default {
  name: "logore",
  data() {
    return {
      ore: [],
      online:null
    }
  },
  methods: {
   selectItem(id){
      console.log(id);
      this.$emit('select',id,this.type)
    },
    go(){
      this.$router.push('/MyMusic')
    }
  },
    props: {
    personalized: {
      type: Array,
      default: () => [],
      required: true,
    },
    title:{
      type:String,
      default:'',
      required:true
    },
    type:{
      type:String,
      default:"",
      required:true
    }
   
  },
  async created () {
     let user = localStorage.getItem('cookies');
     let pro = localStorage.getItem('profile')
     this.online = user
      await getSong().then((data) => {
        //  console.log(data);
        //  this.ore = data.recommend
       })
       let dont = await getSong()
       localStorage.setItem('?',JSON.stringify(dont))
     let a =   localStorage.getItem('?')
     console.log(JSON.parse(a));
     if(pro !== null){
       await getSong().then((data) => {
        //  console.log(data);
         this.ore = data.recommend
       })
     }
  },
};
</script>

<style lang="scss" scoped>
.poi{
  width: 100%;
  display: flex;
  justify-content: space-between;
  span {
      padding: 2px 10px;
      display: inline;
      border: 1px solid black;
      border-radius: 20px;
      font-size: 15px;
    }
}
.qwe{
  width: 90%;
  height: 300px;
  // background: pink;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  flex-direction: column;
  span{
    // font-size: 20px;
  }
}
.personalized {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .personalized-bottom {
    width: 90%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .item {
      width: 150px;
      height: 220px;
      // margin: 20px 30px;
      // margin-bottom: 70px;
      margin-right: 20.5px;
      position: relative;
      img {
        // width: 100%;
        width: 150px;
        height: 150px;
        border-radius: 20px;
      }
      P {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-align: center;
      }
      span {
        display: inline-block;
        width: 150px;
        text-align: right;
        font-size: 15px;
        background-color: rgba(48, 47, 47, 0.3);
        position: absolute;
        top: 50%;
        color: white;
        .icon-erji {
          margin-right: 10px;
        }
      }
    }
  }
  .personalized-top {
    width: 90%;
    height: 100px;
    // line-height: 100px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    h3 {
      font-weight: bold;
    }
    span {
      padding: 2px 10px;
      display: inline;
      border: 1px solid black;
      border-radius: 20px;
    }
  }
}
.right {
  position: absolute;
  right: 26vw;
  // top: 13vh;
  bottom: -30vh;
  width: 200px;
}
.left {
  position: absolute;
  right: 1vw;
  top: 13vh;
  width: 400px;
  border: 5px solid lightpink;
}
.down {
  position: absolute;
  right: 6vw;
  top: 35vh;
  width: 175px;
}
</style>