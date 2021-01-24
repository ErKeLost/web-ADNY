<template>
  <div class="right">
    <div></div>
    <div class="lyric" ref="lyric">
      <ul>
        <li
          v-for="(item, index) in currentLyric"
          :key="index"
          :class="{ active: currentnum === index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BetterScroll from "../../components/BetterScroll";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PlayerRight",
  data() {
    return {
      currentnum: "0",
    };
  },
  components: {
    BetterScroll,
  },
  computed: {
    ...mapGetters(["currentLyric"]),
  },
  props: {
    currenttime: {},
  },
  watch: {
    currenttime(newv, oldv) {
      //高亮歌词同步
      let num = Math.floor(newv) + "";
      let res = this.currentLyric[num];
      if (res !== undefined) {
        this.currentnum = num;
        //   歌词滚动同步
        let now = document.querySelector("li.active").offsetTop;
        // console.log(now);
        let div = this.$refs.lyric.offsetHeight;
        let o = document.querySelector(".lyric");
        // console.log(o.offsetTop);
        // console.log(div);
        if (now > div / 3) {
          this.$refs.lyric.classList.add("to");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.right {
  width: 50%;
  height: 90vh;
  overflow-y: auto;
  color: white;
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

  background: #000;
}

.right::-webkit-scrollbar-track {
  /*滚动条里面轨道*/

  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

  border-radius: 10px;

  background: #ededed;
}
ul {
  list-style: none;
}
.lyric {
  //   height: 80%;
  position: relative;
  top: 170px;
  display: flex;
  justify-content: center;
  &.to {
    transform: translateY(-50%);
  }
  transition: all 15s ease-in;
  li {
    margin-bottom: 18px;
    text-align: center;
    color: white;
    &.active {
      color: lightcoral;
    }
  }
}
</style>