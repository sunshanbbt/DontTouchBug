// pages/score/score.js
import { formatNumber, calcScore } from '../../utils/util.js';

const LEVEL_LABEL = ['休闲', '挑战', '求虐'];

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
      url: '../login/login',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    const lastLevel = wx.getStorageSync('lastLevel') || 0;
    const lastSteps = wx.getStorageSync('lastSteps') || 0;
    const lastMinite = wx.getStorageSync('lastMinite') || 0;
    const lastSecond = wx.getStorageSync('lastSecond') || 0;
    const strTime = `${lastMinite}:${formatNumber(lastSecond)}`
    this.setData({
      level: LEVEL_LABEL[lastLevel],
      score: calcScore(lastMinite, lastSecond, lastSteps, lastLevel),
      lastSteps,
      strTime,
    });
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