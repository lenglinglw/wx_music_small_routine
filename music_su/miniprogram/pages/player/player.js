// pages/player/player.js

let musicList = Array
// 正在播放的index
let index = -1

Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: ""
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
    wx.setNavigationBarTitle({
      title: musicDetail.name,
    })
    console.log('musicDetail.al.picUrl: ' + musicDetail.al.picUrl)
    this.setData({
      picUrl: musicDetail.al.picUrl
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