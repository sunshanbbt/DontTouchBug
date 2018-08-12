// 引入配置文件config.js
const config = require('../../utils/config.js');
const method = require('../../utils/method.js');
import * as BuriedPoint from '../../utils/buriedPoint.js';

var app = getApp();
Page({
  data: {
    levels:['休闲','娱乐', '挑战','自虐'],
    active:0,
    height:0
  },
  startGame: function (e) {
    wx.navigateTo({
      url: '/pages/cube/cube',
    });
  },
  
  gotoRanking: function () {
    BuriedPoint.onGotoRank();
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
    if (this.data.active !== this.data.startActive) {
      BuriedPoint.onSwitchLevel(this.data.startActive, this.data.active);
    }
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
  },

  onShareAppMessage: function () {
    let shareBase = new Date().getTime().toString(32);
    let uuid = parseInt(Math.random() * 10000, 10).toString(32);
    let shareCode = `${shareBase}${shareBase}`
    BuriedPoint.onShare('login', shareCode);
    return {
      title: '这个游戏还真是有点难',
      path: `/pages/login/login?shareCode=${shareCode}`,
    };
  },
})