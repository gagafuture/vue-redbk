<template>
  <div>
    <el-dialog :visible.sync="isPassword" @close="close" width="80%">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input
            type="password"
            v-model="ruleForm.newPass"
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
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("newPass");
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validateNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error("两次密码不一致，请重试！"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        newPass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        newPass: [{ validator: validateNewPass, trigger: "blur" }],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["isPassword"]),
  },
  methods: {
    close() {
      this.$store.dispatch("setPassword", false);
      this.$refs['ruleForm'].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post("user/password", {
              pid: this.$store.state.auth.pid,
              ...this.ruleForm,
            })
            .then((res) => {
              if (res.status == 200) {
                  this.$message({
                    message: res.data.data,
                    type: res.data.code == 200 ?"success" : "error",
                  });
                  if(res.data.code == 200){
                      this.$store.dispatch("setPassword",false)
                  }
              }
            });
        } else {
          this.$message.error("请重新检查数据！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style>
</style>