<template>
    <div id="messages">
        <div class="messages1">
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
                        <el-button type="success" @click="onSubmit">录入</el-button>
                        <el-button type="primary" @click="onSubmit">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-table stripe :data="tableData" border style="width: 100%">
                    <el-table-column align="center" type="index" label="序号">
                    </el-table-column>
                    <el-table-column prop="username" align="center" label="用户账号">
                    </el-table-column>
                    <el-table-column align="center" prop="sex" label="性别">
                    </el-table-column>
                    <el-table-column align="center" prop="homeaddress" label="家庭住址">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="parkname" label="邮箱">
                    </el-table-column>
                    <el-table-column align="center" prop="createtime" label="创建时间">
                    </el-table-column>
                    <el-table-column align="center" prop="note" label="描述">
                    </el-table-column>
                    <el-table-column align="center" prop="type" label="类型">
                    </el-table-column>
                    <el-table-column align="center" prop="address" label="操作" width="300">
                        <el-button type="primary" plain size="mini">复制</el-button>
                        <el-button type="primary" plain size="mini">详情</el-button>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <div>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="listform.pageNum" :page-sizes="[10, 20, 30, 50]" :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <br><br><br>
    </div>
</template>
  
<script>
import { GetUsersData } from "@/api/house";
export default {
    data() {
        return {
            form: {},

            form2: {},
            // 总条数
            total: 0,
            formInline: {
                user: '',
                region: ''
            },
            listform: {
                pageNum: 10,
                currPage: 0
            },
            // 列表数据
            tableData: [],
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
        };
    },
    mounted() {
        this.getdata();
    },
    methods: {
        async getdata() {
            let res = await GetUsersData(this.listform);
            this.tableData = res.data;
            this.total = res.total;
            console.log(res);
        },
        // 分页方法
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.listform.pageNum = val;
            this.getdata();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.listform.currPage = val - 1;
            this.getdata();
        },
        onSubmit() {
            console.log('submit!');
        }
    },
};
</script>
  
<style scoped>
#messages {
    width: 100%;
    background-color: #f0f0f0;
}

.messages1 {
    width: 1850px;
    margin: 0 auto;
    padding-top: 15px;
    padding-left: 15px;
    background-color: #fff;
}

.el-input {
    width: 500px;
}

.form-div {
    float: left;
    margin-left: 20px;
    margin-right: 20px;
}
</style>