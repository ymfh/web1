// pages/productDetail/productDetail.js
var reqlist = require('../../utils/req');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      img: "../../img/shop1_03.png"
    }, {
      img: "../../img/shop2_03.png"
    }],
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    price: 7999,
    name: 'Apple MacBook Air 13.3新款八核M1芯片(7核图形处理器)8G 256G sSD深空灰笔记本电脑MGN63CH/A',
    detlist1: [],
    index: '',

    sku: [],
    url: '',
    skuPid: [],
    skuPid0: 0,
    skuSon: [],
    skuPidSon: 0,
    price: 0,
    member_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(28, options);
    this.data.index = options.id;
    // console.log();
    wx.setNavigationBarTitle({
      title: '详情页面',
    })

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  onShareAppMessage() {
    let that = this;
    return {
      title: that.data.detlist1.goods_name,
      path: '/page/search/search',
      imageUrl: '../../myimg/1_09.png'
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    var a = this.data.index;
    let aa = parseInt(a, 10)
    // console.log(46,aa);
    let detlist = await reqlist.detreq(aa);
    // console.log(49,detlist);

    var s = "";
    if (detlist.goods_content.length == 0) return "";
    s = detlist.goods_content.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<img/g, '<img style="width:100%;height:auto"');
    detlist.goods_content = s
    let price = detlist.shop_price

    if (detlist.sku != '') {
      var skupid = []
      for (var i = 0; i < detlist.sku.length; i++) {
        if (detlist.sku[i].pid == 0) {
          skupid.push(detlist.sku[i])
        }
      }

      var skuson = []
      for (var i = 0; i < detlist.sku.length; i++) {
        if (detlist.sku[i].pid == skupid[0].id) {
          skuson.push(detlist.sku[i])
        }
      }

      this.setData({
        sku: detlist.sku,
        skuPid: skupid,
        skuPid0: skupid[0].id,
        skuSon: skuson,
        skuPidSon: skuson[0].id
      })
    }

    this.setData({
      detlist1: detlist,
      price: price,
      url: detlist.original_img
    });
    // console.log(53, this.data.url);
  },
  check1(e) {
    // console.log(109,e);
    let sku = e.currentTarget.dataset.ids;
    var skuson = []
    for (var i = 0; i < this.data.sku.length; i++) {
      if (this.data.sku[i].pid == sku.id) {
        skuson.push(this.data.sku[i])
      }
    }

    this.setData({
      skuSon: skuson,
      price: skuson[0].price,
      skuPidSon: skuson[0].id,
      skuPid0: sku.id
    })
  },
  check2(e) {
    // console.log(112, e);
    let sku = e.currentTarget.dataset.ids
    this.setData({
      price: sku.price,
      skuPidSon: sku.id
    })
  },

  //点击我显示底部弹出框
  clickme: function () {
    var that = this;
    wx.getStorage({
      key: "key",
      success(res) {
        // console.log(173, JSON.parse(res.data));
        if (res.data.nickName != "" && res.data.headerImg != null) {
          that.showModal()
        } else {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      },
      fail() {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    })
  },

  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  // 添加购物车
  add() {
    let user = [];
    let that = this;
    let member_id = '';
    wx.getStorage({
      key: "key",
      success: function (res) {
        member_id = res.data.member_id;

        if (that.data.sku > 0) {

          var sku = []
          for (var i = 0; i < this.data.sku.length; i++) {
            if (this.data.sku[i].id == this.data.skuPid0) {
              sku.push(this.data.sku[i])
            }
          }
          var skuson = []
          for (var i = 0; i < this.data.sku.length; i++) {
            if (this.data.sku[i].id == this.data.skuPidSon) {
              skuson.push(this.data.sku[i])
            }
          }
          wx.request({
            method: "POST",
            url: 'http://api.pyful.com/addcart', //仅为示例，并非真实的接口地址
            data: {
              "goods_id": sku[0].goods_id,
              "goods_name": this.data.detlist1.goods_name,
              "price": skuson[0].price,
              "number": skuson[0].number,
              "sku_id": sku[0].id,
              "sku_pname": sku[0].name,
              "sku_sname": skuson[0].name,
              "goods_img": this.data.url,
              "remark": 'abc',
              "member_id": member_id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              // console.log(res)
              wx.switchTab({
                url: "/pages/cart/cart"
              })
            }
          })
        } else {
          // console.log(254, this.data.detlist1);

          let obj = that.data.detlist1
          wx.request({
            method: "POST",
            url: 'http://api.pyful.com/addcart', //仅为示例，并非真实的接口地址
            data: {
              "goods_id": obj.goods_id,
              "goods_name": obj.goods_name,
              "price": obj.market_price,
              "number": obj.comment_count,
              "sku_id": null,
              "sku_pname": null,
              "sku_sname": null,
              "goods_img": obj.original_img,
              "remark": 'abc',
              "member_id": member_id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              // console.log(res)
              wx.switchTab({
                url: "/pages/cart/cart"
              })
            }
          })
        }

      }
    });
  }
})