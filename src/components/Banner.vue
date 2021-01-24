<template>
  <div class="copy all">
    <swiper :options="swiperOption" class="banner" v-if="banners.length > 0 ">
      <swiper-slide v-for="value in banners" :key="value.bannerId">
        <img class="opq" :src="value.imageUrl" alt="" >
        <a :href="value.url">
          <img class="img" :src="value.imageUrl"  alt />
        </a>
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/swiper-bundle.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
//  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
export default {
  name: "Banner",
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false, //当切换到最后一个slide 停止切换
          disableOnInteraction: false, //触发事件时 是否禁止autoplay
        },
        pagination: {
          el: ".swiper-pagination",
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
      },
    };
  },
  methods: {
    action(id) {
      console.log(id);
      this.$router.push({
        path:`detail/${id}`
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  .opq{
    position: absolute;
    top: 100px;
    width: 100%;
    filter: blur(50px);
  }
  .img{
    border-radius: 10px;
    position: relative;
    top: 3vh;
    left: 50%;
    transform:translateX(-50%);
    width: 90%;
    display: flex;
    justify-content: center;
    // height: 500px;
  }
  
}
</style>
<style lang="scss">
.all{
  background-color: #f5f5f5;
}
  .banner{
    .swiper-pagination-bullet{
      margin-left: 100px;
      width: 9px;
      height: 9px;
      background: gray;
      opacity: 1;
      letter-spacing: 5px;
    }
    .swiper-pagination-bullet-active{
      background: #fff;
    }
  }
</style>