// pages/cube/cube.js
import { formatNumber } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cubes: [],
    time: '0:00',
    minite: 0,
    second: 0,
    steps: 0,
    left: 0,
    pause: false,
  },

  gameOver() {
    wx.setStorageSync('lastSteps', this.data.steps);
    wx.setStorageSync('lastMinite', this.data.minite);
    wx.setStorageSync('lastSecond', this.data.second);
    wx.navigateTo({
      url: '../score/score',
    });
    clearInterval(this.timerInter);
  },

  gameInit() {
    let list = this.generateInitialCubes(25, 12);
    this.setData({
      startAni: 3,
      time: '0:00',
      minite: 0,
      second: 0,
      pause: true,
      start: true,
      cubes: list,
      left: list.filter(cube => !cube.bug).length,
    });
  },

  gameStart() {
    this.startAni(() => {
      this.setData({
        start: false,
        pause: false,
      });
      this.startTimer();
    });
  },

  startAni(cb) {
    let startInterval = setInterval(() => {
      let { startAni } = this.data;
      startAni--;
      if (startAni == -1) {
        clearInterval(startInterval);
        cb();
      } else {
        this.setData({
          startAni,
        });
      }
    }, 1000);
  },

  timeUp() {
    let now = new Date().valueOf();
    let { minite, second } = this.data;
    second+= 1;
    if (second >= 60) {
      second = 0;
      minite += 1;
    }
    let time = `${minite}:${formatNumber(second)}`;
    this.setData({
      minite,
      second,
      time,
    });
  },

  startTimer() {
    this.timerInter = setInterval(this.timeUp, 1000);
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
      this.randomSwipe();
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

  updateCubeOffset(cube, index) {
    let col = index % 5;
    let row = Math.floor(index / 5);
    cube.offsetX = col * 16;
    cube.offsetY = row * 16;
    return cube;
  },

  randomSwipe() {
    const { cubes } = this.data;
    let first = Math.round(Math.random() * 25);
    // let second = Math.round(Math.random() * 25);
    // while(first === second) {
    //   second = Math.round(Math.random() * 25);
    // }
    let second = first + 1;
    if (first % 5 === 4) {
      second = first - 1;
    }

    this.swipeTwoCubes(cubes, first, second);
    this.setData({
      cubes,
    });
  },

  swipeTwoCubes(list, first, second) {
    let temp = list[first];
    this.updateCubeOffset(temp, second);
    this.updateCubeOffset(list[second], first);
    list[first] = list[second];
    list[second] = temp;
    return list;
  },

  generateInitialCubes(cubeCount, bugCount) {
    let list = [];
    /**
     * 考虑下面的算法：
     * 生成从固定个数的bug格子
     */
    for (let i = 0; i < cubeCount; i++) {
      list.push({
        id: i,
        active: false,
        bug: i <= bugCount,
      });
    }
    list.sort(cube => Math.round(Math.random()));
    
    return list.map((cube, index) => this.updateCubeOffset(cube, index));
  },

  onLoad: function (options) {
    this.gameInit();
    this.gameStart();
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
    clearInterval(this.timerInter);
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