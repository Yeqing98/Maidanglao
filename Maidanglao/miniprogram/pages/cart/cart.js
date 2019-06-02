// miniprogram/pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhushi: {imgUrl: '../../images/cart/zhushi.png', name: '双层汉堡', price: 20},
    xiaoshi: [
      {imgUrl: '../../images/cart/xiaoshi1.png', name: '小食1', price: 10},
      {imgUrl: '../../images/cart/xiaoshi2.png', name: '小食2', price: 20},
      {imgUrl: '../../images/cart/xiaoshi3.png', name: '小食3', price: 30},
      {imgUrl: '../../images/cart/xiaoshi4.png', name: '小食4', price: 40},
      {imgUrl: '../../images/cart/xiaoshi5.png', name: '小食5', price: 50}
    ],
    drink: [
      {imgUrl: '../../images/cart/drink1.png', name: '饮料1', price: 1},
      {imgUrl: '../../images/cart/drink2.png', name: '饮料2', price: 2},
      {imgUrl: '../../images/cart/drink3.png', name: '饮料3', price: 3},
      {imgUrl: '../../images/cart/drink4.png', name: '饮料4', price: 4},
      {imgUrl: '../../images/cart/drink5.png', name: '饮料4', price: 5},
      {imgUrl: '../../images/cart/drink6.png', name: '饮料5', price: 6},
      {imgUrl: '../../images/cart/drink7.png', name: '饮料6', price: 7},
      {imgUrl: '../../images/cart/drink8.png', name: '饮料7', price: 8},
    ],
    price: 24.5,
    number: 1,
    totalPrice: 0
  },
  clickAdd(){
    // console.log(e);
    let addNumber = this.data.number;
    addNumber += 1;
    this.setData({
      number: addNumber
    });
    this.getTotalPrice(addNumber)
  },
  clickSub(){
    let subNumber = this.data.number;
    subNumber -= 1;
    if(subNumber <= 0){
      subNumber = 0;
    }
    this.setData({
      number: subNumber
    })
    this.getTotalPrice(subNumber)
  },
  getTotalPrice(num){
    let TotalPrice = this.data.price * num;
    this.setData({
      totalPrice: TotalPrice
    })
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

  }
})