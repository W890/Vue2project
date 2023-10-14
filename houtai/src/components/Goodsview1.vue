<template id="temp"> <!-- vue实例外创建 -->
    <div class="z1">
        <p>
            子组件1：{{ $store.state.num }}
            <button @click="cheng"> 乘2</button>
        </p>
    </div>
</template>
<!-- 调用   <mycom></mycom> -->
<script>
 export default {

methods:{
    cheng(){
        this.$store.commit('STE_CHENG')
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