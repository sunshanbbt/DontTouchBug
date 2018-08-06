// pages/gaming/gaming.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeCode: 'void main() {\n  printf("Hello World");\n}',
    life: 100,
    lifeStyle: 'height: 100%',
  },

  gameOver() {
    wx.navigateTo({
      url: '../score/score',
    });
  },

  handleTouch() {
    let { life } = this.data;
    life-= Math.random() * 10 + 10;
    if (life > 0) {
      this.setData({
        life,
        lifeStyle: `height: ${life}%`,
      });
    } else {
      this.gameOver();
    }
  },

  handleTouchStart(ev) {
    console.log(ev);
  },

  handleTouchMove(ev) {

  },

  handleTouchEnd(ev) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('页面加载啦');
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