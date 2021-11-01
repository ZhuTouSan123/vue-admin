<template>
  <el-dialog title="个人资料" :visible="dialogFormVisible" top="0" @close="closeDialog">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input
          v-model.lazy="form.username"
          autocomplete="off"
          @change="checkUsername"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="changePwd" type="danger">修改密码</el-button>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleUpdate" :disabled="isDisabled"
        >确 定</el-button
      >
    </div>
    <el-dialog
      width="30%"
      title="修改密码"
      :visible.sync="pwdVisible"
      append-to-body
    >
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item label="原密码">
          <el-input
            type="password"
            autocomplete="off"
            v-model="oldPassword"
            @change="checkOld"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            :disabled="innerDisabled"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-dialog>
</template>

<script>
export default {
  name: "ProfileDialog",
  props: ["dialogFormVisible", "form", "users"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      pwdVisible: false,
      formLabelWidth: "120px",
      isDisabled: false,
      oldPassword: "",
      innerDisabled: false,
    };
  },
  methods: {
    handleUpdate() {
      this.$emit("updateUser", this.form);
      this.$emit("cancelForm", false);
    },
    handleCancel() {
      this.$emit("cancelForm",false);
    },
    checkUsername() {
      let arr = this.users.filter((el) => el.id !== this.form.id);
      if (!arr.every((el) => el.username !== this.form.username)) {
        this.$message({
          showClose: true,
          message: "用户名已存在",
          type: "error",
        });
        this.isDisabled = true;
      } else {
        this.isDisabled = false;
      }
    },
    closeDialog() {
      this.isDisabled = false;
      this.$emit('cancelForm',false)
    },
    changePwd() {
      this.pwdVisible = true;
      this.innerDisabled = false;
      this.oldPassword = "";
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
          this.form.password = this.ruleForm.pass;
          this.pwdVisible = false;
        } else {
          this.$message({
            showClose: true,
            message: "修改失败",
            type: "error",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    checkOld() {
      if (this.oldPassword !== this.form.password) {
        this.$message({
          showClose: true,
          message: "原密码错误",
          type: "error",
        });
        this.innerDisabled = true;
      } else {
        this.innerDisabled = false;
      }
    },
  },
};
</script>

<style></style>
