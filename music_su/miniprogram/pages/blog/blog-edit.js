// pages/blog/blog-edit.js
const MAX_WORDS_NUM = 140
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前输入文字个数
    wordsNum: 0,
    footerBottom: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },

  onInput(event) {
    console.log(event)
    let wordsNum = event.detail.cursor
    if (wordsNum >= MAX_WORDS_NUM) {
      wordsNum = `最大字数为${MAX_WORDS_NUM}`
    }
    this.setData({
      wordsNum
    })
  },
  /**
   * 获取焦点
   */
  onFocus(event) {
    this.setData({
      footerBottom: event.detail.height
    })
  },

  /**
   * 失去焦点
   */
  onBlur() {
    this.setData({
      footerBottom: 0
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