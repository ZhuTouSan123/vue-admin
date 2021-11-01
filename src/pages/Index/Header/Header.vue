<template>
  <div id="header" :style="{background: $store.state.baseColor[0].head}">
    <div>
      <img src="@/assets/img/rog.svg" alt="" height="30px" />
      <h2>电商后台管理系统</h2>
    </div>
    <div>
      <h3>欢迎您,{{ identity }}</h3>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img :src="imgUrl.imgUrl" alt="" height="30px" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user" command="profile"
            >个人资料</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-switch-button" command="logout"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <ProfileDialog
      @cancelForm="cancelForm"
      :users="users"
      :form="form"
      :dialog-form-visible="dialogFormVisible"
      @updateUser="updateUser"
    ></ProfileDialog>
  </div>
</template>

<script>
import ProfileDialog from './ProfileDialog/ProfileDialog';
import { mapState, mapGetters } from "vuex";
export default {
  name: "Header",
  components:{ProfileDialog},
  data() {
    return {
      dialogFormVisible: false,
      form: {},
      users: [],
      imgUrl:[
        {imgUrl:require('@/assets/img/avatar-admin.png')},
        {imgUrl:require('@/assets/img/avatar-other.jpg')}
      ]
    };
  },
  computed: {
    ...mapGetters(["identity"]),
  },
  methods: {
    getUsers() {
      this.axios.get("/userAPI/getUsers.php").then((res) => {
        this.users = res.data;
      });
    },
    handleCommand(command) {
      if (command === "logout") {
        sessionStorage.clear();
        this.$router.replace({
          name: "shouye",
        });
      } else if (command === "profile") {
        this.dialogFormVisible = true;
        this.axios
          .get("/userAPI/theuser.php?id=" + this.$store.state.user.userID)
          .then((res) => {
            this.form = res.data[0];
          });
      }
    },
    updateUser(form) {
      this.axios({
        method: "post",
        url: "/userAPI/updateUsers.php",
        params: form,
      }).then((res) => {
        if (res.data === "操作成功") {
          this.$message({
            showClose: true,
            message: res.data,
            type: "success",
          });
          this.dialogFormVisible = false;
          this.$store.commit('saveUser',{username:form.username,userID:form.id-0,type:form.type-0})
        } else {
          this.$message({
            showClose: true,
            message: res.data,
            type: "error",
          });
        }
      });
    },
    cancelForm(a){
      this.dialogFormVisible = a
    }
  },
  mounted() {
    this.getUsers();
    if(JSON.parse(sessionStorage.getItem('vuex')).user.type === 0){
      this.imgUrl = this.imgUrl[0]
    }else{
      this.imgUrl = this.imgUrl[1]
    }
  },
};
</script>

<style lang="less">
#header {
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding-right: 20px;
  > div {
    display: flex;
    align-items: center;
    .el-dropdown-link {
      img {
        border-radius: 50%;
      }
    }
    h2 {
      margin-left: 10px;
    }
    h3 {
      margin-right: 20px;
    }
  }
  .el-dialog {
    .el-input {
      width: 450px;
      margin-right: 20px;
    }
  }
}
</style>
