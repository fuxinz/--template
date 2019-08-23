//index.js
const http = require('../../utils/http.js');
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    
  },
  onLoad: function (options) {
    this.getOpenID();
  },

  jumpPage(page){
    wx.reLaunch({
      url: page,
    })
  },
  getOpenID() {
    wx.showLoading({title: '加载中'});
    wx.login({
      success: res => {
        // console.log(res.code)
        // return
        http.post({
          url: '/WeiXinAction/getJsapiTicket?scode=' + res.code,
          success: (res) => {
            let openid = res.data.result;
            wx.setStorageSync('openid', openid);
            this.setData({
              openid
            })
            this.loginApi({
              method: '2',
              openid,
            });
          }
        })
      }
    })
  },
  getUserInfo(e){
    let { action } = e.currentTarget.dataset;
    let userInfo = e.detail.userInfo;
    if(action=='phone'){
      wx.navigateTo({
        url: '../register/step1/step1',
      })
    }else{
      if (userInfo) {
        let { avatarUrl, province, nickName, gender } = userInfo;
        wx.setStorageSync('wxuserinfo', { avatarUrl, province, nickName, gender })
        wx.switchTab({
          url: '../home/home',
        })
      }else{
        http.showToast('请授权登录！！');
      }
    }
  },
  loginApi(upData){
    http.post({
      url: '/LoginAction/login',
      data: upData,
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        wx.hideLoading();
        let result = res.data.result;
        wx.setStorageSync('useinfo', result);
        wx.setStorageSync('token', result.token);
      }
    })
  }
})
