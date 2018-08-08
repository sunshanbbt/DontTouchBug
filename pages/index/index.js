<<<<<<< Updated upstream
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  //事件处理函数
  startGame: function() {
    wx.navigateTo({
      url: '../cube/cube'
    });
  },
  viewRanking: function () {
    wx.navigateTo({
      url: '../ranking/ranking'
    });
  }
})
=======
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  //事件处理函数
  startGame: function() {
    wx.navigateTo({
      url: '../gaming/gaming'
    });
  },
  viewRanking: function () {
    wx.navigateTo({
      url: '../ranking/ranking'
    });
  }
})
>>>>>>> Stashed changes
