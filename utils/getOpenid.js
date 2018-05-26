function myRequestByGet(url, data, callback) {
  wx.request({
    url: url,
    method:'POST',
    header: {
      'Content-type': 'application/json'
    },
    data:{
      code:data,
    },
    success: function (obj) {
      callback(obj);
      // console.log(obj)
    }
  })
}
module.exports = {
  myRequestByGet
}