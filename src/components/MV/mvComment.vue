<template>
  <div>
    <div class="iou">
<span>视频评论:</span>
    </div>
    <ul>

      <li v-for="(o,i) in comment" :key="i">
       <div class="m">
          <img :src="o.user.avatarUrl" alt="">
          <div class="n">
            <div class="b">
            <span>{{o.user.nickname}} : </span>
            <span>{{o.content}}</span>
            </div>
            <span>{{formatTime(o.time)}}</span>
            <!-- <span>{{o.time}}</span> -->
          </div>
       </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name:'mvComment',
    props:{
      comment:{
        type:Array,
        default:() => []
      }
    },
    methods: {
      formatTime(time) {
        let ray = new Date(time)
        let year = ray.getFullYear() + '年'
        let month = ray.getMonth() + 1 +  '月'
        let day = ray.getDate() + '日'
        return [year,month,day].join("") + "更新"
      }
    },
  }
</script>

<style lang="scss" scoped>
.iou{
  margin-left: 100px;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 30px;
}

  .m{
    display: flex;
    margin-left: 100px;
    margin-bottom: 30px;
    img{
      width: 50px;
      height: 50px;
    }
    .n{
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      justify-content: space-around;
    }
  }

</style>