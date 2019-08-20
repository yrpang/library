// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: [],
    openid: app.globalData.openid

  },

  refesh: function () {
    var that = this
    wx.request({
      url: app.globalData.server_url + 'user/borrowed/',
      method: "POST",
      data:{
        openid: that.data.openid
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          book: res.data.books
        })
      }
    })
  },

  toBookDetail: function (e) {
    var book_id = e.currentTarget.dataset.book_id
    wx.navigateTo({
      url: '../bookdetail/bookdetail?book_id=' + book_id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refesh()

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
    app.checkIfNew()
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
    this.refesh()
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