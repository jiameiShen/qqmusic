//index.js

//推荐请求地址
const referUrl = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
const showapi_sign = "d68db9c4228a4f34abc411bdb21ac37d";
const showapi_id = 28421;

//排行榜请求地址
const topUrl = "https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg";

//热门搜索请求地址

const searchUrl = "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp";
const hotKey = "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg"



//获取应用实例
var app = getApp()
Page({
  data: {
    nowNav: 2,
    referData: {},
    orderData: [],
    searchData:[],
    keyValue:"",
    ifLoading: true //默认显示loading图
  },

  onLoad: function () {
    var that = this;

    //推荐请求
    wx.request({
      url: referUrl,
      method: 'GET',
      success: function (res) {
        // success
        console.log(res);
        var resData = res.data.data;
        console.log(resData);
        //当前this不是指向page，所以要使用that
        that.setData({
          referData: resData,
          ifLoading: false

        })
      }
    })


    //排行榜请求
    wx.request({
      url: topUrl,
      data: {
        format: "json"
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          orderData: res.data.data.topList,
          ifLoading: false
        })
      }




    })





  },
  // 定义菜单切换函数
  // 改变nowNav的值
  changeNav(e) {
    // 获取当前元素的data-index的值
    //e.target --->表示当前元素
    let index = e.target.dataset.index;
    this.setData({
      nowNav: index
    });
  },

  search(e){
    var that = this;
    
    //获取相关搜索内容
    wx.request({
      url: searchUrl,
      data: {
        format: "json",
        w:that.data.keyValue
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data.data.song.list);
        that.setData({
          searchData: res.data.data.song.list
        })
      }
    })
  },


  bindKeyInput(e){
    console.log( e.detail.value);
    this.setData({
      keyValue: e.detail.value
    })
    console.log(this.data.keyValue);
     var that = this;
    
    //获取相关搜索内容
    wx.request({
      url: searchUrl,
      data: {
        format: "json",
        w:that.data.keyValue
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data.data.song.list);
        that.setData({
          searchData: res.data.data.song.list
        })
      }
    })
  }




})
