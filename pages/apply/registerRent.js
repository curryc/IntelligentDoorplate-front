// pages/apply/registerRent.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    gender: null,
    idNumber: null,
    phoneNumber: null,
    email: null,
    address: '',

    doorId: ''
  },
  register() {
    console.log(this.data);
    if(!(this.data.name && this.data.gender && this.data.idNumber && this.data.phoneNumber && this.data.address && this.data.doorId)){
      wx.showToast({
        title: '请输入完整信息',
        duration: 2000,
        icon: 'error'
      })
      return;
    }
    http.post(
      '/user/registerTenantry',
      this.data,
      (res) => {
        console.log(res)
        if (res.status == true) {
          wx.showToast({
            title: '已登记',
            icon: 'success',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: res.message,
            icon: 'error',
            duration: 2000
          })
        }
      }
    )
  },

  selectGender(e) {
    this.setData({
      gender: e.detail == '1'
    })
  },
  inputAddress(e) {
    var s = e.detail.value;
    s = s.join();
    this.setData({
      address: s
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var id = options.id;
    this.setData({
      doorId: id,
    })
    console.log(id)
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