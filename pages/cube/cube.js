// pages/cube/cube.js
import { formatNumber, getShareMessage } from '../../utils/util.js';
import * as BuriedPoint from '../../utils/buriedPoint.js';

const LEVEL_CONFIG_MAP = [ // 总大小，bug数，方块偏移，每次点击交换，出错时交换
  [4, 6, 20, false, false],  // 休闲
  [5, 10, 16, false, false], // 娱乐
  [5, 10, 16, false, true],  // 挑战
  [5, 10, 16, true, true],   // 自虐
];

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
    stop: false,
  },

  gameOver() {
    this.clearEnv();
    let gameOverInter = setInterval(() => {
      let { cubes } = this.data;
      let unActive = cubes.find(cube => !cube.active);
      if (unActive) {
        unActive.active = true;
        this.setData({
          cubes,
        });
      } else {
        clearInterval(gameOverInter);
        // wx.navigateTo({
        //   url: '../score/score',
        // });
      }
    }, 30);
  },

  gameInit() {
    let level = wx.getStorageSync('level') || 0;
    let [
      size, bugCount, cubeOffset, swipeInTouch, swipeInError,
    ] = LEVEL_CONFIG_MAP[level];
    let cubeTotal = size * size;

    Object.assign(this, {
      size,
      cubeTotal,
      cubeMaxIndex: cubeTotal - 1,
      bugCount,
      cubeOffset,
      swipeInTouch,
      swipeInError,
    });

    let list = this.generateInitialCubes(cubeTotal, bugCount);
    this.setData({
      level,
      cubeSize: cubeOffset - 1,
      startAni: 3,
      steps: 0,
      time: '0:00',
      minite: 0,
      second: 0,
      pause: true,
      start: true,
      stop: false,
      cubes: list,
      left: list.filter(cube => !cube.bug).length,
    });
  },

  gameStart() {
    this.startAni(() => {
      BuriedPoint.onGameStart(this.data.level);
      this.setData({
        start: false,
        pause: false,
      });
      this.startTimer();
    });
  },

  clearEnv() {
    this.setData({
      stop: true,
    });
    // wx.setStorageSync('lastLevel', this.data.level);
    // wx.setStorageSync('lastSteps', this.data.steps);
    // wx.setStorageSync('lastMinite', this.data.minite);
    // wx.setStorageSync('lastSecond', this.data.second);
    clearInterval(this.timerInter);
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

  clearCubeState(waitClearCube) {
    const { cubes, steps } = this.data;
    const list = cubes.map((cube, index) => {
      if (waitClearCube[index]) { // 只清理之前的
        cube.active = false;
      }
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
    const { cubes, steps } = this.data;

    if (cubes[index].active) { // 翻开的块不再响应点击
      return;
    }
    let pause = false;
    if (this.swipeInTouch) { // 每次点击都进行交换
      this.randomSwipe();
    } else if (this.swipeInError && bug) {
      this.randomSwipe();
    }

    cubes[index].active = active;
    const left = this.countLeft(cubes);

    if (bug) {
      // 先将需要清理的方块找好，1s后再清理
      let waitClearCube = cubes.map(cube => {
        return cube.active;
      });
      this.clearTimeout = setTimeout(() => {
        delete this.clearTimeout;
        this.clearCubeState(waitClearCube);
      }, 1000);
    }
    
    // 如果之前点击了bug还没清理，就不要结束
    if (!this.clearTimeout && (left === 0)) {
      this.gameOver();
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
    let col = index % this.size;
    let row = Math.floor(index / this.size);
    cube.offsetX = col * this.cubeOffset;
    cube.offsetY = row * this.cubeOffset;
    return cube;
  },

  randomCubeIndex() {
    return Math.round(Math.random() * this.cubeMaxIndex);
  },

  randomSwipe() {
    const { cubes } = this.data;
    let first = this.randomCubeIndex();
    let second = this.randomCubeIndex();

    while(first === second) {
      second = this.randomCubeIndex();
    }

    this.swipeTwoCubes(cubes, first, second);
    this.setData({
      cubes,
    });
  },

  swipeTwoCubes(list, first, second) {
    let temp = list[first].index;
    list[first].index = list[second].index;
    list[second].index = temp;
    this.updateCubeOffset(list[first], list[first].index);
    this.updateCubeOffset(list[second], list[second].index);
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
        active: false,
        bug: i <= bugCount,
      });
    }
    list.sort(cube => (Math.random() - 0.5));
    // 根据初始排序分配id
    list = list.map((cube, index) => {
      cube.id = index;
      cube.index = index;
      return cube;
    });
    return list.map((cube, index) => this.updateCubeOffset(cube, index));
  },

  restartGame: function () {
    this.gameInit();
    this.gameStart();
  },

  backToIndex: function () {
    wx.navigateTo({
      url: '../login/login',
    });
  },

  collectGameEnv() {
    const {
      minite, second, steps, level, pause, start, left,
    } = this.data;

    return {
      minite, second, steps, level, pause, start, left,
    }
  },

  onLoad: function (options) {
    global.gameOver = this.gameOver.bind(this);
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
    // 页面隐藏而游戏没结束
    console.log('onHide', this.data);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (!this.stop) {
      BuriedPoint.onGameBreak(this.collectGameEnv());
    }
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
    let shareBase = new Date().getTime().toString(32);
    let uuid = parseInt(Math.random() * 10000, 10).toString(32);
    let shareCode = `${shareBase}${shareBase}`
    BuriedPoint.onShare('cube', shareCode, this.collectGameEnv());
    return {
      title: getShareMessage(),
      path: `/pages/login/login?shareCode=${shareCode}`,
    };
  }
})