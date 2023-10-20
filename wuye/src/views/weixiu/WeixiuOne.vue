
import { Form } from 'element-ui';

import { Form } from 'element-ui';
<template>
    <div id="menu">
        <br>
        <div class="menu">
            <br>
            <!-- 查询表单 -->
            <div style="margin-left: 50px;">
                <el-form :inline="true" :model="form" class="demo-form-inline">
                    <div class="form-div">
                        <el-form-item>
                            <el-input v-model="form.homename" placeholder="维修房主"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form-div">
                        <el-form-item>
                            <el-select v-model="form.repairtype" placeholder="维修状态">
                                <el-option label="已修复" value="1"></el-option>
                                <el-option label="待处理" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="form-div">
                        <div class="block">
                            <el-date-picker v-model="value2" type="datetimerange" :picker-options="pickerOptions"
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                            </el-date-picker>
                        </div>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="search()">查询</el-button>
                        <el-button type="primary" @click="clear()">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <br>
            <el-tabs type="border-card">
                <!-- 表一 -->
                <el-tab-pane label="智能设备维修">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column type="index" label="序号" width="100"></el-table-column>
                        <el-table-column prop="homename" label="发布人员" width="200"></el-table-column>
                        <el-table-column prop="housename" label="房屋信息" width="300"></el-table-column>
                        <el-table-column prop="repaircontent" label="维修内容" width="300"></el-table-column>
                        <el-table-column prop="createtime" label="发布时间" width="250"></el-table-column>
                        <el-table-column prop="resultcontent" label="处理结果" width="200"></el-table-column>
                        <el-table-column label="处理状态" width="200">已修复</el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary">处理</el-button>
                                <el-button size="mini" type="danger" @click="delprkdata(scope.row)">归档</el-button>
                            </template>
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
import { Weixiuone } from '@/api/house'
export default {
    data() {
        return {
            // 表单1数据
            tableData: [],
            //   当前显示的页码
            userparams: {
                repairtype: 1,
                homename: '',
                resultstatus: '',
                startDate: '',
                endDate: '',
                currPage: 0,
                pageNum: 10,
                token: ''
            },
            // 查旬验证
            form: {
                repairtype: 1,
                homename: '',
                resultstatus: 1,
                startDate: '',
                endDate: '',
                currPage: 0,
                pageNum: 10,
                token: ''
            },
            valuetype: true,
            valuetype2: false,
            //   总条数
            total: 0,
            formInline: {
                user: '',
                region: ''
            },
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            },
            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            value2: "",
        }
    },
    mounted() {
        this.form.token = localStorage.getItem('token')
        this.getdata()
    },
    methods: {
        // 数据列表
        async getdata() {
            const res = await Weixiuone(this.userparams)
            this.tableData = res.data;
            //   给总条数赋值
            this.total = res.total
            console.log(res);
        },
        // 查询
        async search() {
            const res = await Weixiuone(this.form)
            this.tableData = res.data
            //   给总条数赋值
            this.total = res.total
            console.log(res);
        },
        // 删除
        async delprkdata(row) {
            this.form1.p_id = row.p_id
            let res = await DelPoster(this.form1)

            console.log(res);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            this.getdata()
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
       // 重置
       clear() {
            location.reload()
        },
    }
}
</script>
<style>
#menu {
    width: 100%;
    height: 700px;
    background-color: #f0f0f0;

}

.menu {
    width: 1800px;
    /* height: 750px; */
    background-color: #ffffff;
    margin: 0 auto;
}

.form-div {
    float: left;
    margin-left: 20px;
    margin-right: 20px;
}
</style>