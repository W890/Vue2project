<template>
    <div id="type">
        <div class="type1">
            <div class="left-div">
                <h3>计费管理 / 缴费类型管理</h3>
                <!-- form格 -->
                <el-form :inline="true" :model="form2" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="form2.paymoney" placeholder="项目价格"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="form2.paystatus" placeholder="通知状态">
                            <el-option label="已通知" value="1"></el-option>
                            <el-option label="未通知" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <!-- 树型控件 -->
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>

            </div>
            <div class="right-div">
                <div class="h3-div">
                    <h3>项目收费</h3>
                </div>
                <div class="button-div">
                    <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                    <el-button type="success" icon="el-icon-plus" @click="dialogVisible = true">新增</el-button>
                    <el-button type="primary" icon="el-icon-refresh" @click="clear()">刷新</el-button>
                    <el-button type="primary" icon="el-icon-upload2">导出</el-button>
                </div>

                <!-- 添加表单 -->
                <el-dialog title="新增表单" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
                    <el-form :label-position="labelPosition" :model="form3">
                        <el-form-item labal="计费项目名称">
                            <el-input placeholder="计费项目名称" v-model="form3.payname"></el-input>
                        </el-form-item>
                        <el-form-item labal="项目优先级">
                            <el-input placeholder="项目优先级" v-model="form3.paylevel"></el-input>
                        </el-form-item>
                        <el-form-item labal="项目用量/时长">
                            <el-input placeholder="项目用量/时长" v-model="form3.paynum"></el-input>
                        </el-form-item>
                        <el-form-item labal="项目价格">
                            <el-input placeholder="项目价格" v-model="form3.paymoney"></el-input>
                        </el-form-item>
                        <el-form-item l>
                            <el-select v-model="form3.paystatus" placeholder="已通知">
                                <el-option label="未通知" value="1"></el-option>
                                <el-option label="已通知" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item labal="计费目录">
                            <el-select v-model="form3.c_id" placeholder="请选择状态">
                                <el-option label="电费目录" value="7"></el-option>
                                <el-option label="水费固定月目录" value="8"></el-option>
                                <el-option label="水费按量目录" value="9"></el-option>
                                <el-option label="天然气目录" value="10"></el-option>
                                <el-option label="物业管理费目录" value="11"></el-option>
                                <el-option label="宽带费目录" value="12"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>

                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addlist()">确 定</el-button>
                    </span>
                </el-dialog>

                <!-- :default-sort="{ prop: 'date', order: 'descending' }" -->
                <!-- 列表 -->
                <el-table border :data="tableData" style="width: 100%">
                    <el-table-column prop="payname" label="缴费项目名称">
                    </el-table-column>
                    <el-table-column prop="paylevel" label="缴费项目优先级" width="100">
                    </el-table-column>
                    <el-table-column prop="paynum" label="项目用量/时长" width="150">
                    </el-table-column>
                    <el-table-column prop="paymoney" label="项目价格" sortable width="150">
                    </el-table-column>
                    <el-table-column prop="paytime" label="创建时间" sortable width="200">
                    </el-table-column>
                    <el-table-column label="通知人" width="100">暂无
                    </el-table-column>
                    <el-table-column label="状态" width="100">暂无
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button plain size="mini">通知</el-button>
                            <el-button type="warning" plain size="mini">查看</el-button>
                            <el-button type="primary" plain size="mini" @click="delprkdata(scope.row)">作废</el-button>
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
import { GetCostData, Addcostdata, DelCostData } from '@/api/house'
export default {
    data() {
        return {
            // 显示与隐藏_增加
            dialogVisible: false,
            labelPosition: 'right',
            // 表单数据
            tableData: [],
            formInline: {
                user: '',
                region: ''
            },
            // 总条数
            total: 0,
            form: {
                c_id: 7,
                currPage: 0,
                pageNum: 9
            },
            // 查询验证
            form2: {
                c_id: 7,
                paymoney: '',
                paystatus: '',
                currPage: 0,
                pageNum: 9,
            },
            // 添加验证
            form3: {
                payname: '', //计费项目名称
                paylevel: '',//项目优先级
                paynum: '',//项目用量/时长
                paymoney: '',//项目价格
                paystatus: '',//已通知、未通知
                c_id: '',//计费目录（7-12）
                paycontent: '',
                coststatus: 2,
                token: '',
            },
            // 删除验证
            form4: {
                id: '',
                token: ''
            },
            // 树形结构数据
            data: [
                {
                    id: 1,
                    label: "缴费项目",
                    children: [{
                        id: 2, label: "电费项目",
                        children: [{ id: 7, label: "电费目录表" }]
                    },
                    {
                        id: 3,
                        label: "水费项目",
                        children: [{ id: 8, label: "水费固定月目录表" },
                        {
                            id: 9,
                            label: "水费按量计价目录表"
                        }]
                    },
                    {
                        id: 4, label: "天然气项目",
                        children: [{
                            id: 10,
                            label: "天然气目录表"
                        }]
                    },
                    {
                        id: 5, label: "物业费项目",
                        children: [{ id: 11, label: "物业费目录表" }]
                    },
                    {
                        id: 6, label: "宽带费项目",
                        children: [{ id: 12, label: "宽带费目录表" }]
                    }]
                }],

            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };


    },
    mounted() {
        this.form3.token = localStorage.getItem('token')
        this.form4.token = localStorage.getItem('token')
        this.getdata()
    },
    methods: {
        // 树形结构数据处理
        handleNodeClick(row) {
            this.form.c_id = row.id
            // this.total
            console.log(row);
            this.getdata()
        },
        onSubmit() {
            console.log('submit!');
        },
        formatter(row, column) {
            return row.address;
        },
        // 数据处理
        async getdata() {
            const res = await GetCostData(this.form)
            this.tableData = res.data
            //   给总条数赋值
            this.total = res.total
            console.log(res);
        },
        // 查询
        async search() {
            const res = await GetCostData(this.form2)
            this.tableData = res.data
            //   给总条数赋值
            this.total = res.total
            console.log(res);
        },
        // 添加
        async addlist() {
            const res = await Addcostdata(this.form3)
            console.log(res);
            this.dialogVisible = false
            this.getdata()
        },
        // 重置
        clear() {
            location.reload()
        },
        // 删除
        async delprkdata(row) {
            this.form4.id = row.id
            let res = await DelCostData(this.form4)
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
            this.form.pagesize = val
            this.getdata()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.form.currPage = val - 1
            this.getdata()
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
    }
};
</script>
<style>
#type {
    width: 100%;
    height: 900px;
    background-color: #f0f0f0;
}

.type1 {
    width: 1850px;
    height: 800px;
    background-color: #ffffff;
    margin: 0 auto;
}

.left-div {
    width: 530px;
    /* height: 586px; */
    float: left;
    margin-left: 30px;
    margin-top: 30px;
}

.right-div {
    width: 1233px;
    /* height: 615px; */
    float: right;
    margin-right: 30px;
    margin-top: 30px;
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
</style>