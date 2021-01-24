import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  //保存全局共享的数据
  state,
  //保存修改全局共享数据的方法
  mutations,
  //触发mutations中保存方法的方法
  actions,
  //获取全局共享数据的
  getters
})