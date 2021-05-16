<template lang="">
    <div>
       <el-dialog  :visible.sync="dialogFormVisible" title="分享美食信息" @close="close" width='80%'>
        <el-form :model="form" width="500px">
            <el-upload 
                    class="avatar-uploader-share"
                    :action="baseURL+'media/upload'"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="type == 'image'" :src="imageUrl" class="avatar-share">
                    <video v-else-if="type == 'video'":src="imageUrl" controls autoplay class="avatar-share"/>
                    <i v-else class="el-icon-plus avatar-uploader-icon-share"></i>
            </el-upload>
            <el-input
              type="textarea"
              placeholder="请输入分享内容内容"
              v-model="textarea"
              show-word-limit
              rows="3"
              :autosize="{minRows: 3, maxRows: 3}"/>
              <el-select v-model="value" placeholder="请选择分享类型">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">关 闭</el-button>
            <el-button type="primary" @click="share">分享</el-button>
        </div>
        </el-dialog>
        
        
    </div>
</template>
<style >
.avatar-uploader-share {
  text-align: center;
}
.avatar-uploader-share .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-share .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon-share {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 300px;
  line-height: 300px;
  text-align: center;
}
.avatar-share {
  width: 300px;
  height: 300px;
  display: block;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import { getCookie, setCookie, delCookie } from "../cookie";
export default {
  data() {
    return {
      form: {
        imageUrl: "",
      },
      options: [
        {
          value: "1",
          label: "中国传统美食",
        },
        {
          value: "2",
          label: "西方美食",
        },
        {
          value: "3",
          label: "家常菜",
        },
        {
          value: "4",
          label: "美容菜谱",
        },
        {
          value: "5",
          label: "养生饮食",
        },
      ],
      value: "1",
      textarea: "",
      type: "",
      imageUrl: "",
    };
  },
  computed: {
    ...mapGetters(["isShowUpload"]),
    dialogFormVisible() {
      return this.isShowUpload;
    },
  },
  methods: {
    close() {
      this.$store.dispatch("isShowUpload", false);
    },
    share() {
      if (this.$store.auth == "") {
        this.$message({
          message: "请先登录在分享！",
          type: "warning",
        });
        return false;
      }
      let str = "/share/save";
      console.log(str);
      axios
        .post(str, {
          userId: getCookie("pid"),
          content: this.textarea,
          classification: this.value,
          media: {
            type: this.type === "image" ? 1 : 2,
            mediaName: this.form.imageUrl,
            mediaUrl: this.form.imageUrl,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            //登录成功
            this.$message({
              message: "成功",
              type: "success",
            });
            location.reload();
            this.form = {
              imageUrl: "",
            };
            this.value = "1";
            (this.textarea = ""), (this.type = ""), (this.imageUrl = "");
          } else {
            this.$message.error("失败啦，请重试");
          }
          _this.close();
        });
    },
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = res;
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      //   const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 50;
      this.type = file.type.indexOf("image") != -1 ? "image" : "video";
      //   if (!isJPG) {
      //     this.$message.error("上传头像图片只能是 JPG 格式!");
      //   }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      console.log(file);
      return isLt2M;
    },
  },
};
</script>
