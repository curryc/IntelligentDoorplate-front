// pages/list/applyItem.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');
// const { TickSystem } = require('XrFrame/systems');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    userId: null,
    processorId: null,
    name: null,
    gender: false,
    idNumber: null,
    phoneNumber: null,
    email: null,
    address: null,
    pictureUrl: null,
    verifyStatus: 1,
    applyTime: null,
    startTime: null,
    endTime: null,
    resTime: null,
    resLocation: null,
    type: 1,
    //额外字段
    imageUrl: null
  },

  /**
   * 生命周期函数--监听页面加载
   * type=1：编辑模式，type=2：增添模式
   */
  onLoad(options) {
    console.log(this.data.id)
    if (options.id != undefined) {
      let that = this;
      http.get(
        "/apply/get/" + options.id,
        null,
        (res) => {
          console.log(res.data)
          that.setData(res.data)
          that.setData({
            imageUrl: 'http://127.0.0.1:8080/' + (that.data.pictureUrl.slice(1))
          })
        }
      )
    }
  },
  inputApplyTime(e) {
    this.setData({
      applyTime: e.detail.value + " 00:00:00",
    })
  },
  inputStartTime(e) {
    this.setData({
      startTime: e.detail.value + " 00:00:00",
    })
  },
  inputEndTime(e) {
    this.setData({
      endTime: e.detail.value + " 00:00:00",
    })
  },
  inputResTime(e) {
    this.setData({
      resTime: e.detail.value + " 00:00:00",
    })
  },
  selectStatus(e) {
    this.setData({
      verifyStatus: parseInt(e.detail)
    })
  },
  selectGender(e) {
    this.setData({
      gender: e.detail == '1'
    })
  },
  selectType(e) {
    this.setData({
      type: parseInt(e.detail)
    })
  },
  inputResLocation(e) {
    console.log(e)
    var s = e.detail.value;
    s = s.join();
    this.setData({
      resLocation: s
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

  update() {
    console.log(this.data)
    if(!(this.data.id 
      &&this.data.idNumber
      &&this.data.name
      &&this.data.gender
      &&this.data.email
      &&this.data.phoneNumber
      &&this.data.type
      &&this.data.verifyStatus
      &&this.data.userId
      &&this.data.address
      &&this.data.processorId )){
      wx.showToast({
        title:"请输入完整信息",
        icon:'error',
        duration:2000,
        
      })
      return
    }
    http.post(
      "/apply/update",
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
    if(!(this.data.idNumber
      &&this.data.name
      &&this.data.gender
      &&this.data.email
      &&this.data.phoneNumber
      &&this.data.type
      &&this.data.verifyStatus
      &&this.data.userId
      &&this.data.address
      &&this.data.processorId )){
      wx.showToast({
        title:"请输入完整信息",
        icon:'error',
        duration:2000
      })
      return
    }
    console.log(this.data)
    http.post(
      "/apply/create", {
      "id": this.data.id,
      "userId": this.data.userId,
      "processorId": this.data.processorId,
      "name": this.data.name,
      "gender": this.data.gender,
      "idNumber": this.data.idNumber,
      "phoneNumber": this.data.phoneNumber,
      "email": this.data.email,
      "address": this.data.address,
      "pictureUrl": this.data.pictureUrl,
      "verifyStatus": this.data.verifyStatus,
      "applyTime": this.data.applyTime,
      "startTime": this.data.startTime,
      "endTime": this.data.endTime,
      "resTime": this.data.resTime,
      "resLocation": this.data.resLocation,
      "type": this.data.type,
    },
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
      "/apply/" + this.data.id,
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