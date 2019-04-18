//index.js
const db = wx.cloud.database()
//获取应用实例
const app = getApp()

Page({
  data: {
    username: '',
    wechat: '',
    phone: '',
    profession: '',
    income: '',
  },
  /*
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    
  },

  // 输入
  msgInput(e) {
    // console.log(e)
    let type = e.target.dataset.type
    let data = e.detail.value
    let self = this

    switch (type) {
      case 'wechat':
        self.setData({
          wechat: data
        })
        break;
      case 'username':
        self.setData({
          username: data
        })
        break;
      case 'phone':
        self.setData({
          phone: data
        })
        break;
      case 'profession':
        self.setData({
          profession: data
        })
        break;
      case 'income':
        self.setData({
          income: data
        })
        break;
    }
  },

  // 提交信息
  submitMsg() {
    let self = this
    let openid = wx.getStorageSync('openid')
    console.log(self.data)
    if (!self.data.wechat || !self.data.phone || !self.data.username) {
      wx.showToast({
        title: '请填写完整',
        icon: 'none',
        duration: 2000
      })
      return
    }

    db.collection('userinfo').add({
      data: {
        wechat: self.data.wechat,
        phone: self.data.phone,
        username: self.data.username,
        profession: self.data.profession,
        income: self.data.income,
      },
      success: (res) => {
        console.log('res:===', res)
        self.setData({
          wechat: '',
          username: '',
          phone: '',
          income: '',
          profession: ''
        })
        console.log(openid)
        db.collection('user').where({
          _openid: openid
        }).get().then((res) => {
          console.log('==========', res.data[0]._id)

          // 更新 usermsg
          db.collection('user').doc(res.data[0]._id).update({
            data: {
              usermsg: 1
            }
          }).then((res) => {
            wx.setStorage({
              key: 'usermsg',
              data: '1',
            })
          })
        })

        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })

        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
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