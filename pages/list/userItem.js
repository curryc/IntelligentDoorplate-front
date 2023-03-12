// pages/list/userItem.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');
var type;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    name: null,
    gender: false,
    idNumber: null,
    phoneNumber: null,
    email: null,
    address: null,
    isResidence: false,
    roleId: 6
  },
  selectRole(e) {
    this.setData({
      roleId: parseInt(e.detail)
    })
  },
  selectResidence(e) {
    this.setData({
      isResidence: e.detail == '1'
    })
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
    if (options.id != undefined) {
      let that = this;
      http.get(
        "/user/get/" + options.id,
        null,
        (res) => {
          console.log(res)
          that.setData(res.data)
          this.setData(res.data)
          console.log(that.data)
        }
      )
    }
    type = options.id
  },


  delete() {
    http.del(
      "/user/" + this.data.id,
      null,
      (res) => {
        console.log(res);
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
    if(!(this.data.gender
      &&this.data.name
      &&this.data.idNumber
      &&this.data.phoneNumber
      &&this.data.email
      &&this.data.isResidence
      &&this.data.roleId  )){
      wx.showToast({
        title:"请输入完整信息",
        icon:'error',
        duration:2000
      })
      return
    }
    http.post(
      "/user/update",
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
    if(!(this.data.gender
      &&this.data.name
      &&this.data.idNumber
      &&this.data.phoneNumber
      &&this.data.email
      &&this.data.isResidence
      &&this.data.roleId)){
      wx.showToast({
        title:"请输入完整信息",
        icon:'error',
        duration:2000
      })
      return
    }
    http.post(
      "/user/create",
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

  inputName(e) {
    // this.setData({
    //   name: e.detail.value
    // })
  },
  inputGender(e) {
    this.setData({
      gender: e.detail.value == 1
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
  inputResident(e) {
    this.setData({
      isResidence: e.detail.value
    })
  },
  inputRole(e) {
    this.setData({
      roleId: e.detail.value
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