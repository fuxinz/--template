// pages/my/my.js
const http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useinfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    let useinfo = wx.getStorageSync('useinfo');
    this.setData({
      useinfo
    })
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

  jumpPage(e) {
    console.log(e)
    let { page } = e.currentTarget.dataset;
    console.log(e)
    wx.navigateTo({
      url: page
    })
  },
  quitAction(){
    wx.reLaunch({
      url: '../register/step1/step1'
    })
  },
  cartechfinLoan() {
    let { useinfo } = this.data;
    http.post({
      url: '/financialAction/productH5/1?userId=' + useinfo.ownerid,
      success: (res) => {
        let result = res.data.result;
        wx.setStorageSync('title', '二维码');
        wx.setStorageSync('storageUrl', result)
        wx.navigateTo({
          url: '../webPage/webPage?url=storageUrl',
        })
      }
    })
  }
})