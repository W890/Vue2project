<template>
    <div id="messages">
        <div class="messages1">
            <!-- 查询表单 -->
            <div style="margin-left: 50px;">
                <el-form ref="form" :model="form" label-width="80px" :inline="true">
                    <el-input v-model="form.inputText" style="width: 300px;" placeholder="请输入用户账号"></el-input>
                    <div class="block" style="display: inline-block;">
                        <el-date-picker v-model="value2" type="datetimerange" :picker-options="pickerOptions"
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                        </el-date-picker>
                    </div>
                    <el-form-item>
                        <el-select v-model="form.value" placeholder="请选择查询类型">
                            <el-option label="普通用户" value="2"></el-option>
                            <el-option label="管理员" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
                    <el-button type="success" icon="el-icon-plus" @click="dialogFormVisible = true">录入</el-button>
                    <el-button type="primary" icon="el-icon-refresh-right" @click="clear()">重置</el-button>
                </el-form>
            </div>
            <!-- 添加 -->
            <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
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
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addlist()">确 定</el-button>
                </div>
            </el-dialog>
            <!--编辑和详情-->
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
                    <el-button type="primary">确 定</el-button>
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
            <!-- 列表 -->
            <div>
                <el-table stripe :data="tableData" border style="width: 100%">
                    <el-table-column align="center" type="index" label="序号">
                    </el-table-column>
                    <el-table-column prop="username" align="center" label="用户账号">
                    </el-table-column>
                    <el-table-column align="center" prop="sex" label="性别">
                    </el-table-column>
                    <el-table-column align="center" prop="homeaddress" label="家庭住址">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="center" prop="parkname" label="邮箱">
                    </el-table-column>
                    <el-table-column align="center" prop="createtime" label="创建时间">
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
                            <el-button size="mini" @click="openaddview(scope.row)">复制</el-button>
                            <el-button size="mini" type="primary" @click="setroleopen(scope.row)">详情</el-button>
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
import { GetUsersData, GetUserdata, Adduserdata } from "@/api/house";
export default {
    data() {
        return {
            // 查询验证
            form: {
                inputText: '',
                value: '',
                startDate: '',
                endDate: '',
                pageNum: 10,
                currPage: 0,
                token: ''
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
            // 复制跟详情
            form2: {},
            // 总条数
            total: 0,
            formInline: {
                user: '',
                region: ''
            },
            listform: {
                pageNum: 10,
                currPage: 0
            },
            // 列表数据
            tableData: [],
            dialogFormVisible: false,
            dialogFormVisible2: false,
            dialogFormVisible3: false,
            formLabelWidth: '120px',
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            },
            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            value2: "",
        };
    },
    mounted() {
        this.form.token = localStorage.getItem('token')
        this.form3.token = localStorage.getItem('token')
        this.getdata();
    },
    methods: {
        async getdata() {
            let res = await GetUsersData(this.listform);
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
            const res = await GetUserdata(this.form)
            this.tableData = res.data
            //   给总条数赋值
            this.total = res.total
            console.log(res);
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
        onSubmit() {
            console.log('submit!');
        },
        openaddview(row) {
            console.log(row);
            this.dialogFormVisible2 = true
            this.form2 = row
        },
        setroleopen(row) {
            this.form2 = row
            this.dialogFormVisible3 = true

        },
    },
};
</script>
  
<style scoped>
#messages {
    width: 100%;
    background-color: #f0f0f0;
}

.messages1 {
    width: 1850px;
    margin: 0 auto;
    padding-top: 15px;
    padding-left: 15px;
    background-color: #fff;
}

.el-input {
    width: 500px;
}

.form-div {
    float: left;
    margin-left: 20px;
    margin-right: 20px;
}
</style>