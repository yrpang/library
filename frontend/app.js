//app.js
App({
  onLaunch: function () {
    var openid = wx.getStorageSync('OPENID')
    var expiredTime = wx.getStorageSync('EXPIREDTIME')
    var userInfo = wx.getStorageSync('USERINFO')
    var now = +new Date()
    var that = this

    if (now - expiredTime <= 1 * 24 * 60 * 60 * 1000) {
      this.globalData.openid = openid
      this.globalData.expiredTime = expiredTime
      this.globalData.userInfo = userInfo
    }
    else {
      wx.login({
        success: function (res) {
          wx.request({
            url: that.globalData.server_url + 'login/',
            method: 'POST',
            data: {
              code: res.code
            },
            success: function (res) {
              if (res.data.openid != null) {
                var data = res.data
                // 把 SessionId 和过期时间放在内存中的全局对象和本地缓存里边
                that.globalData.openid = data.openid
                wx.setStorageSync('OPENID', data.openid)
                // 登录态保持1天
                var expiredTime = +new Date() + 1 * 24 * 60 * 60 * 1000
                that.globalData.expiredTime = expiredTime
                wx.setStorageSync('EXPIREDTIME', expiredTime)
              }
              else console.error("获取的登陆信息失败")
            },
            fail(res) {
              console.log(res)
            }
          })
        }
      })
    }
  },

  //检查用户注册状态
  checkIfNew: function () {
    var that = this
    var openid = wx.getStorageSync('OPENID')
    wx.request({
      url: that.globalData.server_url + 'user/' + that.globalData.openid,
      method: 'GET',
      success(res) {
        if (res.data.status == -1) {
          console.log("new user")
          wx.navigateTo({
            url: '../createUser/createUser',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    server_url: "https://lnception.cn/",
    openid: null,
    expiredTime: 0
  }
})