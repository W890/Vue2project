<template id="temp">
    <!-- vue实例外创建 -->
    <div>
        商品列表
        <!-- 使用state值的第一种方式 -->
        <p>{{ $store.state.num }}</p>
        <p>助手函数版：{{ num }}</p>

        <goodsview></goodsview>
        <button @click="setnum()">改变数据</button>
    </div>
</template>
<!-- 调用   <mycom></mycom> -->
<script>
// 第三种方式使用助手函数
import { mapState, mapMutations } from 'vuex'
import goodsview from '@/components/Goodsview.vue'
export default {
    components: {
        goodsview
    },
    mounted() {
        // <!-- 使用state值的第二种方式 -->
        console.log(this.$store.state.num);



    },
    methods: {
        ...mapMutations(['STE_NUM']),
        setnum() {
            // commit('在mutations定义的方法名'，要传的值)
            // this.$store.commit('STE_NUM',5)
            // 第二种方式：助手函数
            this.STE_NUM(10)
        }
    },
    // 助手函数
    computed: {
        ...mapState(['num'])
    }
}

</script>
