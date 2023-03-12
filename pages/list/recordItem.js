// pages/list/recordItem.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      id: null,
      applyId:null,
      qrId: null,
      tenantId: null,
      isRented: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id != undefined) {
    http.get(
      "/record/get/" + options.id,
      null,
      (res) => {
        console.log(res)
        this.setData(res.data)
      }
    )
    }
  },

  delete() {
    http.del(
      "/record/" + this.data.id,
      null,
      (res) => {
        console.log(res)
      }
    )
    wx.showToast({
      title: '删除成功',
      icon:'success',
      duration:2000,
    })

    setTimeout( function(){
      wx.navigateBack()
      }, 2000 );
  },
  update() {
    if(!(this.data.applyId
      &&this.data.qrId
      &&this.data.isRented
      &&this.data.tenantId )){
      wx.showToast({
        title:"请输入完整信息",
        icon:'error',
        duration:2000
      })
      return
    }
    console.log(this.data)
    http.post(
      "/record/update",
      this.data,
      (res) => {
        console.log(res)
        if (res.status==true) {
          wx.showToast({
            title: '更改成功',
            icon:'success',
            duration:2000,
          })
        }
      }
    )
  },
  add() {
    if(!(this.data.applyId
      &&this.data.qrId
      &&this.data.isRented
      &&this.data.tenantId  )){
      wx.showToast({
        title:"请输入完整信息",
        icon:'error',
        duration:2000
      })
      return
    }
    console.log(this.data)
    http.post(
      "/record/create",
      this.data,
      (res) => {
        console.log(res)        
        if (res.status==true) {
          wx.showToast({
            title: '添加成功',
            icon:'success',
            duration:2000,
          })
        }
      }
    )
  },
  selectRented(e) {
    this.setData({
      isRented: parseInt(e.detail.value)
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