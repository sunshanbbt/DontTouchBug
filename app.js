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
          //用户已经授权过
          console.log("用户授权过，重新获取session");
          method.getLogin();
          
        } else {
          console.log("用户未授权过，重新获取session");
          method.getLogin();
        }
      }
    })
  },
  onHide: function() {
    BuriedPoint.onCloseApp();
  },
});
