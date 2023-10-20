<template>
  <div id="back1">
    <br>
    <div class="back11">
      <br>
      <div class="feedbox">
        <el-form ref="form" :model="form" label-width="10px" :inline="true">
          <el-form-item>
            <el-input placeholder="反馈人" v-model="form.input"></el-input>
          </el-form-item>

          <el-form-item>
            <el-input placeholder="反馈内容" v-model="form.input"></el-input>
          </el-form-item>

          <el-date-picker v-model="value2" type="datetimerange" :picker-options="pickerOptions" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>

          <div>
            <el-form-item>
              <el-input placeholder="反馈回复" v-model="form.input"></el-input>
            </el-form-item>

            <el-form-item>
              <el-input placeholder="反馈状态" v-model="form.input"></el-input>
            </el-form-item>

            <el-button type="primary">搜索</el-button>
            <el-button type="warning">重置</el-button>
            <el-button type="danger">批量删除</el-button>
            <el-button type="success">批量导出</el-button>
          </div>
        </el-form>
        <div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column align="center" type="selection"> </el-table-column>
            <el-table-column prop="date" align="center" label="反馈人" width="180">
            </el-table-column>
            <el-table-column align="center" prop="name" label="反馈内容" width="180">
            </el-table-column>
            <el-table-column align="center" prop="address" label="反馈时间" width="200"> </el-table-column>
            <el-table-column align="center" prop="address" label="服务内容" width="400"> </el-table-column>
            <el-table-column align="center" prop="address" label="处理状态" width="180"> </el-table-column>
            <el-table-column align="center" prop="address" label="服务评分" width="200"></el-table-column>
            <el-table-column align="center" prop="address" label="操作" width="300"> </el-table-column>

          </el-table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      form2: {},
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
};
</script>

<style scoped>
#back1 {
  width: 100%;
  height: 382px;
  background-color: #f0f0f0;

}

.back11 {
  width: 1850px;
  height: 342px;
  background-color: #ffffff;
  margin: 0 auto;
}

.feedbox {
  padding-top: 15px;
  padding-left: 15px;
  background-color: #fff;
}

.el-input {
  width: 500px;
}
</style>