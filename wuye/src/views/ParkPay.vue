<template>
    <div id="pay">
        <div class="pay1">
            <!-- 表单 -->
            <br><br><br>
            <div style="width: 1000px; height: 51px; margin: 0 auto;">
                <el-form :inline="true" :model="form2" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="form2.parkname" placeholder="单元名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form2.orderstatus" placeholder="憧号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="form2.orderpay" placeholder="入住状态">
                            <el-option label="已入住" value="1"></el-option>
                            <el-option label="未入住" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search()">查询</el-button>
                        <el-button type="success">全部导出</el-button>
                        <el-button type="primary" @click="clear()">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <!-- 通知缴费与缴费详情 -->
            <!-- 1111111111111111 -->
            <el-dialog title="车位订单通知/详情" :visible.sync="dialogFormVisible3">
                <el-form :model="form4">
                    <div class="block">
                        <p>开始时间</p>
                        <el-date-picker label="开始时间" v-model="value1" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="block">
                        <p>结束时间</p>
                        <el-date-picker label="结束时间" v-model="value1" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <el-form-item label="应缴金额" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="form4.parkpay" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="通知缴费" show-password :label-width="formLabelWidth" prop="pass">
                        <el-input v-model="form4.parkname" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible3 = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 222222222222222222222 -->
            <!-- 列表 -->
            <div style="width: 1425px; height: 680px; margin: 0 auto;">
                <el-table border :data="tableData" style="width: 100%">
                    <el-table-column type="index" label="序号" width="150"></el-table-column>
                    <el-table-column prop="parkname" label="车位名称" width="150"></el-table-column>
                    <el-table-column prop="parkpay" label="车位金额" width="150"></el-table-column>
                    <el-table-column label="开始时间" width="180">2023.10.16</el-table-column>
                    <el-table-column label="结束时间" width="180">2023.10.26</el-table-column>
                    <el-table-column label="应缴金额" width="150">暂无</el-table-column>
                    <el-table-column label="缴费状态" width="200">
                        <template slot-scope="scope">
                            <el-switch active-color="#389af9" inactive-color="#dcdfe6" v-model="scope.row.orderstatus"
                                :active-value="1" :inactive-value="2" active-text="已缴费" inactive-text="未缴费">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button size="mini" plain @click="setroleopen(scope.row)">通知缴费</el-button>
                            <el-button size="mini" type="info" plain @click="setroleopen(scope.row)">缴费详情</el-button>
                        </template>
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
import { Parkdata, Getparkorder } from '@/api/house'
export default {
    data() {
        return {
            tableData: [],
            //   总条数
            total: 0,
            dialogFormVisible3:false,
            // 表单验证
            form: {
                currPage: 0,
                pageNum: 9,
            },
            // 查询验证
            form2: {
                parkname: '',
                orderstatus: '',
                orderpay: '',
                pageNum: 10,
                currPage: 0,
            },
            // 112121212121
            form4:{},
            formInline: {
                user: '',
                region: ''
            },
            value: 'true',
            value1: '',
            value2: '',
        }
    },
    mounted() {
        this.getdata()
    },
    methods: {
        async getdata() {
            let res = await Parkdata(this.form)
            this.tableData = res.data
            //   给总条数赋值
            this.total = res.total
            console.log(res);
        },
        // 查询
        async search() {
            let res = await Getparkorder(this.form2)
            this.tableData = res.data
            //   给总条数赋值
            this.total = res.total
            console.log(res);
        },
        // 详情
        setroleopen(row) {
            this.form4 = row
            this.dialogFormVisible3 = true
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
        // 重置
        clear() {
            location.reload()
        }
    }
}
</script>
<style>
#pay {
    width: 100%;
    height: 900px;
    background-color: #f0f0f0;
}

.pay1 {
    width: 1800px;
    height: 850px;
    background-color: #ffffff;
    margin: 0 auto;
}
</style>