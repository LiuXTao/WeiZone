// pages/fun/fun.js
Page({
  data: {
    currentId:"3",
    seleId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp()
    new app.TabBar()
    new app.Madals()
    this.setData({
      currentId: app.globalData.selectId
    })
    this.initial(this.data.currentId)
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
  switchtab:function(event){
    console.log(event)
    this.setData({ seleId: event.target.id })
    if (this.data.seleId == 2) {
      console.log(123)
      this.changeShow();
      return;
    }
    if (this.data.seleId != this.data.currentId) {
      getApp().globalData.selectId = this.data.seleId
      this.switchs(this.data.seleId)
    }
    else
      console.log("不变")
  }
})