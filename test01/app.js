// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  haslogin: async function () {
    var that = this;
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: 'key',
        success(res) {
          let user = JSON.parse(res.data);
          if (user.headerImg == null && user.nickName == "") {
            resolve(false)
          } else {
            resolve(true)
          }
        },
        fail: async function () {
          resolve(await that.getUser())
        }
      })
    })
  },
  globalData: {
    userInfo: null,
    http: 'http://api.pyful.com'
  }
})