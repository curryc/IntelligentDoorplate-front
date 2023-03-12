// pages/task/complete.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    processorId: '',
    doorId: '',
    visitTime: "",

    description: '',
    address: "",

    latitude: null,
    longitude: null,

    pictureUrl: "",
    taskType: null,

    
    imageUrl:"../../assets/images/picture.png"
  },

  apply() {
    console.log(this.data)
    if(!(this.data.processorId && this.data.doorId && this.data.visitTime && this.data.address && this.data.latitude && this.data.longitude )){
      wx.showToast({
        title: '请输入完整信息',
        duration: 2000,
        icon: 'error'
      })
      return;
    }
    http.post(
      "/message/complete",
      this.data,
      (res) => {
        console.log(res)
        wx.showToast({
          title: '提交成功',
          duration: 2000,
          icon: 'success'
        })
      }
    )
  },

  selectRented(e){
    this.setData({
      rented: parseInt(e.detail)
    })
  },

  inputRented(e) {
    this.setData({
      rented: e.detail.value
    })
  },

  inputDescription(e) {
    this.setData({
      description: e.detail.value
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
    let that = this;
    const id = options.doorId;
    this.setData({
      doorId: id,
      processorId: app.globalData.userInfo.id,
      visitTime: (utils.formatTime(new Date()))
    })
    // 获取是否是定时任务
    http.get(
      "/task/getByDoor", {
        'doorId': that.data.doorId
      },
      (res) => {
        console.log(res);
        if (res.status) {
          that.setData({
            taskType: 1
          })
        } else {
          that.setData({
            taskType: 2
          })
        }
      }
    )
    // 获取当前位置，用于构建表单
    wx.getLocation({
      type: 'wgs84', //gcj02
      success(res) {
        console.log(res);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
      fail(res) {
        console.log(res);
      }
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
      imageUrl:tempFiles[0].tempFilePath
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