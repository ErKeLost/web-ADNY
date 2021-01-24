import axios from 'axios'
//进行全局配制
axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.timeout = 3000;
//封装自己的get 和 post 方法
// const token = localStorage.getItem('token')
// axios.defaults.headers.common['token'] = token

// axios.interceptors.request.use(
//   config => {
//     // do something before request is sent

//     if (token) {
//       // let each request carry token
//       // ['X-Token'] is a custom headers key
//       // please modify it according to the actual situation
//       config.headers['token'] = token
//     }
//     return config
//   },
//   error => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
    

//   }
// )
export default {
  get: function (path = "", data = {}) {
    return new Promise((resolve, reject) => {
      axios.get(path, {
          params: data
        })
        .then(function(response) {
          // console.log(response);
          if(data.islogin){
            localStorage.setItem('cookies',response.data.cookie)
            localStorage.setItem('token',response.data.token)
          }
          resolve(response.data)
        })
        .catch(function(error) {
          // console.log(error);
          reject(error)
        })
    })
  },
  post: function (path = "", data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(path, data)
        .then(function (response) {
          console.log(response);
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
}