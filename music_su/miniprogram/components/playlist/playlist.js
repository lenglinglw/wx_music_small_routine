// components/playlist/playlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playlist:Object
  },

  /**
   * 监听
   */
  observers: {
    ['playlist.playCount'](count){
      // console.log(count)
      // console.log(this.tranNumber(count, 2))
      this.setData({
        playCount: this.tranNumber(count, 2)
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    playCount: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goMusicList() {
      wx.navigateTo({
        url: `../../pages/musiclist/musiclist?playlistId=${this.data.playlist.id}`,
      })
    },
    tranNumber(num, point) {
      let numStr = num.toString().split('.')[0]
      if (numStr.length < 6) {
        return numStr
      } else if (numStr.length >=6 && numStr.length <= 8) {
        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
      } else if (numStr.length > 8) {
        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
      } else {
        console.log('???')
      }
    }
  }
})
