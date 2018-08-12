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
    BuriedPoint.onOpenApp(option);
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(e) {
              //用户已经授权过
              method.saveUserInfo(e);
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