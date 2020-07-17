// pages/blog/blog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isModalShow: false,
    isNeedLogin: false
  },

  /**
   * 发布按钮
   */
  onPublish() {
    // 判断用户是否授权
    wx.getSetting({
      complete: (res) => {
        console.log('res.scope.userInfo : ' + res.authSetting['scope.userInfo'])
         if (res.authSetting['scope.userInfo'] != true) {
          console.log('需要登录')
          this.setData({
            isNeedLogin: true,
            isModalShow: true
          })
         } else {
           console.log('已授权过')
           wx.getUserInfo({
             complete: (res) => {
               console.log(res)
               wx.navigateTo({
                url: `blog-edit?nickName=${res.userInfo.nickName}&avatarUrl=${res.userInfo.avatarUrl}`,
              })
             },
           })
           this.setData({
            isNeedLogin: false,
            isModalShow: false
          })
         }
      },
    })
    // console.log('点击了发布按钮')
    this.setData({
      
    })
  },

  loginSuccess(userInfo) {
    console.log('11111111')
    console.log(userInfo.detail)
    const detail = userInfo.detail
    wx.navigateTo({
      url: `blog-edit?nickName=${detail.nickName}&avatarUrl=${detail.avatarUrl}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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