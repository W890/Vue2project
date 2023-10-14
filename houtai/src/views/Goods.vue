<template id="temp">
    <!-- vue实例外创建 -->
    <div>
        商品列表
        <h1>VUEX</h1>
        <!-- 使用state值的第一种方式 -->
        <p>{{ $store.state.num }}</p>
        <!-- <p>助手函数版： {{ num }}</p> -->


        <div style="display: flex;">
            <goodsview></goodsview>
            <goodsview1></goodsview1>
            <goodsview2></goodsview2>
        </div>
        <button @click="zhi()">重置</button>
        <button @click="setnum()">改变数据</button>
    </div>
</template>
<!-- 调用   <mycom></mycom> -->
<script>
// 第三种方式使用助手函数
import { mapState, mapMutations } from 'vuex'

import goodsview1 from '@/components/Goodsview1.vue'
import goodsview2 from '@/components/Goodsview2.vue'
import goodsview from '@/components/Goodsview.vue'
export default {
    components: {
        goodsview, goodsview1, goodsview2
    },
    data() {
        return {
            num: this.$store.state.num
        }
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
        },
        zhi() {
            // this.$store.commit
            this.STE_NUM(this.num)

        }
    },
    // 助手函数
    // computed: {
    //     ...mapState(['num'])
    // }
}

</script>
