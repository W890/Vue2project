<template>
    <div id="pack">
        <div class="pack1">
            <!-- 左侧表单 -->
            <div class="left-div">
                <div style="margin: 20px;"></div>
                <el-form :label-position="labelPosition" :model="form1">
                    <p>车位名：</p>
                    <el-form-item>
                        <el-input placeholder="请输入车位名" v-model="form1.parkname"></el-input>
                    </el-form-item>
                    <p>车位金额：</p>
                    <el-form-item>
                        <el-input placeholder="请输入车位金额" v-model="form1.parkpay"></el-input>
                    </el-form-item>
                    <p>车位类型</p>
                    <el-form-item style="width: 200%;">
                        <el-select v-model="form1.parktype" placeholder="请选择车位类型">
                            <el-option label="地下" value="1"></el-option>
                            <el-option label="地上" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <p>车位状态</p>
                    <el-form-item>
                        <el-select v-model="form1.parkstatus" placeholder="请选择车位状态">
                            <el-option label="已有车" value="1"></el-option>
                            <el-option label="未有车" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button @click="search()" type="primary">查询</el-button>
                    <el-button @click="clear()" type="primary">重置</el-button>
                </el-form>
            </div>
            <!-- 右侧表单 -->
            <div class="right-div">
                <div style="float: left;">
                    <h2>车位列表</h2>
                </div>
                <div style="float: right;"><el-button type="success" @click="dialogVisible = true">新增</el-button></div>
                <!-- 添加表单 -->
                <el-dialog title="新增车位" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                    <el-form :label-position="labelPosition" :model="form2">
                        <p>车位名：</p>
                        <el-form-item>
                            <el-input placeholder="请输入车位名" v-model="form2.parkname"></el-input>
                        </el-form-item>
                        <p>车位金额：</p>
                        <el-form-item>
                            <el-input placeholder="请输入车位金额" v-model="form2.parkpay"></el-input>
                        </el-form-item>
                        <p>车位类型</p>
                        <el-form-item style="width: 200%;">
                            <el-select v-model="form2.parktype" placeholder="请选择车位类型">
                                <el-option label="地下" value="1"></el-option>
                                <el-option label="地上" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <p>车位状态</p>
                        <el-form-item>
                            <el-select v-model="form2.parkstatus" placeholder="请选择车位状态">
                                <el-option label="已有车" value="1"></el-option>
                                <el-option label="未有车" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>

                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="adddata()">确 定</el-button>
                    </span>
                </el-dialog>
                <!-- 分配车位 -->
                <el-dialog title="提示" :visible.sync="dialogVisible1" width="40%" :before-close="handleClose">

                    <el-table :data="fenpeidata" tooltip-effect="dark" style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column type="index" label="序号" width="120">
                        </el-table-column>
                        <el-table-column prop="nickname" label="用户账号" width="120">
                        </el-table-column>
                        <el-table-column prop="homeaddress" label="家庭住址" width="120">
                        </el-table-column>
                        <el-table-column label="类型" width="120">管理员
                        </el-table-column>
                        <el-table-column prop="parkname" label="车位" show-overflow-tooltip>
                        </el-table-column>
                    </el-table>

                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible1 = false">取 消</el-button>
                        <el-button type="primary" @click="fenpei()">确 定</el-button>
                    </span>
                </el-dialog>

                <!--编辑-->
                <el-dialog title="用户信息编辑" :visible.sync="dialogFormVisible3">
                    <el-form :model="form4">
                        <el-form-item label="车位名称" :label-width="formLabelWidth" prop="name">
                            <el-input v-model="form4.parkname" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="车位金额" show-password :label-width="formLabelWidth" prop="pass">
                            <el-input v-model="form4.parkpay" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible3 = false">确 定</el-button>
                    </div>
                </el-dialog>

                <!-- 列表 -->
                <el-table border :data="tableData" style="width: 100%">
                    <el-table-column type="index" width="150" label="序号" :formatter="formatter">
                    </el-table-column>
                    <el-table-column prop="parkname" label="车位名称" sortable width="180">
                    </el-table-column>
                    <el-table-column prop="parkpay" label="车位金额" sortable width="180">
                    </el-table-column>
                    <el-table-column label="车位类型" width="250">
                        <template slot-scope="scope">
                            <el-tooltip :content="'parktype: ' + scope.row.parktype" placement="top">
                                <el-switch v-model="scope.row.parktype" inactive-text="地上" active-text="地下"
                                    :active-value="1" :inactive-value="2" @change="asd(scope.row)">
                                </el-switch>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column label="车位状态" width="250">
                        <template slot-scope="scope">
                            <el-tooltip :content="'parkstatus: ' + scope.row.parkstatus" placement="top">
                                <el-switch v-model="scope.row.parkstatus" inactive-text="未有车" active-text="已有车"
                                    :active-value="1" :inactive-value="2" @change="asd(scope.row)">
                                </el-switch>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="parkpay" label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="dialogVisible1 = true">分配车位</el-button>
                            <el-button size="mini" type="danger" @click="setroleopen(scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="delprkdata(scope.row)">移除</el-button>
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
import { Parkdata, Addparkdata, DelparkData, GetUsersData } from '@/api/house'
export default {

    data() {
        return {
            // 显示与隐藏
            dialogVisible: false,
            dialogVisible1: false,
            dialogFormVisible3:false,
            //   总条数
            total: 0,
            labelPosition: 'right',
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            },
            formInline: {
                user: '',
                region: ''
            },
            // 编辑
            formt:{},
            // 表单验证
            form: {
                currPage: 0,
                pageNum: 9,
            },
            // 查询验证
            form1: {
                parkname: '',
                parkpay: '',
                parktype: '',
                parkstatus: '',
                currPage: 0,
                pageNum: 9,
            },
            // 添加验证
            form2: {
                parkname: '',
                parkpay: '',
                parktype: '',
                parkstatus: '',
                token: ''
            },
            // 删除验证
            form3: {
                id: '',
                token: '',
            },
            // 分配车位
            form4: {
                currPage: 0,
                pageNum: 10
            },
            fenpeidata: [],
            tableData: [],
            value1: true,
        };
    },
    mounted() {
        this.form2.token = localStorage.getItem('token')
        this.form3.token = localStorage.getItem('token')
        this.getdata()
        this.fenpei()
    },
    methods: {
        formatter(row, column) {
            return row.address;
        },
        async getdata() {
            let res = await Parkdata(this.form)
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
        // 查询
        async search() {
            console.log(this.shou);
            let res = await Parkdata(this.form1)
            console.log(res);
            this.tableData = res.data
        },
        // 添加
        async adddata() {
            let res = await Addparkdata(this.form2)
            console.log(res);
            this.dialogVisible = false
            this.getdata()
        },
        // 分配车位
        async fenpei() {
            let res = await GetUsersData(this.form4)
            console.log(res);
            this.fenpeidata = res.data
            this.dialogVisible1 = false
        },
        // 删除
        async delprkdata(row) {
            this.form3.id = row.id
            let res = await DelparkData(this.form3)
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
        // 重置
        clear() {
            location.reload()
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
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
}
</script>

<style>
#pack {
    width: 100%;
    height: 900px;
    background-color: #f0f0f0;
}

.pack1 {
    width: 1800px;
    height: 800px;
    background-color: #ffffff;
    margin: 0 auto;
}

.left-div {
    width: 392px;
    height: 535px;
    float: left;
    margin-left: 30px;
    margin-top: 40px;
}

.right-div {
    width: 1325px;
    height: 510px;
    float: right;
    margin-right: 30px;
    margin-top: 40px;
}
</style>