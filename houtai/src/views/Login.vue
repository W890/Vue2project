<template id="temp">
    <!-- vue实例外创建 -->
    <div class="login">
      <div class="login-item"> 
          <h1>系统登录</h1>
          <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label-width="0">
          <el-input prefix-icon="el-icon-user-solid" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-input prefix-icon="el-icon-lock" v-model="form.name"></el-input>
        </el-form-item>
      <el-form-item label-width="0">
          <el-button class="login-button" type="primary">主要按钮</el-button>
      </el-form-item>
      </el-form>
      </div>
     
    </div>
  </template>
  <!-- 调用   <mycom></mycom> -->
  <script>
  export default {
      data() {
          return {
              form:{}
          }
      },
  }
  </script>
  
  <style scoped lang="less">
  .login {
    background-color: #2d3a4b;
    height: 100vh;
    .login-item{
      min-width:30%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50% ,-50%);
     
      h1{
          text-align: center;
          color: white;
          margin-bottom: 30px;
      }
      .login-button{
          width: 100%;
          margin: 0 auto;
      }
    }
  }
  </style>