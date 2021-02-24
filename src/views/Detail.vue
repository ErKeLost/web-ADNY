<template>
  <div class="detail">
    <BetterScroll>
      <SubHeader class="ij" :title="playlist.name"></SubHeader>
      <DetailTop
        :path="playlist.coverImgUrl"
        :count="playlist.playCount"
        :tag="playlist.tags"
        :update="format(playlist.trackUpdateTime)"
        :name="creator.nickname"
        :share="playlist.shareCount"
        :comment="playlist.commentCount"
        :include="playlist.description"
        :picurl="album.picUrl"
        :playlist="playlist.tracks"
        :song="song"
      ></DetailTop>
      <DetailCenter
        :playlist="playlist.tracks"
        :include="playlist.description"
        :song="song"
      ></DetailCenter>
    </BetterScroll>
  </div>
</template>

<script>
import SubHeader from "../components/SubHeader";
import DetailTop from "../components/DetailTop";
import DetailCenter from "../components/DetailCenter";
import BetterScroll from "../components/BetterScroll";
import { getPlayList, getSongDetail, getNewAblum ,getMusicComment} from "../api/index";
export default {
  name: "Detail",
  components: {
    SubHeader,
    DetailTop,
    DetailCenter,
    BetterScroll,
  },

  data() {
    return {
      playlist: {},
      time: "",
      creator: {},
      file: {},
      trackid: [],
      ids: "",
      song: [],
      album: {},
    };
  },
  async created() {
    //读取本地数据
    let file = localStorage.getItem("profile");
    // console.log(profile);
    if (file) {
      this.file = file;
    }
    // console.log(JSON.parse(this.profile));
    //trackids

    //歌单详情
    if (this.$route.params.type === "personalized") {
      await getPlayList({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = data.playlist;
          // console.log(this.playlist);
          this.creator = data.playlist.creator;
          this.time = data.playlist.trackUpdateTime;
          // this.trackid = ;
          for (let i = 0; i < data.playlist.trackIds.length; i++) {
            // console.log(data.playlist.trackIds[i].id);
            this.trackid.push(data.playlist.trackIds[i].id);
          }

          this.ids = this.trackid.join(",");
          console.log(this.ids);
        })
        .catch((err) => {
          console.log(err);
        });
      await getSongDetail({ ids: this.ids }).then((data) => {
        this.song = data.songs.splice(0, 39);
        // console.log(this.song);
      });
    }else if (this.$route.params.type === "album") {
      // console.log(this.$route.params.id);
      getNewAblum({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data);
          
        })
        .catch((err) => {
          console.log(err)
        })
    }

    // let date = new Date();
    // // console.log(date);
  },
  methods: {
    formatTime(time) {
      let diffTime = time / 1000;
      let year = Math.floor(diffTime / (60 * 60 * 24 * 30 * 12));
      let month = Math.floor(diffTime / (60 * 60 * 24 * 30));
      let day = Math.floor(diffTime / (60 * 60 * 24));
      let minute = Math.floor((diffTime / 60) % 60);
      minute = minute >= 10 ? minute : "0" + minute;
      let second = Math.floor(diffTime % 60);
      second = second >= 10 ? second : "0" + second;
      return `${year}年${month}月${day}日建立`;
    },
    format(time) {
      let date = time;
      let ray = new Date(date);
      let year = ray.getFullYear() + "年";
      let month = ray.getMonth() + 1 + "月";
      let day = ray.getDate() + "日";
      return [year, month, day].join("") + "创建";
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #ddd;
  z-index: 9999;
  background: url('../assets/img/2.jpg') center;
  color: white;
}
.ij{
  // position: relative;
  // position: fixed;
}
</style>