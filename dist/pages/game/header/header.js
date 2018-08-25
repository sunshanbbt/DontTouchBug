// pages/game/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    steps: Number,
    time: String,
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
    showTip() {
      this.triggerEvent('onShowTip', {});
    },
  }
})
