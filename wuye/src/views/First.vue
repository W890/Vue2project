<template>
  <div class="first">
    <!-- 垂直滚动消息提升条 -->
    <van-notice-bar left-icon="volume-o" :scrollable="false" background="#ffffff" color="blue">
      <van-swipe vertical class="notice-swipe" :autoplay="2000" :show-indicators="false">
        <span>最新公告</span>
        <van-swipe-item v-for="item in postdata" :key="item.p_id">
          <span class="tishi-span1">{{ item.communityname }}</span>
          <span class="tishi-span2">{{ item.content }}</span>
          <span class="tishi-span3">{{ item.createtime }}</span>
          <span class="tishi-span4">更多</span>
        </van-swipe-item>
      </van-swipe>
    </van-notice-bar>
    <!-- 下方块 -->
    <div class="block-div">
      <!-- 上四条 -->
      <div class="four-div">
        <div class="div1">
          <i class="el-icon-s-custom"></i>
          <div>
            <p class="kuai-p1">666</p>
            <p>系统用户数</p>
          </div>
        </div>
        <div class="div1">
          <i class="el-icon-document"></i>
          <div>
            <p class="kuai-p1">666</p>
            <p>计费订单数量</p>
          </div>
        </div>
        <div class="div1">
          <i class="el-icon-truck"></i>
          <div>
            <p class="kuai-p1">666</p>
            <p>车位总量</p>
          </div>
        </div>
        <div class="div1">
          <i class="el-icon-edit-outline"></i>
          <div>
            <p class="kuai-p1">666</p>
            <p>用户反馈数量</p>
          </div>
        </div>
      </div>
      <!-- 中三条 -->
      <div class="four-div">
        <div class="div2">
          <el-card class="box-card">
            <div ref="reportsref" style="width: 100%; height: 290px;"></div>
          </el-card>
        </div>
        <div class="div2">
          <el-card class="box-card">
            <div ref="reportsref2" style="width: 100%; height: 290px"></div>
          </el-card>
        </div>
        <div class="div2">
          <el-card class="box-card">
            <div ref="reportsref3" style="width: 100%; height: 290px"></div>
          </el-card>
        </div>
      </div>
      <!-- 下二条 -->
      <div class="four-div">
        <div class="div3">
          <el-card class="box-card" style="width: 100%">
            <div ref="reportsref4" style="width: 100%; height: 290px"></div>
          </el-card>
        </div>
        <div class="div4">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="repaircontent" label="维修内容" width="180">
            </el-table-column>
            <el-table-column prop="createtime" label="报修时间" width="180">
            </el-table-column>
            <el-table-column label="地址">已维修</el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
import { GetPosterData, GetRepairData } from '@/api/user'

export default {
  name: 'First',
  data() {
    return {
      tableData: [],
      repairlist: {
        currPage: 0,
        pageNum: 4,
      },
      // myChart2: null,
      // 提示栏数据
      postdata: [],
      // 提示栏验证
      list: {
        currPage: 0,
        pageNum: 100
      },
      myChart: {},
      myChart2: {},
      myChart3: {},
      myChart4: {},
    }
  },
  mounted() {
    this.getdata()
    this.repairData()
    this.init();
    this.init2();
    this.init3();
    this.init4();
  },
  methods: {
    // 列表
    async repairData() {
      let res = await GetRepairData(this.repairlist);
      this.tableData = res.data;
      console.log(res);
    },
    // 获取列表数据
    async getdata() {
      let res = await GetPosterData(this.list)
      this.postdata = res.data
      console.log(res)
    },
    // 分页方法
    handleCurrentChange(val) {
      console.log(val);
      this.repairlist.currPage = val - 1;
      this.repairData();
    },

    init() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(this.$refs.reportsref);
      let options = {
        title: {
          text: "小区分布统计",
          left: "center",
        },

        color: ["#d8ecff", "#b0f5aa", "#339dff", "#f5de6c"],
        legend: {
          orient: "vertical",
          left: 10,
          top: 0,
        },
        series: [
          {
            type: "pie",
            data: [
              { value: 0, name: "A区0幢" },
              { value: 0, name: "B区0幢" },
              { value: 0, name: "C区0幢" },
              { value: 0, name: "D区0幢" },
            ],
          },
        ],
      };
      this.myChart.setOption(options);
      let that = this.myChart;
      window.addEventListener("resize", function (params) {
        that.resize();
      });
    },
    init2() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart2 = echarts.init(this.$refs.reportsref2);
      let options = {
        title: {
          text: "车位数/已分配辆/已缴费",
        },
        tooltip: {},
        xAxis: {
          data: ["A区车位", "B区车位", "C区车位", "D区车位"],
        },
        yAxis: {},
        legend: {
          orient: "horizontal",
          right: 10,
        },
        series: [
          {
            name: "车位数",
            type: "bar",
            color: "#5470c6",
            data: [12, 0, 0, 9],
          },
          {
            name: "已分配辆",
            type: "bar",
            color: "#91cc75",
            data: [6, 0, 0, 4],
          },
          {
            name: "已缴费",
            type: "bar",
            color: "#ddb7fa",
            data: [0, 0, 0, 0],
          },
        ],
      };
      this.myChart2.setOption(options);
      let that = this.myChart2;
      window.addEventListener("resize", function (params) {
        that.resize();
      });
    },
    init3() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart3 = echarts.init(this.$refs.reportsref3);
      let options = {
        title: {
          text: "缴费项目订单",
          right: 0,
        },
        color: ["#109eff"],
        legend: {
          left: "0",
          data: ["计费项目"],
        },
        radar: [
          {
            indicator: [
              { text: "电费单", max: 11 },
              { text: "宽带费单", max: 11 },
              { text: "物业费单", max: 11 },
              { text: "天然气单", max: 11 },
              { text: "水费按量单", max: 11 },
              { text: "水费固定月单", max: 11 },
            ],
            center: ["50%", "50%"],
            radius: 80,
          },
        ],
        series: [
          {
            type: "radar",
            tooltip: {
              trigger: "item",
            },
            areaStyle: {},
            data: [
              {
                value: [15, 17, 10, 5, 8, 7],
                name: "计费项目",
              },
            ],
          },
        ],
      };
      this.myChart3.setOption(options);
      let that = this.myChart3;
      window.addEventListener("resize", function (params) {
        that.resize();
      });
    },
    init4() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart4 = echarts.init(this.$refs.reportsref4);
      let options = {
        title: {
          text: "当月用户访问情况",
        },
        tooltip: {},
        xAxis: {
          data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
        },
        yAxis: {},
        legend: {
          orient: "horizontal",
          top: 0,
        },
        series: [
          {
            name: "用户访问量",
            type: "line",
            color: "#19d4ae",
            data: [0, 190, 165, 120, 168, 107, 153, 388, 177, 244],
            smooth: true,
          },
        ],
      };
      this.myChart4.setOption(options);
      let that = this.myChart4;
      window.addEventListener("resize", function (params) {
        that.resize();
      });
    },


  }
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.notice-swipe {
  height: 40px;
  line-height: 40px;
}

.block-div {
  width: 100%;
  height: 800px;
  background-color: #efefef;
  /* padding: 10px 10px 10px 10px; */
  padding-top: 10px;
  padding-bottom: 10px;
}

.four-div {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  margin-bottom: 15px;
}

.div1 {
  width: 462px;
  height: 112px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.three-div {
  display: flex;
}

.div2 {
  width: 612px;
  height: 332px;
  background-color: #ffffff;
}

.two-div {
  display: flex;
}

.div3 {
  width: 1355px;
  height: 332px;
  background-color: #ffffff;
}

.div4 {
  width: 496px;
  height: 332px;
  background-color: #ffffff;
}

.el-icon-s-custom {
  font-size: 90px;
  color: #389af9;
  float: left;
}

.el-icon-document {
  font-size: 90px;
  color: #aee86a;
  float: left;
}

.el-icon-truck {
  font-size: 90px;
  color: #f2b90e;
  float: left;
}

.kuai-p1 {
  font-weight: 800;
  font-size: 26px;
}

.el-icon-edit-outline {
  font-size: 90px;
  color: #b28b7c;
  float: left;
}
.tishi-span1 {
  margin-left: 100px;
}

.tishi-span2 {
  margin-left: 250px;
}

.tishi-span3 {
  margin-left: 600px;
}

.tishi-span4 {
  margin-left: 20px;
  color: #4995f7;
  font-size: 800;
}
</style>
