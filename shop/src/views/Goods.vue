<template id="temp">
    <!-- vue实例外创建 -->
    <div>
        <div class="shop-swupe">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="item in gallery" :key="item.id">
                    <img :src="item.img_url" alt="" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="title">
            <p>{{ info.name }}</p>
            <p>{{ info.goods_brief }}</p>
        </div>
        <div class="pic">
            <van-row>
                <van-col span="14"><span class="pictext">￥{{ info.min_retail_price }}</span></van-col>
                <van-col span="10" class="picnum"><span>库存{{ info.goods_number }}</span>
                    <span>已售{{ info.sell_volume }}</span></van-col>
            </van-row>
        </div>
        <div class="spec" @click="show = true">
            已选择：1套
            <van-icon class="icon" name="arrow" />
        </div>
        <br /><br /><br /><br /><br /><br />
        <!-- 底部弹出 -->
        <div>
            <!-- <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
          <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
          />
        </van-popup> -->
            <van-sku v-model="show" :sku="sku" :goods="goods" :goods-id="id" @buy-clicked="onBuyClicked"
                @add-cart="onAddCartClicked" />
        </div>
    </div>
</template>
  <!-- 调用   <mycom></mycom> -->
<script>
import { GetGoodsInfo } from "@/api/goods";
export default {
    name: "Goods",
    data() {
        return {
            // 商品id
            id: 0,
            gallery: [],
            info: {},
            productList: [],
            specificationList: {},
            show: false,
            sku: {
                // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                tree: [
                    {
                        k: "规格", // skuKeyName：规格类目名称
                        k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                        v: [
                            {
                                id: "1", // skuValueId：规格值 id
                                name: "红色", // skuValueName：规格值名称

                            },
                            {
                                id: "2",
                                name: "蓝色",

                            },
                        ],
                    },

                ],
                // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                // 规格id 价格
                list: [
                    {
                        id: 2259, // skuId
                        s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
                        price: 100, // 价格（单位分）
                        stock_num: 110, // 当前 sku 组合对应的库存
                    },
                    {
                        id: 2256, // skuId
                        s1: "2", // 规格类目 k_s 为 s2 的对应规格值 id
                        price: 562, // 价格（单位分）
                        stock_num: 110, // 当前 sku 组合对应的库存
                    },
                ],
                price: "2.00", // 默认价格（单位元）
                stock_num: 227, // 商品总库存
                // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id


            },
            goods: {
                // 默认商品 sku 缩略图
                picture: "",
            },

            // 自定义限购文案

            //   默认选中的值
            initialSku: {
                // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                // 值：skuValueId（规格值 id）
                s1: "1",
                s2: "1",
                // 初始选中数量
                selectedNum: 3,
                // 初始选中的商品属性
                // 键：属性id
                // 值：属性值id列表
                selectedProp: {
                    123: [1222],
                },
            },
        };
    },
    mounted() {
        this.id = this.$route.params.id;
        //   获取数据
        this.getdata();
    },
    methods: {
        async getdata() {
            let {
                data: { gallery, info, productList, specificationList },
            } = await GetGoodsInfo(this.id);
            this.gallery = gallery;
            this.info = info;
            this.productList = productList;
            this.specificationList = specificationList;
            //   设置规格缩略图
            this.goods.picture = gallery[0].img_url

            let sku = {
                tree: [
                    {
                        k: '规格',
                        k_s: "s1",
                        v: specificationList.valueList.map(item => {
                            item.name = item.value
                            return item
                        })
                    },

                ],
                list: specificationList.valueList.map(item => {
                    item.stock_num = item.goods_number
                    item.s1 = item.id + ''
                    item.price = this.info.min_retail_price * 100

                    return item

                }),
                // list:[
                //        {
                //     id: 2259, // skuId
                //     s1: "74", // 规格类目 k_s 为 s1 的对应规格值 id
                //     price: 100, // 价格（单位分）
                //     stock_num: 110, // 当前 sku 组合对应的库存
                //   },

                // ],

                // [
                //   {
                //     id: 2259, // skuId
                //     s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
                //     price: 100, // 价格（单位分）
                //     stock_num: 110, // 当前 sku 组合对应的库存
                //   },
                //   {
                //     id: 2256, // skuId
                //     s1: "2", // 规格类目 k_s 为 s2 的对应规格值 id
                //     price: 562, // 价格（单位分）
                //     stock_num: 110, // 当前 sku 组合对应的库存
                //   },
                // ],
                price: info.retail_price, // 默认价格（单位元）
                stock_num: info.goods_number, // 商品总库存
            }
            this.sku = sku
            console.log(sku.list);
        },
        onBuyClicked(o) {
            console.log('提交订单', o);
        },
        onAddCartClicked() {
            console.log('购物车');
        },
    },
};
</script>
<style>
.title {
    background: white;
    padding: 10px;
    border-bottom: 1px solid #cecece;
}

.title p {
    margin: 0;
}

.title p:last-child {
    margin-top: 5px;
    font-size: 14px;
    color: #cecece;
}

.pic {
    padding: 10px;
    background-color: white;
}

.pictext {
    font-size: 14px;
    color: red;
}

.picnum {
    font-size: 14px;
    color: #888888;
    text-align: right;
}

.picnum span:last-child {
    margin-left: 5px;
}

.spec {
    line-height: 30px;
    background: white;
    margin-top: 10px;
    padding: 10px;
    position: relative;
}

.spec .icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
}
</style>