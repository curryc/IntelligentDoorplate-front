// pages/admin/checkAll.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tables: [],
    activeKey:-1,
    currPage:null,
    table:["user","apply","message","qrcode","record","task"],
    records:[],
    alreadyShowAll: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    http.get(
      "/statistic/admin",
      null,
      (res) => {
        console.log(res)
        that.setData({
          tables: [{
              'name': "user",
              'count': res.otherData.user
            },
            {
              'name': "apply",
              'count': res.otherData.apply
            },
            {
              'name': "message",
              'count': res.otherData.message
            },
            {
              'name': "qrcode",
              'count': res.otherData.qrcode
            },
            {
              'name': "record",
              'count': res.otherData.record
            },
            {
              'name': "task",
              'count': res.otherData.task
            },
          ]
        })
      }
    )
  },
  onChange(event) {
    this.setData({
      activeKey: event.detail,
      currPage: 1,
      records: []
    })
    this.getData()
  },
  getData() {
    console.log(this.data.currPage)
    http.get(
      '/' + this.data.table[this.data.activeKey] + '/page', {
        'pageNo': this.data.currPage,
        'pageSize': 20
      },
      (res) => {
        console.log(res)
        if (res.data.records) {
          var l = this.data.records.concat(res.data.records)
          this.setData({
            records: l
          })
        } else {
          that.setData({
            alreadyShowAll:true
          })
        }
      }
    )
  },
  getMore(){
    if (!this.data.alreadyShowAll) {
      var curpage = this.data.currPage + 1
      this.setData({
        currPage: curpage //更新data重的页数
      })
      this.getData(); //再次调用（获取下一页的数据）
    } else {
      wx.showToast({
        title: '暂无更多数据', //如果当前页数大于总页数则不会刷新并显示提示
        icon: "none"
      })
    }},
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