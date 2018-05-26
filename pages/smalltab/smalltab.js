let _compData = {
  'small.selectNum':0
}

let smallbar = {
  cancel: function (id) {
   
  },
  delete:function(id){

  },
  update:function(num){
    this.setData({
      'small.selectNum':num
    })
  }

}
function SmallTab() {
  let pages = getCurrentPages();
  let curPage = pages[pages.length - 1];
  this.__page = curPage;

  Object.assign(curPage, smallbar);
  curPage.smallbar = this;
  curPage.setData(_compData);
  return this;
}
module.exports = {
  SmallTab
}