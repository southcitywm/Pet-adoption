//index.js
const db = wx.cloud.database()
//获取应用实例
const app = getApp()

Page({
  data: {
    data: []
  },
  /*
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    let id = options.id

    db.collection('petList').doc(id).get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      self.setData({
        data: res.data,
      })
    })
  },

  // 预览图片
  previewImage: function (e) {
    let self = this
    console.log(self.data)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: self.data.data.files // 需要预览的图片http链接列表
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