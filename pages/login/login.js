// 引入配置文件config.js
const config = require('../../utils/config.js');
var app = getApp();
Page({
  data: {
    loadingHidden: false
  },
  bindGetUserInfo: function (e) {
    console.log('用户按了开始游戏按钮');
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
          rdSessionKey: wx.getStorage({
            key: 'rdSessionKey',
            success: function(res) {
              storage: res.data;
            },
          })
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
      //授权成功后，跳转进入小程序游戏界面
      wx.navigateTo({
        url: '/pages/gaming/gaming'
      });
    } else {
      console.log('授权失败')
    }
  }


})