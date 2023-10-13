<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" @click="openaddview(true)">添加</el-button>

            <!-- 添加 -->
            <el-dialog :title="dialogtype ? '添加角色' : '修改角色'" :visible.sync="dialogVisible" width="50%"
                :before-close="handleClose">
                <el-form :rules="rules" ref="addformref" :model="form" label-width="80px">
                    <el-form-item label="角色名" prop="roleName">
                        <el-input v-model="form.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述">
                        <el-input v-model="form.roleDesc"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="adduser()">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 分配权限 -->
            <el-dialog title="分配权限" :visible.sync="rightsdialogVisible" width="50%" :before-close="handleClose">
                <el-tree :props="props" :data="rightsList" show-checkbox ref="treeref" node-key="id"
                    :default-checked-keys="openrightsList"
                    :default-expanded-keys="openrightsList"
                    @check-change="handleCheckChange">
                </el-tree>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="rightsdialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addrights()">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 列表 -->
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" label="序号"></el-table-column>

                <el-table-column prop="roleName" label="角色名"> </el-table-column>
                <el-table-column prop="roleDesc" label="角色介绍"> </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- 按钮绑定 -->
                        <el-button size="mini" @click="openaddview(false, scope.row.id)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button size="mini" type="success" @click="setrights(scope.row)">绑定权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
import {
  GetRightsList,
  GetRolesList,
  AddRoles,
  DeleRoles,
  GetOneRoles,
  EditRoles,
  Setrights
} from '@/api/roles'
export default {
  name: 'User',
  data () {
    return {
      // 查询的信息

      // 改造的
      //  true:代表添加
      dialogtype: true,
      // 改造结束
      tableData: [],
      //   添加弹窗的显示与隐藏
      dialogVisible: false,
      // 分配权限
      rightsdialogVisible: false,
      // 添加的数据
      form: {},
      props: {
        label: 'authName',
        children: 'children'
      },
      rightsList: [], // 权限列表数据
      //   校验规则
      rules: {
        roleName: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ]
      },
      // 角色id
      rolesid: '',
      // 前角色的权限数据
      openrightsList: []
    }
  },
  mounted () {
    // 获取数据
    this.getdata()
  },
  methods: {
    // 获取列表数据
    async getdata () {
      const res = await GetRolesList()
      this.tableData = res.data
      console.log(res)
    },

    //   打开弹窗
    async openaddview (type, id) {
      this.dialogtype = type
      if (!type) {
        // 修改
        const { data } = await GetOneRoles(id)
        this.form = data
      }
      this.dialogVisible = true
    },
    //   关闭前确认
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => { })
    },
    //   添加角色
    adduser () {
      // 前置验证
      this.$refs.addformref.validate(async (v) => {
        if (v) {
          // 向后端发送
          this.dialogtype ? this.adduserdata() : this.edituserdata()
        }
      })
    },
    // 添加的请求操作
    async adduserdata () {
      const { meta, data } = await AddRoles(this.form)
      if (meta.status == 201) {
        // 代表成功
        this.$message.success(meta.msg)
        this.offdialog()
      } else {
        // 代表失败
        this.$message.error(meta.msg)
      }
    },
    // 修改的请求操作
    async edituserdata () {
      this.form.id = this.form.roleId
      const { meta, data } = await EditRoles(this.form)
      if (meta.status == 200) {
        // 代表成功
        this.$message.success(meta.msg)
        this.offdialog()
      } else {
        // 代表失败
        this.$message.error(meta.msg)
      }
    },
    // 关闭弹窗
    offdialog () {
      // 关闭弹窗
      this.dialogVisible = false
      // 清空数据
      this.form = {}
      // 刷新列表
      this.getdata()
    },

    // 删除操作
    async handleDelete (index, row) {
      const type = await this.$confirm(
        '此操作将永久删除该角色, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      if (type === 'confirm') {
        const res = await DeleRoles(row.id)
        if (res.meta.status != 200) return this.$message.error(res.meta.msg)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getdata()
      }
    },
    //   绑定权限 打开权限添加
    async setrights (row) {
      // 清空原来的选中数组
      this.openrightsList = []
      // 设置全局的角色id
      this.rolesid = row.id
      // 获取当前角色的权限数据
      this.getlastid(row)
      console.log(this.openrightsList)
      // 获取所有的权限列表
      const { data } = await GetRightsList('tree')
      this.rightsList = data
      this.rightsdialogVisible = true
    },
    // 递归方法
    getlastid (obj) {
      // 判断传过来的值有没有children
      // 如果没有代表只有一级，取里面的id
      // 否则继续调用
      if (!obj.children) return this.openrightsList.push(obj.id)
      obj.children.forEach(item => {
        this.getlastid(item)
      })
    },
    handleCheckChange (e) {
      // console.log(e);
    },
    // 添加权限按钮
    async addrights () {
      const rids = [...this.$refs.treeref.getCheckedKeys(), ...this.$refs.treeref.getHalfCheckedKeys()].join(',')
      // 发起添加的请求
      const res = await Setrights({ id: this.rolesid, rids })
      if (res.meta.status != 200) return this.$message.error(res.meta.msg)
      this.$message({
        type: 'success',
        message: res.meta.msg
      })
      this.rightsdialogVisible = false
      this.getdata()
    }
  }
}
</script>
