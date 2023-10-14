<template id="temp">
    <!-- vue实例外创建 -->
    <div class="z1">
        <p>
            子组件2：{{ $store.state.num }}
            <button @click="jian()"> 减一</button>
        </p>
    </div>
</template>
<!-- 调用   <mycom></mycom> -->
<script>
export default {
    methods: {
        jian() {
            this.$store.commit('STE_JIAN')
        }
    }
}
</script>
<style>
.z1 {
    border: 1px solid;
    width: 200px;
    height: 200px;
}
</style>