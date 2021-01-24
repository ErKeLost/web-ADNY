import Vue from 'vue'
import VueRouter from 'vue-router'
// import FindMusic from '../views/FindMusic'
// import MyMusic from '../views/MyMusic'
const FindMusic = (resolve) => {
  import('../views/FindMusic').then((moduel) => {
    resolve(moduel)
  })
}
const Top = (resolve) => {
  import('../views/Top').then((moduel) => {
    resolve(moduel)
  })
}

const MyMusic = (resolve) => {
  import('../views/MyMusic').then((moduel) => {
    resolve(moduel)
  })
}
const Friend = (resolve) => {
  import('../views/Friend').then((module) => {
    resolve(module)
  })
}
const LogIn = (resolve) => {
  import('../views/LogIn').then((moduel) => {
    resolve(moduel)
  })
}
const Detail = (resolve) => {
  import('../views/Detail').then((moduel) => {
    resolve(moduel)
  })
}
const MV = (resolve) => {
  import('../views/MV').then((moduel) => {
    resolve(moduel)
  })
}
const MvDetail = (resolve) => {
  import('../views/MvDetail').then((moduel) => {
    resolve(moduel)
  })
}
const TopDetail = (resolve) => {
  import('../views/TopDetail').then((moduel) => {
    resolve(moduel)
  })
}

Vue.use(VueRouter)

const routes = [
 
  {
    path:'/',
    redirect:"FindMusic"
  },
  {
    path:'/Top',
    component:Top,
    children:[
      {
        path:'TopDetail/:id',
        component:TopDetail
      }
    ]
  },
  {
    path:'/LogIn',
    component:LogIn
  },
  {
    path:'/FindMusic',component:FindMusic,
    children:[
      {
        path:'detail/:id/:type',
        component:Detail
      }
    ]
  },
  {
    path:'/MyMusic',component:MyMusic
  },
  {
    path:'/Friend',component:Friend
  },
  {
    path:'/MV',component:MV,
    children:[
      {
        path:'MvDetail/:id',
        component:MvDetail
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
