<template>
    <div>
      <el-card class="box-card">

        <!-- 列表 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号"></el-table-column>

          <el-table-column prop="authName" label="权限名"> </el-table-column>
          <el-table-column prop="path" label="权限地址"> </el-table-column>
          <el-table-column label="权限等级">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.level==0">一级</el-tag>
              <el-tag v-else-if="scope.row.level==1" type="success">二级</el-tag>
              <el-tag v-else type="warning">三级</el-tag>
            </template>
          </el-table-column>
        </el-table>

      </el-card>
    </div>
  </template>
<script>
import {
  GetRightsList
} from '@/api/roles'
export default {
  name: 'User',
  data () {
    return {

      // 改造结束
      tableData: []
    }
  },
  mounted () {
    // 获取数据
    this.getdata()
  },
  methods: {
    // 获取列表数据
    async getdata () {
      const res = await GetRightsList('list')
      this.tableData = res.data
      console.log(res)
    }
  }
}
</script>
