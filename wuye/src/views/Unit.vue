<template>
    <div id="unit">
        <div class="app">
            <!-- 查询表单 -->
            <div>
                <el-form ref="form" :model="form">
                    <el-form-item>
                        <div style="float: left;">
                            <el-input style="width: 50%;" placeholder="小区名称" v-model="shou.communityname"></el-input>
                            <el-input style="width: 50%;" placeholder="单元名称" v-model="shou.unitname"></el-input>
                        </div>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="建设时间" v-model="shou.createDt"
                                style="width: 20%;"></el-date-picker>
                        </el-col>
                        <el-select v-model="shou.value" placeholder="选择状态">
                            <el-option label="已建成" value="shanghai"></el-option>
                            <el-option label="未建成" value="beijing"></el-option>
                        </el-select>
                        <el-button type="primary" @click="search()">查询</el-button>
                        <el-button type="success" @click="goto()">录入</el-button>
                        <el-button type="primary" @click="clear()">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 详情页面 -->
            <el-dialog title="单元详情" :visible.sync="dialogFormVisible2" width="100%">
                <el-form :model="xiang">
                    <el-form-item label="小区名称："><span> {{ xiang.communityname }}</span>
                    </el-form-item>
                    <el-form-item label="单元名称："><span> {{ xiang.unitname }}</span>
                    </el-form-item>
                    <el-form-item label="栋数："><span> {{ xiang.unitnum }}</span>
                    </el-form-item>
                    <el-form-item label="状态:"><span v-if="xiang.unitstatus == 1">已建成</span><span
                            v-if="xiang.unitstatus == 2">未建成</span>
                    </el-form-item>
                    <el-form-item label="咨询问候：">
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible2 = false">返回</el-button>
                    <el-button type="primary" @click="xiangqing()">编辑</el-button>
                </div>
            </el-dialog>

            <!-- 列表 -->
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="communityname" label="小区名称" width="320">
                </el-table-column>
                <el-table-column prop="unitname" label="单元名称" width="320">
                </el-table-column>
                <el-table-column prop="unitnum" label="栋数" width="320">
                </el-table-column>
                <el-table-column prop="createtime" label="建设时间" width="320">
                </el-table-column>
                <el-table-column label="状态" width="320">已建成
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                        <el-button size="mini" type="danger" @click="delunit(scope.row)">归档</el-button>
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
        </div>

    </div>
</template>
<script>
import { GethouseData, Delunit, Searchunit } from '@/api/house'
export default {
    data() {
        return {
            // 详情页隐藏与显示
            dialogFormVisible2: false,
            // 详情页数据
            xiang: {},
            //   当前显示的页码
            userparams: { currPage: 0, pageNum: 10, query: '' },
            //   总条数
            total: 0,
            // 列表数据
            tableData: [],
            tableData1:[],
            form: {
                id: '',
                token: ''
            },
            shou: {
                communityname: '',
                unitname: '',
                createDt: '',
                value: '',
                token: '',
                currPage: 1,
                pageNum: 10
            },
            
        }
    },
    mounted() {
        this.form.token = localStorage.getItem('token')
        this.shou.token = localStorage.getItem('token')
        this.getdata()
    },
    methods: {
        // 数据列表
        async getdata() {
            const res = await GethouseData(this.userparams)
            this.tableData = res.data;
            //   给总条数赋值
            this.total = res.total
            // 给id赋值
            this.form.id = res.data.id
            console.log(res);

        },
        // 删除
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
        // 详情
        handleEdit(index, row) {
            console.log(index, row);
            this.dialogFormVisible2 = true
            this.xiang = row
        },
        // 删除(id)
        handleDelete(index, row) {
            console.log(index, row);
        },
        // 查询
        async search() {
            console.log(this.shou);
            let res = await Searchunit(this.shou)
            console.log(res);
            this.tableData = res.data
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
        // 页面跳转
        goto() {
            this.$router.push('/house/add')
        },
        // 重置
        clear() {
            location.reload()
        }
    }
}
</script>

<style>
#unit {
    width: 100%;
    height: 768px;
    background-color: #f0f0f0;
}

.app {
    width: 1824px;
    height: 696px;
    background-color: #ffffff;
    margin: 0 auto;
    padding: 30px 30px 30px 30px;
}
</style>