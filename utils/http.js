function get(url, param, callback) {
  console.log("http://127.0.0.1:8080/api" + url)
   wx.request({
      url: "http://127.0.0.1:8080/api" + url, // 基础路由 + 传过来的地址
      data: param,
      header: {
         "content-type": "application/json", // 默认值
         openid: wx.getStorageSync('wxOpenId') // 接口里加入openid，类似于token
      },
      success: function success(res) {
        //  wx.hideLoading(); // 隐藏load框
         // 以下为响应拦截，举例，根据后端给的状态码，在这里做个简单的拦截
         if (res.data.code == 255) {
            wx.showModal({
               content: "需要登录",
               success(res) {
                  if (res.confirm) {
                     wx.navigateTo({
                        url: "../../loginInfo/login/login",
                     });
                  } else if (res.cancel) {
                     wx.navigateBack();
                  }
               },
            });
         } else {
            // 成功后的回调
            callback(res.data);
         }
      },
      fail:function(){
        wx.showToast({
          title: '网络错误！',
          duration:1000,
          mask:true,
          icon:'error'
        })
      }
   });
}

// 和get同理
function del(url, param, callback) {
  //  wx.showLoading({
  //     title: "加载中...",
  //     mask: true,
  //  });
  console.log('http://127.0.0.1:8080/api' + url)
   wx.request({
      url: 'http://127.0.0.1:8080/api' + url, //仅为示例，并非真实的接口地址
      data: param,
      method: "DELETE",
      header: {
         "content-type": "application/json", // 默认值
         openid: wx.getStorageSync('wxOpenId')
      },
      success: function success(res) {
         wx.hideLoading();
         if (res.data.code == 255) {
            wx.showModal({
               content: "需要登录",
               success(res) {
                  if (res.confirm) {
                     wx.navigateTo({
                        url: "../../loginInfo/login/login",
                     });
                  } else if (res.cancel) {
                     wx.navigateBack();
                  }
               },
            });
         } else {
            callback(res.data);
         }
      },
      fail:function(){
        wx.showToast({
          title: '网络错误！',
          duration:1000,
          mask:true,
          icon:'error'
        })
      }
   });
}

// 和get同理
function post(url, param, callback) {
  //  wx.showLoading({
  //     title: "加载中...",
  //     mask: true,
  //  });
  console.log('http://127.0.0.1:8080/api' + url)
   wx.request({
      url: 'http://127.0.0.1:8080/api' + url, //仅为示例，并非真实的接口地址
      data: param,
      method: "POST",
      header: {
         "content-type": "application/json", // 默认值
         openid: wx.getStorageSync('wxOpenId')
      },
      success: function success(res) {
         wx.hideLoading();
         if (res.data.code == 255) {
            wx.showModal({
               content: "需要登录",
               success(res) {
                  if (res.confirm) {
                     wx.navigateTo({
                        url: "../../loginInfo/login/login",
                     });
                  } else if (res.cancel) {
                     wx.navigateBack();
                  }
               },
            });
         } else {
            callback(res.data);
         }
      },
      fail:function(){
        wx.showToast({
          title: '网络错误！',
          duration:1000,
          mask:true,
          icon:'error'
        })
      }
   });
}

function upload(fileName,filePath,callback){
  wx.uploadFile({
    url: 'http://127.0.0.1:8080/api/file/upload',
    filePath: filePath,
    header: {
      "Content-Type": "multipart/form-data"
    },
    name: 'file',
    success: function (res) {
      callback(res)
    },
    fail: function (res) {
      wx.showToast({
        title: '网络错误！',
        duration:1000,
        mask:true,
        icon:'error'
      })
    },
  })
}

// 获取页面路径
function getUrl() {
   const pages = getCurrentPages();
   const currentPage = pages[pages.length - 1];
   const url = `/${currentPage.route}`;
   console.log(url);
   wx.setStorage({
      key: "Url",
      data: url,
   });
}

module.exports = {
   get,
   post,
   getUrl,
   upload,
   del,
};