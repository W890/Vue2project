<template>
    <div>
        <!-- <div>
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item>1</van-swipe-item>
                <van-swipe-item>2</van-swipe-item>
                <van-swipe-item>3</van-swipe-item>
                <van-swipe-item>4</van-swipe-item>
            </van-swipe>
        </div> -->
        <h1>sdfasdfasdf</h1>
        <div>
            <van-goods-action>
                <van-goods-action-icon icon="chat-o" text="客服" dot />
                <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
                <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
                <van-goods-action-button type="warning" text="加入购物车" />
                <van-goods-action-button type="danger" text="立即购买" />
            </van-goods-action>
        </div>
        <div>

            <van-image-preview v-model="show" :images="images" @change="onChange">
                <template v-slot:index>第{{ index }}页</template>
            </van-image-preview>
        </div>
    </div>
</template>

<script>
import { GetCatalogList } from "@/api/car";
export default {
    name: 'Car',
    data() {
        return {
            show: false,
            index: 0,
            images: [
                'https://img01.yzcdn.cn/vant/apple-1.jpg',
                'https://img01.yzcdn.cn/vant/apple-2.jpg',
            ],
        };
    },
    methods: {
        // 获取分类列表
        async getdata() {
            let res = await GetCatalogList();
            console.log(res);
        },
        onChange(index) {
            this.index = index;
        },
    },
};


</script>

<style>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
}
</style>