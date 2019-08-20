// pages/createUser/createUser.js
const app = getApp()
Page({
  data: {
    name: null,
    grade: null,
    stu_num: null,
    faculty_index: 0,
    grade_index: 0,
    grades: [{
      value: 2018,
      name: '2018级'
    },
    {
      value: 2017,
      name: '2017级'
    },
    {
      value: 2016,
      name: '2016级'
    },
    {
      value: 2015,
      name: '2015级'
    }
    ]
  },

  submit: function (event) {
    var that = this
    var data = event.detail
    wx.request({
      url: app.globalData.server_url + 'user/create/',
      method: 'POST',
      data: {
        name: data.value.name,
        grade: that.data.grades[that.data.grade_index].value,
        faculty: that.data.faculties[that.data.faculty_index],
        stu_num: data.value.stu_num,
        openid: app.globalData.openid,
        avatar: app.globalData.userInfo.avatarUrl
      },
      success(res) {
        console.log(res.data)
        if (res.data.status == 0) {
          wx.switchTab({
            url: '../index/index',
          })
        }
      }
    })
  },

  PickFaculty: function (e) {
    this.setData({
      faculty_index: e.detail.value
    })
  },

  PickGrade: function (e) {
    this.setData({
      grade_index: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.server_url + 'faculties/',
      success(res) {
        console.log(res.data)
        that.setData({
          faculties: res.data.faculties
        })
      }
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