<template>
    <div id="device">
        <div class="dev">
            <br>
            <!-- 查询表单 -->
            <div style="margin-left: 50px;">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <div class="form-div">
                        <el-form-item>
                            <el-select v-model="formInline.region" placeholder="智能设备状态">
                                <el-option label="完好" value="shanghai"></el-option>
                                <el-option label="待维修" value="beijing"></el-option>
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
                    <div class="form-div">
                        <el-form-item>
                            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-tabs type="border-card">
                <!-- 表一 -->
                <el-tab-pane label="智能设备">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="unitname" label="单元名称" width="180"></el-table-column>
                        <el-table-column label="栋号" width="160"></el-table-column>
                        <el-table-column label="房号" width="160"></el-table-column>
                        <el-table-column label="房主" width="160"></el-table-column>
                        <el-table-column label="空调" width="160"></el-table-column>
                        <el-table-column label="Wi-Fi" width="160"></el-table-column>
                        <el-table-column label="洗衣机" width="160"></el-table-column>
                        <el-table-column prop="createtime" label="授予时间" width="220"></el-table-column>
                        <el-table-column prop="name" label="状态" width="180">
                            <template slot-scope="scope">
                                {{ scope.row.smartstatus == 1 ? '完好' : '待维修' }}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作状态">
                            <template slot-scope="scope">
                                <el-switch active-color="#389af9" inactive-color="#dcdfe6" v-model="scope.row.smartstatus"
                                    :active-value="1" :inactive-value="2">
                                </el-switch>
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
                <!-- 表二 -->
                <el-tab-pane label="家居设备">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="unitname" label="单元名称" width="180"></el-table-column>
                        <el-table-column label="栋号" width="160"></el-table-column>
                        <el-table-column label="房号" width="160"></el-table-column>
                        <el-table-column label="房主" width="160"></el-table-column>
                        <el-table-column label="书桌" width="160"></el-table-column>
                        <el-table-column label="椅子" width="160"></el-table-column>
                        <el-table-column label="衣柜" width="160"></el-table-column>
                        <el-table-column prop="createtime" label="授予时间" width="220"></el-table-column>
                        <el-table-column prop="name" label="状态" width="180">
                            <template slot-scope="scope">
                                {{ scope.row.smartstatus == 1 ? '完好' : '待维修' }}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作状态">
                            <template slot-scope="scope">
                                <el-switch active-color="#389af9" inactive-color="#dcdfe6" v-model="scope.row.smartstatus"
                                    :active-value="1" :inactive-value="2">
                                </el-switch>
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
import { GethouseData } from '@/api/house'
export default {
    data() {
        return {
            // 表单1数据
            tableData: [],
            //   当前显示的页码
            userparams: { currPage: 0, pageNum: 10, query: '' },
            valuetype: true,
            valuetype2: false,
            //   总条数
            total: 0,
            formInline: {
                user: '',
                region: ''
            },

            // 日历数据
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            value2: ''
        }
    },
    mounted() {
        this.getdata()
    },
    methods: {
        // 数据列表
        async getdata() {
            const res = await GethouseData(this.userparams)
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
#device {
    width: 100%;
    height: 800px;
    background-color: #f0f0f0;

}

.dev {
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