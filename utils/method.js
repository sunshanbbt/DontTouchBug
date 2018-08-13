
const config = require('config.js');

let rdSessionKey = wx.getStorageSync('rdSessionKey');

/**
 * 校验session
 */
function getCheckSession(callback) {
  if (!rdSessionKey) { // 本地没有rdSessionKey的时候也要重新去拿
    return getLogin(callback);
  }
  wx.checkSession({
    success: function () {
      callback && callback();
    },
    fail: function () {
      //code获取成功，保存为当前页面的全局变量code
      getLogin(callback);
    }
  })
}

/**
 * 登录
 */
function getLogin(callback) {
  //code获取成功，保存为当前页面的全局变量code
  wx.login({
    success: res => {
      if (res.code) {
        wx.request({
          url: config.queryOpenIdUrl,
          data: { code: res.code },
          success: function (res) {
            wx.setStorageSync('rdSessionKey', res.data.rdSessionKey);
            rdSessionKey = res.data.rdSessionKey;
            console.log(rdSessionKey)
            callback && callback();
          }
        });
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
  getCheckSession(() => {
    wx.request({
      url: config.saveUserScoreUrl,
      data: {
        score: score,
        steps,
        time: time,
        difficut: difficut,
        rdSessionKey,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.debug("插入小程序用户分值信息成功！");
          return true;
        } else {
          console.debug("插入小程序用户分值信息失败！");
          return false;
        }
      }
    });
  });
}
/**
 * 埋点
 */
function saveBuriedPoint(key, sub, data) {
  getCheckSession(() => {
    wx.request({
      url: config.saveBuriedPointUrl,
      data: {
        appId: 'bug',
        key: key,
        sub: sub,
        data: JSON.stringify(data),
        timestamp: new Date().getTime(),
        rdSessionKey,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          console.debug("插入埋点成功");
          return true;
        } else {
          console.debug("插入埋点失败");
          return false;
        }
      }
    });
  });
}

/**
 * 读取排行榜数据
 */
function getRankData(cb) {
  getCheckSession(() => {
    wx.request({
      url: config.getRankListUrl,
      data: {
        rdSessionKey,
      },
      success: function (res) {
        if (res.data.code == 200) {
          cb(res.data.data);
        } else {
          return false;
        }
      }
    });
  })
}

/**
 * 保存用户资料
 */
function saveUserInfo(e, callback) {
  getCheckSession(() => {
    wx.request({
      url: config.saveUserUrl,
      data: {
        nickName: e.userInfo.nickName,
        avatarUrl: e.userInfo.avatarUrl,
        province: e.userInfo.province,
        city: e.userInfo.city,
        province: e.userInfo.province,
        gender: e.userInfo.gender,
        country: e.userInfo.country,
        language: e.userInfo.language,
        rdSessionKey,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.info("插入小程序登录用户信息成功！" + rdSessionKey);
        callback && callback();
      }
    });
  });
}

module.exports = {
  getCheckSession,
  saveUserScore,
  saveBuriedPoint,
  getRankData,
  saveUserInfo,
  getLogin
};