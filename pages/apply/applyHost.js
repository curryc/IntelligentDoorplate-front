// pages/apply/applyHost.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    doorId: '',
    gender: '',
    name: '',
    idNumber: '',
    phoneNumber: '',
    email: '',
    address: ''
  },
  apply() {
    console.log(this.data);
    if(!(this.data.doorId && this.data.gender && this.data.name && this.data.idNumber && this.data.phoneNumber && this.data.address)){
      wx.showToast({
        title: '请输入完整信息',
        duration: 2000,
        icon: 'error'
      })
      return;
    }
    http.post(
      '/user/addInfo',
      this.data,
      (res) => {
        console.log(res)
        wx.showToast({
          title: '登记成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(() => wx.navigateTo({
          url: '../doorplate/doorplate',
        }), 500)
      }
    )
  },
  onTapApply() {
    wx.navigateTo({
      url: '../apply/applyResident',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    var id = options.id;
    this.setData({
      doorId: id
    })
    http.get(
      "/qrcode/queryHouse",
      {
        "doorId": id
      },
      (res) => {
        console.log(res)
        var host = res.data.users[0]
        that.setData({
          name: host.name,
          idNumber: host.idNumber,
          phoneNumber: host.phoneNumber,
          email: host.email,
          address: host.address,
          gender: host.gender
        })
        console.log(that.data)
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