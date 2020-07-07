// pages/musiclist/musiclist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList: [],
    listInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '...',
    })
    wx.cloud.callFunction({
      name: "music",
      data: {
        playlistId: options.playlistId,
        $url: "musiclist"
      }
    }).then((res) => {
      this.setData({
        musicList: res.result.playlist.tracks,
        listInfo: {
          coverImageUrl: res.result.playlist.coverImgUrl,
          name: res.result.playlist.name
        },
      })
      this.setMusicList()
      wx.hideLoading({
        complete: (res) => {},
      })
    })
  },

  /**
   * 存储音乐信息数据
   */
  setMusicList(){
    wx.setStorage({
      data: this.data.musicList,
      key: 'musicList',
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