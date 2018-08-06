// components/cube/cube.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active: Boolean,
    bug: Boolean,
    index: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  attached() {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTouchCube() {
      this.triggerEvent('cubetouch', {
        index: this.data.index,
        active: !this.data.active,
        bug: this.data.bug,
      });
    },
  }
})
