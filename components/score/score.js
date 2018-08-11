// components/score/score.js
import { formatNumber, calcScore } from '../../utils/util.js';

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
    const strTime = `${minite}:${formatNumber(second)}`
    this.setData({
      level_label: LEVEL_LABEL[level],
      score: calcScore(minite, second, steps, level),
      strTime,
    });
  },
})
