// components/modal/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      observer: function (newVal, oldVal) {
        this.setData({
          active: newVal,
        });
      },
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: false,
  },

  ready() {
    console.log(this.data);
    this.setData({
      active: this.data.visible,
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hide() {
      this.triggerEvent('onHide', {});
    }
  }
})
