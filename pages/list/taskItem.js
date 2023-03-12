// pages/list/taskItem.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    qrId: null,
    userId: null,
    name: null,
    type: 1,
    isCompleted: 1,
    startTime: null,
    endTime: null,
    completeTime: null,
    count: null,
    description: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id != undefined) {
      let that = this;
      http.get(
        "/task/get/" + options.id,
        null,
        (res) => {
          console.log(res)
          this.setData(res.data)
          console.log(this.data)
        }
      )
    }
  },

  add() {
    if(!(this.data.userId
      &&this.data.name
      &&this.data.type
      &&this.data.qrId
      &&this.data.isCompleted
      &&this.data.description  )){
      wx.showToast({
        title:"请输入完整信息",
        icon:'error',
        duration:2000
      })
      return
    }
    console.log(this.data)
    http.post(
      "/task/create",
      this.data,
      (res) => {
        console.log(res)
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000,
        })
      }
    )
  },

  delete() {
    http.del(
      "/task/" + this.data.id,
      null,
      (res) => {
        console.log(res)
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000,
        })

        setTimeout(function () {
          wx.navigateBack()
        }, 2000);
      }
    )
  },

  update() {
    console.log(this.data)
    if(!(this.data.userId
      &&this.data.name
      &&this.data.type
      &&this.data.qrId
      &&this.data.isCompleted)){
      wx.showToast({
        title:"请输入完整信息",
        icon:'error',
        duration:2000
      })
      return
    }
    http.post(
      "/task/update",
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
    if(!(this.data.userId
      &&this.data.name
      &&this.data.type
      &&this.data.qrId
      &&this.data.isCompleted)){
      wx.showToast({
        title:"请输入完整信息",
        icon:'error',
        duration:2000
      })
      return
    }
    http.post(
      "/task/create",
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

  selectType(e) {
    this.setData({
      type: parseInt(e.detail)
    })
  },
  selectCompleted(e) {
    this.setData({
      isCompleted: parseInt(e.detail)
    })
    console.log(this.data)
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