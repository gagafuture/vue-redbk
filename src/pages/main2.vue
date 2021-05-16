<template>
  <div class="main2_nav">
    <div class="m2_header">
      <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide
          class="swiper-item"
          v-for="(item, index) in navs"
          :key="index"
        >
          <div
            class="opt-item"
            @click="selectPage(item.value, index)"
            :class="chooseItem == index ? 'isActive' : ''"
          >
            {{ item.label }}
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="m2_content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.min.css";
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      navs: [
        {
          value: "0",
          label: "全部",
        },
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
      chooseItem: "",
      swiperOption: {
        pagination: ".swiper-pagination",
        slidesPerView: 5,
        paginationHide: true,
        spaceBetween: 17,
        freeMode: true,
      },
    };
  },
  created() {},
  methods: {
    selectPage(value, index) {
      Indicator.open();
      this.chooseItem = index;
      console.log(value);
      this.$router.push({ name: "main2/page1", params: { id: value } });
      setTimeout(() => Indicator.close(), 1000);
    },
  },
  components: {
    swiper,
    swiperSlide,
  },
  created() {
    this.$router.push({ name: "main2/page1", params: { id: "0" } });
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.main2_nav {
  width: 100%;

  .m2_header {
    width: 100%;
    height: 0.98rem;
    padding-top: 0.24rem;
    background: #f5f8fa;

    a {
      color: grey;
      text-decoration: none;
    }

    a:visited {
      color: grey;
    }

    .swiper-box {
      padding-left: 0.24rem;
      padding-right: 0.24rem;

      .swiper-wrapper {
        .swiper-slide {
          .opt-item {
            height: 0.69rem;
            line-height: 0.69rem;
            text-align: center;
            border-radius: 25px;
            font-size: 0.46rem;
            color: #999999;
            background: #fff;
            // border 1px solid grey
          }

          .isActive {
            color: #333333;
            // border 1px solid black
          }
        }
      }

      .swiper-pagination {
        display: none;
      }
    }
  }
}
</style>

