// pages/createZone/createZone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '创建微空间',
    });
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
   * 用户点击分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/enter/enter',
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
        console.log(213)
      }
    }
  },
  back(){
    wx.navigateBack({
      delta:1
    })
  },
  setname(e){
    this.data.name = e.detail.value;
  },
  sure(e){
      //发送控件名至后台
      var name = this.data.name;

      // GYB-start
      var user_id = wx.getStorage({
        key: 'user_id',
        success: function (res) {
          wx.request({
            url: 'https://www.concertgifts.cn/index.php/home/createZone/index',
            data: {
              'zone_name': name,
              'user_id': res.data
            },
            method: 'POST',
            success: function (data) {
              if(data.data.status == 0){
                wx.showToast({
                  title: data.data.msg,
                  icon:"loading"
                });
              }else{
                wx.setStorage({
                  key: 'zone_code',
                  data: data.data.zone_code,
                });
              }
            }
          })
        },
      });
      // GYB-end
      
      this.onShareAppMessage()
      wx.navigateTo({
        url: '../zone/zone',
      })
  },
})