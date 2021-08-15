var bmap = require('../../libs/bmap-wx.min.js');
var wxMarkerData = [];
var req = require('../../utils/req');
let keys = 'SGXBZ-6X3K6-NYLSF-MALZD-QC6PK-BABOS';
let _page, _this;

Page({
    data: {
        sugData: '',
        address: '天安门',
        arr: [],
        isshow: 1,
        markers: [],
        latitude: '',
        longitude: '',
        str: '',
        usertel: '',
        username: '',
        cart_id: '',
        issum: '',
        customItem: '全部'
    },
    bindKeyInput: function (e) {

        this.setData({
            address: e.detail.value,
            isshow: 2
        })
        if (this.data.address.length < 1) {
            this.setData({
                isshow: 1
            })
        }
        // console.log(this.data.isshow);
        var that = this;
        if (e.detail.value === '') {
            that.setData({
                sugData: '',
                arr: ''
            });
            return;
        }
        var BMap = new bmap.BMapWX({
            ak: 'XY4Ef60jogb9PzEAqt6UQEPG2oKYTawW'
        });
        var fail = function (data) {
            console.log(data)
        };
        var success = function (data) {
            var sugData = '';
            var arr = [];
            for (var i = 0; i < data.result.length; i++) {
                sugData = sugData + data.result[i].name;
                arr.push(sugData)
            }
            that.setData({
                sugData: sugData,
                arr: arr
            });
        }
        BMap.suggestion({
            query: e.detail.value,
            region: '北京',
            city_limit: true,
            fail: fail,
            success: success
        });
    },
    checkAddress(e) {
        // console.log(this.data.longitude,this.data.latitude)
        this.setData({
            address: e.currentTarget.dataset.datas,
            isshow: 1
        })

        var that = this;
        var BMap = new bmap.BMapWX({
            ak: 'XY4Ef60jogb9PzEAqt6UQEPG2oKYTawW'
        });

        var fail = function (data) {
            console.log(data)
        };
        var success = function (data) {
            wxMarkerData = data.wxMarkerData;
            that.setData({
                markers: wxMarkerData,
                address: e.currentTarget.dataset.datas
            });
            that.setData({
                latitude: wxMarkerData[0].latitude
            });
            that.setData({
                longitude: wxMarkerData[0].longitude
            });
            that.getDistrict(that.data.latitude, that.data.longitude);
        }
        BMap.geocoding({
            address: this.data.address,
            fail: fail,
            success: success,
            iconPath: '../../img/marker_red.png',
            iconTapPath: '../../img/marker_red.png'
        });
    },
    onLoad: function (options) {
        // console.log(92, options);
        if (options.id == 2) {
            this.setData({
                address: options.address,
                usertel: options.tel,
                username: options.name,
                cart_id: options.cart_id
            })
        }
        // console.log(126,this.data.latitude);
        // wx.onLocationChange((result) => {
        //     console.log();
        // })
        _this = this;
        wx.getLocation({
            success: function (res) {
                _this.getDistrict(res.latitude, res.longitude)
            },
        })

        this.setData({
            issum: options.id
        })
        // console.log(97,this.data.issum);
        var that = this;
        var BMap = new bmap.BMapWX({
            ak: 'XY4Ef60jogb9PzEAqt6UQEPG2oKYTawW'
        });
        var fail = function (data) {
            console.log(144, data)
        };
        var success = function (data) {
            wxMarkerData = data.wxMarkerData;
            that.setData({
                markers: wxMarkerData,
                address: that.data.address
            });
            that.setData({
                latitude: wxMarkerData[0].latitude
            });
            that.setData({
                longitude: wxMarkerData[0].longitude
            });
            that.getDistrict(that.data.latitude, that.data.longitude);
            // console.log(that.data.latitude,that.data.longitude);
        }
        BMap.geocoding({
            address: that.data.address,
            fail: fail,
            success: success,
            iconPath: '../../img/marker_red.png',
            iconTapPath: '../../img/marker_red.png'
        });
    },
    getDistrict(latitude, longitude) {

        _page = this;
        wx.request({
            url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${keys}`,
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                // console.log(res.data.result.address_component.district, res.data.result)
                // 省
                let province = res.data.result.address_component.province;
                // 市
                let city = res.data.result.address_component.city;
                // 区
                let district = res.data.result.address_component.district;

                _page.setData({
                    district: res.data.result.address_component.district,
                    region: [province, city, district]
                })
            }
        })
    },
    bindRegionChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value
        })
    },
    userName(e) {
        // console.log(113, e.detail.value);
        this.setData({
            username: e.detail.value
        })
    },
    userTel(e) {
        // console.log(113, e.detail.value);
        this.setData({
            usertel: e.detail.value
        })
    },
    // 添加收货地址
    append: function () {

        let that = this
        wx.getStorage({
            key: 'key',
            success(res) {
                // console.log(139, res.data.member_id);
                wx.request({
                    method: 'POST',
                    url: getApp().globalData.http + '/addAddress',
                    data: {
                        city_name: that.data.region[0],
                        province_name: that.data.region[1],
                        area_name: that.data.region[2],
                        address: that.data.address,
                        tel: that.data.usertel,
                        longitude: that.data.longitude,
                        latitude: that.data.latitude,
                        member_id: res.data.member_id,
                        is_check: 1,
                        name: that.data.username
                    },
                    success() {
                        // console.log(202,that.data.region[0]);
                        wx.navigateTo({
                            url: '/pages/sumprice/sumprice',
                        })
                    }
                })
            }
        })
    },
    // 修改收货地址
    edit() {
        let that = this
        wx.getStorage({
            key: 'key',
            success(res) {
                // console.log(139, res.data.member_id);
                wx.request({
                    method: 'POST',
                    url: getApp().globalData.http + '/editAddress',
                    data: {
                        id: that.data.cart_id,
                        city_name: that.data.region[0],
                        province_name: that.data.region[1],
                        area_name: that.data.region[2],
                        address: that.data.address,
                        tel: that.data.usertel,
                        longitude: that.data.longitude,
                        latitude: that.data.latitude,
                        member_id: res.data.member_id,
                        is_check: 1,
                        name: that.data.username
                    },
                    success() {
                        // console.log(202,that.data.region[0]);
                        wx.navigateTo({
                            url: '/pages/sumprice/sumprice',
                        })
                    }
                })
            }
        })
    }
})