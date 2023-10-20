<template>
    <div id="message">
        <div class="message1">
            <!-- 左侧表单 -->
            <div class="left-div">
                <div style="margin: 20px;"></div>
                <el-form :label-position="labelPosition" :model="formLabelAlign">
                    <p>缴费人员：</p>
                    <el-form-item>
                        <el-input placeholder="请输入缴费人员" v-model="formLabelAlign.name"></el-input>
                    </el-form-item>
                    <p>缴费名称：</p>
                    <el-form-item>
                        <el-input placeholder="请输入缴费项目/名称" v-model="formLabelAlign.region"></el-input>
                    </el-form-item>
                    <p>支付类型</p>
                    <el-form-item style="width: 200%;">
                        <el-select v-model="formInline.region" placeholder="输入支付类型">
                            <el-option label="支付宝支付" value="beijiang"></el-option>
                            <el-option label="微信支付" value="shanghai"></el-option>
                            <el-option label="新联支付" value="dfaf"></el-option>
                        </el-select>
                    </el-form-item>
                    <p>支付状态</p>
                    <el-form-item>
                        <el-select v-model="formInline.region" placeholder="选择支付状态">
                            <el-option label="已支付" value="beijing"></el-option>
                            <el-option label="未支付" value="shanghai"></el-option>
                        </el-select>
                    </el-form-item>
                    <p>支付时间</p>
                    <div class="block">
                        <el-date-picker v-model="value2" type="datetimerange" :picker-options="pickerOptions"
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                        </el-date-picker>
                    </div>
                    <p>缴费金额：</p>
                    <el-form-item>
                        <el-input placeholder="请输入缴费金额" v-model="formLabelAlign.name"></el-input>
                    </el-form-item>
                    <p>缴费优先级：</p>
                    <el-form-item>
                        <el-input placeholder="缴费优先级" v-model="formLabelAlign.name"></el-input>
                    </el-form-item>
                    <div class="div-two">
                        <el-button type="primary">点击重置</el-button>
                        <el-button type="primary">立即查询</el-button>
                    </div>
                </el-form>
            </div>
            <!-- 右侧列表 -->
            <div class="right-div">
                <!-- 列表 -->
                <div class="h3-div">
                    <h1>缴费列表</h1>
                </div>
                <div class="button-div">
                    <el-button type="primary" icon="el-icon-upload2">导出</el-button>
                </div>
                <el-table border :data="tableData" style="width: 100%">
                    <el-table-column prop="payname" label="缴费产品" width="200">
                    </el-table-column>
                    <el-table-column prop="paylevel" label="缴费人员" width="100">
                    </el-table-column>
                    <el-table-column prop="paynum" label="支付类型" width="100">
                    </el-table-column>
                    <el-table-column prop="paymoney" label="缴费金额" width="100">
                    </el-table-column>
                    <el-table-column prop="paytime" label="缴费优先级" width="200">
                    </el-table-column>
                    <el-table-column label="支付时间人" width="100">暂无
                    </el-table-column>
                    <el-table-column label="支付状态" width="100">暂无
                    </el-table-column>
                    <el-table-column label="操作">
                        <el-button type="primary" plain size="mini">查看</el-button>
                        <el-button type="primary" plain size="mini">导出</el-button>
                        <el-button type="primary" plain size="mini">删除</el-button>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <div>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="form.pageNum" :page-sizes="[10, 20, 30, 50]" :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { GetMessageData } from '@/api/house'
export default {
    data() {
        return {
            tableData: [],
            form: {
                currPage: 0,
                pageNum: 10
            },
            labelPosition: 'right',
            formInline: {
                user: '',
                region: ''
            },
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            },
            // 总条数
            total: 0,
            // 支付时间处理
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
        async getdata() {
            let res = await GetMessageData(this.form)
            this.tableData = res.data
            //   给总条数赋值
            this.total = res.total
            console.log(res);
        },
        // 分页方法
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
            this.form.pagesize = val
            this.getdata()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.form.currPage = val - 1
            this.getdata()
        },
    }
}
</script>

<style>
#message {
    width: 100%;
    height: 900px;
    background-color: #f0f0f0;
}

.message1 {
    width: 1850px;
    height: 850px;
    background-color: #ffffff;
    margin: 0 auto;
}

.left-div {
    width: 500px;
    /* height: 586px; */
    float: left;
    margin-left: 30px;
    margin-top: 30px;
    /* border: 1px solid; */
}

.right-div {
    width: 1233px;
    /* height: 615px; */
    float: right;
    margin-right: 30px;
    margin-top: 30px;
    /* border: 1px solid; */
}

.h3-div {
    width: 322px;
    height: 54px;
    float: left;
}

.button-div {
    width: 418px;
    height: 65px;
    float: right;
}

.p {
    font-size: 14px;
    line-height: 40px;
}

.div-two {
    width: 215px;
    height: 47px;
    margin: 0 auto;
}
</style>