// pages/statistic/taskStatistic.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks: [],
    userInfo: {},
    activeName: '',

    currPage: null,
    alreadyShowAll: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.getData()
  },
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },

  getData() {
    let that = this
    http.post(
      '/task/statistic', {
        "id": app.globalData.userInfo.id,
        "pageNo": that.data.currPage,
        "pageSize": 20
      },
      (res) => {
        console.log(res)
        if (res.data.records) {
          that.setData({
            'tasks': res.data.records,
          })
        } else {
          that.setData({
            alreadyShowAll:true
          })
        }
      }
    )
  },

  onReachBottom: function () {
    if (!this.data.alreadyShowAll) {
      var curpage = this.data.curpage * 1 + 1
      this.setData({
        currPage: curpage //更新data重的页数
      })
      this.getData(); //再次调用（获取下一页的数据）
    } else {
      wx.showToast({
        title: '暂无更多数据', //如果当前页数大于总页数则不会刷新并显示提示
        icon: "none"
      })
    }
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