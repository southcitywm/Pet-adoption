// miniprogram/pages/lovetest/index.js
import arrData from './data.js'
const db = wx.cloud.database({})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // radioItems: []
    radioItems: [],
    score: 0
  },

  radioChange: function (e) {
    let self = this
    var itemIndex = e.target.dataset.index
    var radioItems = this.data.radioItems;
    let len = radioItems[itemIndex].list.length
    for (var i = 0; i < len; ++i) {
      radioItems[itemIndex]['list'][i].checked = radioItems[itemIndex]['list'][i].value == e.detail.value
    }

    self.setData({
      radioItems: radioItems
    });
  },

  // 提交
  submitTest() {
    let self = this
    console.log(self.data.radioItems)
    let len = self.data.radioItems.length
    let radioData = self.data.radioItems
    let score = 0
    for (var i=0; i<len; i++) {
      let list_len = radioData[i].list.length
      for (var j=0; j<list_len; j++) {
        let value = radioData[i].list[j].value
        let checked = radioData[i].list[j].checked
        if (value == 1 && checked == true) {
          score += 10
        }
      }
    }

    self.write_score(score)
  },

  write_score(score) {
    let self = this
    let openid = wx.getStorageSync('openid')

    wx.showLoading({
      title: '正在提交...',
    })

    // 获取用户doc_id
    db.collection('user').where({
      _openid: openid
    }).get().then(res => {
      // 用户doc_id
      let id = res.data[0]._id

      // 更新分数
      db.collection('user').doc(id).update({
        data: {
          score: score
        }
      }).then((res) => {
        wx.hideLoading()
        console.log('添加成功')
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1500
        })
        wx.setStorage({
          key: 'score',
          data: score,
        })
        // 返回个人中心
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }).catch((err) => {
        wx.hideLoading()
        wx.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 1500
        })
      })

    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: '提交失败',
        icon: 'none',
        duration: 1500
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    let score = wx.getStorageSync('score')

    self.setData({
      radioItems: Math.floor(Math.random() * 3),
      score: score,
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