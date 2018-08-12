// pages/ranking/ranking.js
import method from '../../utils/method.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userRank: {
      name: 'Mr Tian',
      rank: 24,
      score: '300',
      head: '../../res/images/girl.jpg',
    },
    topThree: [
      {
        name: 'Mr Zhao',
        rank: 2,
        score: '501',
        head: '../../res/images/girl.jpg',

      },
      {
        name: 'Mr Qian',
        rank: 1,
        score: '502',
        head: '../../res/images/girl.jpg',

      },
      {
        name: 'Mr Sun',
        rank: 3,
        score: '500',
        head: '../../res/images/girl.jpg',

      }
    ],
    rankList: [
      {
        name: 'Mr Wang',
        rank: 4,
        score: '430',
        head: '../../res/images/girl.jpg',

      },
      {
        name: 'Mr Sun',
        rank: 5,
        score: '421',
        head: '../../res/images/girl.jpg',
      },
      {
        name: 'Mr Li',
        rank: 6,
        score: '420',
        head: '../../res/images/girl.jpg',
      },
      {
        name: 'Mr Li',
        rank: 7,
        score: '420',
        head: '../../res/images/girl.jpg',
      },
      {
        name: 'Mr Li',
        rank: 8,
        score: '420',
        head: '../../res/images/girl.jpg',
      },
      {
        name: 'Mr Li',
        rank: 9,
        score: '420',
        head: '../../res/images/girl.jpg',
      },
      {
        name: 'Mr Li',
        rank: 10,
        score: '420',
        head: '../../res/images/girl.jpg',
      },
      {
        name: 'Mr Li',
        rank: 11,
        score: '420',
        head: '../../res/images/girl.jpg',
      }
    ],
  },

  convertToData(list) {
    const [first, second, third, ...other] = list;
    return {
      rankList: other,
      topThree: [second, first, third],
    };
  },

  getRankList(list) {
    return 
  },

  updateListData(list) {
    let arr = [];
    for (let key in list) {
      let data = JSON.parse(list[key]);
      data.rank = key;
      arr.push(data);
    }

    this.setData(this.convertToData(arr));
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
    method.getRankData((list) => {
      this.updateListData(list);
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