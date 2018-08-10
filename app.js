// 引入配置文件config.js
const config = require('/utils/config.js');
const method = require('/utils/method.js');
//app.js
App({
  onShow:function(){
    console.log('生命周期函数，监听页面显示');
    method.saveUserScore('123','12','1')
    wx.getSetting({
         success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
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
 
})