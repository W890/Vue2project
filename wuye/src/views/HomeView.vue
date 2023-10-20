<template>
  <div class="home">
    <div class="headerdiv">
      <el-menu router :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        background-color="#389af9" text-color="#fff" active-text-color="#ffd04b">
        <h2 style="float: left; color: white; padding-top: 10px; padding-left: 30px;margin-right: 100px;">小区物业管理系统</h2>
        <el-menu-item index="/first">首页</el-menu-item>
        <el-submenu index="/house">
          <template slot="title">房屋管理</template>
          <el-menu-item index="/house/unit">房屋单元</el-menu-item>
          <el-menu-item index="/house/number">房号管理</el-menu-item>
          <el-menu-item index="/house/Devicelnfo">房屋设备</el-menu-item>
        </el-submenu>
        <el-submenu index="/parking">
          <template slot="title">车位管理</template>
          <el-menu-item index="/parking/parkMessage">车位信息</el-menu-item>
          <el-menu-item index="/parking/parkpay">车位订单</el-menu-item>
        </el-submenu>
        <el-submenu index="/pay">
          <template slot="title">计费管理</template>
          <el-menu-item index="/pay/paytype">缴费类型</el-menu-item>
          <el-menu-item index="/pay/paymessage">缴费信息</el-menu-item>
        </el-submenu>
        <el-submenu index="/service">
          <template slot="title">服务中心</template>
          <el-menu-item index="/service/postMessage">公告信息</el-menu-item>
          <el-menu-item index="/service/repair">维修处理</el-menu-item>
          <el-menu-item index="/service/feedback">反馈服务</el-menu-item>
        </el-submenu>
        <el-submenu index="/user">
          <template slot="title">用户管理</template>
          <el-menu-item index="/user/userMessage">普通用户信息</el-menu-item>
          <el-menu-item index="/user/adminMessage">管理员信息</el-menu-item>
          <el-menu-item index="/user/Message">用户总表查询</el-menu-item>
        </el-submenu>
        <el-submenu index="/menu">
          <template slot="title">菜单管理</template>
          <el-menu-item index="/menu/menuData">菜单列表</el-menu-item>
          <el-menu-item index="/menu/loginData">登录日志</el-menu-item>
        </el-submenu>
        <el-submenu index="/personal">
          <template slot="title">个人中心</template>
          <el-menu-item index="/personal/message">我的信息</el-menu-item>
          <el-menu-item index="/personal/change">密码修改</el-menu-item>
          <el-menu-item index="/personal/joinChar">小区群聊</el-menu-item>
        </el-submenu>


        <div style="margin-left: 30px;margin-right: 40px;">
          <el-button icon="el-icon-switch-button" @click="removetoken()" type="danger">退出登录</el-button>
        </div>
        <div style="margin-left: 30px;margin-right: 10px;">
          <h3>admin,你好！</h3>
        </div>
        <div>
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>

      </el-menu>
    </div>
    <template>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import { GetMyId } from '@/api/house'
export default {
  name: 'HomeView',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      form: {},
      icon: '',
      imageUrl: '',
      id: '',
      token: '',
    }
  },
  mounted() {
    this.token = localStorage.getItem('token')
    // this.getData()
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    // 退出登录
    removetoken() {
      localStorage.clear('token')
      location.reload()
    },
    // async getData() {
    //   console.log({ id: this.id, token: this.token });
    //   let res = await GetMyId({ id: this.id, token: this.token })
    //   console.log(res);
    //   res.data.forEach(element => {
    //     this.form = element
    //     this.icon = `http://community.byesame.com/file/${element.icon}`
    //   });
    // },
  },
  components: {

  }
}
</script>

<style>
.headerdiv div {
  float: right;
  padding-top: 10px;
  color: white;
}
</style>
