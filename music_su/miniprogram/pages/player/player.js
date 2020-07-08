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
    isPlay: true
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
    let musicDetail = musicList[index]
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
    })
    wx.setNavigationBarTitle({
      title: musicDetail.name,
    })
    console.log('musicDetail.al.picUrl: ' + musicDetail.al.picUrl)
    this.setData({
      picUrl: musicDetail.al.picUrl
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