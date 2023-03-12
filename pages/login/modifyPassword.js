// pages/login/modifyPassword.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    oldPassword: null,
    newPassword: null,

    same: null
  },

  apply() {
    if(!(this.data.newPassword && this.data.oldPassword)){
      wx.showToast({
        title: '请输入完整信息',
        duration: 2000,
        icon: 'error',
      })
    }else{
    console.log(this.data.userInfo)
    if (this.check()) {
      http.post(
        '/user/changePassword',
        {
          'id':this.data.userInfo.id,
          'password':this.data.newPassword
        },
        (res) => {
          console.log('success')
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
        }
      )
    } else {
      wx.showToast({
        title: '输入密码错误',
        icon: 'error',
        duration: 2000
      })
      console.log('failed')
    }
  }
  },

  check() {
    if (this.data.oldPassword == this.data.userInfo.password && this.data.same) {
      return true;
    }
    return false;
  },

  ensurePassword(e) {
    this.setData({
      same: e.detail == this.data.newPassword
    })
    console.log(e)
    console.log(this.data.newPassword)
    console.log(this.data.same)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userInfo: app.globalData.userInfo,
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