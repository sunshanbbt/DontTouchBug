// components/score/score.js
import { formatNumber, calcScore } from '../../utils/util.js';
import { saveUserScore } from '../../utils/method.js';
import * as BuriedPoint from '../../utils/buriedPoint.js';

const LEVEL_LABEL = ['休闲', '娱乐', '挑战', '求虐'];

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    level: Number,
    minite: Number,
    second: Number,
    steps: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    restart() {
      this.triggerEvent('restart', {});
    },
    back() {
      this.triggerEvent('back', {});
    },
  },

  ready() {
    console.log('score ready: ', this);
    const { level = 0, minite = 0, second = 0, steps = 0 } = this.data;
    const strTime = `${minite}:${formatNumber(second)}`;
    const score = calcScore(minite, second, steps, level);
    const time = minite * 60 + second;
    BuriedPoint.onGameOver(score, steps, time, level);
    saveUserScore(score, steps, time, level);
    this.setData({
      level_label: LEVEL_LABEL[level],
      score,
      strTime,
    });
  },
})
