// pages/cube/cube.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cubes: [],
    steps: 0,
    left: 0,
    pause: false,
  },

  gameOver() {
    wx.setStorageSync('lastScore', this.data.steps);
    wx.navigateTo({
      url: '../score/score',
    });
  },

  countLeft(list) {
    return list.filter(cube => !cube.bug && !cube.active).length;
  },

  clearCubeState() {
    const { cubes, steps } = this.data;
    const list = cubes.map(cube => {
      cube.active = false;
      return cube;
    });

    this.setData({
      cubes: list,
      left: this.countLeft(list),
    });
  },

  onTouchCube(ev) {
    if (this.data.pause) { // 动画期间不响应请求
      return;
    }
    const { index, active, bug } = ev.detail;
    let pause = false;
    if (bug) { // 选错了清空
      pause = true;
      setTimeout(() => {
        this.clearCubeState();
        this.setData({
          pause: false,
        });
      }, 1000);
    }
    const { cubes, steps } = this.data;
    cubes[index].active = active;
    const left = this.countLeft(cubes);
    if (left === 0) {
      setTimeout(() => {
        this.gameOver();
      }, 500);
    }
    this.setData({
      pause,
      cubes,
      steps: steps + 1,
      left,
    });
  },

  rollIsBug(radio) { // 随机，确定一个格子是不是bug
    return Math.random() > radio;
  },

  generateInitialCubes(cubeCount) {
    let list = [];
    /**
     * 考虑下面的算法：
     * 生成从固定个数的bug格子
     */
    for (let i = 0; i < cubeCount; i++) {
      list.push({
        id: i,
        active: false,
        bug: this.rollIsBug(0.5),
      });
    }

    this.setData({
      cubes: list,
      left: list.filter(cube => !cube.bug).length,
    });
  },

  onLoad: function (options) {
    this.generateInitialCubes(25);
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