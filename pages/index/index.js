// index.js
// 获取应用实例
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');

Page({
  data: {
    userInfo: {}
  },
  // 事件处理函数
  goToUserHome() {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  onLoad() {
    // 登录
    let that = this
    var id = wx.getStorageSync('id')
    if (id) {
      http.get(
        '/user/get/' + id,
        null,
        (res) => {
          app.globalData.userInfo = res.data;
          that.setData({
            userInfo: res.data,
          })
          console.log(app.globalData.userInfo)
        }
      )
    } else {
      console.log("not login")
      app.globalData.userInfo = null;
    }
  },

  onShow() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },


  scanCode: function () {
    let that = this;
    wx.scanCode({
      onlyfromCamera: true,
      success: function (res) {
        console.log(res);
        that.setData({
          code: res.result
        })
        var items = utils.getQueryString(res.result)
        const doorId = res.result.substring(res.result.indexOf('id=') + 3)
        http.get(
          '/qrcode/get/'+doorId,
          null,
          (res) => {
            if(!res.data.isBound){
              wx.navigateTo({
                url: '../apply/applyHost?id='+doorId,
              })
            }else{
              wx.navigateTo({
                url: '../doorplate/doorplate?' + that.data.code.split('?'),
              })
            }
          }
        )
      }
    })
  },
})