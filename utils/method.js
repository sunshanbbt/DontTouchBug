
const config = require('config.js');

/**
 * 校验session
 */
function getCheckSession() {
  let rdSessionKey = wx.setStorageSync('rdSessionKey');
  if (!rdSessionKey) { // 本地没有rdSessionKey的时候也要重新去拿
    return getLogin();
  }
  wx.checkSession({
    success: function () {
      return true;
    },
    fail: function () {
      //code获取成功，保存为当前页面的全局变量code
      getLogin();
    }
  })
}

/**
 * 登录
 */
function getLogin() {
  //code获取成功，保存为当前页面的全局变量code
  wx.login({
    success: res => {
      if (res.code) {
        wx.request({
          url: config.queryOpenIdUrl,
          data: { code: res.code },
          success: function (res) {
            wx.setStorageSync('rdSessionKey', res.data.rdSessionKey);
          }
        })
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    },
    fail: res => {
      console.log(res.err_desc);
    }
  })
}


/**
 * 用户分数存储
 */
function saveUserScore(score, steps, time, difficut){
  getCheckSession();
  wx.request({
    url: config.saveUserScoreUrl,
    data: {
      score: score,
      steps,
      time: time,
      difficut: difficut,
      rdSessionKey: wx.getStorageSync('rdSessionKey')
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.data.code == 200) {
        console.log("插入小程序用户分值信息成功！");
        return true;
      } else {
        console.log("插入小程序用户分值信息失败！");
        return false;
      }
    }
  });
}
/**
 * 埋点
 */
function saveBuriedPoint(key, sub, data) {
  wx.request({
    url: config.saveBuriedPointUrl,
    data: {
      appId:'bug',
      key: key,
      sub: sub,
      data: JSON.stringify(data),
      timestamp: new Date().getTime(),
      rdSessionKey: wx.getStorageSync('rdSessionKey')
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method:'POST',
    success: function (res) {
      if ( res.data.code == 200 ) {
        console.log("插入埋点成功");
        return true;
      } else {
        console.log("插入埋点失败");
        return false;
      }
    }
  });
}
module.exports = {
  getCheckSession: getCheckSession,
  saveUserScore: saveUserScore,
  saveBuriedPoint: saveBuriedPoint

}