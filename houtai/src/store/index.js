import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    // import { user } from "./modulules/user.js";
    strict: true,
    // 全局数据源 可以理解为data
    state: {
        num: 2,
        num2:6
    },
    // 可以理解为计算属性
    getters: {
        numhe:(state)=>{
            return state.num+state.num2
        }
    },
    // 修改state值的方法 vuex唯一允许修改state值的地方
    mutations: {
        STE_NUM(state, data) {
            state.num = data
        },
        STE_JIA(state, data) {
            state.num = state.num + 1
        },
        STE_CHENG(state, data) {
            state.num = state.num * 2
        },
        STE_JIAN(state, data) {
            state.num = state.num - 1
        }
    },
    // 异步操作
    actions: {
        ASYNC_ADD(store) {
            setTimeout(()=>{
                store.commit('STE_JIA')
            },2000)
        }
    },
    // 模块化
    modules: {

    }
})
