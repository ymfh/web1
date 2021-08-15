// pages/cart/cart.js
var reqlist = require('../../utils/req')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select_all: false,
    batchIds: '',
    arry: [{
      id: 1,
      mode: '相机读卡器',
      text: '../../cartimg/1_03.png',
      desc: '闪电转SD卡 RMB',
      price: 243,
      // checked: false
    }, {
      id: 2,
      mode: '双项充电器',
      text: '../../cartimg/1_06.png',
      desc: 'MagSafe RMB',
      price: 1049,
      // checked: false
    }, {
      id: 3,
      mode: '回环式运动表带',
      text: '../../cartimg/1_08.png',
      desc: '44毫米曜石灰色Nike RMB',
      price: 379,
      checked: true
    }, {
      id: 4,
      mode: '无线充电盒',
      text: '../../cartimg/1_10.png',
      desc: '适用于AirPods的 RMB',
      price: 661,
      checked: true
    }],
    price: 0,
    shoplist: [],
    shopcount: 0,
    issumprice: 1,
    isdelete: 1,
    checkboxed: false
  },

  selectall: function () {
    var that = this;
    for (let i = 0; i < that.data.shoplist.length; i++) {
      that.data.shoplist[i].checked = (!that.data.select_all)
    }
    that.setData({
      shoplist: that.data.shoplist,
      select_all: (!that.data.select_all)
    })
    this.sumPrice();
  },

  selectdan: function (index) {
    let i = index.currentTarget.dataset.index;
    this.data.shoplist[i].checked = !this.data.shoplist[i].checked;
    
    this.setData({
      shoplist: this.data.shoplist
    })
    // console.log(6,this.data.shoplist);
    this.sumPrice()
  },


  sumPrice() {
    var sum = 0;
    for (var i = 0; i < this.data.shoplist.length; i++) {
      if (this.data.shoplist[i].checked == true) {
        sum = sum + this.data.shoplist[i].price * 1;
      }
    }

    this.setData({
      price: sum
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(88888,getApp().globalData.http);
    this.sumPrice();
    var that = this;
    wx.getStorage({
      key: 'key',
      success(res) {
        // console.log(101,res.data.member_id);
        let member_id = res.data.member_id
        wx.request({
          method: "get",
          url: getApp().globalData.http+'/getCartList', //仅为示例，并非真实的接口地址
          data: {
            member_id: member_id
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            // console.log(109, res.data.data)
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].checked = that.data.checkboxed
            }

            that.setData({
              shoplist: res.data.data,
              shopcount: res.data.data.length
            })

          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    this.onLoad()
    wx.getStorage({
      key: "getTel",
      success() {
        that.setData({
          issumprice: 2
        })
      }
    })
  },
  delete: async function (e) {
    console.log(114, e);
    let id = e.currentTarget.dataset.ids;
    // console.log(116,id);
    id = parseInt(id, 10)
    let res = await reqlist.deletereq(id);
    this.onShow()
  },
  gosumprice: function () {
    var list = [];
    var num = 0;
    for (var i = 0; i < this.data.shoplist.length; i++) {
      if (this.data.shoplist[i].checked == true) {
        list.push(this.data.shoplist[i]);
        num = num + 1
      }
    }
    // console.log(154,num);
    // console.log(159,this.data.shoplist);
    let shop=JSON.stringify(list);
    if (num > 0) {
      wx.navigateTo({
        url: '/pages/sumprice/sumprice?data=' + shop,
      })
    }else{
      wx.showToast({
        title: '请先选择商品',
      })
    }

  },
  getPhoneNumber(e) {

    var iv = e.detail.iv;
    var encryptedData = e.detail.encryptedData;
    let that = this;
    console.log(167, iv);
    console.log(168, encryptedData);

    wx.getStorage({
      key: "key",
      success: async function (res) {
        // console.log(143, res.data.info.session_key);
        let session_key = res.data.info.session_key;
        let openid = res.data.info.openid;
        // console.log(session_key);
        // console.log(openid);
        wx.getStorage({
          key: "getTel",
          success(res) {
            console.log(150, res.data);
            that.setData({
              issumprice: 2
            })
          },
          fail() {

            wx.request({
              method: 'POST',
              url: 'http://api.pyful.com/getTelPhone',
              data: {
                session_key: session_key,
                iv: iv,
                encryptedData: encryptedData,
                openid: openid
              },
              success(res) {
                console.log(156, res.data.data.phoneNumber);
                wx.setStorage({
                  key: 'getTel',
                  data: res.data.data.phoneNumber
                })
                if (res.data.data.phoneNumber != null) {
                  that.setData({
                    issumprice: 2
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  check() {
    this.setData({
      isdelete: 2
    })
  },
  check1() {
    let that = this;
    wx.getStorage({
      key: 'key',
      success(res) {
        // console.log(224,res.data.member_id);
        wx.request({
          url: getApp().globalData.http+'/clearcart',
          data: {
            member_id: res.data.member_id
          },
          success(e) {
            console.log(231, e);
            that.setData({
              isdelete: 1
            })
            wx.reLaunch({
              url: '/pages/cart/cart',
            })
          }
        })
      }
    })
  }
})