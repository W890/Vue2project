<template>
    <div id="post11">
        <div class="post111">
            <br>
            <!-- 查询表单 -->
            <div style="margin-left: 50px;">
                <el-form :inline="true" :model="form" class="demo-form-inline">
                    <div class="form-div">
                        <el-form-item>
                            <el-input v-model="form.communityname" placeholder="请输入发布小区"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form-div">
                        <el-form-item>
                            <el-input v-model="form.title" placeholder="请输入公告主题"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form-div">
                        <el-form-item>
                            <el-input v-model="form.content" placeholder="请输入发布内容"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="success" @click="addlist()">发布公告</el-button>
                        <el-button type="primary" @click="clear()">点击重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <!-- 查看详情 -->
            <el-dialog title="公告详情" :visible.sync="dialogFormVisible3">
                <el-form :model="tableData2">
                    <el-form-item :disabled="true" label="小区名称" :label-width="formLabelWidth" prop="name">
                        <el-input :disabled="true" v-model="tableData2.communityname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item :disabled="true" label="发布时间" :label-width="formLabelWidth" prop="name">
                        <el-date-picker v-model="tableData2.createtime" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item :disabled="true" label="公告主题" :label-width="formLabelWidth" prop="name">
                        <el-input :disabled="true" v-model="tableData2.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item :disabled="true" label="公告内容">
                        <el-input type="textarea" :rows="4" :disabled="true" v-model="tableData2.content">
                        </el-input>
                    </el-form-item>
                    <el-form-item :disabled="true" label="公告状态" :label-width="formLabelWidth" prop="name">
                        <el-button disabled>阅读量</el-button>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible3 = false">关闭</el-button>
                </div>
            </el-dialog>

            <el-tabs type="border-card">
                <!-- 表一 -->
                <el-tab-pane label="智能设备">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column type="index" label="序号" width="100"></el-table-column>
                        <el-table-column prop="title" label="公告主题" width="325"></el-table-column>
                        <el-table-column prop="content" label="公告内容" width="650"></el-table-column>
                        <el-table-column prop="createtime" label="发布时间" sortable width="325"></el-table-column>
                        <el-table-column prop="communityname" label="小区名称" width="160"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="delprkdata(scope.row)">归档</el-button>
                                <el-button size="mini" type="primary" @click="setroleopen(scope.row)">查看公告</el-button>
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
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import { GetPostData, AddPoster, DelPoster } from '@/api/house'
export default {
    data() {
        return {
            // 添加验证
            form: {
                communityname: '',
                title: '',
                content: '',
                token: ''
            },
            // 删除验证
            form1: {
                p_id: '',
                token: ''
            },
            // 表单1数据
            tableData: [],
            // 查看更多数据/显示与隐藏
            tableData2: [],
            dialogFormVisible3:false,
            formLabelWidth: '120px',
            //   当前显示的页码
            userparams: { currPage: 0, pageNum: 10 },
            valuetype: true,
            valuetype2: false,
            //   总条数
            total: 0,
            formInline: {
                user: '',
                region: ''
            },
        }
    },
    mounted() {
        this.form.token = localStorage.getItem('token')
        this.form1.token = localStorage.getItem('token')
        this.getdata()
    },
    methods: {
        // 数据列表
        async getdata() {
            const res = await GetPostData(this.userparams)
            this.tableData = res.data;
            //   给总条数赋值
            this.total = res.total
            console.log(res);
        },
        // 添加
        async addlist() {
            const res = await AddPoster(this.form)
            console.log(res);
            this.dialogVisible = false
            this.getdata()
        },
        // 删除
        async delprkdata(row) {
            this.form1.p_id = row.p_id
            let res = await DelPoster(this.form1)

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
        // 查看公告
        setroleopen(row) {
            console.log(row);
            this.tableData2 = row
            this.dialogFormVisible3 = true
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
        // 重置
        clear() {
            location.reload()
        },
    }
}
</script>
<style>
#post11 {
    width: 100%;
    height: 800px;
    background-color: #f0f0f0;

}

.post111 {
    width: 1800px;
    height: 750px;
    background-color: #ffffff;
    margin: 0 auto;
}

.form-div {
    float: left;
    margin-left: 20px;
    margin-right: 20px;
}
</style>