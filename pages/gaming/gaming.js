// pages/gaming/gaming.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeOut: 5,
    intervalCircle: undefined,
  },

  gameOver() {
    wx.navigateTo({
      url: '../score/score',
    });
  },

  next() {
    let { timeOut } = this.data;
    timeOut -= 1;
    if (timeOut > -1) {
      this.setData({
        timeOut,
      });
      setTimeout(this.next, 1000);
    } else {
      this.gameOver();
    }
  },

  startCountDown: function () {
    this.next();
  },

  restartCountDown: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('页面加载啦');
    this.startCountDown();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('页面渲染好了');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('页面显示啦');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('页面隐藏辣');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('页面卸载啦');
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