<template>
  <div class="home">
    <el-container>
      <el-header class="homm-header"><h1>后台管理系统</h1></el-header>
      <el-container class="home-contan">
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <el-menu
          :default-active="active"
          router
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
      <el-submenu :index="item.path" v-for="item in menuList" :key="item.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item-group v-for="ited in item.children" :key="ited.id">
          <el-menu-item :index="ited.path" @click="setnav(ited.path)">{{ ited.authName }}</el-menu-item>
        </el-menu-item-group>
     
      </el-submenu>
    </el-menu>
        </el-aside>
        <el-main> <router-view></router-view></el-main>
      </el-container>
    </el-container>
   
  </div>
</template>

<script>
import { GetMenusList } from '@/api/user';
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      menuList:[],
      active:'' //激活的值
    }
  },
  mounted(){
    this.getdata()
    // 获取缓存的激活状态
    this.active = sessionStorage.getItem('active')||''
  },
  methods:{
    async getdata(){
        let res = await GetMenusList()
        if(res.meta.status !=200) return this.$message.error(res.meta.msg)
        this.menuList = res.data
        console.log(res);
    },
    // 设置选中激活状态
    setnav(path){
      this.active = path
      sessionStorage.setItem('active',path)

    }
  }
};
</script>

<style scoped lang="less">
.homm-header {
  height: 5vh;
  background-color: #0adceb;
  line-height: 60px;
}

.home-contan {
  height: 90.8vh;
}

.el-aside {
  background: #545c64;
  overflow: visible;
}

.el-menu-vertical-demo {
  width: 100%;
}
</style>
