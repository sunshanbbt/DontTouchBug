// pages/game/startAni/startAni.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      observer: function (oldVal, newVal) {
        if (newVal) {
          this.start();
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 3,
  },

  ready() {
    if (this.data.show) {
      this.start();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    start() {
      let startInterval = setInterval(() => {
        let { count } = this.data;
        count -= 1;
        if (count < 0) {
          clearInterval(startInterval);
          this.triggerEvent('end', {});
          return;
        }
        this.setData({
          count,
        });
      }, 1000);
    },
  }
})
