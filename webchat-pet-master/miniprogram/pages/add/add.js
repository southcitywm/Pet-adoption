const db = wx.cloud.database()
const publishCollection = db.collection('publish')
var wxMarkerData = [];  
Page({
  data: {
    address: "点击选择，要勾选哎！",
    success: false,
    wechat: '',
    qq: '',
    title: '',
    desc: '',
  },
   handleAddressClick() {
    wx.chooseLocation({
      success: this.handleChooseLocationSucc.bind(this)
    })
  },
  handleChooseLocationSucc(res) {
    this.setData({
      address: res.address
    });

  },
  handleSubmit() {
    if (this.data.address === "点击选择，要勾选哎！" || !this.data.address) {
      wx.showToast({
        title: '请填写地址',
        icon: 'loading',
        duration: 2000
      })
      return;
    }
  },


  // 输入
  msgInput(e) {
    console.log(e)
    let type = e.target.dataset.type
    let data = e.detail.value
    let self = this

    switch (type) {
      case 'wechat':
        self.setData({
          wechat: data
        })
        break;
      case 'qq':
        self.setData({
          qq: data
        })
        break;
      case 'title':
        self.setData({
          title: data
        })
        break;
      case 'desc':
        self.setData({
          desc: data
        })
        break;
    }
  },
  
  // 提交信息
  submitMsg() {
    let self = this.data
    if (!self.address || !self.wechat || !self.qq || !self.title || !self.desc) {
      wx.showToast({
        title: '请填写完整',
        icon: 'none',
        duration: 2000
      })
    }
    console.log(this.data.address)
    console.log(this.data.wechat)
    console.log(this.data.qq)
    console.log(this.data.title)
    console.log(this.data.desc)

    // db.collection('petList').where({
    //   title: self.title,
    // }).get().then((res) => {
    //   if (res.data.length > 0) {

    //   }
    // })


    db.collection('petList').add({
      data: {
        address: self.address,
        wechat: self.wechat,
        qq: self.qq,
        title: self.title,
        desc: self.desc
      },
      success: (res) => {
        console.log(res)
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }

})