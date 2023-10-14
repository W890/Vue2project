<template id="temp"> <!-- vue实例外创建 -->
    <div class="z1">
        <p>
            子组件：{{ $store.state.num }}
            <button @click="jia()"> 加1</button>
            <button @click="setacync()">异步调用</button>
        <p>gteers：{{ $store.getters.numhe }}</p>
        </p>
    </div>
</template>
<!-- 调用   <mycom></mycom> -->
<script>
export default {
    methods:{
        jia(){
            this.$store.commit('STE_JIA')
        },
        setacync(){
            this.$store.dispatch('ASYNC_ADD')
        }
    }
}
 
</script>
<style>
.z1{
    border: 1px solid;
    width: 200px;
    height: 200px;
}
</style>