// pages/sumprice/sumprice.js
var req = require('../../utils/req')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoplist: [],
    address: [],
    isadd: 1,
    num: 0,
    sumprice: 0,
    address_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // console.log(23,options.data);
    // console.log(21, options);
    let addressid = options.address_id;
    this.setData({
      address_id: addressid
    })

    let that = this;
    if (options.data != undefined) {
      wx.setStorage({
        key: 'shoplist',
        data: options.data
      })
      let list = JSON.parse(options.data);
      // console.log(26,list);
      let sumprice = 0;
      for (var i = 0; i < list.length; i++) {
        sumprice = sumprice + list[i].price * 1
      }
      that.setData({
        shoplist: list,
        sumprice: sumprice,
        num: list.length
      });
    }

    wx.getStorage({
      key: 'shoplist',
      success(res) {

        let list = JSON.parse(res.data);

        let sumprice = 0;
        for (var i = 0; i < list.length; i++) {
          sumprice = sumprice + list[i].price * 1
        }
        that.setData({
          shoplist: list,
          sumprice: sumprice,
          num: list.length
        });
      }
    })

    let user = [];
    wx.getStorage({
      key: "key",
      success: async function (res) {

        user = res.data;
        let res1 = await req.getresList(user.member_id);

        // console.log(32, res1);
        if (res1.length > 0) {
          for (var i = 0; i < res1.length; i++) {
            if (res1[i].is_check == 2) {
              that.setData({
                address: res1[i],
                isadd: 2
              })
            }
          }
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    let user = [];
    wx.getStorage({
      key: "key",
      success: async function (res) {
        // console.log(25,res.data);
        // user.push(JSON.parse(res.data));

        user = res.data;
        let res1 = await req.getresList(user.member_id);

        // console.log(32, res1);
        if (res1.length > 0) {
          for (var i = 0; i < res1.length; i++) {
            if (res1[i].id == that.data.address_id) {
              that.setData({
                address: res1[i],
                isadd: 2
              })
            }
          }
        }
        // console.log(45,that.data.address);
      }
    })
  },
  // 跳转到地址管理页面
  goaddress() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  // 立即购买 创建订单
  nowbuy() {
    let that = this;
    console.log(72, that.data.shoplist);
    let list = that.data.shoplist;
    let sumprice = 0;
    let obj = ''
    for (var i = 0; i < list.length; i++) {
      sumprice = sumprice + list[i].price * 1;
      obj = obj + "_" + list[i].id * 1
    }
    let obj1 = obj.slice(1, 100)
    // console.log(135,obj1);
    let address = that.data.address;
    wx.showModal({
      content: '是否购买',
      success(res) {
        if (res.confirm) {
          wx.request({
            method: "POST",
            url: getApp().globalData.http + "/createOrder",
            data: {
              member_id: list[0].member_id,
              accept_name: address.name,
              telphone: address.tel,
              address: address.city_name + address.area_name + address.address,
              payable_amount: sumprice,
              payable_freight: 0,
              invoice: 0,
              mobile: address.tel,
              postscript: '用户附言',
              order_amount: sumprice,
              goods_type: '微信小程序',
              longitude: address.longitude,
              latitude: address.latitude,
              cart_id: obj1
            },
            success(res) {
              console.log(159,res);
              wx.setStorage({
                key:'order',
                data:{
                  order:res.data.data,
                  price:sumprice
                }
              })
              wx.reLaunch({
                url: '/pages/pay/pay',
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }
})