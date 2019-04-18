// miniprogram/pages/push/index.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pet_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    // 发布
    if (options.type == 'push') {
      self.getPush()
    // 收养
    } else if (options.type == 'adoption') {
      self.getAdoption()
    }
    
  },

  // 获取收养信息
  getAdoption() {
    let self = this
    let openid = wx.getStorageSync('openid')
    let a_list = []
    // 获取用户收养列表
    db.collection('user').where({
      _openid: openid
    }).get().then(res => {
      console.log(res)
      let list = res.data[0].adoption_list
      let arr_bak = res.data[0].adoption_list
      let doc_id = res.data[0]._id
      
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      for (var i=0; i<list.length; i++) {
        const promise = db.collection('petList').where({
          _id: list[i]
        }).get()
        promise.then((res) => {
          console.log('resss: ',res)
          console.log(res.data.length)
          if (res.data.length == 0) {
            // 找到需要删除的下标
            let index = arr_bak.indexOf(list[i]);
            // 更新adoption_list
            db.collection('user').doc(doc_id).update({
              data: {
                // 表示指示数据库将字段自增 10
                adoption_list: arr_bak.splice(index, 1)
              },
              success(res) {
                console.log(res.data)
              }
            })
            
          } else {
            a_list.push(res.data[0])
            self.setData({
              pet_list: a_list
            })
          }
        })
      }
    })
  },

  // 获取发布的信息
  getPush() {
    let self = this
    let openid = wx.getStorageSync('openid')
    db.collection('petList').where({
      _openid: openid
    }).get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      if (res.data.length > 0) {
        self.setData({
          pet_list: res.data
        })

        console.log(self.data.pet_list)
      } else {
        wx.showToast({
          title: '没有数据',
          icon: 'none',
          duration: 2000
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