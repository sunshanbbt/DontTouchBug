// components/code/code.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    lines: [],
  },

  attached() {
    console.log(this);
    this.setData({
      lines: this.data.content.split('\n'),
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
  },
});
