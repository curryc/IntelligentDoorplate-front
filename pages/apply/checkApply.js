// pages/apply/checkApply.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    applies: [],
    alreadyCheck:[]
  },

  inputResTime(e) {
    const applyId = e.currentTarget.dataset.applyId;
    const newResTime = e.detail.value;
    const applyIndex = this.data.applies.findIndex(apply => apply.id === applyId);
    const apply = this.data.applies[applyIndex];
    apply.resTime = newResTime + " 00:00:00";
    this.setData({
      [`applies[${applyIndex}]`]: apply,
    });
  },
  inputResLocation(e) {
    const applyId = e.currentTarget.dataset.applyId;
    const newResLocation = e.detail.value.join(",");
    const applyIndex = this.data.applies.findIndex(apply => apply.id === applyId);
    const apply = this.data.applies[applyIndex];
    apply.resLocation = newResLocation;
    this.setData({
      [`applies[${applyIndex}]`]: apply,
    });
  },

  checkAgree(e) {
    const applyId = e.currentTarget.dataset.id; // 获取当前按钮对应的申请的id
    const applyIndex = this.data.applies.findIndex(apply => apply.id === applyId);
    const apply = this.data.applies[applyIndex];
    const resTime = apply.resTime;
    const resLocation = apply.resLocation; // 从 apply 对象中获取 resLocation 属性
    console.log(resLocation)
    console.log(resTime)
    if(this.data.id == 1 && !(resLocation && resTime)){
      wx.showToast({
        title: '请输入时间地点',
        duration: 2000,
        icon: 'error'
      })
      return;
    }
    let that = this;

    http.post(
      '/apply/check', {
        "id": applyId,
        "resTime": resTime,
        "resLocation": resLocation,
        "verifyStatus": 2
      },
      (res) => {
        console.log(res)
        wx.showToast({
          title: '审核成功',
          icon: 'success',
          duration: 2000
        })
        var tmp = that.data.applies;
        tmp[applyIndex].verifyStatus = 2
        that.setData({
          applies:tmp
        })
      },
    )
  },

  checkRefuse(e) {
    const applyId = e.currentTarget.dataset.id; // 获取当前按钮对应的申请的id
    const applyIndex = this.data.applies.findIndex(apply => apply.id === applyId);
    let that = this;
    http.post(
      '/apply/check', {
        "id": applyId,
        "resTime": null,
        "resLocation": null,
        "verifyStatus": 3
      },
      (res) => {
        console.log(res)
        wx.showToast({
          title: '已拒绝  ',
          icon: 'success',
          duration: 2000
        })
        var tmp = that.data.applies;
        tmp[applyIndex].verifyStatus = 3
        that.setData({
          applies:tmp
        })
        console.log(that.data.applies)
      },
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad(options) {
    let that = this;
    http.get(
      '/apply/mine', {
        "id": app.globalData.userInfo.id,
      },
      (res) => {
        console.log(res)
        that.setData({
          'applies': res.data.records,
          id:app.globalData.userInfo.id,
        })
      }
    )
  },
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
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
