var http = "https://api.pyful.com"

const newreq = async () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: http + '/goods/is_new/1', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("新品", res.data);
        resolve(res.data.data)
        // return res.data
      }
    })
  })
}

const tuireq = async (index) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: http + '/goods/is_recommend/' + index, //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("推荐", res.data);
        resolve(res.data.data)
        // return res.data
      }
    })
  })
}

const detreq = async (index) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: http + '/goods/detail/' + index, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("详情", res.data);
        resolve(res.data.data)
        // return res.data
      }
    })
  })
}



const banreq = async () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: http + "/bannerList", //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("轮播", res.data);
        resolve(res.data.data)
        // return res.data
      }
    })
  })
}


const sortreq = async (e, i) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: http + "/goods/getMenuGoodsList/" + e + "/" + i, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("分类", res.data);
        resolve(res.data.data)
        // return res.data
      }
    })
  })
}

const updateUserinfo = async (member_id, nickName, headerImg) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: http + "/saveUser", //仅为示例，并非真实的接口地址
      data: {
        member_id: member_id,
        nickName: nickName,
        headerImg: headerImg
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("更新用户数据", res.data);
        resolve(108,res.data.data)
        // return res.data
        // 授权成功之后把获取到的用户信息存储在storage后 跳转到我的页面
        wx.switchTab({
          url: '/pages/ucenter/ucenter',
        })
      }
    })
  })
}

const addreq = async () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: http + "/addcart", //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("添加", res.data);
        resolve(res.data.data)
        // return res.data
      }
    })
  })
}

const getcartreq = async () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: http + "/getCartList", //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("获取", res.data);
        resolve(res.data.data)
        // return res.data
      }
    })
  })
}

const deletereq = async (id) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: http + "/deletecart", //仅为示例，并非真实的接口地址
      data: {
        id: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("删除", res.data);
        resolve(res.data.data)
        // return res.data
      }
    })
  })
}

const clearreq = async () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: http + "/clearcart", //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("清除", res.data);
        resolve(res.data.data)
        // return res.data
      }
    })
  })
}

const addAddress = async (data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: http + "/addAddress", //仅为示例，并非真实的接口地址
      data: {
        data: data
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("添加地址", res.data);
        resolve(res.data.data)
        // return res.data
      }
    })
  })
}

const getresList = async (id) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: http + "/getAddressList", //仅为示例，并非真实的接口地址
      data: {
        member_id: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("获取地址", res.data);
        resolve(res.data.data)
        // return res.data
      }
    })
  })
}

module.exports = {
  newreq: newreq,
  tuireq: tuireq,
  detreq: detreq,
  banreq: banreq,
  sortreq: sortreq,
  updateUserinfo: updateUserinfo,
  addreq: addreq,
  getcartreq: getcartreq,
  deletereq: deletereq,
  clearreq: clearreq,
  addAddress:addAddress,
  getresList: getresList
}