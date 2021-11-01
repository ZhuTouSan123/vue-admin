<template>
  <el-row id="home" type="flex" justify="center">
    <el-col :span="6">
      <h1>系统登录</h1>
      <el-input
        type="text"
        v-model.lazy="username"
        required
        prefix-icon="el-icon-user-solid"
      />
      <el-input
        class="password"
        type="password"
        v-model.lazy="password"
        required
        show-password
        prefix-icon="el-icon-lock"
        @keyup.enter.native="loginVerify"
      />
      <el-button @click="loginVerify" type="primary" size="large"
        >登录</el-button
      >
    </el-col>
    <p>测试员工：test&nbsp;&nbsp;密码：test123 &nbsp;&nbsp;&nbsp;&nbsp; 管理员：admin&nbsp;&nbsp;密码：admin</p>
  </el-row>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    loginVerify() {
      this.axios({
        method: "post",
        url: "/login.php",
        params: {
          username: this.username,
          password: this.password,
        },
      }).then((res) => {
        if (res.data) {
          this.$message({
            showClose: true,
            message: "恭喜你，登陆成功",
            type: "success",
          });
          this.$store.commit("saveUser", {
            name: res.data[0].name,
            userID: res.data[0].id - 0,
            username: res.data[0].username,
            type: res.data[0].type - 0,
          });
          this.$router.push({
            name: "zhuye",
          });
        } else {
          this.$message({
            showClose: true,
            message: "登陆失败，用户名或密码不正确",
            type: "error",
          });
        }
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    if (sessionStorage.getItem("vuex")) {
      next("/index");
    } else {
      next();
    }
  },
};
</script>

<style lang="less" scoped>
#home {
  height: 100%;
  padding: 160px 0;
  background: #4f5f75;
  p{
    position:absolute;
    bottom: 0;
    left: 35%;
  }
  .el-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-input {
      height: 44px;
      font-size: 16px;
    }
    h1 {
      margin-bottom: 30px;
      color: #d8d4d4;
    }
    .password {
      margin: 20px 0;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
