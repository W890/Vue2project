import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  // 全局数据源 可以理解为data
  state: {
    num:0
  },
  // 可以理解为计算属性
  getters: {
  },
  // 修改state值的方法 vuex唯一允许修改state值的地方
  mutations: {

    STE_NUM(state,data){
      state.num = data
    }
  },
  // 异步操作
  actions: {
  },
  // 模块化
  modules: {
  }
})
