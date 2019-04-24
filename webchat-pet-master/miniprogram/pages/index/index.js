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

  

  // 检查爱心值是否过60分
  checkScore() {
    let score = wx.getStorageSync('score')
    console.log('score: ', score)
    if (score < 60) {
      return 0
    }
    return 1
  },

  // 进入宠物详情页
  petDetail(e) {
    let self = this
    let id = e.target.dataset.id
    let usermsg = wx.getStorageSync('usermsg')
    let url = '/pages/petdetail/index?id=' + id

    // 检查爱心值
    let score_bool = self.checkScore()
    console.log('score_bool: ', score_bool)
    if (!score_bool) {
      wx.navigateTo({
        url: '/pages/lovetest/index',
      })
      return
    }

    

    // 检查是否填写信息
    if (!usermsg) {
      wx.navigateTo({
        url: '/pages/userinfo/index'
      })
      return
    }

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