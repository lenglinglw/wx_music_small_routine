// components/blog/login/login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isModalShow: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * 登录按钮
   */
    onLogin(event) {
      if (event.detail.userInfo) {
        // console.log('用户授权信息: ' + event)
        this.triggerEvent('loginSuccess', event.detail.userInfo)
        this.setData({
          isModalShow: false
        })
      } else {
        this.triggerEvent('loginFail')
      }
    },
  }
})
