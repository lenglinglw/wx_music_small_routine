
 let lyricHight = 0
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLyricShow: Boolean,
    lyric: {
      type: String,
      value: ""
    },
  },

  observers: {
    lyric(lyric) {
      if (lyric == '暂无歌词') {
        this.setData({
          lrcList:{
            time:0,
            lyric: lyric,
          }
        })
      } else {
        this._parseLyric(lyric)
      }
      
    },

  },
  /**
   * 组件的初始数据
   */
  data: {
    lrcList: [],
    nowPlayLyric: -1,
    scrollTop:-1
  },

  lifetimes: {
    ready() {
      // 750rpx 所有手机宽度
      wx.getSystemInfo({
        complete: (res) => {
          console.log(res)
          lyricHight = res.screenWidth / 750 * 64
        },
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    update(currentTime) {
      console.log(currentTime)
      if (this.data.lrcList.length == 0) {
        return
      }
      if (currentTime > this.data.lrcList[this.data.lrcList.length - 1].time) {
        if (this.data.nowPlayLyric != -1) {
          this.setData({
            nowPlayLyric: -1,
            scrollTop: this.data.lrcList.length * lyricHight 
          })
        }
        return
      }
      for (let index = 0; index < this.data.lrcList.length; index++) {
        if (parseFloat(currentTime) <= parseFloat(this.data.lrcList[index].time)) {
          this.setData({
            nowPlayLyric: index - 1,
            scrollTop: (index - 1) * lyricHight 
          })
          break
        } 
      }
    },

    _parseLyric(lyric) {
      let line = lyric.split('\n')
      let _lrcList = []
      line.forEach((element) => {
        let time = element.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g)
        if (time != null) {
          let lyric = element.split(time[0])[1]
          let timeReg = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/)
          /// 时间转化成秒
          let timeToSeconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) / 1000
          console.log(timeToSeconds + '--------')
          _lrcList.push({
            lyric: lyric,
            time: timeToSeconds,
          })
        }
      })
      this.setData({
        lrcList: _lrcList
      })
    }

  }
})
