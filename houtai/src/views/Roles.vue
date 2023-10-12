<template>
    <div>
        <!-- 添加角色表单 -->
        <el-button type="primary" @click="openaddview()">添加角色</el-button>
        <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            
            <el-form :rules="rules" ref="addformref" :model="form" label-width="80px">
                <el-form-item label="用户角色" prop="rolename">
                    <el-input  v-model="form.rolename"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="form.roledesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addrolesdata()">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 表单部分 -->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" label="" width="180">
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="180">
            </el-table-column>
            <el-table-column prop="roleDesc" label="角色描述">
            </el-table-column>
            <el-table-column prop="address" label="操作">
                <el-button type="primary">编辑</el-button>
                <el-button type="danger">删除</el-button>
            </el-table-column>
        </el-table>

    </div>
</template>
<script>
import { GetRolesList, AddRolesList } from "@/api/roles"
export default {
    name: 'Roles',
    data() {
        return {
            //  true:代表添加
            dialogtype: true,
            form: {},
            tableData: [], //角色数据
            dialogVisible: false, //添加角色表单的隐藏与显示

            //   校验规则
            rules: {
                rolename: [
                    { required: true, message: "请输入角色名", trigger: "blur" },
                ],
            },
        }
    },

    mounted() {
        this.getdata()
    },

    methods: {
        // 获取角色数据
        async getdata() {
            let res = await GetRolesList();
            this.tableData = res.data
            console.log(res);
        },

        // 添加角色的操作
        addrolesdata() {
            // 前置验证
            this.$refs["addformref"].validate(async (v) => {
                if (v) {
                    // 向后端发送
                    let { meta, data } = await AddRolesList(this.form);
                    if (meta.status == 201) {
                        // 代表成功
                        this.$message.success(meta.msg);
                        // 关闭弹窗
                        this.dialogVisible = false;
                        // 请求数据
                        this.form = {};
                        // 刷新列表
                        this.getdata();
                    } else {
                        // 代表成功
                        this.$message.error(meta.msg);
                    }
                }
            });
        },
        //   打开弹窗
        openaddview() {
            this.dialogVisible = true;
        },

        // 添加角色表单关闭验证
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
    }
}





</script>