// miniprogram/pages/cart/cart.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhushi: {},
    xiaoshi: [],
    drink: [],
    xiaoshiPrice: 0,
    drinkPrice: 0,
    unitPrice: 0,
    number: 1,
    totalPrice: 0
  },
  init(){
    let Data = this.data;
    const number = Data.number;
    let XiaoshiPrice = Data.xiaoshi[0].price;
    let DrinkPrice = Data.drink[0].price;
    this.setData({
      xiaoshiPrice: XiaoshiPrice,
      drinkPrice: DrinkPrice,
    })
    let UnitPrice = Data.zhushi.price + Data.xiaoshiPrice + Data.drinkPrice;
    this.setData({
      unitPrice: UnitPrice
    })
    this.getTotalPrice(number)
    // console.log(Data.xiaoshiPrice, Data.drinkPrice, Data.unitPrice);
  },
  chooseXiaoshi(e){
    // console.log(e.detail.current);
    let index = e.detail.current;
    let Data = this.data;
    const number = Data.number;
    let XiaoshiPrice = Data.xiaoshi[index].price;
    this.setData({
      xiaoshiPrice: XiaoshiPrice
    })
    let UnitPrice = Data.zhushi.price + Data.xiaoshiPrice + Data.drinkPrice;
    this.setData({
      unitPrice: UnitPrice
    })
    this.getTotalPrice(number);
  },
  chooseDrink(e){
    // console.log(e.detail.current);
    let index = e.detail.current;
    let Data = this.data;
    const number = Data.number;
    let DrinkPrice = Data.drink[index].price;
    this.setData({
      drinkPrice: DrinkPrice
    })
    let UnitPrice = Data.zhushi.price + Data.xiaoshiPrice + Data.drinkPrice;
    this.setData({
      unitPrice: UnitPrice
    })
    this.getTotalPrice(number);
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
    let TotalPrice = this.data.unitPrice * num;
    this.setData({
      totalPrice: TotalPrice
    })
  },
  navigate(){
    wx.redirectTo({
      url: '../menu/menu',
      fail: wx.showToast({
        title: '页面跳转失败',
        icon: 'none'
      })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.getStorage({
      key: "cartFood",
      success: (res) => {
        let zhushi = this.data.zhushi;
        zhushi = res.data;
        // console.log(zhushi)
        this.setData({
          zhushi
        })
      },
    });
    wx.cloud.callFunction({
      name: 'foodData',
      success: (res) => {
        // console.log(res);
        db.collection('breakfast')
        .get()
        .then(res => {
          // console.log(res);
          let xiaoshi = this.data.xiaoshi;
          xiaoshi = res.data[5].detail.slice(0,5);
          // console.log(xiaoshi);
          this.setData({
            xiaoshi
          })
          return res;
        })
        .then((res) => {
          let drink = this.data.drink;
          drink = res.data[6].detail.slice(0,5);
          this.setData({
            drink
          })
        })
        .then(() => {
          that.init();
        })
      }
    })
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