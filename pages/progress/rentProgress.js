// pages/progress/rentProgress.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyRents: [],
    verifyStatusText: ['','已提交','审核成功','审核失败']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that=this;
    http.get(
      '/apply/applicationprogress',{
        "userId":app.globalData.userInfo.id,
      },
      (res) => {
        console.log(res)
        that.setData({
          'applyRents':res.data,
        })
      }
    )
  },
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
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