// pages/apply/relateDoorplate.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    pictureUrl: "",
    documentUrl:"",
    imageUrl:"../../assets/images/picture.png",
    image2Url:"../../assets/images/picture2.png",
    fileName:'',
    fileUpLoaded:false
  },
  submit(){
    console.log(this.data)
    if(!(this.data.id)){
      wx.showToast({
        title: '请输入完整信息',
        duration: 2000,
        icon: 'error'
      })
      return;
    }
    http.post(
      "/qrcode/relateDoorplate",
      this.data,
      (res) =>{
        console.log(res)
        wx.showToast({
          title: '已提交  ',
          icon: 'success',
          duration: 2000
        })
      } 
    )
  },
  //上传文件
  chooseUpload() {
    var that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['.xlsx', '.xls','.txt','.docx','.doc','.pptx','.ppt','.pdf'],
      success(res) {
        console.log(res)
        const tempFiles = res.tempFiles
        console.log(tempFiles)
        http.upload(
          "file",
          tempFiles[0].path,
          (res) => {
            console.log(res)
            var data = JSON.parse(res.data);
            that.setData({
              documentUrl: data.url,
              fileName:tempFiles[0].name,
              fileUpLoaded:true
            })
            console.log(that.data.documentUrl)
          }
        )
      }
    })
  },
  //上传图片
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
    console.log(tempFiles)
    that.setData({
      imageUrl:tempFiles[0].tempFilePath
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
        console.log(that.data.pictureUrl)
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    const doorId = options.id;
    this.setData({
      id: doorId,
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