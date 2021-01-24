// 登录流程 手机表单数据
// 前端验证  后端验证
// 验证用户信息 是否合法 不通过就提示用户 不需要发请求给后端
// 前端请求通过了发请求 携带账号密码  给服务器 
// 后端验证  用户是否存在 存在需要验证密码是否正确
// 密码不正确 返回给前端  密码不正确
// 提示用户登录成功 携带用户的相关信息
<template>
  <div class="app">
    <div class="toast" v-show="toastShow">{{ toastText }}</div>
    <div class="box">
      <div class="input">
        <div class="name">
          <span>手机号:</span>
          <input type="text" name id="iphone" @input="check" v-model="phone" />
        </div>
        <div class="pass">
          <span>密码:</span>
          <input type="password" @input="check" id="password" v-model="password" />
        </div>
      </div>
      <button @click="login">登录</button>
    </div>
    <div class="font" ref="font">
      <h1 class="a" ref="a">believe in yourself</h1>
      <h1  class="b" ref="b">stay come with us erkelost</h1>
      <h1 class="c" ref="c">NetEase cloud music ! ! !</h1>
    </div>
  </div>
</template>

<script>
import { getCellPhone } from "../api/index";
import gsap from 'gsap'
import { TimelineLite } from "gsap";

export default {
  name: "LogIn",
  data() {
    return {
      phone: "",
      password: "",
      toastShow: false,
      toastText: "",
      user: {},
    };
  },
  mounted() {
    const t = gsap.timeline({ defaults: { ease: "bounce" } });
    const { font,a ,b,c} = this.$refs;
    t.to(a, { y: "0%", duration: 1 ,opacity:1});
    t.to(b, { y: "0%", duration: 1 ,opacity:1});
    t.to(c, { y: "0%", duration: 1 ,opacity:1});
  },
  methods: {
    toast(str) {
      let v = this;
      v.toastText = str;
      v.toastShow = true;
      setTimeout(function () {
        v.toastShow = false;
      }, 1500);
    },

    check(e) {
      // console.log(e.target.value);
      let type = e.target.id;
      // console.log(type);
      console.log(this.phone);
      console.log(this.password);
    },
    login() {
      //手机表单数据
      console.log(this.phone, this.password);
      //前端验证 手机号验证
      if (!this.phone) {
        this.toast("手机号不能为空");
        return;
      }
      //定义一个正则表达式
      let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!phoneReg.test(this.phone)) {
        this.toast("手机号输入错误");
        return;
      }
      if (!this.password) {
        this.toast("密码输入有误");
      } else {
        // this.toast("登陆成功");
      }
      getCellPhone({
        phone: this.phone,
        password: this.password,
        islogin: true,
      }).then((data) => {
        console.log(data);
        this.user = data;
        console.log(this.user);
      });
      if (this.user.code === 200) {
        this.toast("登录成功");
        // alert('登陆成功')

        setTimeout(() => {
          this.$router.push("/MyMusic");
        }, 1000);
        //将用户的信息存储至本地
        localStorage.setItem("profile", JSON.stringify(this.user));
        // localStorage.setItem('profile',this.user)
      } else if (this.user.code === 400) {
        this.toast("手机号错误");
        alert("手机号错误");
      } else if (this.user.code === 502) {
        this.toast("密码错误");
        alert("密码错误");
      }
      // setTimeout(() =>{
      // this.$router.go(0)

      // },1000)
    },
  },
};
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  z-index: 2000;
  left: 50%;
  top: 45%;
  opacity: 1;
  transition: all 1.5s;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  -o-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  border-radius: 5px;
  color: #fff;
  background: rgba(17, 17, 17, 0.7);
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
  max-width: 150px;
}
input {
  padding: 10px 20px;
  height: 30px;
  border: none;
  border-radius: 5px;
  
}
span{
  display: inline-block;
  width: 100px;
}
.font {
  position: relative;
  top: -400px;
  h1 {
    font-family: 'Do Hyeon', sans-serif;
    letter-spacing: 3px;
    margin-bottom: 60px;
    font-size: 50px;
    color: white;
    text-transform: uppercase;
    transform: translateY(100%);
    background: linear-gradient(to right,rgb(214, 85, 231) ,rgb(207, 139, 13));
  -webkit-background-clip: text;
  color: transparent;
  opacity: 0;
  }
  // background: black;
    transform: translateY(100%);

}
.app {
  position: relative;
  top: 80px;
  background: url("../assets/img/789.png") center center;
  width: 100%;
  height: calc(100vh - 80px);
  object-fit: cover;
  object-position: center;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .box {
    color: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 400px;
    height: 600px;
    background:url('../assets/img/789.png') center;
    border-radius: 10px;
    box-shadow: 3px 3px  rgb(128, 128, 128);
  }
}
.pass {
  margin-top: 50px;
}
.pass span {
  // margin-right: 15px;
}
button {
  width: 100px;
  border: none;
  margin-top: 50px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: black;
  color: white;
}
.font{
  margin-top: 20vh;
  .a{
  font-size: 40px;
}
.b{
  font-size: 40px;
}
.c{
  font-size: 40px;
}
}

</style>