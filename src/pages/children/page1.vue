<template>
    <div class="discovery_page">
        <div class="discovery" ref="disWrapper">
            <div class="dis-list">
                <div class="left-list">
                    <ul>
                        <li v-for="(item,index) in leftDisList" @click="selectedNote(item)" :key="index">
                            <div class="note_item">
                                <a class="img">
                                    <img v-lazy="item.img" alt="">
                                </a>
                                <div class="desc">
                                    <p>{{item.desc}}</p>
                                </div>
                                <div class="note">
                                    <a class="user">
                                        <img v-lazy="item.avator" alt="">
                                        <span>{{item.uname}}</span>
                                    </a>
                                    <a class="like">
                                        <img src="../../assets/like.png" alt="like">
                                        <span>{{item.like}}</span>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="right-list">
                    <ul>
                        <li v-for="(item,index) in rightDisList" @click="selectedNote(item)" :key="index">
                            <div class="note_item">
                                <a class="img">
                                    <img v-lazy="item.img" alt="">
                                </a>
                                <div class="desc">
                                    <p>{{item.desc}}</p>
                                </div>
                                <div class="note">
                                    <a class="user">
                                        <img v-lazy="item.avator" alt="">
                                        <span>{{item.uname}}</span>
                                    </a>
                                    <a class="like">
                                        <img src="../../assets/like.png" alt="like">
                                        <span>{{item.like}}</span>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BScroll from 'better-scroll'
const response = require('../../common/disgoods.json')
export default {
    data () {
        return {
            selecteddis: {}
        }
    },
     computed: {
        ...mapGetters([
            'leftDisList',
            'rightDisList'
        ])
    },
    methods: {
        selectedNote (item) {
            this.$store.dispatch('getNote',item)
            this.$router.push('/note')
        },
        _initScroll () {
            this.pageScroll = new BScroll(this.$refs.disWrapper, {
                click: true
            })
            // console.log(this.pageScroll)
        }
    },
    created () {
        axios.get('/share/getAll')
            .then(res => {
                let discoveryList = []
                let temp =  {
                    "id": 1,
                    "img": "http://ci.xiaohongshu.com/24a0d600-e2c1-4421-a912-907fb433e56c@r_240w_240h.jpg",
                    "desc": "从英国到南非转机迪拜 坐了十几个小时终于到达了南非首都开普敦👀 虽然说是南半球 此刻应该是秋季 但这里的太阳真的很晒 防晒是千万要准备好的 不过有的时候晚上早上会有点凉 春秋来的也得带外套～ 开普角上也有灯塔 因为这里的山比好望角的更高 所以个人觉得这里看景比好望角更加美 到了开普角公园这里坐车上去只要三五分钟 步行的话20分钟 怕晒的话建议坐车 也很实惠65兰特 好望角也是看海啦 总的来说一天都是看海看山 个人觉得这里的海浪相比罗卡角来说汹涌得多 怪不得之前又名风暴角 现在寓意是美好希望的海角 英文是Cape of Good Hope 在非洲大陆的最南端 还是很有意义的💙 开普敦很多餐厅味道还是不错的 基本都没踩雷随便找着吃 市中心高楼大厦也不少逛街的地方也很多 不过感觉并没有什么可逛可买的…感觉还是自然景观更值得一去啦 有人说南非这个地方不是特别安全 大部分人确实都很友善 但今天有朋友碰到劫匪还支枪…所以真的还是要奉劝各位安全问题 一定要人多出行注意自己的财产和人身安全 关于穿搭🌹墨镜配的是prada 感觉这个不挑脸型 带着感觉酷酷的 鞋子也是prada的松糕鞋 裙子是英国lipsy家的 它家的衣服小裙子都很平价 一般一百磅都不到就可以买到 买来随便旅游穿穿还是挺舒服的 另外配了条choker 感觉国内好看的choker更多哈哈 然后还有定草帽也是英国买的 感觉tb上有很多差不多的～出来旅游舒适第一 这样简单穿就感觉很舒服 我知道会很累所以特地没有穿精致一点的裙子 毕竟南非风也还是挺大的～ #南非[地区]##开普敦[地区]##最爱旅行地[话题]##每日穿搭[话题]##豪华精选[品牌]##带着小红书去旅行[话题]##假装在旅行[话题]##非洲[地区]##170cm女生穿搭[话题]##我的小众旅行攻略[话题]#",
                    "comment": 23,
                    "like": 23,
                    "collect": 20,
                    "uname": "Y***i",
                    "avator": "http://img.xiaohongshu.com/avatar/58f34bab02f37d35212dd9d7.jpg@120w_120h_92q_1e_1c_1x.jpg?wm=160&hm=160&q=92",
                    "price": "",
                    "adress": "Boulders Beach",
                    "time": "04-04",
                    "imgs": [
                        "http://ci.xiaohongshu.com/24a0d600-e2c1-4421-a912-907fb433e56c@r_1280w_1280h.jpg",
                        "http://ci.xiaohongshu.com/e9fa96f3-4d9d-465b-812e-e6a1e9a9a13e@r_1280w_1280h.jpg",
                        "http://ci.xiaohongshu.com/0e3d1791-aa0d-40c7-87ef-c944bf2093dc@r_1280w_1280h.jpg",
                        "http://ci.xiaohongshu.com/df3b49fe-2a65-4ddd-b328-15a6d1053a2d@r_1280w_1280h.jpg",
                        "http://ci.xiaohongshu.com/f3090b88-5991-49ec-bed3-343a0b9e7d15@r_1280w_1280h.jpg",
                        "http://ci.xiaohongshu.com/f3090b88-5991-49ec-bed3-343a0b9e7d15@r_1280w_1280h.jpg",
                        "http://ci.xiaohongshu.com/0a404216-7932-458d-a31e-063073257241@r_1280w_1280h.jpg",
                        "http://ci.xiaohongshu.com/8fa93957-cfe4-4d71-9c62-17fa0dcb73f3@r_1280w_1280h.jpg"
                    ],
                    "comments": [
                        {
                            "id": 1,
                            "cname": "C***衣",
                            "cavator": "http://img.xiaohongshu.com/avatar/530b3c2eb4c4d6117bf5b3f5.jpg@120w_120h_92q_1e_1c_1x.jpg?wm=80&hm=80&q=92",
                            "ctext": "你一定是hrd的妹子",
                            "ctime": "2017-04-05 11:04"
                        },
                        {
                            "id": 2,
                            "cname": "W**n",
                            "cavator": "http://img.xiaohongshu.com/avatar/58ee77475e87e71031e8a547.jpg@120w_120h_92q_1e_1c_1x.jpg?wm=80&hm=80&q=92",
                            "ctext": "我就在南非，我也去过了，但没有你拍的好看，风景",
                            "ctime": "2017-04-14 06:16"
                        },
                        {
                            "id": 3,
                            "cname": "小***巴",
                            "cavator": "http://img.xiaohongshu.com/avatar/58169ec1e9521a0b6bccbaf4.jpg@120w_120h_92q_1e_1c_1x.jpg?wm=80&hm=80&q=92",
                            "ctext": "中国8月的话南非是冬天了吗",
                            "ctime": "2017-04-15 16:23"
                        },
                        {
                            "id": 4,
                            "cname": "0**0",
                            "cavator": "http://img.xiaohongshu.com/avatar/55a4a8ccb4c4d63783567192.jpg@120w_120h_92q_1e_1c_1x.jpg?wm=80&hm=80&q=92",
                            "ctext": "是的哈哈 我去的时候是秋天啦",
                            "ctime": "2017-04-19 12:54"
                        }
                    ]
                }
                res.data.forEach((value) => {
                    console.log(value)
                    discoveryList.push(temp)
                });
                
            })
            this.$store.dispatch('getDiscoverys',response.discoveryList)

    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.discovery
    width 100%
    height 100%
    top 4.0rem
    bottom 0
    position absolute
    background #f5f8fa
    .dis-list
        width 100%
        // min-height 150%
        display flex
        flex-direction row
        background #f5f8fa
        .left-list
            margin-left 5px
            flex 1
        .right-list
            margin-right 5px
            flex 1
        ul > li
            width 96%
            margin-left auto
            margin-right auto
            margin-top 5px
            font-size 0.39rem
            list-style none
            .note_item
                .img
                    width 100%
                    overflow hidden
                    img
                        width 100%
                    img[lazy=loading]
                        width 100%
                .desc
                    width 100%
                    height 0.94rem
                    p
                        margin 0.26rem
                        overflow hidden;
                        text-overflow ellipsis
                        display -webkit-box
                        -webkit-line-clamp 2
                        -webkit-box-orient vertical
                .note
                    height 0.63rem
                    margin 0.22rem
                    line-height 0.63rem
                    display flex
                    color #333333
                    flex-direction row
                    justify-content space-between
                    .user
                        display flex
                        color #333333
                        font-size 0.33rem
                        flex-direction row
                        img
                            width 0.63rem
                            height 0.63rem
                            margin-right 0.13rem
                            border-radius 50%
                        img[lazy=loading]
                            width 0.63rem
                            height 0.63rem
                            margin-right 0.13rem
                            border-radius 50%
                    .like
                        line-height 0.63rem
                        display flex
                        color #999999
                        flex-direction row
                        img
                            margin-top 0.13rem
                            margin-right 0.11rem
                            width 0.37rem
                            height 0.37rem                  
</style>

