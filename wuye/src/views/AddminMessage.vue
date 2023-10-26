<template>
    <div id="">
        <div class="feed11">
            <!-- 查询表单 -->
            <el-form ref="form" :model="form" label-width="10px" :inline="true">
                <el-form-item>
                    <el-select v-model="form.CharType" placeholder="请选择查询类型">
                        <el-option label="用户账号" value="username"></el-option>
                        <el-option label="用户名称" value="nickname"></el-option>
                        <el-option label="家庭住址" value="homeaddress"></el-option>
                        <el-option label="性别" value="sex"></el-option>
                        <el-option label="邮箱" value="email"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入查询类型" v-model="form.inputText"></el-input>
                </el-form-item>
                <el-button type="primary" @click="search()">查询</el-button>
                <el-button type="primary" @click="clear()">重置</el-button>
                <el-button type="success" @click="dialogFormVisible = true">新增</el-button>
            </el-form>
            <!-- 添加 -->
            <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
                <el-form :model="form3">
                    <el-form-item label="用户账号" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="form3.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码" show-password :label-width="formLabelWidth" prop="pass">
                        <el-input v-model="form3.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名称" :label-width="formLabelWidth" prop="name2">
                        <el-input v-model="form3.nickname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                        <el-input v-model="form3.sex" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
                        <el-select v-model="form3.type" placeholder="请选择">
                            <el-option label="管理员" value="1"></el-option>
                            <el-option label="普通用户" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="家庭住址" :label-width="formLabelWidth" prop="zhuzhi">
                        <el-input v-model="form3.homeaddress" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth" prop="emily">
                        <el-input v-model="form3.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户描述">
                        <el-input type="textarea" :rows="4" v-model="form3.note">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addlist()">确 定</el-button>
                </div>
            </el-dialog>
            <!--编辑-->
            <el-dialog title="用户信息编辑" :visible.sync="dialogFormVisible2">
                <el-form :model="form2">
                    <el-form-item label="用户账号" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="form2.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码" show-password :label-width="formLabelWidth" prop="pass">
                        <el-input v-model="form2.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名称" :label-width="formLabelWidth" prop="name2">
                        <el-input v-model="form2.nickname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                        <el-input v-model="form2.sex" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
                        <el-select v-model="form2.type" placeholder="请选择">
                            <el-option label="管理员" value="1"></el-option>
                            <el-option label="普通用户" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="家庭住址" :label-width="formLabelWidth" prop="zhuzhi">
                        <el-input v-model="form2.homeaddress" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth" prop="emily">
                        <el-input v-model="form2.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户描述">
                        <el-input type="textarea" :rows="4" v-model="form2.note">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="xz2()">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情 -->
            <el-dialog title="用户信息查看" :visible.sync="dialogFormVisible3">
                <el-form :model="form2">
                    <el-form-item :disabled="true" label="用户账号" :label-width="formLabelWidth" prop="name">
                        <el-input :disabled="true" v-model="form2.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item :disabled="true" label="用户密码" show-password :label-width="formLabelWidth" prop="pass">
                        <el-input :disabled="true" v-model="form2.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item :disabled="true" label="用户名称" :label-width="formLabelWidth" prop="name2">
                        <el-input :disabled="true" v-model="form2.nickname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item :disabled="true" label="性别" :label-width="formLabelWidth" prop="sex">
                        <el-input :disabled="true" v-model="form2.sex" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item :disabled="true" label="类型" :label-width="formLabelWidth" prop="type">
                        <el-select :disabled="true" v-model="form2.type" placeholder="请选择">
                            <el-option label="管理员" value="1"></el-option>
                            <el-option label="普通用户" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :disabled="true" label="家庭住址" :label-width="formLabelWidth" prop="zhuzhi">
                        <el-input :disabled="true" v-model="form2.homeaddress" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item :disabled="true" label="邮箱" :label-width="formLabelWidth" prop="emily">
                        <el-input :disabled="true" v-model="form2.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item :disabled="true" label="用户描述">
                        <el-input type="textarea" :rows="4" :disabled="true" v-model="form2.note">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible3 = false">关闭</el-button>
                </div>
            </el-dialog>
            <!-- 表单 -->
            <div>
                <el-table stripe :data="tableData" border style="width: 100%">
                    <el-table-column align="center" type="index" label="序号">
                    </el-table-column>
                    <el-table-column prop="username" align="center" label="用户账号">
                    </el-table-column>
                    <el-table-column align="center" prop="nickname" label="用户名称">
                    </el-table-column>
                    <el-table-column align="center" prop="sex" label="性别">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="homeaddress" label="家庭住址">
                    </el-table-column>
                    <el-table-column align="center" prop="email" label="邮箱">
                    </el-table-column>
                    <el-table-column align="center" prop="note" label="描述">
                    </el-table-column>
                    <el-table-column align="center" label="类型">
                        <template slot-scope="scope">
                            {{ scope.row.type == 1 ? '管理员' : '普通住户' }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="address" label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button type="primary" plain size="mini" @click="openaddview(scope.row)">编辑</el-button>
                            <el-button type="primary" plain size="mini" @click="setroleopen(scope.row)">详情</el-button>
                            <el-button type="primary" plain size="mini" @click="delunit(scope.row)">作废</el-button>
                        </template>
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
import { GetUsersByTypeData, Adduserdata, GetUserByTypeChar, DelUsersData } from "@/api/house";
export default {
    data() {
        return {
            // 查询验证
            form: {
                type: 1,
                inputText: '',
                CharType: '',
                pageNum: 10,
                currPage: 0,
                token: '',
            },
            // 添加验证
            form3: {
                username: '',
                password: '',
                nickname: '',
                sex: '',
                homeaddress: '',
                type: '',
                email: '',
                note: '',
                token: ''
            },
            // 删除验证
            form4: {
                u_id: '',
                token: ''
            },
            // 编辑和详情数据
            form2: {},
            // 总条数
            total: 0,
            listform: {
                type: 1,
                pageNum: 10,
                currPage: 0,
            },
            // 列表数据
            tableData: [],

            dialogFormVisible: false,
            dialogFormVisible2: false,
            dialogFormVisible3: false,
            formLabelWidth: '120px',
        };
    },
    mounted() {
        this.form3.token = localStorage.getItem('token')
        this.form.token = localStorage.getItem('token')
        this.getdata();
    },
    methods: {
        async getdata() {
            let res = await GetUsersByTypeData(this.listform);
            this.tableData = res.data;
            this.total = res.total;
            console.log(res);
        },
        // 添加
        async addlist() {
            const res = await Adduserdata(this.form3)
            console.log(res);
            this.dialogFormVisible = false
            this.getdata()
        },
        // 查询
        async search() {
            const res = await GetUserByTypeChar(this.form)
            this.tableData = res.data
            //   给总条数赋值
            this.total = res.total
            console.log(res);
        },
        // 编辑
        async xz2() {
            await gx({ u_id: this.form2.id, ...this.form2 })
            this.getdata()
            this.form2 = {}
            this.dialogFormVisible2 = false
        },
        openaddview(row) {
            console.log(row);
            this.dialogFormVisible2 = true
            this.form2 = row
        },
        // 删除
        async delunit(row) {
            this.form.u_id = row.id
            let res = await DelUsersData(this.form)
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
        // 详情
        setroleopen(row) {
            this.form2 = row
            this.dialogFormVisible3 = true
        },
        // 重置
        clear() {
            location.reload()
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
    },
};
</script>
  
<style scoped>
#feed1 {
    width: 100%;
    background-color: #f0f0f0;
}

.feed11 {
    width: 1850px;
    margin: 0 auto;
    padding-top: 15px;
    padding-left: 15px;
    background-color: #fff;
}

.el-input {
    width: 500px;
}
</style>