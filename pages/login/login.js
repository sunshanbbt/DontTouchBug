// 引入配置文件config.js
const config = require('../../utils/config.js');
var app = getApp();
Page({
  onLoad() {
    //获取code
    this.getLogin();
  },
  //获取code
  getLogin() {
    //code获取成功，保存为当前页面的全局变量code
    wx.login({
      success: res => {
        if(res.code){
          console.log('我是登录凭证：' + res.code);
          var appinfo = app.globalData;
          wx.request({
            url: config.queryOpenIdUrl,
            header:{"Content-Type":"application/x-www-form-urlencoded"},
            method:"POST",
            data:{ code: res.code, appid: appinfo.appid, secret: appinfo.secret},
            success:function(res) {
              // console.log(res.openid+"--");
              // appinfo.globalData.openid = res.openid;
              // console.log("openid:" + appinfo.globalData.openid);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: res => {
        this.wetoast.toast({ title: res.err_desc });
      }
    })
  },
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    // 获取用户的session_key、openID以及isRegister（注册情况）
    app.globalMethod.GET({
      url: urlList.getOpenidUrl,
      data: {
        code: this.data.code
      },
      success: res => {
        if (res.data.code == '200') {
          //获取用户的openID
        } else {
          this.wetoast.toast({ title: res.data.message });
        }
      }
    })
  }
})