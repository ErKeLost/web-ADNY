import axios from 'axios'
//进行全局配制
axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.timeout = 3000;
axios.defaults.withCredentials = true;

export default {
  get: function (path = "", data = {}) {
    return new Promise((resolve, reject) => {
      axios.get(path, {
          params: data
        })
        .then(function(response) {
          // console.log(response.data);
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