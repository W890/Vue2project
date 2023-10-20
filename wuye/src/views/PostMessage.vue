<template>
    <div id="post11">
        <div class="post111">
            <br>
            <!-- 查询表单 -->
            <div style="margin-left: 50px;">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <div class="form-div">
                        <el-form-item>
                            <el-input v-model="formInline.user" placeholder="请输入发布小区"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form-div">
                        <el-form-item>
                            <el-input v-model="formInline.user" placeholder="请输入公告主题"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form-div">
                        <el-form-item>
                            <el-input v-model="formInline.user" placeholder="请输入发布内容"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="success" @click="onSubmit">发布公告</el-button>
                        <el-button type="primary" @click="onSubmit">点击重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-tabs type="border-card">
                <!-- 表一 -->
                <el-tab-pane label="智能设备">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column type="index" label="序号" width="100"></el-table-column>
                        <el-table-column  prop="communityname" label="公告主题" width="325"></el-table-column>
                        <el-table-column prop="content" label="公告内容" width="650"></el-table-column>
                        <el-table-column prop="createtime" label="发布时间" sortable width="325"></el-table-column>
                        <el-table-column prop="title" label="小区名称" width="160"></el-table-column>
                        <el-table-column label="操作">
                            <el-button size="mini" type="danger">归档</el-button>
                            <el-button size="mini" type="primary">查看公告</el-button>
                        </el-table-column>
                    </el-table>
                    <!-- 分页器 -->
                    <div>
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="userparams.pagenum" :page-sizes="[10, 20, 30, 50]" :page-size="10"
                            layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import { GetPostData } from '@/api/house'
export default {
    data() {
        return {
            // 表单1数据
            tableData: [],
            //   当前显示的页码
            userparams: { currPage: 0, pageNum: 10},
            valuetype: true,
            valuetype2:false,
            //   总条数
            total: 0,
            formInline: {
                user: '',
                region: ''
            },
        }
    },
    mounted() {
        this.getdata()
    },
    methods: {
        // 数据列表
        async getdata() {
            const res = await GetPostData(this.userparams)
            this.tableData = res.data;
            //   给总条数赋值
            this.total = res.total
            console.log(res);
        },
        // 分页方法
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
            this.userparams.pagesize = val
            this.getdata()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.userparams.currPage = val
            this.getdata()
        },
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>
<style>
#post11 {
    width: 100%;
    height: 800px;
    background-color: #f0f0f0;

}

.post111 {
    width: 1800px;
    height: 750px;
    background-color: #ffffff;
    margin: 0 auto;
}

.form-div {
    float: left;
    margin-left: 20px;
    margin-right: 20px;
}
</style>