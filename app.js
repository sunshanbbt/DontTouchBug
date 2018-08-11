// 引入配置文件config.js
const config = require('/utils/config.js');
const method = require('/utils/method.js');
import * as BuriedPoint from '/utils/buriedPoint.js';
//app.js
App({
  onError: function(e) {
    BuriedPoint.onError(e);
  },
  onShow: function (option) {
    BuriedPoint.onOpenApp(option.query);
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              //用户已经授权过
              console.log('用户已经授权');
              //校验session是否过期
              method.getCheckSession();
            }
          });
        }
      }
    })
  },
  onHide: function() {
    BuriedPoint.onCloseApp();
  },
})