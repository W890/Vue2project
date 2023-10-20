<template>
  <div id="feed1">
    <div class="feed11">
      <el-form ref="form" :model="form" label-width="10px" :inline="true">
        <el-form-item>
          <el-select v-model="form.region" placeholder="请选择查询类型">
            <el-option label="用户账号" value="shanghai"></el-option>
            <el-option label="用户名称" value="beijing"></el-option>
            <el-option label="家庭住址" value="shanghai"></el-option>
            <el-option label="性别" value="beijing"></el-option>
            <el-option label="邮箱" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input placeholder="请输入查询类型" v-model="form.input"></el-input>
        </el-form-item>

        <el-button type="primary">查询</el-button>
        <el-button type="success">新增</el-button>
        <el-button type="warning">重置</el-button>
      </el-form>
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
          <el-table-column align="center" prop="address" label="类型">
          </el-table-column>
          <el-table-column align="center" prop="address" label="操作" width="300">
            <el-button type="primary" size="mini" plain icon="el-icon-share">编辑</el-button>
            <el-button type="primary" size="mini" plain icon="el-icon-edit">详细</el-button>
            <el-button type="danger" size="mini" plain icon="el-icon-delete">删除</el-button>
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
import { GetUsersByTypeData } from "@/api/house";
export default {
  data() {
    return {
      form: {},

      form2: {},
      // 总条数
      total: 0,
      listform: {
        type: 2,
        pageNum: 10,
        currPage: 0,
      },
      // 列表数据
      tableData: [],
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
    this.getdata();
  },
  methods: {
    async getdata() {
      let res = await GetUsersByTypeData(this.listform);
      this.tableData = res.data;
      this.total = res.total;
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