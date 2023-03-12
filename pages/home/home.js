// pages/home/home.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */

  data: {
    userInfo: {},
    loged: false,
    indexmenu: [],
    imgUrls: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchData();
    this.setData({
      userInfo: app.globalData.userInfo,
      loged: app.globalData.userInfo ? true : false
    })
    app.globalData.userInfo
  },
  fetchData: function () {
    this.setData({
      indexmenuPatrolPolice: [{
        'icon': '../../assets/images/icon_2.png',
        'text': '获取任务',
        'url': 'task/distributeTask'
      },
      {
        'icon': '../../assets/images/icon_3.png',
        'text': '任务历史',
        'url': 'statistic/taskStatistic'
      }
      ],
      indexmenuHouseHold: [{
        'icon': '../../assets/images/icon_13.png',
        'text': '审核租房申请',
        'url': 'apply/checkApply'
      },
      {
        'icon': '../../assets/images/icon_2.png',
        'text': '查看租房记录',
        'url': 'record/history'
      }
      ],
      indexmenuNormalPopulation: [
        {
          'icon': '../../assets/images/icon_09.png',
          'text': '查看办证进度',
          'url': 'progress/residenceProgress'
        },
        {
          'icon': '../../assets/images/icon_09.png',
          'text': '租房申请进度',
          'url': 'progress/rentProgress'
        }
      ],
      indexmenuAdmin: [{
        'icon': '../../assets/images/icon_05.png',
        'text': '查看数据库',
        'url': 'admin/checkAll'
      },
      {
        'icon': '../../assets/images/icon_11.png',
        'text': '审核居住证',
        'url': 'apply/checkApply'
      }
      ],
    })
  },
  changeRoute: function (url) {
    wx.navigateTo({
      url: `../${url}/${url}`
    })
  },

  distributeTask() {
    wx.navigateTo({
      url: '../task/distributeTask',
    })
  },

  statisticTask() {
    wx.navigateTo({
      url: '../statistic/taskStatistic',
    })
  },

  checkApply() {
    wx.navigateTo({
      url: '../apply/checkApply',
    })
  },

  modPassword() {
    wx.navigateTo({
      url: '../login/modifyPassword',
    })
  },

  logout() {
    app.globalData.userInfo = null
    wx.setStorageSync('id', null)
    wx.setStorageSync('roleId', null)
    this.setData({
      userInfo: {},
      loged: false
    })
  },

  login() {
    wx.navigateTo({
      url: '../login/login',
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
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo,
      loged: app.globalData.userInfo ? true : false
    })
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