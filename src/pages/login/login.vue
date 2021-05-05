<template lang="">

    <div>

       <el-dialog  :visible.sync="dialogFormVisible" @close="close" width='80%'>
        <el-form :model="form" width="500px">
            <el-upload v-if="!loginType"
                    class="avatar-uploader"
                    action="http://gagafuture.com:8254/user/getImage"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form-item label="用户名">
            <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" >
            <el-input v-model="form.password" type="password"  autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <el-link type='primary' @click="change">{{loginType?"注 册":"登 录"}}</el-link>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">关 闭</el-button>
            <el-button type="primary" @click="login">{{loginType?"登 录":"注 册"}}</el-button>
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
        username: "",
        password: "",
        imageUrl:""
      },
      imageUrl: "",
      loginType:true,
    };
  },
  computed: {
    ...mapGetters(["isShow"]),
    dialogFormVisible() {
      return this.isShow;
    },
  },
  methods: {
      change(){
        this.loginType = !this.loginType;
      },
    close() {
        console.log(111)
      this.$store.dispatch("isShow",false);
    },
    login() {
        var _this = this;
      let str = "/user/" + (this.loginType ? "login" : "register");
      console.log(str);
      axios.post(str, {
        userName: this.form.username,
        password: this.form.password,
        url: this.form.imageUrl
      }).then(res => {
          console.log(res)
          if(res.status == 200){
              //登录成功
              this.$message({
                message: '成功',
                type: 'success'
                });
                setCookie("auth",res.data.userName,24*60*60);
                setCookie("imageUrl",res.data.image,24*60*60);
                setCookie("pid",res.data.pid,24*60*60);
                _this.$store.dispatch("author",{userName:res.data.userName,imageUrl:res.data.image,pid:res.data.pid})
                
          }else {
              this.$message.error("失败啦，请重试")
          }
          _this.close()
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = res
      console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw);
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
<style lang="">
</style>