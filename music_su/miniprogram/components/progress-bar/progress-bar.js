let movableAreaWidth = 0
let movableViewWidth = 0

let backgroundAudioManager = wx.getBackgroundAudioManager()
// 是否在拖拽进度条
let isChange = false
// 音乐当前时间
let _currentTime = -1
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTime: '00:00',
    tatolTime: '00:00',
    movableDis: 0,
    progress: 0
    },
  
  /**
   * 组件生命周期
   */
 lifetimes: {
   ready() {
     this._getMovableDis()
     this._audioManager()
   }
 },
  /**
   * 组件的方法列表
   */ 
  methods: {

    onChange(event) {
      if (event.detail.source == 'touch') {
        isChange = true
        console.log(event)
        this.data.progress = event.detail.x / (movableAreaWidth - movableViewWidth) * 100
        this.data.movableDis = event.detail.x
      }
      
    },

    onTouchEnd() {
      console.log('停止拖动了: ' + this.data.movableDis)
      console.log('this.data.progress: ' + this.data.progress)
      this._setCurrentTime()
      this.setData({
        progress: this.data.progress,
        movableDis: this.data.movableDis
      })
      backgroundAudioManager.seek(this.data.progress * backgroundAudioManager.duration / 100)
      isChange = false
    },

    _getMovableDis() {
      /// 获取宽度
      const query = this.createSelectorQuery()
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec((rect) => {
        console.log(rect)
        movableAreaWidth = rect[0].width
        movableViewWidth = rect[1].width
      })
    },

    _audioManager() {
      backgroundAudioManager.onPlay(() => {
        isChange = false
      })

      backgroundAudioManager.onCanplay(() => {
        // 获取音乐时长
        console.log
        if (backgroundAudioManager.duration === undefined) {
          setTimeout(() => {
            this._setTime()
          }, 1000)
          // return
        } else {
          this._setTime()
        }
      })

      backgroundAudioManager.onTimeUpdate(() => {
        // 播放进度,在前台可以
        if (isChange == false) {
          const currentTime = backgroundAudioManager.currentTime

          if (parseInt(_currentTime) == parseInt(currentTime)) {
            return
          }
          _currentTime = currentTime
          const duration = backgroundAudioManager.duration
          this._setCurrentTime()
          this.setData({
            movableDis: (movableAreaWidth - movableViewWidth) * currentTime / duration,
            progress: currentTime / duration * 100
          })
          // 联动歌词
          this.triggerEvent('timeUpdate', {
            currentTime
          })
        }
      })

      backgroundAudioManager.onEnded(() => {
        // 播放完成
        // 抛出事件给父元素
        this.triggerEvent('musicEnd')
      })
    },
     
    _setTime() {
      const  duration = backgroundAudioManager.duration
      const min =parseInt(duration / 60)
      const second = parseInt(duration - min * 60)
      this.setData({
        tatolTime: min + ':' + second
      })
    },
    
    _setCurrentTime() {
      const currentTime = backgroundAudioManager.currentTime
      const min =parseInt(currentTime / 60)
      const second = parseInt(currentTime - min * 60)
      this.setData({
        currentTime: min + ':' + second
      })
    }
  }
})
