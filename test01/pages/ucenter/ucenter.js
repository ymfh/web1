// pages/ucenter/ucenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navlist: [{
      img: '../../myimg/待付款.png',
      title: '待付款'
    }, {
      img: '../../myimg/待发货.png',
      title: '待发货'
    }, {
      img: '../../myimg/待收货.png',
      title: '待收货'
    }, {
      img: '../../myimg/待评价.png',
      title: '待评价'
    }, {
      img: '../../myimg/退款.png',
      title: '退款/售后'
    }],
    url: '',
    nickname: ''
  },
  set() {
    wx.navigateTo({
      url: "/pages/set/set"
    })
  },
  store() {
    wx.navigateTo({
      url: "/pages/store/store"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    wx.getStorage({
      key: 'key',
      success(res) {
        // console.log(45,res.data);

        if (res.data.nickName == " " && res.data.headerImg == null) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
       
        that.setData({
          url: res.data.headerImg,
          nickname:res.data.nickName
        })
      },
      fail() {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})