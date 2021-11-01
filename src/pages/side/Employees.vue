<template>
  <div id="employees">
    <el-table :data="employees.slice(1)" style="width: 100%">
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column label="职位">
        <template slot-scope="prop">
          {{ getType(prop.row.type) }}
        </template>
      </el-table-column>
      <el-table-column label="权限(员工/主管)">
        <template slot-scope="prop">
          <el-switch
            :value="prop.row.type == '1'"
            active-color="#13ce66"
            @change="isEmployee(prop.row.id, prop.row.type)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="prop">
          <el-button type="primary" @click="showEmployee(prop.row.id)"
            >查看</el-button
          >
          <el-button type="danger" @click="deleteEmployee(prop.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="收货地址" :visible.sync="theEmployeeDialog">
      <el-table :data="theEmployee">
        <el-table-column
          prop="id"
          label="id"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
        ></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="type" label="用户类型"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Employees",
  data() {
    return {
      theEmployee: null,
      theEmployeeDialog: false,
    };
  },
  computed: {
    ...mapState(["employees"]),
  },
  methods: {
    ...mapActions(["getEmployees"]),
    getType(t) {
      if (t == "0") {
        return "管理员";
      } else if (t == "1") {
        return "主管";
      } else {
        return "员工";
      }
    },
    isEmployee(id, type) {
      if (type == "1") {
        type = 2;
      } else if (type == "2") {
        type = 1;
      }
      this.axios({
        method: "post",
        url: "/userAPI/setUserType.php",
        params: {
          id: id,
          type: type,
        },
      }).then((res) => {
        // console.log(res.data);
        this.$store.dispatch("getEmployees");
      });
    },
    showEmployee(id) {
      this.axios.get("/userAPI/theuser.php?id=" + id).then((res) => {
        this.theEmployee = [res.data[0]];
        this.theEmployeeDialog = true;
      });
      
    },
  },
  mounted() {
    this.getEmployees();
  },
};
</script>

<style lang='less' scoped>
::v-deep .el-dialog{
  width: 80%;
}
</style>
