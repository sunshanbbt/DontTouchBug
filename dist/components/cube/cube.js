// components/cube/cube.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active: Boolean,
    bug: Boolean,
    index: Number,
    offsetX: Number,
    offsetY: Number,
    size: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    style: '',
  },

  ready() {
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
