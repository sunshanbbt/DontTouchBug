
const config = require('config.js');

/**
 * 校验session
 */
function getCheckSession() {
  wx.checkSession({
    success: function () {
      return true;
    },
    fail: function () {
      console.log('session已过期，正在重新获取..');
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
        console.log('当前用户登录凭证：' + res.code);
        wx.request({
          url: config.queryOpenIdUrl,
          data: { code: res.code },
          success: function (res) {
            wx.setStorageSync('rdSessionKey', res.data.rdSessionKey);
            console.log("当前用户服务端返回的rdSessionKey:" + res.data.rdSessionKey);

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
function saveUserScore(score, time, difficut){
  getCheckSession();
  wx.request({
    url: config.saveUserScoreUrl,
    data: {
      score: score,
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
function saveBuriedPoint(key, data, sub) {
  getCheckSession();
  wx.request({
    url: config.saveBuriedPointUrl,
    data: {
      appId:'bug',
      key: key,
      data: data,
      timestamp: new Date().getTime(),
      sub: sub,
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