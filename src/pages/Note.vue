<template>
  <transition name="move">
    <div class="note_page" ref="noteWrapper">
      <div class="noteContainer">
        <div class="note_con">
          <div class="note_pic">
              <!-- <swiper-slide class="swiper-item" v-for="(img,index) in note.imgs" :key="index">
                <img v-lazy="img" alt="">
              </swiper-slide> -->
              <img class="media" v-if="note.media.type == 1" v-lazy="baseURL+'image/'+note.media.mediaUrl" />
              <video class="media" v-else :src="baseURL+'image/'+note.media.mediaUrl" autoplay controls />
              
          </div>
          <div class="note_icon">
            <div class="n_left" @click="hideNote">
              <img src="../assets/left-arrow.png" alt="">
            </div>
            <div class="n_right">
              <img src="../assets/option.png" alt="">
            </div>
          </div>
        </div>
        <div class="note_header">
          <div class="n_user">
            <img :src="baseURL+'image/'+note.user.image" alt="">
            <div>{{note.user.name}}</div>
          </div>
          <div class="btn">
            <button>＋ 关注</button>
          </div>
        </div>
        <div class="n_desc">
          {{note.content}}
        </div>
        <div class="note_footer">
          <div class="adr">
            发布于{{note.adress}}
          </div>
          <div class="det">
            <span class="d_time">{{new Date(note.time)}}</span>
            <span class="d_cl">{{10}}次收藏 {{23}}次赞</span>
          </div>
        </div>
      </div>
      <div v-for="(discuss,index) in note.discusses" :key="index">
          <el-row :gutter="20">
            <el-col :span="6" class="col"><img v-lazy="baseURL+'image/'+discuss.user.image" class="touxiang" /></el-col>
            <el-col :span="18">
                <el-row :gutter="20">
                  <el-col :span="8">
                    {{discuss.user.name}}
                  </el-col>
                  <el-col :span="16" style="heigh:20px; overflow:hidden">{{dataFormat(new Date(discuss.time))}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" style="padding:10px">
                      <div style="overflow:auto;word-wrap:break-word;">{{discuss.content}}</div>
                  </el-col>
                </el-row>
            </el-col>
            
          </el-row>
      </div>
      <div class="dis">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入评论内容"
          v-model="textarea">
        </el-input>
        <el-button  type="primary" @click="discuss" >评论</el-button>
      </div>
    </div>
  </transition>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.min.css'
import BScroll from 'better-scroll'
import { mapGetters } from 'vuex'
import {getCookie} from '../cookie'
import moment from 'moment';
export default {
  data() {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationType: 'fraction'
      },
      textarea: ''
    }
  },
  computed: {
    ...mapGetters([
      'note'
    ])
  },
  methods: {
    dataFormat(data){
      return moment(data).format('YYYY-MM-DD HH:mm:ss')
    },
    hideNote () {
      this.$router.back(-1)
    },
    _initScroll () {
      this.noteScroll = new BScroll(this.$refs.noteWrapper, {
        click: true,
        probeType: true
      })
    },
    discuss () {
      axios.post("/discuss/insert",{
        userId:getCookie("pid"),
        shareId: this.note.pid,
        content: this.textarea
      }).then(res => {
        if(res.status == 200){
          let date = this.note
          date.discusses.push(res.data)
          this.$store.dispatch('getNote',date)
          this.textarea = ""
        }
      })
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created () {
    if (this.$store.state.isNav) {
        	this.$store.dispatch('isNav')
    }
    this.$nextTick( () => {
        this._initScroll()
    })
  },
  watch: {
		'$route' () {
			if (this.$store.state.isNav) {
        		this.$store.dispatch('isNav')
      		}
		}
	}
}
</script>
<style scoped>
.col {
  text-align: center;
  padding: 10px;
}
.touxiang {
  border: 1px solid black;
  border-radius:50%;
  height : 40px;
  width: 40px
}
.dis {
  top: 20px
  }
.note_page {
  width: 100%;
  top: 0;
  background: #fff;
  overflow: hidden;
  position: absolute;
}

.move-enter-active,
.move-leave-active {
  transition: all 0.2s linear;
}

.move-enter,
.move-leave-active {
  transform: translate3d(100%, 0, 0);
}

.note_con {
  width: 100%;
  position: relative;
}

.note_pic {
  width: 100%;
}

.media {
  width: 100%;
  height: auto;
}

.media[lazy=loading] {
  width: 100%;
  height: auto;
}

.swiper-pagination-fraction {
  width: 20%;
  left: 80%;
}

.note_icon {
  top: 0.37rem;
  left: 0;
  right: 0;
  width: 10rem;
  height: 0.74rem;
  /* padding: 0.48rem; */
  position: absolute;
  z-index: 50;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.n_left img,
.n_right img {
  width: 0.61rem;
  height: 0.61rem;
  margin: 0.48rem;
}

.note_header {
  width: 100%;
  height: 1.44rem;
  line-height: 1.44rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
}

.n_user {
  display: flex;
  font-size: 0.44rem;
  color: #333333;
  flex-direction: row;
  margin-left: 0.46rem;
}

.n_user img {
  width: 0.91rem;
  height: 0.91rem;
  border-radius: 50%;
  margin-top: 0.26rem;
  margin-right: 10px;
}

.btn {
  margin-right: 0.46rem;
}

.btn button {
  width: 2.0rem;
  height: 0.78rem;
  color: #ff2741;
  border-radius: 6px;
  font-size: 0.37rem;
  border: 1px solid #ff2741;
  background-color: #fff;
}

.n_desc {
  font-size: 0.42rem;
  line-height: 0.56rem;
  padding: 0.37rem;
  color: #333333;
}

.note_footer {
  width: 100%;
  color: #a3a3a3;
  font-size: 0.39rem;
}

.adr {
  margin-left: 0.46rem;
}

.det {
  margin: 0.46rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>