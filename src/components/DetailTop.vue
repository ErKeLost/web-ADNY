<template>
  <div class="detail-top">
    <div class="img">
      <img :src="path" v-if="path" />
      <img :src="picurl" v-else />

      <div class="option">
        <div class="out">
          <div class="top">
            <i class="iconfont icon-yonghu1"></i>
            <span>{{ name }}</span>
          </div>
          <span>{{ "标签：" + tag.join() }}</span>

          <span>{{ "播放量：" + Math.floor(count / 10000) + "万" }}</span>
          <span>{{ update }}</span>
        </div>
        <!-- <span v-for="(value,index) in tag" :key="index">{{value}}</span> -->
      </div>
    </div>
    <div class="item">
      <span class="open" @click="selectMusic"
        ><i class="iconfont icon-xiayigexiayishou"></i>播放全部</span
      >
      <span>收藏</span>
      <span>{{ `分享(${share})` }}</span>
      <span>{{ `评论(${comment})` }}</span>
    </div>
  </div>
  <!-- <div>
        <span>{{include}}</span>
      </div> -->
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import func from '../../vue-temp/vue-editor-bridge';
export default {
  name: "DeatilTop",
  data() {
    return {
      tta: [],
      // time: update,
    };
  },
  props: {
    picurl: {
      type: String,
      default: "",
      required: true,
    },
    path: {
      type: String,
      default: "",
      required: true,
    },
    include: {
      type: String,
      default: "",
      required: true,
    },
    count: {
      type: Number,
      default: 0,
      required: true,
    },
    share: {
      type: Number,
      default: 0,
      required: true,
    },
    comment: {
      type: Number,
      default: 0,
      required: true,
    },
    tag: {
      type: Array,
      default: () => [],
      required: true,
    },
    update: {
      type: String,
      default: "",
      required: true,
    },
    name: {
      type: String,
      default: "",
      required: true,
    },
    playlist: {
      type: Array,
      default: () => [],
      required: true,
    },
    song: {
      // type:{},
      // // default:{},
      // // // default:() => {},
      // // required:true
    },
  },
  methods: {
    ...mapActions(["setFullPlayer",'setDetail', "setSongDetail","setMiniPlayer",'setIsPlaying']),
    selectMusic() {
      this.setMiniPlayer(false)
      this.setFullPlayer(true);
      this.setIsPlaying(true)
      let ids = this.song.map(function (item) {
        return item.id;
      });
      console.log(ids);
      this.setDetail(ids);
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 300px;
  height: 300px;
}
.detail-top {
  width: 70%;
  height: 400px;
  // background-color: #fba;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .img {
    display: flex;
  }
}
.out {
  display: flex;
  flex-direction: column;
}
span {
  width: 200px;
  padding-bottom: 10%;
}
.option {
  margin-left: 10%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
}
.top {
  margin-bottom: 10%;
}
i {
  margin-right: 10%;
}
.item {
  position: absolute;
  top: 350px;
  left: 40%;
  span {
    display: inline-block;
    width: 120px;
    height: 20px;
    text-align: center;
    line-height: 50px;
    border: 1px solid black;
    margin-right: 10px;
    cursor: pointer;
  }
  .open {
    color: white;
    background-color: black;
  }
}
</style>