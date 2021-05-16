<template>
  <div>
    <!-- <span v-show="dialog" @click="close">111</span> -->
    <el-dialog @open="open" :visible.sync="dialog" @close="close" width="80%">
      <el-form :model="form" width="500px">
        <el-upload
          class="avatar-uploader"
          :action="baseURL + 'user/getImage'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="form.imageUrl"
            :src="baseURL + 'image/' + form.imageUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">关 闭</el-button>
        <el-button type="primary" @click="editUser">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import { getCookie, setCookie, delCookie } from "../../cookie";
export default {
  data() {
    return {
      form: {
        pid: "",
        username: "",
        imageUrl: "",
      },
      loginType: true,
    };
  },
  computed: {
    ...mapGetters({
      dialog: "isDialog",
    }),
  },
  methods: {
    open() {
      let user = this.$store.state.auth;
      if (user) {
        this.form.pid = user.pid;
        this.form.username = user.userName;
        this.form.imageUrl = user.imageUrl;
      } else {
        this.$message.error("请先登录");
        this.$store.dispatch("setDialog", false);
        this.$store.dispatch("isShow", true);
      }
    },
    change() {
      this.loginType = !this.loginType;
    },
    close() {
      this.$store.dispatch("setDialog", false);
    },
    editUser() {
      const _this = this;
      axios
        .post("user/update", {
          pid: this.form.pid,
          userName: this.form.username,
          image: this.form.imageUrl,
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            let data = res.data;
            if (data) {
              this.$message({
                message: "成功",
                type: "success",
              });
              setCookie("auth", res.data.userName, 24 * 60 * 60);
              setCookie("imageUrl", res.data.image, 24 * 60 * 60);
              setCookie("pid", res.data.pid, 24 * 60 * 60);
              _this.$store.dispatch("author", {
                userName: res.data.userName,
                imageUrl: res.data.image,
                pid: res.data.pid,
              });
            } else {
              this.$message.error("失败啦，请重试");
            }
          }
        });
    },
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = res;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>
