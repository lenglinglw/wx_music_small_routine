// components/bottom_modal/bottom_modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isModalShow: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  options: {
    // 启动多个插槽
    multipleSlots: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({
        isModalShow: false
      })
    }
  }
})
