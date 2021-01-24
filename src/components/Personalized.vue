<template>
  <div class="personalized">
    <!-- <div class="personalized-top">
      <h3>{{ore[0].copywriter}}</h3>
      <span>查看更多</span>
    </div>
    <div class="personalized-bottom">
      <div class="item" v-for="value in ore" :key="value.id" @click="selectItem(value.id)">
        <img v-lazy="value.picUrl" alt />
        <p>{{value.name}}</p>
        <span ><i class="iconfont icon-erji"></i>{{value.playCount === undefined ? "ERKELOST" : Math.round(value.playCount/10000) + '万'}}</span>
      </div>
    </div> -->
    <div class="personalized-top">
      <h3>{{title}}</h3>
      <span>查看更多</span>
    </div>
    <div class="personalized-bottom">
      <div class="item" v-for="value in personalized" :key="value.id" @click="selectItem(value.id)">
        <img v-lazy="value.picUrl" alt />
        <p>{{value.name}}</p>
        <span ><i class="iconfont icon-erji"></i>{{value.playCount === undefined ? "ERKELOST" : Math.round(value.playCount/10000) + '万'}}</span>
      </div>
    </div>
    <!-- <a href="https://music.163.com/#/download">
    <img class="right" src="../assets/css/2.png" v-if="title === '热门推荐'" alt="">

    </a>
    <img class="left" src="../assets/css/4.jpg" v-if="title === '最新专辑'" alt=""> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {getSong} from '../api/index'
export default {
  name: "Personalized",
  data() {
    return {
      playcount:0,
      ore:[]
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
  computed:{
    ...mapGetters([
      'currentIndex'
    ])
  },
  methods: {
    ...mapActions([
      'setCurrentIndex'
    ]),
    selectItem(id){
      console.log(id);
      this.$emit('select',id,this.type)
    }
  },
  // async created () {
  // let user =  localStorage.getItem('cookies')
  // // console.log(user);
  // if(user !== null){
  //   // console.log("我登录了啊");
  //   await getSong().then((data) => {
  //     console.log(data);
  //     this.ore = data.recommend
  //   })
  // }else{
  // } 
  // },
};
</script>

<style lang="scss" scoped>
.personalized {
  position:relative;
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
      span{
        display: inline-block;
        width: 150px;
        text-align: right;
        font-size: 15px;
        background-color:rgba(48, 47, 47, 0.3);
        position: absolute;
        top: 50%;
        color: white;
        .icon-erji{
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
.right{
  position:absolute;
  right: 26vw;
  // top: 13vh;
  bottom: -30vh;
  width: 200px;
}
.left{
  position:absolute;
  right: 1vw;
  top: 13vh;
  width: 400px;
  border:5px solid lightpink
}
.down{
  position:absolute;
  right: 6vw;
  top: 35vh;
  width: 175px;
}
// .icon-erji{
//   display: inline-block;
//   margin-right: 10px;
//   font-size: 50px;
// }
</style>