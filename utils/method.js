
const config = require('config.js');
/**
 * 用户分数存储
 */
function userScore(score, time, difficut){
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
      //从数据库获取用户信息
      // that.queryUsreInfo();
      console.log("插入小程序用户分值信息成功！");

    }
  });
}

module.exports = {
  userScore: userScore
}