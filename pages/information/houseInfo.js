// pages/information/houseInfo.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseInfos:null,
    users:null,
    household:null,
    tenant:null,
    id:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that=this
    const doorId = options.id;
    this.setData({
      id:doorId
    })
    http.get(
      '/qrcode/queryHouse',{
        "doorId":doorId
      },
      (res) => {
        console.log(res)
        that.setData({
          'houseInfos':res.data,
          'users':res.data.users,
          'household':res.data.users[0]
        })
        if(res.data.isRented){
          that.setData({
            'tenant':res.data.users[1]
          })
        }
        console.log(that.data.household)
        console.log(that.data.tenant)
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