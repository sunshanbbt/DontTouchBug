// 引入配置文件config.js
const config = require('../../utils/config.js');
const method = require('../../utils/method.js');
var app = getApp();
Page({
  data: {
    loadingHidden: false,
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
  handleSelectTouchStart: function (e) {
    console.log('touch start: ', e.touches[0]);
    this.setData({
      touchStart : e.touches[0],
      startActive : this.data.active
    })
  },
  handleSelectTouchMove: function (e) {
    console.log('touch move: ', e.touches[0].pageX + "--" + this.data.touchStart.pageY);
    var y = e.touches[0].pageY - this.data.touchStart.pageY;
    var active = this.data.active;
    console.log(y);
    active = this.data.startActive - parseInt(y / 20);
    
    if (active > this.data.levels.length){
      active = this.data.levels.length-1;
    }
    if (active < 0 ) {
      active = 0;
    }
    console.log(this.selectHeight)
    this.setData({
      offsetY: active*this.selectHeight,
      active: active
    })
    console.log('active' + active)

    
    
  },
  handleSelectTouchEnd: function (e) {
    this.setData({
      offsetY: 0
    })
  },
  onReady: function () {
    var query = wx.createSelectorQuery();
    var rect = query.select("#m-text-id").boundingClientRect();
    rect.exec((res) => {
      this.selectHeight = res[0].height;
    });
  }

})