<template id="temp">
  <!-- vue实例外创建 -->
  <div class="login">
    <div class="login-item">
      <h1>系统登录</h1>
      <el-form ref="loginref" :rules="rules" :model="form" label-width="80px">
        <el-form-item label-width="0"  prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="password">
          <el-input
            show-password
            prefix-icon="el-icon-lock"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button class="login-button" type="primary" @click="login()"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item label-width="0">
          <el-button class="login-button" type="primary" @click="reset()"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<!-- 调用   <mycom></mycom> -->
<script>
import { Login } from "@/api/user";
export default {
  data() {
    return {
      form: {
        username:'admin',
        password:'123456'
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        
        ],
      },
    };
  },
  methods: {
    async login() {
      this.$refs['loginref'].validate(async (valid)=>{
        console.log(valid);
        if (valid) {
          let res = await Login(this.form);
          // 验证是否登录成功
          if (res.meta.status!=200) return this.$message.error(res.meta.msg)
          this.$message.success('登陆成功');
          // 如果登录成功需要将用户信息和token存在缓存中
          localStorage.setItem('username',res.data.username)
          localStorage.setItem('token',res.data.token)
          // 成功后跳转到系统内部
          this.$router.push('/')
      
        }else{
          this.$message.error('请填写必填项');
        }

      })
    },
    // 重置
    reset(){
      this.$refs['loginref'].resetFields()
    }
  },
};
</script>

<style scoped lang="less">
.login {
  background-color: #2d3a4b;
  height: 100vh;
  .login-item {
    min-width: 30%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    h1 {
      text-align: center;
      color: white;
      margin-bottom: 30px;
    }
    .login-button {
      width: 100%;
      margin: 0 auto;
    }
  }
}
</style>
