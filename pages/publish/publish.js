const app = getApp();
Page({
  data: {
    edit:false,
    albumId:0,
    formData:{
      desc:'',
      photos:[]
    },
    user_id:0,
    action_id:0
  },
  /*---------------------------------*/
  onLoad (option) {
    console.log(option.pic)
    wx.setNavigationBarTitle({
      title: "上传图片",
    })
    const self=this
    self.setData({
      albumId: option.albumId
    })
    wx.getStorage({
      key: 'selectPhos',
      success: function (res) {
        console.log(res.data)
        var tempFilePaths=res.data
        tempFilePaths.forEach((item, index) => {
          console.log(item, index)
          var pho = { url: item, id: index }
          self.setData({
            "formData.photos": self.data.formData.photos.concat(pho)
          })
        });
      }
    })
   
    
  },
   /*---------------------------------*/
  descInput(e){
    this.setData({
      'formData.desc': e.detail.value
    });
  },
  
  //添加图片
  selectPhoto(e){
    const self = this;
    wx.chooseImage({
      count: (9 - self.data.formData.photos.length),
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        tempFilePaths.forEach((item,index)=>{
          console.log(item,index)
          var pho={url:item,id:index}
          self.setData({
            "formData.photos": self.data.formData.photos.concat(pho)
          })
        });
      }
    })
  },
  //删除图片
  remove(e) {
    var photos = this.data.formData.photos.slice();
    photos.splice(e.currentTarget.dataset.id, 1);
    this.setData({
      'formData.photos': photos
    })
  },
  //提交表单
  formSubmit(e){
    const formData = this.data.formData;
    // if (formData.photos.length < 1) {
    if (false){
      wx.showModal({
        content: '标题不能为空！照片不能少1张',
        showCancel:false,
      })
    }else{
      //GYB-start
      // const sendData = this.data.edit ? { formData } : { formData, token: wx.getStorageSync('token')};
      var that = this;

      wx.getStorage({
        key: 'user_id',
        success: function(res) {
          that.setData({
            user_id:res.data
          })
          wx.request({
            url: 'https://www.concertgifts.cn/index.php/home/uploadImage/insertAction',
            method:'post',
            data: {
              action_des:that.data.formData.desc,
              user_id:res.data
            },
            success(res){
              var action_id = res.data
              wx.getStorage({
                key: 'zone_id',
                success: function(res) {
                  const sendData = that.data.formData;
                  while(sendData.photos.length){
                    wx.uploadFile({
                      url: 'https://www.concertgifts.cn/index.php/home/uploadImage/index',
                      filePath: that.data.formData.photos.shift().url,
                      name: 'file',
                      formData: {
                        album_id:that.data.albumId,
                        zone_id:res.data,
                        user_id:that.data.user_id,
                        action_id: action_id
                      },
                      success: function (res) {
                        console.log(res.data);
                      }
                    });
                  }
                },
              })
              wx.showToast({
                title: '上传成功',
              });
              wx.navigateBack({delta: 1});
            }
          });
        },
      })

      // wx.request({
      //   url: "",
      //   method:'post',
      //   data: sendData,
      //   success(res){
      //     console.log(res);
      //     wx.navigateBack({delta: 1});
      //   }
      // })
      //GYB-end
    }
  }

})


