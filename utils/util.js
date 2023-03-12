const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

function getAddress(longitude, latitude) {
  let that = this;
  console.log("[getAddress]经度：" + longitude + "，纬度：" + latitude);
  // reverseGeocoder 为 QQMapWX 解析 经纬度的方法
  qqmapsdk.reverseGeocoder({
    location: {
      latitude,
      longitude
    },
    success(res) {
      console.log('success', res);
      that.setData({
        address: res.result.address,
      });
    },
    fail(res) {
      console.log('faile', res);
    }
  });
}


function getQueryString(qs) {
  console.log(qs);
  let args = {};
  let items = qs.split('?')[1].split('&');
  let item = null;
  let len = items.length;

  for (var i = 0; i < len; i++) {
    item = items[i].split("=");
    var name = decodeURIComponent(item[0]),
      value = decodeURIComponent(item[1]);
    if (name) {
      args[name] = value;
    }
  }
  return args;
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const showLoading = (tips = '加载中...') => {
  wx.showNavigationBarLoading()
  wx.showLoading({
    title: tips,
  })
}

const hideLoading = () => {
  wx.hideLoading()
  wx.hideNavigationBarLoading()
}

const hideLoadingWithErrorTips = (err = '加载失败...') => {
  hideLoading()
  wx.showToast({
    title: err,
    icon: 'error',
    duration: 2000
  })
}
module.exports = {
  formatTime,
  getQueryString,
  getAddress,
  showLoading: showLoading,
  hideLoading: hideLoading,
  hideLoadingWithErrorTips: hideLoadingWithErrorTips,
}