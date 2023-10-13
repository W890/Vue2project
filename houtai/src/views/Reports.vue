<template id="temp">
    <!-- vue实例外创建 -->
    <div>
      <el-card class="box-card">
        <div ref="reportsref" style="width: 600px; height: 400px"></div>
      </el-card>
    </div>
  </template>
  <!-- 调用   <mycom></mycom> -->
<script>
import { GetReportsList } from '@/api/reports'
import * as echarts from 'echarts'
export default {
  data () {
    return {
      myChart: null
    }
  },
  created () {
    this.getdata()
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(this.$refs.reportsref)
      const options = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
      this.myChart.setOption(options)
    },
    // 获取数据
    async getdata () {
      const { data } = await GetReportsList()
      //   数据获取成功后更新图表
      const options = {
        xAxis: data.xAxis,
        yAxis: data.yAxis,
        series: data.series
      }
      this.myChart.setOption(options)
    }
  }
}
</script>
