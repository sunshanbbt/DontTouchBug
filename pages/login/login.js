// 引入配置文件config.js
const config = require('../../utils/config.js');
const method = require('../../utils/method.js');
var app = getApp();
Page({
  data: {
    levels:['休闲','娱乐', '挑战','自虐'],
    active:0,
    height:0
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
          rdSessionKey: wx.getStorageSync('rdSessionKey')
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
        url: '/pages/cube/cube'
      });
    } else {
      console.log('授权失败')
    }
  },
  
  gotoRanking: function () {
    wx.navigateTo({
      url: '/pages/ranking/ranking',
    });
  },

  handleSelectTouchStart: function (e) {
    this.setData({
      touchStart : e.touches[0],
      startActive : this.data.active
    })
  },
  handleSelectTouchMove: function (e) {
    var y = e.touches[0].pageY - this.data.touchStart.pageY;
    // var active = this.data.active;
    // active = this.data.startActive - parseInt(y / this.selectHeight);
    var active = this.data.startActive;
    if (Math.abs(y) > this.selectHeight / 2) {
      active = this.data.startActive - (y > 0 ? 1 : -1);
    }
    
    if (active >= this.data.levels.length){
      active = this.data.levels.length - 1;
    }

    if (active < 0 ) {
      active = 0;
    }
    
    this.setData({
      offsetY: -1 * active * this.selectHeight,
      active: active
    })
  },
  handleSelectTouchEnd: function (e) {
    wx.setStorageSync('level', this.data.active);
  },
  onReady: function () {
    var query = wx.createSelectorQuery();
    var rect = query.select(".m-option").boundingClientRect();
    rect.exec((res) => {
      this.selectHeight = res[0].height;
      let active = parseInt(wx.getStorageSync('level') || 0, 10);
      this.setData({
        active,
        offsetY: -1 * active * this.selectHeight,
      });
    });
  }

})