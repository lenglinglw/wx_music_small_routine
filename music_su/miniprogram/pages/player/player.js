// pages/player/player.js

let musicList = Array
// 正在播放的index
let index = -1
// 全局背景播放器
const backgroundAudioManager = wx.getBackgroundAudioManager()
// 是否在播放

Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: "",
    isPlay: true,
    isLyricShow: false, // 歌词是否显示
    lyric: "", // 歌词
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    musicList = wx.getStorageSync('musicList')
    index = options.index
    this._loadMusicDetail()

  },

  _loadMusicDetail() {
    this._pause()
    let musicDetail = musicList[index]
    console.log('musicDetail: ' + musicDetail.id)
    wx.cloud.callFunction({
      name: 'music',
      data: {
        $url: 'musicUrl',
        musicid: musicDetail.id
      }
    }).then((res) => {
      console.log(JSON.parse(res.result))
      let result = JSON.parse(res.result)
      backgroundAudioManager.src = result.data[0].url
      backgroundAudioManager.title = musicDetail.name
      backgroundAudioManager.coverImgUrl = musicDetail.al.picUrl
      backgroundAudioManager.singer = musicDetail.al.name
      this._play()
    })
    wx.setNavigationBarTitle({
      title: musicDetail.name,
    })

    this.setData({
      picUrl: musicDetail.al.picUrl,
      isPlay: true
    })

    // 获取歌词数据
    wx.cloud.callFunction({
      name: 'music',
      data: {
        $url: 'lyric',
        musicid: musicDetail.id
      }
    }).then((res) => {
      let lyric = '暂无歌词'
      if (res.result != null) {
        const lrc = JSON.parse(res.result).lrc
        if (lrc != null) {
          lyric = lrc.lyric
        }
      }
      this.setData({
        lyric: lyric
      })

    })
  },

  playOrPause() {
    if (this.data.isPlay) {
      this._pause()
    } else {
      this._play()
    }
  },
  _pause() {
    backgroundAudioManager.pause()
    backgroundAudioManager.onPause(() => {
      console.log('暂停成功')
      this.setData({
        isPlay: false
      })
    })
  },

  _play() {
    backgroundAudioManager.play()
    backgroundAudioManager.onPlay(() =>{
      console.log('开始播放')
      this.setData({
        isPlay: true
      })
    })
  },

  previousClick() {
    if (index == -1) {
      return
    } else {
      if (index == 0) {
        index = musicList.length - 1
      } else {
        index--
      }
      this._loadMusicDetail()
    }
  },

  nextClick() {
    if (index == -1) {
      return
    } else {
      if (index == musicList.length - 1) {
        index = 0
      } else {
        index++
      }
      this._loadMusicDetail()
    }
  },

  onChangeLyricShow() {
    console.log('点击了封面和歌词的切换:' + this.data.isLyricShow)
    this.setData({
      isLyricShow: !this.data.isLyricShow
    })
  },

  timeUpdate(event) {
    this.selectComponent('.lyric').update(event.detail.currentTime)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})