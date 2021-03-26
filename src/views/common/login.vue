<template>
  <el-form
    :model="loginForm"
    :rules="rules"
    ref="loginForm"
    label-width="100px"
    class="loginContainer"
  >
    <h3 class="loginTitle">登录界面</h3>
    <el-form-item label="账号" prop="name">
      <el-input
        type="text"
        v-model="loginForm.name"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="loginForm.password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>

    <el-form-item label="验证码" prop="code">
      <el-input
        type="text"
        v-model="loginForm.code"
        placeholder="点击图片，更换验证码"
        style="width: 250px"
      ></el-input>
      <img :src="codeUrl" @click="updateCode" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm()">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        name: "",
        password: "",
        code: "",
      },
      codeUrl: "/account/code?time=" + new Date(),
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "change" }],
      },
    };
  },

  methods: {
    updateCode() {
      this.codeUrl = "/account/code?time=" + new Date()
    },
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          if (this.loginForm.name.length == 0) {
            this.$message.error("账号不能为空");
            return;
          }
          if (this.loginForm.password.length == 0) {
            this.$message.error("密码不能为空");
            return;
          }
          if (this.loginForm.code.length == 0) {
            this.$message.error("验证码不能为空");
            return;
          }
          return false;
        }
      });
    },
  },
};
</script>

<style>
.loginTitle {
  text-align: center;
}
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 450px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>
