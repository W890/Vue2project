<template>
    <div id="app2">
        <div class="num">
            <!-- 表单 -->
            <br><br><br>
            <el-form :inline="true" :model="shou" class="demo-form-inline">
                <el-form-item>
                    <el-select v-model="shou.name" placeholder="入住状态">
                        <el-option label="已入住" value="shanghai"></el-option>
                        <el-option label="未入住" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="shou.unitname" placeholder="单元名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input  placeholder="憧号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input  placeholder="房号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input  placeholder="住客姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search()">查询</el-button>
                    <el-button type="success">批量导出</el-button>
                    <el-button type="danger">批量删除</el-button>
                </el-form-item>
            </el-form>
            <!-- 列表 -->
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column align="center" type="selection" width="180"></el-table-column>
                <el-table-column type="index" label="序号" width="210"></el-table-column>
                <el-table-column prop="unitname" label="单元名称" width="180"></el-table-column>
                <el-table-column prop="" label="栋号" width="180">暂无</el-table-column>
                <el-table-column prop="" label="楼层号" width="180">暂无</el-table-column>
                <el-table-column prop="" label="房号" width="180">暂无</el-table-column>
                <el-table-column prop="" label="主科姓名" width="180">暂无</el-table-column>
                <el-table-column prop="name" label="状态" width="180">未入住</el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini">编辑</el-button>
                        <el-button size="mini" type="warning" @click="delunit(scope.row)">删除</el-button>
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
            <br><br><br>
        </div>
        <br><br><br><br>
    </div>
    <!-- <br><br><br><br> -->
</template>
<script>
import { GethouseData, Delunit, Delnum, SearchNum } from '@/api/house'
export default {
    data() {
        return {
            //   当前显示的页码
            userparams: { currPage: 0, pageNum: 10, query: '' },
            //   总条数
            total: 0,
            // 列表数据
            tableData: [],
            formInline: {
                user: '',
                region: ''
            },
            form: {
                id: '',
                token: ''
            },
            formnum: {
                ids: [],
                token: ''
            },
            shou: {
                homestatus: '',
                unitname: '',
                buildnum: '',
                homenum: '',
                homename: '',
                currPage: 0,
                pageNum: 10,
                token: '',
            }
        }
    },
    mounted() {
        this.shou.token = localStorage.getItem('token')
        this.form.token = localStorage.getItem('token')
        this.formnum.token = localStorage.getItem('token')
        this.getdata()
    },
    methods: {
        async getdata() {
            const res = await GethouseData(this.userparams)
            this.tableData = res.data;
            //   给总条数赋值
            this.total = res.total
            console.log(res);
        },
        // 删除单个
        async delunit(row) {
            this.form.id = row.id
            let res = await Delunit(this.form)
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
        // 查询
        async search() {
            console.log(this.shou);
            let res = await SearchNum(this.shou)
            console.log(res);
            this.tableData = res.data
        },
        // 删除批量
        async delunit(row) {
            this.formnum.ids = row.id
            let res = await Delnum(this.formnum)
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
        select() {

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
#app2 {
    width: 100%;
    /* height: 500px; */
    background-color: #f0f0f0;
}

.num {
    width: 1740px;
    /* height: 500px; */
    background-color: #ffffff;
    margin: 0 auto;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 35px;
}
</style>