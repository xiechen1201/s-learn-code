// pages/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "你好，小程序",
    list: [1, 2, 3, 4, 5],
    baseUserInfo: {
      userName: "张三",
      age: 25,
      job: "front development"
    }
  },

  changeName(e){
    console.log(getCurrentPages());
    this.setData({
      name: "谢晨"
    })
  },

  handleGetNodeInfo(){
    const selectQuery = wx.createSelectorQuery()
    const input = selectQuery.select(".input")
    input.boundingClientRect(function(data){
      console.log(data);
    }).exec()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log(11);
    wx.onAfterPageLoad(res=>{
      console.log("page:",res.openType);
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})