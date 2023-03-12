// pages/task/goComplete.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: null,

    //map
    scale: 14,
    markers: [],
    longitude:null,
    latitude:null,       
    accuracy: null,
    speed: null,
    timer:null,
    nearby:false
  },

  complete(){
    wx.navigateTo({
      url: '../task/complete?doorId=' + this.data.task.qrId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var id = options.id;
    let that = this;
    this.onLocationTap();

    http.get(
      '/task/getHouseInfo?id=' + id,
      null,
      (res) => {
        console.log(res)
        that.setData({
          task: res.data
        })
        that.showMarkers();
      }
    )

    this.startAutoMonitor();
  },

  startAutoMonitor() {
    let that = this;
    var monitorTimer = null;
    monitorTimer = setInterval(function () {
      that.onLocationTap();
    }, 5000);
    this.setData({
      timer: monitorTimer
    });
  },

  onLocationTap(e) {
    //关于微信小程序wx.getLocation 在真机上不显示不执行问题
    //https://blog.csdn.net/weixin_59556897/article/details/126995582
    console.log("[onLocationTap]e=" + e);
    let that = this
    wx.getLocation({
      //type: 'wgs84',
      type: 'gcj02',
      success(res) {
        console.log(res);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          accuracy: res.accuracy,
          speed: res.speed,
        })
        //定到地图中心
        let mpCtx = wx.createMapContext("map");
        mpCtx.moveToLocation();
        //移动完毕
        that.check();
        // that.getAddress(longitude, latitude);
      },
      faile(res) {
        console.log("[onLocationTap]返回错误：" + res);
      },
    })
    console.log("[onLocationTap]经度=" + this.data.longitude + "，纬度=" + this.data.latitude);
  },

  check(){
    if(this.data.longitude < this.data.task.longitude + 0.05 &&
      this.data.longitude > this.data.task.longitude - 0.05 &&
      this.data.latitude < this.data.task.latitude + 0.05 &&
      this.data.latitude > this.data.task.latitude - 0.05){
        this.setData({
          nearby:true
        })
      }
  },

  setMapHeight() {
    var that = this;
    wx.getSystemInfo({ //地图全屏显示-https://www.likecs.com/show-203386963.html
      success: function (res) {
        that.setData({
          height: res.windowHeight //wxml的map的style="width: 100%; height: {{height}}px;"，就可以用这个
        })
      },
    })
  },

  showMarkers() {
    let markers = [];
    var point = {
      "id": this.data.task.id,
      "longitude": this.data.task.longitude,
      "latitude": this.data.task.latitude
    };
    var marker = this.createMarker(point);
    markers.push(marker);
    this.setData({
      markers: markers,
    });
    console.log(this.data.markers)
  },
  createMarker(point) {
    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      iconPath: "../../assets/images/marker.png", //32*47
      // iconPath: "../../assets/module/img/gps/maintain_man_32px_normal.png", //32*32
      id: point.id || 0,
      name: point.name || "",
      latitude: latitude,
      longitude: longitude,
      width: 32,
      height: 32,
      label: {
        color: '#22ac38',
        fontSize: 14,
        bgColor: "#fff",
        borderColor: "#22ac38",
        borderwidth: 1,
        padding: 3
      },
      callout: {
        content: point.name,
        fontsize: 0,
      }
    };
    return marker;
  },

  regionchange(){},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setMapHeight();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    clearInterval(this.data.timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    clearInterval(this.data.timer)
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