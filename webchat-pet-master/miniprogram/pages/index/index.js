//index.js
const db = wx.cloud.database()

Page({
  data: {
    pet_list: []
  },
  /*
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    self.getPetList()
  },

  getPetList() {
    let self = this
    db.collection('petList').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      console.log(res.data, res.data.length)
      if (res.data.length > 0) {
        self.setData({
          pet_list: res.data
        })
      } else {
        wx.showToast({
          title: '没有数据',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  // 进入宠物详情页
  petDetail(e) {
    let self = this
    let id = e.target.dataset.id
    let url = '/pages/petdetail/index?id=' + id

    wx.navigateTo({
      url,
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
    let self = this
    self.getPetList()
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