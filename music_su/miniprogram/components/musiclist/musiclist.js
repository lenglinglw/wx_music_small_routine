// components/musiclist/musiclist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicList: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectId: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(event) {
      /// 时间源 时间处理函数 参数 事件类型
      this.setData({
        selectId: event.currentTarget.dataset.musicid
      })
      wx.navigateTo({
        url: `../../pages/player/player?musicid=${event.currentTarget.dataset.musicid}&index=${event.currentTarget.dataset.index}`,
      })
    }
  }
})
