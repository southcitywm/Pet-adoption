//index.js
const db = wx.cloud.database()
//获取应用实例
const app = getApp()

Page({
  data: {
    data: [],
    // 收养页面doc_id
    doc_id: ''
  },
  /*
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    let id = options.id

    self.setData({
      doc_id: id,
    })

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

  // 点击收养
  adoption() {
    let self = this
    let openid = wx.getStorageSync('openid')

    // 获取到adoption_list
    db.collection('user').where({
      _openid: openid
    }).get().then(res => {
      let adoption_list = res.data[0].adoption_list
      // 用户doc_id
      let id = res.data[0]._id
      let arr = []
      if (adoption_list.indexOf(self.data.doc_id) >= 0) {
        wx.showToast({
          title: '已发送收养请求',
          icon: 'none',
          duration: 1500
        })
        console.log('已经存在,不需在收养')
        return
      }
      db.collection('user').doc(id).update({
        data: {
          adoption_list: adoption_list.concat(self.data.doc_id)
        }
      }).then((res) => {
        console.log('添加成功')
      })

    })
    

    wx.showToast({
      title: '已发送收养请求',
      icon: 'none',
      duration: 1500
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