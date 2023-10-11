<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" @click="openaddview()">添加</el-button>
            <!-- 添加用户信息 -->
            <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
                <el-form :rules="rules" ref="addformref" :model="form" label-width="80px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="form.mobile"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="adduser()">确 定</el-button>
                </span>
            </el-dialog>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column label="日期">
                    <template slot-scope="scope">
                        {{ $dayjs(scope.row.create_time * 1000).format('YYYY-MM-DD') }}
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="用户名">
                </el-table-column>
                <el-table-column prop="role_name" label="角色"> </el-table-column>
                <el-table-column prop="mobile" label="手机号"> </el-table-column>
                <el-table-column prop="email" label="邮箱"> </el-table-column>
                <!-- <el-table-column label="状态">
              <template slot-scope="scope">
                      {{ scope.row.mg_state }}
              </template>
          </el-table-column> -->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="userparams.pagenum" :page-sizes="[10, 20, 30, 50]" :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>
<script>
import { GetUsersList, AddUsers, DeleUsers } from "@/api/user";
export default {
    name: "User",
    data() {
        return {
            tableData: [],
            //   当前显示的页码
            userparams: { pagenum: 1, pagesize: 10 },
            //   总条数
            total: 0,
            //   添加弹窗的显示与隐藏
            dialogVisible: false,
            form: {},
            //   校验规则
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },

                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },

                ],

            }
        };
    },
    mounted() {
        // 获取数据
        this.getdata();
    },
    methods: {
        async getdata() {
            let res = await GetUsersList(this.userparams);
            this.tableData = res.data.users
            //   给总条数赋值
            this.total = res.data.total,
                this.userparams.pagenum = res.data.pagenum
            console.log(res);

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.userparams.pagesize = val
            this.getdata()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.userparams.pagenum = val
            this.getdata()
        },
        //   打开弹窗
        openaddview() {
            this.dialogVisible = true

        },
        //   关闭前确认
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        //   添加用户
        adduser() {
            // 前置验证
            this.$refs['addformref'].validate(async v => {
                if (v) {
                    // 向后端发送
                    let { meta, data } = await AddUsers(this.form)
                    if (meta.status == 201) {
                        // 代表成功
                        this.$message.success(meta.msg)
                        // 关闭弹窗
                        this.dialogVisible = false
                        // 请客数据
                        this.form = {}
                        // 刷新列表
                        this.getdata()
                    } else {
                        // 代表成功
                        this.$message.error(meta.msg)
                    }
                }

            })
        },
        // 删除操作
        async handleDelete(index, row) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await DeleUsers(row.id)
                if (res.meta.status != 200) return this.$message.error(res.meta.msg)

                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getdata()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });


        }
    },
}
</script>