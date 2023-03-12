const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: null,
    isBound: false,
    isRented: false,
    pictureUrl: null,
    documentUrl: null,
    type: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id != undefined) {
      http.get(
        "/qrcode/get/" + options.id,
        null,
        (res) => {
          console.log(res)
          this.setData(res.data)
          this.setData({
            pictureUrl: 'http://127.0.0.1:8080/' + (this.data.pictureUrl.slice(1))
          })
          console.log(this.data)
        }
      )
      http.get(
        "/qrcode/getPolice/"+options.id,
        null,
        (res)=>{
          console.log('民警')
          this.setData({
            police:res.data
          })
        }
      )
    }
  },
  lookDocument() {
    let that = this
    if (this.data.documentUrl!=null) {
      utils.showLoading()
      wx.downloadFile({
        url: 'http://127.0.0.1:8080/' + (that.data.documentUrl.slice(1)),
        success: function (res) {
          console.log(res, "wx.downloadFile success res")
          if (res.statusCode != 200) {
            utils.hideLoadingWithErrorTips()
            return false
          }
          var Path = res.tempFilePath //返回的文件临时地址，用于后面打开本地预览所用
          wx.openDocument({
            filePath: Path,
            showMenu: true,
            success: function (res) {
              console.log('打开成功');
              utils.hideLoading()
            }
          })
        },
        fail: function (err) {
          console.log(err, "wx.downloadFile fail err");
          utils.hideLoadingWithErrorTips()
        }
      })
    } else {
      wx.showToast({
        title: '暂无文档',
        icon:'error',
        duration: 2000,
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})