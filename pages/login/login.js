// 引入配置文件config.js
const config = require('../../utils/config.js');
var app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              that.getCheckSession();
              //用户已经授权过
              wx.switchTab({
                url: '/pages/index/index'
              })
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
        that.getLogin();
      },
      fail: function () {
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
          console.log('我是登录凭证：' + res.code);
          var appinfo = app.globalData;
          wx.request({
            url: config.queryOpenIdUrl,
            data: { code: res.code, appid: appinfo.appid, secret: appinfo.secret },
            success: function (res) {
              wx.setStorage({
                key: 'rdSessionKey',
                data: res.data.rdSessionKey,
              });
              console.log("我是服务端返回rdSessionKey:" + res.data.rdSessionKey);

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
  },
  getUserInfo(e) {
    this.userinfo = e.detail.userinfo;
    console.log(userinfo.nickname);
    if(e.detail.userinfo){
      
      wx.showToast({
        title: '授权成功',
        icon: 'success',
        duration: 1500
      })
    }
  },
  bindGetUserInfo: function (e) {
    console.log('用户按了允许授权按钮');
    console.log('用户昵称' + e.detail.userInfo.nickName);
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      wx.request({
        url: config.saveUserUrl,
        data: {
          nickName: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,
          province: e.detail.userInfo.province,
          city: e.detail.userInfo.city,
          province: e.detail.userInfo.province,
          gender: e.detail.userInfo.gender,
          country: e.detail.userInfo.country,
          language: e.detail.userInfo.language,
          rdSessionKey: app.globalData.rdSessionKey
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          //从数据库获取用户信息
          // that.queryUsreInfo();
          console.log("插入小程序登录用户信息成功！");
        }
      });
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: ''
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },

})