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

    },
    backToIndex() {

    },
  },

  ready() {
    console.log('score ready');
    const strTime = `${this.minite}:${formatNumber(this.second)}`
    this.setData({
      level_label: LEVEL_LABEL[this.level || 0],
      score: calcScore(this.minite, this.second, this.steps, this.level),
      steps: this.steps,
      strTime,
    });
  },
})
