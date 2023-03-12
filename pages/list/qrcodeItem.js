// pages/list/qrcodeItem.js
const app = getApp()
var utils = require('../../utils/util.js');
var http = require('../../utils/http');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    userId: null,
    address: null,
    longitude: null,
    latitude: null,
    isBound: false,
    isRented: false,
    pictureUrl: null,
    documentUrl: null,
    isChecked: false,
    type: 1,
    parentId: null,

    imageUrl: null,
    fileName: null,
    fileUpLoaded: false
  },

  inputAddress(e) {
    var s = e.detail.value;
    s = s.join();
    this.setData({
      address: s
    })
  },
  selectIsBound(e) {
    this.setData({
      isBound: e.detail == '1'
    })
  },
  selectIsRented(e) {
    this.setData({
      isRented: e.detail == '1'
    })
  },
  selectIsChecked(e) {
    this.setData({
      isChecked: e.detail == '1'
    })
  },
  selectType(e) {
    this.setData({
      type: parseInt(e.detail)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id != undefined) {
      http.get(
        "/qrcode/get/" + options.id,
        null,
        (res) => {
          console.log(res)
          this.setData(res.data)
          this.setData({
            imageUrl: 'http://127.0.0.1:8080/' + (this.data.pictureUrl.slice(1))
          })
          console.log(this.data)
        }
      )
    }
  },
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

    that.setData({
      imageUrl: tempFiles[0].tempFilePath
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
        // console.log(that.data.pictureUrl)
      }
    )
  },
  lookDocument() {
    let that = this
    if (this.data.documentUrl!=null) {
      utils.showLoading()
      wx.downloadFile({
        url: 'http://127.0.0.1:8080/' + (that.data.documentUrl.slice(1)),
        success: function (res) {
          console.log(res, "wx.downloadFile success res")
          if (res.statusCode != 200) {
            utils.hideLoadingWithErrorTips()
            return false
          }
          var Path = res.tempFilePath //返回的文件临时地址，用于后面打开本地预览所用
          wx.openDocument({
            filePath: Path,
            showMenu: true,
            success: function (res) {
              console.log('打开成功');
              utils.hideLoading()
            }
          })
        },
        fail: function (err) {
          console.log(err, "wx.downloadFile fail err");
          utils.hideLoadingWithErrorTips()
        }
      })
    } else {
      wx.showToast({
        title: '暂无文档',
        icon:'error',
        duration: 2000,
      })
    }
  },
  uploadDocument() {
    var that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['.xlsx', '.xls', '.txt', '.docx', '.doc', '.pptx', '.ppt', '.pdf'],
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
              fileName: tempFiles[0].name,
              fileUpLoaded: true
            })
            console.log(that.data.documentUrl)
          }
        )
      }
    })
  },
  add() {
    if(!( this.data.latitude
      &&this.data.longitude
      &&this.data.isBound
      &&this.data.isChecked
      &&this.data.isRented
      &&this.data.type
      &&this.data.verifyStatus
      &&this.data.userId
      &&this.data.address)){
      wx.showToast({
        title:"请输入完整信息",
        icon:'error',
        duration:2000
      })
      return
    }
    console.log(this.data)
    http.post(
      "/qrcode/create",
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
  delete() {
    http.del(
      "/qrcode/" + this.data.id,
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
    if(!( this.data.latitude
      &&this.data.longitude
      &&this.data.isBound
      &&this.data.isChecked
      &&this.data.isRented
      &&this.data.type
      &&this.data.verifyStatus
      &&this.data.userId
      &&this.data.address)){
      wx.showToast({
        title:"请输入完整信息",
        icon:'error',
        duration:2000
      })
      return
    }
    console.log(this.data)
    http.post(
      "/qrcode/update",
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