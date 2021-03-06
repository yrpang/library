// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    keyword: null

  },

  input: function(e){
    console.log(e)
    this.setData({
      keyword: e.detail.value
    })
  },

  search:function(){
    var that = this
    wx.request({
      url: app.globalData.server_url + 'search/',
      method: 'POST',
      data:{
        keyword: that.data.keyword
      },
      success(res){
        console.log(res)
        that.setData({
          books: res.data.books
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