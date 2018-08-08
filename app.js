// 引入配置文件config.js
const config = require('/utils/config.js');
//app.js
App({
  onShow:function(){
    var that = this;
    console.log('生命周期函数，监听页面显示');
    wx.getSetting({
         success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                //用户已经授权过
                console.log('用户已经授权');
                //校验session是否过期
                that.getCheckSession();
              }
            });
          }
         }  
    })
  },
  getCheckSession() {
    var that = this;
    wx.checkSession({
      success: function () {
        console.log('session未过期，暂不做任何业务处理');
      },
      fail: function () {
        console.log('session已过期，正在重新获取..');
        //code获取成功，保存为当前页面的全局变量code
        that.getLogin();
      }
    })
  },
  //获取code
  getLogin() {
    //code获取成功，保存为当前页面的全局变量code
    wx.login({
      success: res => {
        if(res.code){
          console.log('当前用户登录凭证：' + res.code);
          wx.request({
            url: config.queryOpenIdUrl,
            data: { code: res.code },
            success: function (res) {
              wx.setStorage({
                key: 'rdSessionKey',
                data: res.data.rdSessionKey,
              });
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
})