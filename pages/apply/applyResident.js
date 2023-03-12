// pages/apply/applyResident.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    doorId: '',
    name: '',
    idNumber: '',
    phoneNumber: '',
    email: '',
    address: '',
    pictureUrl: "",
    gender: true,

    imageUrl: "../../assets/images/picture.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  apply() {
    console.log(this.data);
    if (!(this.data.name && this.data.idNumber && this.data.phoneNumber && this.data.address && this.data.pictureUrl && this.data.gender)) {
      wx.showToast({
        title: '请输入完整信息',
        duration: 2000,
        icon: 'error'
      })
      return;
    }
    http.post(
      '/apply/import',
      this.data,
      (res) => {
        console.log(res)
        if (res.status == true) {
          wx.showToast({
            title: '申请成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: 'error',
            duration: 2000
          })
        }
      }
    )
  },

  inputName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  selectGender(e) {
    this.setData({
      gender: e.detail == '1'
    })
  },
  inputId(e) {
    this.setData({
      idNumber: e.detail.value
    })
  },
  inputPhone(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  inputEmail(e) {
    this.setData({
      email: e.detail.value
    })
  },
  inputAddress(e) {
    var s = e.detail.value;
    s = s.join();
    this.setData({
      address: s
    })
  },

  chooseImage: function () {
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#e64340",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },

  chooseWxImage: function (type) {
    let that = this;
    wx.chooseMedia({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res)
        that.uploadFile(res);
      }
    })
  },
  uploadFile(res) {
    let that = this;
    var tempFiles = res.tempFiles;

    that.setData({
      imageUrl: tempFiles[0].tempFilePath
    })
    http.upload(
      "img",
      tempFiles[0].tempFilePath,
      (res) => {
        console.log(res)
        var data = JSON.parse(res.data);
        that.setData({
          pictureUrl: data.url
        })
        // console.log(that.data.pictureUrl)
      }
    )
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