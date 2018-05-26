// pages/uploadPic/uploadPic.js
var app=getApp()
Page({
  data: {
    opeName: "管理",
    albumName:'',
    albumId:'',
    options:true,
    imageWidth: wx.getSystemInfoSync().windowWidth,
    screenHeight: wx.getSystemInfoSync().windowHeight,
    seleId: '',
    currentTab: 0,
    showButton:false,
    pictures: [],
    photosURL:[
    
    ],
    options: true,
    opeName: "管理",
    openFlag: true,
    deleteNums: [],
    hidden: true,
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    new app.SmallTab()

    that.setData({
      albumName: options.des,
      albumId: options.id
    })

    wx.setNavigationBarTitle({
      title:this.data.albumName,
    })

    //GYB-start
    wx.getStorage({
      key: 'zone_id',
      success: function(res) {
        wx.request({
          url: 'https://www.concertgifts.cn/index.php/home/ShowImg/index',
          header: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          data: {
            dir_id: that.data.albumId,
            zone_id:res.data
          },
          success: function (res) {
            var pics = [];
            var urls = [];
            var dir = res.data.dir;
            for(var i = 0; i < res.data.img_arr.length; i++){
              var pic = { src: '', des: '', radioType: '', typeSelect: true, seleColor: "#BEBEBE" }
              pic['src'] = dir + res.data.img_arr[i];
              var url = dir + res.data.img_arr[i].substr(5);

              urls.push(url);
              pics.push(pic);
            }
            that.setData({
              pictures:pics,
              photosURL:urls
            })
          }
        })
      },
    })
    //GYB-end
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
  manage:function(){
    this.setData({
      opeName: (this.data.options == true) ? "完成" : "管理",
      openFlag: (this.data.options == true) ? false : true,
      options: !this.data.options,
      showButton: !this.data.showButton
    })
    
  },
  /*----------------------------------------*/
  upload:function(){
    const that=this
    wx.chooseImage({
      count:9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.setStorage({
          key: "selectPhos",
          data: tempFilePaths
        })
        wx.navigateTo({
          url: '../publish/publish?albumId=' + that.data.albumId,
        })
      }
    })
    
    
    
  },
    /*----------------------------------------*/
  previewImage:function(e){
    console.log(e.currentTarget)
    var index=e.currentTarget.dataset.index
    console.log(index)
    var img = this.data.photosURL;
    console.log(img[index])
    wx.previewImage({
      current: img[index],     //当前图片地址
      urls: img,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  select: function (e) {
    var jj = parseInt(e.currentTarget.id) - 1;
    var t = "pictures[" + jj + "].typeSelect";
    var r = "pictures[" + jj + "].radioType";
    var s = "pictures[" + jj + "].seleColor";
    if (this.data.pictures[jj].typeSelect == true) {
      this.data.small.selectNum += 1;
      this.update(this.data.small.selectNum)
      this.data.deleteNums.push(jj)
      this.setData({
        [t]: false,
        [r]: "success",
        [s]: "#ffffff"
      })
    } else {
      this.data.small.selectNum -= 1;
      this.update(this.data.small.selectNum)
      this.data.deleteNums = getApp().remove(this.data.deleteNums, jj)
      this.setData({
        [t]: true,
        [r]: "",
        [s]: "#BEBEBE"
      })
    }
  },
  switchtab: function (e) {
    if (e.target.id == "11") {
      for (var i = 0; i < this.data.pictures.length; i++) {
        var t = "pictures[" + i + "].typeSelect";
        var r = "pictures[" + i + "].radioType";
        var s = "pictures[" + i + "].seleColor";
        this.data.small.selectNum = 0;
        this.update(this.data.small.selectNum)
        this.setData({
          [t]: true,
          [r]: "",
          [s]: '#BEBEBE'
        })
      }
      this.setData({
        openFlag: true,
        opeName: "管理",
        options: true,
        
      })
    }
    if (e.target.id == "22") {
      console.log(this.data.deleteNums);
      wx.showModal({
        title: '提示',
        content: '是否删除记录',
        confirmColor: '#46A3FF',
        success: function (res) {
          if (res.confirm) {
   
          }
          console.log("删除成功")
        }
      })
    }
  }
})