const db = wx.cloud.database()
const publishCollection = db.collection('publish')
var wxMarkerData = [];  
Page({
  data: {
    address: "",
    success: false,
    wechat: '',
    qq: '',
    title: '',
    desc: '',
    varieties:'',
    sex:'',
    age:'',
    phone: '',
    files: [],
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
      case 'varieties':
        self.setData({
          varieties: data
        })
        break;
      case 'desc':
        self.setData({
          desc: data
        })
        break;
      case 'sex':
        self.setData({
          sex: data
        })
        break;
      case 'age':
        self.setData({
          age: data
        })
        break;
      case 'phone':
        self.setData({
          phone: data
        })
        break;
    }
  },

  // 选择图片
  chooseImage() {
    var self = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        self.uploadImg(res.tempFilePaths[0])
      }
    })
  },

  // 上传图片
  uploadImg(filePath) {
    const self = this
    const cloudPath = 'perlist/' + new Date().getTime() + filePath.match(/\.[^.]+?$/)[0]
    console.log('cloudPath:', cloudPath)
    wx.showLoading({
      title: '上传图片中',
    })
    wx.cloud.uploadFile({
      cloudPath,
      filePath, // 文件路径
      success: res => {
        // get resource ID
        self.setData({
          files: self.data.files.concat(res.fileID)
        });
        wx.hideLoading()
      },
      fail: err => {
        // handle error
        console.log(err)
        wx.showToast({
          title: '上传失败',
          icon: 'none',
          duration: 2000
        })
        wx.hideLoading()
      }
    })
  },

  // 预览图片
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  
  // 提交信息
  submitMsg() {
    let self = this.data
    if (!self.address || !self.wechat || !self.title || !self.desc || !self.varieties || !self.sex || !self.age) {
      wx.showToast({
        title: '请填写完整',
        icon: 'none',
        duration: 2000
      })
      return
    }

    // let openid = wx.getStorageSync('openid')
    // if (!openid) {
    //   wx.showToast({
    //     title: '请登陆',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return 
    // }

    console.log(this.data.address)
    console.log(this.data.wechat)
    console.log(this.data.qq)
    console.log(this.data.title)
    console.log(this.data.desc)
    console.log(this.data.varieties)
    console.log(this.data.age)
    console.log(this.data.sex)
    console.log(this.data.files)


    db.collection('petList').add({
      data: {
        address: self.address,
        wechat: self.wechat,
        phone: self.phone,
        title: self.title,
        desc: self.desc,
        varieties:self.varieties,
        sex:self.sex,
        age:self.age,
        files: self.files,
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