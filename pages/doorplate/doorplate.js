// pages/doorplate/doorplate.js
const app = getApp();
var utils = require('../../utils/util.js');
var http = require('../../utils/http');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loged:false,
    id:'',
    hostId:'',
    userInfo:{},
    imgUrls: [
      'https://stc-new.8531.cn/assets/20190807/1565187316350_5d4adcf4159bb84750660a2d.jpeg',
      'https://tse1-mm.cn.bing.net/th/id/OIP-C.6z1K3RLxMscPKYYLhuGsTQHaD-?pid=ImgDet&rs=1',
      'https://tse1-mm.cn.bing.net/th/id/OIP-C.SlMgC-YYZ6K5g_iodEcSrwHaE7?pid=ImgDet&rs=1',
    ],
  },

  navTo(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const doorId = options.id;
    this.setData({
      loged: app.globalData.userInfo? true : false,
      id:doorId,
    })
    http.get(
      '/qrcode/get/' + doorId,
      null,
      (res) => {
        console.log(res)
        this.setData({
          hostId:res.data.userId
        })
      }
    )
  },

  login() {
    wx.navigateTo({
      url: '../login/login',
    })
  },

  completeTask() {
    wx.navigateTo({
      url: '../task/complete?doorId=' + this.data.id,
    })
  },

  applyRent() {
    wx.navigateTo({
      url: '../apply/applyRent?id=' + this.data.id,
    })
  },

  applyResident() {
    wx.navigateTo({
      url: '../apply/applyResident',
    })
  },

  bindHost() {
    wx.navigateTo({
      url: '../apply/applyHost?id=' + this.data.id,
    })
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
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo,
    })
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