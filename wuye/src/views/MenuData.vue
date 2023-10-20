<template>
    <div id="menu">
        <br>
        <div class="menu">
            <br>
            <el-tabs type="border-card">
                <!-- 表一 -->
                <el-tab-pane label="菜单列表">
                    <el-table :data="tableData" align="center" style="width: 100%">
                        <el-table-column type="index" label="编码" width="150"></el-table-column>
                        <el-table-column prop="title" label="菜单名称" width="400"></el-table-column>
                        <el-table-column label="菜单级别" width="400">一级</el-table-column>
                        <el-table-column prop="desc" label="菜单描述" width="400"></el-table-column>
                        <el-table-column label="操作">
                            <el-button type="primary" plain size="mini">查看下一级</el-button>
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
import { GetMenuData } from '@/api/house'
export default {
    data() {
        return {
            // 表单1数据
            tableData: [],
            //   当前显示的页码
            userparams: {
                prentId: 0,
                currPage: 0,
                pageNum: 10
            },
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
        this.getdata()
    },
    methods: {
        // 数据列表
        async getdata() {
            const res = await GetMenuData(this.userparams)
            this.tableData = res.data;
            //   给总条数赋值
            this.total = res.total
            console.log(res);
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
#menu {
    width: 100%;
    height: 700px;
    background-color: #f0f0f0;

}

.menu {
    width: 1800px;
    /* height: 750px; */
    background-color: #ffffff;
    margin: 0 auto;
}

.form-div {
    float: left;
    margin-left: 20px;
    margin-right: 20px;
}
</style>