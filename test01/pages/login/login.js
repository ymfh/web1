// pages/login/login.js
var req=require('../../utils/req')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: []
  },
  login() {
    // 授权
    let userInfo = [];
    let userInfoStorage = []
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo);
        userInfo.push(res.userInfo)
        // 获取缓存中的数据、
        wx.getStorage({
          key: 'key',
          success: async function (e) {
            console.log(e.data);
            userInfoStorage.push(e.data);

            let res2 = await req.updateUserinfo(userInfoStorage[0].member_id, userInfo[0].nickName, userInfo[0].avatarUrl);
            

            // console.log(37, res2);
            if (res2.code == 0) {
              e.data.headerImg = res.userInfo.avatarUrl;
              e.data.nickName = res.userInfo.nickName;
              wx.setStorage({
                key: "key",
                data: e.data
              })
            }
          }
        })


      }
    })

  },
  res() {
    wx.navigateTo({
      url: "/pages/register/register"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getStorage({
      key: 'key',
      success(res) {
        console.log(res.data);
        if (res.data.headerImg == null && res.data.nickName == '') {
          // wx.navigateTo({
          //   url: "/pages/register/register",
          // })
        } else {
          wx.switchTab({
            url: '/pages/ucenter/ucenter',
          })
        }
        // if(res.data.)
      },
      fail() {
        wx.login({
          success(res) {
            if (res.code) {
              // console.log();
              //发起网络请求
              wx.request({
                url: 'http://api.pyful.com/oauthUser/' + res.code,
                success: async function (e) {
                  console.log(e);
                  wx.setStorage({
                    key: "key",
                    data: e.data.data
                  })
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })

  },

})