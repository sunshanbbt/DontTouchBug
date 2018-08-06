// pages/score/score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  gameAgain() {
    wx.navigateTo({
      url: '../cube/cube',
    });
  },

  gotoIndex() {
    wx.navigateTo({
      url: '../index/index',
    });
  },

  getScoreTitle(score) {
    if (score < 50) {
      return 'BUG写到没头发';
    } else if (score < 100) {
      return '生发膏要伐';
    } else if (score < 150) {
      return '合格的BUG手';
    } else if (score < 200) {
      return 'BUG总比困难多';
    }
    return '这智商就不要写代码了';
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const score = wx.getStorageSync('lastScore');

    this.setData({
      score,
      title: this.getScoreTitle(score),
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})