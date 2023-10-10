<template id="temp">
    <!-- vue实例外创建 -->
    <div class="list">
        <div class="list-left">
            <van-sticky>
                <van-sidebar v-model="activeKey">
                    <van-sidebar-item v-for="item in classlist" :key="item.id" :title="item.name"
                        @click="lookgoodslist(item.id)" />
                </van-sidebar>
            </van-sticky>

        </div>
        <div class="list-right">
            <div class="goods-list">
                <van-grid :column-num="2" :gutter="10" :center="false">
                    <van-grid-item v-for="item in goodslist" :key="item.id">
                        <van-image :src="item.list_pic_url" />
                        <span class="goods-title">{{ item.name }}</span>
                        <span class="goods-text">{{ item.goods_brief }}</span>
                        <span class="goods-pic">￥{{ item.min_retail_price }}</span>
                    </van-grid-item>
                </van-grid>
                <p style="text-align: center;font-size: 12px;color: #d5cfcf;">---我是有底线的--</p>
            </div>
            <br>
            <br>
            <br>
            <br>
        </div>

    </div>
</template>
<script>
import { GetCatalogList, GetCurrentList } from "@/api/list";
export default {
    data() {
        return {
            activeKey: 0,
            classlist: [],
            goodslist: [],
            // 获取商品列表的参数
            goodsdata: {
                id: 0,
                page: 1,
                size: 8,
            },
        };
    },
    name: "List",
    methods: {
        // 获取分类列表
        async getdata() {
            let {
                data: { categoryList },
            } = await GetCatalogList();
            this.classlist = categoryList;
        },
        async getgoodslist() {
            let { data: res } = await GetCurrentList(this.goodsdata);
            console.log(res);
            this.goodslist = res.data
        },
        // 获取商品列表
        lookgoodslist(id) {
            this.goodsdata.id = id;
            this.getgoodslist();
        },
    },
    created() {
        this.getdata();
        this.getgoodslist();
    },
};
</script>
<style>
.list {
    display: flex;
}

.list-left {
    flex: 1;
    background-color: #f7f8fa;
    height: 100%;
    overflow: hidden;
}

.list-right {
    flex: 3;
    height: 100%;
}

.van-sidebar {
    width: 105px;
}

.goods-title {
    font-size: 14px;

    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;

    width: 88px;
    line-height: 20px;
    margin-top: 10px;
}

.goods-text {
    font-size: 12px;

    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    width: 88px;
    line-height: 20px;
    color: #888;
}

.goods-pic {
    color: red;
}
</style>
  