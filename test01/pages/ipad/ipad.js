// pages/ipad/ipad.js
import reqlist from '../../utils/req'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: '',
    sortlist1: [],
    pagenext: 1,
    ispagenext:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(15, options.title)
    var dataarr = options.title.split(',');
    // console.log(dataarr);
    let title = dataarr[0];
    wx.setNavigationBarTitle({
      title: title,
    })
    this.setData({
      page: dataarr[1]
    })
    // console.log(26,this.data.page);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    var page = this.data.page;
    var id = this.data.pagenext;
    let a = await reqlist.sortreq(page, id);
    // console.log(37,a);
    this.setData({
      sortlist1: a
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
  onReachBottom: async function () {
    // console.log('123');
    var page = this.data.page;
    var id = this.data.pagenext * 1 + 1;
    var sortlist = this.data.sortlist1;
    if (this.data.ispagenext)
      var arr = await reqlist.sortreq(page, id);
    // console.log('123');
    console.log(86, arr);

    sortlist.push(...arr)
    if (arr.length < 1) {
      this.setData({
        ispagenext: false
      })
    } else {
      this.setData({
        pagenext: id,
        sortlist1: sortlist
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})