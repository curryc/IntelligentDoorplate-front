// pages/list/messageItem.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    description:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id != undefined) {
      http.get(
        "/message/get/" + options.id,
        null,
        (res) => {
          console.log(res)
          this.setData(res.data)
          this.setData({
            imageUrl: 'http://127.0.0.1:8080/' + (this.data.pictureUrl.slice(1))
          })
        }
      )
    }
  },
  update() {
    console.log(this.data)
    if(!(this.data.taskId 
      && this.data.latitude 
      &&this.data.longitude
      &&this.data.userId
      &&this.data.address
      &&this.data.description
      &&this.data.visitTime )){
      wx.showToast({
        title:"请输入完整信息",
        icon:'error',
        duration:2000,
        
      })
      return
    }
    http.post(
      "/message/update",
      this.data,
      (res) => {
        console.log(res)
        if (res.status == true) {
          wx.showToast({
            title: '更改成功',
            icon: 'success',
            duration: 2000,
          })
        }
      }
    )
  },

  add() {
    console.log(this.data)
    if(!(this.data.taskId 
      && this.data.latitude 
      &&this.data.longitude
      &&this.data.userId
      &&this.data.address
      &&this.data.description
      &&this.data.visitTime )){
      wx.showToast({
        title:"请输入完整信息",
        icon:'error',
        duration:2000,
        
      })
      return
    }
    http.post(
      "/message/create",
      this.data,
      (res) => {
        console.log(res)
        if (res.status == true) {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000,
          })
        }

      }
    )
  },
  delete() {
    http.del(
      "/message/" + this.data.id,
      null,
      (res) => {
        console.log(res)
      }
    )
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000,
    })

    setTimeout(function () {
      wx.navigateBack()
    }, 2000);
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