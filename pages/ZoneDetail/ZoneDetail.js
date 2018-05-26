// pages/ZoneDetail/ZoneDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    ZoneName:'',
    Zonepho:'',
    screenWidth: wx.getSystemInfoSync().windowWidth,
    screenHeight: wx.getSystemInfoSync().windowHeight,
    nameFlag:true,
    inputName:'',
    change:'../../image/more.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      ZoneName:options.name,
      Zonepho:options.image,
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
  
  },
  modifyName:function(e){
   this.setData({
     nameFlag:!this.data.nameFlag
   })

  },
  lisconfirm:function(e){
    this.setData({
      ZoneName:this.data.inputName,
      nameFlag:!this.data.nameFlag
    })
    //修改名字,发送新名字
    var that = this;
    wx.getStorage({
      key: 'zone_code',
      success: function(res) {
        wx.request({
          header: {
            'content-type': 'application/json' // 默认值
          },
          url: 'https://www.concertgifts.cn/index.php/home/modify/name',
          data:{
            'zone_code':res.data[0],
            'zone_name':that.data.ZoneName
          },
          method:'POST',
          success:function(res){
            console.log(res.data);
          }
        })
      },
    })
  },
  liscancel:function(e){
    this.setData({
      nameFlag:!this.data.nameFlag,
      inputName:''
    })
  },
  bindinput:function(e){
    this.setData({
      inputName: e.detail.value
    })
    // console.log(this.data.inputName)
  },
  //改变空间头像
  changPho:function(e){
    console.log(e)
    var that=this
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        }) 
        wx.uploadFile({
          url: '', //上传url
          filePath: tempFilePaths[0],
          name: 'zoneUrl',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            //提示上传成功
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000
            });
            //返回图片保存的url
            var url=res.data
            that.setData({
              Zonepho:url
            })
          }
        })
      }
    })
  },
  findCompanies:function(e){
    wx.navigateTo({
      url: '../companyManage/companyManage?id='+this.data.id,
    })
  }
})