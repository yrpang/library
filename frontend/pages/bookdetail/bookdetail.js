// pages/bookdetail/bookdetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: app.globalData.openid

  },

  refesh: function () {
    var that = this
    wx.request({
      url: app.globalData.server_url + 'book/' + that.data.book_id,
      method: "GET",
      success: function (res) {
        that.setData({
          id: res.data.id,
          name: res.data.name,
          publisher: res.data.publisher,
          author: res.data.author,
          num: res.data.num
        })
      }
    })
  },

  borrow:function(){
    var that = this
    wx.request({
      url: app.globalData.server_url + '/book/borrow/',
      method: 'POST',
      data:{
        book_id: that.data.book_id,
        openid: that.data.openid
      },
      success(res){
        console.log(res)
        if(res.data.status==0){
          wx.showModal({
            title: '成功',
            content: '成功借阅',
          })
        }
        else if (res.data.status == -3){
          wx.showModal({
            title: '失败',
            content: '已经借阅过了',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      book_id: options.book_id
    })
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
    this.refesh()

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