<template>
  <div class="panel">
    <div class="header">
      <img
        :src="getUser == '' ? require('../assets/wm.png') : url"
        alt=""
        @click="login"
      />
      <div>{{ getUser == "" ? "未登录" : getUser.userName }}</div>
    </div>
    <div @click="cart" class="content">
      <div class="con_item">
        <div class="img">
          <img src="../assets/icon4.png" alt="" />
        </div>
        <div class="text">
          <span>购物车</span>
        </div>
      </div>
      <div class="con_item">
        <div class="img">
          <img src="../assets/icon5.png" alt="" />
        </div>
        <div class="text">
          <span>订单</span>
        </div>
      </div>
      <div @click="showEdit" class="con_item">
        <div class="img">
          <img src="../assets/icon9.png" alt="" />
        </div>
        <div class="text">
          <span>编辑个人信息</span>
        </div>
      </div>
      <div @click='showPassword' class="con_item">
        <div class="img">
          <img src="../assets/icon8.png" alt="" />
        </div>
        <div class="text">
          <span>修改密码</span>
        </div>
      </div>
      <div @click="logout" class="con_item">
        <div class="img">
          <img src="../assets/icon8.png" alt="" />
        </div>
        <div class="text">
          <span>退出登录</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import * as Cookie from "../cookie";
export default {
  data() {
    return {
      user: [],
      form: {},
    };
  },
  methods: {
    login() {
      if (this.$store.state.auth == "") {
        this.$store.dispatch("isShow", true);
      }
    },
    showEdit() {
      this.$store.dispatch("setDialog", true);
    },
    showPassword(){
      this.$store.dispatch("setPassword",true)
    },
    cart(){
        this.$router.push('/cart')
    },
    logout() {
      let auth = Cookie.getCookie("auth");
      if (auth) {
        Cookie.delCookie("auth");
        Cookie.delCookie("pid");
        Cookie.delCookie("imageUrl");
        this.$message.success("退出登录成功！");
        location.reload();
      }else{
        this.$message.warning("请先登录")
      }
    },
  },
  computed: {
    ...mapGetters(["getUser"]),
    url() {
      // let url =  URL.createObjectURL(this.getUser.imageUrl)
      // console.log(url)
      let url = this.baseURL+"image/";
      if (this.getUser.imageUrl.length > 0) {
        url = url + this.getUser.imageUrl;
      }

      return url;
    },
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.panel {
  width: 100%;
  height: 100%;
  background: white;

  .header {
    width: 100%;
    height: 10%;
    font-size: 20px;
    margin-top: 60px;
    text-align: center;

    img {
      width: 40px;
      height: 40px;
    }
  }

  .content {
    width: 80%;
    padding: 30px;

    .con_item {
      height: 25px;
      line-height: 25px;
      font-size: 16px;
      margin-bottom: 30px;
      display: flex;
      flex-direction: row;

      .img {
        margin-right: 15px;

        img {
          width: 25px;
          height: 25px;
        }
      }

      .text {
        height: 25px;
        line-height: 25px;
      }
    }
  }
}
</style>

