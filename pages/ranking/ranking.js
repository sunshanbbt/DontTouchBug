// pages/ranking/ranking.js
import method from '../../utils/method.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userRank: {},
    topThree: [],
    rankList: [],
  },

  convertToData(list) {
    const [first, second, third, ...other] = list;
    return {
      rankList: other,
      topThree: [second, first, third],
    };
  },

  updateListData({scoreList, myscore}) {
    let arr = [];
    for (let key in scoreList) {
      let data = JSON.parse(scoreList[key]);
      data.rank = key;
      arr.push(data);
    }

    this.setData(Object.assign({
      userRank: myscore,
    }, this.convertToData(arr)));
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
    method.getRankData((data) => {
      this.updateListData(data);
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