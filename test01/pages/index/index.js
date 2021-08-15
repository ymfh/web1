// index.js
// 获取应用实例
const app = getApp()
var reqlist = require('../../utils/req')
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: {
    datalist1: [],
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    navimg: [{
        "img": "../../img/mac.png",
        "title": "Mac"
      }, {
        "img": "../../img/iPad.png",
        "title": "iPad"
      }, {
        "img": "../../img/iphone.png",
        "title": "iphone"
      },
      {
        "img": "../../img/Smartwatch-2.png",
        "title": "Watch"
      }, {
        "img": "../../img/music.png",
        "title": "Music"
      }
    ],
    newlist1: [],
    recommendlist: [],
    tuilist1: [],
    toView: 'green',
    page: 1,
    pagenext: ''
  },
  onSwitchTab: function (e) {
    console.log(52, e);
    // var i = e.target.dataset.idx;
    var i = e.currentTarget.dataset.idd;
    console.log(54, i);
    // console.log(55, j);
    wx.navigateTo({
      url: '/pages/productDetail/productDetail?id=' + i
    })
  },
  log(e) {
    console.log(e.currentTarget.dataset.index);
    var i = e.currentTarget.dataset.index

    wx.navigateTo({
      url: "/pages/ipad/ipad?title=" + [this.data.navimg[i].title, i + 1]
    })

  },
  onShow: async function () {

    let newlist = await reqlist.newreq();
    var a = this.data.page
    let tuilist = await reqlist.tuireq(a);
    let datalist = await reqlist.banreq();
    // console.log(121,newlist);
    this.setData({
      newlist1: newlist,
      tuilist1: tuilist,
      datalist1: datalist
    });
    // console.log(95,this.data.datalist1);
  },
  lazy0(datas) {
    var id = datas.target.dataset.ids;
    var arr2 = this.data.datalist1;
    arr2[id].ad_code = '../../img/1.png'
    this.setData({
      datalist1: arr2
    })
    console.log(89, id);
  },
  lazy(datas) {
    var id = datas.target.dataset.ids
    // console.log(146,id);
    var arr1 = this.data.newlist1;
    var arr2 = this.data.datalist1;
    arr1[id].original_img = '../../img/shop1_03.png';
    arr2[id].ad_code = '../../img/1.png'
    this.setData({
      newlist1: arr1,
      datalist1: arr2
    })
    console.log(89, id);
  }, 
  lazy1(datas) {
    var id = datas.target.dataset.ids
    // console.log(101,datas);
    var arr2 = this.data.tuilist1
    arr2[id].original_img = '../../img/shop2_03.png'
    this.setData({
      tuilist1: arr2
    })
    // console.log(id);
  },
  part() {
    wx.navigateTo({
      url: '/pages/parts/parts'
    })
  },
  search() {
    wx.navigateTo({
      url: "/pages/search/search?height=100"
    })
  },

  onReachBottom: async function () {
    var page = this.data.page + 1;
    var arr = this.data.tuilist1;
    if (this.data.pagenext);
    let tuilist = await reqlist.tuireq(page);
    arr.push(...tuilist)
    if (tuilist.length < 1) {
      this.setData({
        pagenext: false
      });
    } else {
      this.setData({
        tuilist1: arr,
        page: page
      });
    }
  }
})