// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     console.log(1)
    //     resolve()
    //   }, 1000)
    // }).then((res)=>{
    //   setTimeout(() => {
    //     console.log(2)
    //   }, 2000)
    // })

    // let p1 = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     console.log('p1')
    //     resolve('p1')
    //   }, 1000);
    // })

    // let p2 = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     console.log('p2')
    //     resolve('p2')
    //   }, 1000);
    // })
    // Promise.all([p1, p2]).then((res) =>{
    //   console.log('success')
    //   console.log(res)
    // }).catch((err) =>{
    //   console.log('failure')
    // })

    // async await ES7
    this.foo()
  },
  async foo() {
    console.log('1')
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