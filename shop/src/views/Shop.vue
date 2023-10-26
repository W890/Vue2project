<template id="app">
    <div>
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log('包含路由信息的对象', this.$route);
        // 接收传递过来的参数，query:GET
        console.log(this.$route.query.id);
    }
}
</script>