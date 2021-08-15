// pages/address/address.js
var req = require('../../utils/req')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    checkboxed:0,
    is_check:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '地址管理',
    })

    let user = [];
    let that = this;
    wx.getStorage({
      key: "key",
      success: async function (res) {
        // console.log(25,res.data);
        // user.push(JSON.parse(res.data));

        user = res.data;
        let res1 = await req.getresList(user.member_id);

        that.setData({
          address: res1
        })
        // console.log(34,that.data.address);
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  gogifaddress(e) {
    // console.log(e.currentTarget.dataset.item);
    let item = e.currentTarget.dataset.item;
    let ids = e.currentTarget.dataset.ids;
    if (ids == 1) {
      wx.navigateTo({
        url: '/pages/addloction/addloction?id=' + ids
      })
    } else {
      wx.navigateTo({
        url: '/pages/addloction/addloction?id=' + ids + '&address=' + item.address + '&name=' + item.name + '&tel=' + item.tel + '&cart_id=' + item.id,
      })
    }
  },
  setCheckedAddress(e) {
    // console.log(60,e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    wx.reLaunch({
      url: '/pages/sumprice/sumprice?address_id='+id,
    })
    // let that = this
    // wx.getStorage({
    //   key: 'key',
    //   success(res) {
    //     // console.log(139, res.data.member_id);
    //     wx.request({
    //       method: 'POST',
    //       url: 'http://api.pyful.com/setCheckedAddress',
    //       data: {
    //         id: id,
    //         member_id: res.data.member_id
    //       },
    //       success(res1) {
    //         console.log(75, res1);
    //         wx.navigateTo({
    //           url: '/pages/sumprice/sumprice',
    //         })
    //       }
    //     })
    //   }
    // })
  },
  delete(e) {
    // console.log(85,e.currentTarget.dataset.item);
    let id = e.currentTarget.dataset.item;
    wx.showModal({
      content: '是否删除收货地址',
      success(res) {
        if (res.confirm) {

          wx.request({
            url: 'https://api.pyful.com/delAddress',
            data: {
              id: id
            },
            success(e) {
              // console.log(93,e);
              wx.navigateTo({
                url: '/pages/address/address',
              })
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  setchecked(e){
    // console.log(114,e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    let that = this
    wx.getStorage({
      key: 'key',
      success(res) { 
        // console.log(139, res.data.member_id);
        wx.request({
          method: 'POST',
          url: 'http://api.pyful.com/setCheckedAddress',
          data: {
            id: id,
            member_id: res.data.member_id
          }, 
          success(res1) {
            // console.log(res1);
            that.setData({
              is_check:e.currentTarget.dataset.id
            })
            // console.log(that.data.is_check);
            that.onLoad()
         
          }
        })
      }
    })
  }
 
})