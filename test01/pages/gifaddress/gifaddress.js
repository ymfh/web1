var bmap = require('../../libs/bmap-wx.min.js');
var wxMarkerData = [];
Page({
    data: {
        sugData: '',

        markers: [],
        latitude: '',
        longitude: '',
        rgcData: {}
    },
    bindKeyInput: function (e) {
        var that = this;
        if (e.detail.value === '') {
            that.setData({
                sugData: ''
            });
            return;
        }
        var BMap = new bmap.BMapWX({
            ak: 'ZASGDUNeIQzxmYQD7kGabAQ6WTyMmbOj'
        });
        var fail = function (data) {
            console.log(data)
        };
        var success = function (data) {
            var sugData = '';
            for (var i = 0; i < data.result.length; i++) {
                sugData = sugData + data.result[i].name + '\n';
            }
            that.setData({
                sugData: sugData
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
    makertap: function (e) {
        var that = this;
        var id = e.markerId;
        that.showSearchInfo(wxMarkerData, id);
    },
    onLoad: function () {
        var that = this;
        var BMap = new bmap.BMapWX({
            ak: 'ZASGDUNeIQzxmYQD7kGabAQ6WTyMmbOj'
        });
        var fail = function (data) {
            console.log(data)
        };
        var success = function (data) {
            wxMarkerData = data.wxMarkerData;
            that.setData({
                markers: wxMarkerData
            });
            that.setData({
                latitude: wxMarkerData[0].latitude
            });
            that.setData({
                longitude: wxMarkerData[0].longitude
            });
        }
        BMap.regeocoding({
            fail: fail,
            success: success,
            iconPath: '../../img/marker_red.png',
            iconTapPath: '../../img/marker_red.png'
        });
    },
    showSearchInfo: function (data, i) {
        var that = this;
        that.setData({
            rgcData: {
                address: '地址：' + data[i].address + '\n',
                desc: '描述：' + data[i].desc + '\n',
                business: '商圈：' + data[i].business
            }
        });
    }
})