const cloud = require('wx-server-sdk');
const request = require('request');
const cheerio = require('cheerio');
const breakfast = 'http://www.5ikfc.com/mdl/menu/breakfast/';  //早餐
const chaozhitaocan = 'http://www.5ikfc.com/mdl/menu/chaozhitaocan/';  //超值套餐
const happymeals = 'http://www.5ikfc.com/mdl/menu/happymeals/';  //快乐套餐
const sides = 'http://www.5ikfc.com/mdl/menu/sides/';  //配餐
const drink = 'http://www.5ikfc.com/mdl/menu/drink/';  //饮料
const dessert = 'http://www.5ikfc.com/mdl/menu/dessert/';  //甜品
const mccafe = 'http://www.5ikfc.com/mdl/menu/mccafe/';  //麦咖啡
let breakfastList = [];
let chaozhitaocanList = [];
let happymealsList = [];
let sidestList = [];
let drinkList = [];
let dessertList = [];
let mccafeList = [];

// 初始化 cloud
cloud.init()

const db = cloud.database();

function maidanglaoSpider(http, list) {
    return new Promise((resolve, reject) => {
        request(http,
        (err, res) => {
            if(err) {
                reject('net error');
            }
            if(!err) {
                const body = res.body;
                const $ = cheerio.load(body, {
                decodeEntities: false
                })
                $('.lside.fr.bdgrey.main_wrap .fx li')
                .each(function() {
                    const img = $('a img', this).attr('src');
                    const name = $('a', this).text().trim();
                    const price = $('b', this).text().trim();
                    list.push({
                        name,
                        img,
                        price
                    })
                    console.log({
                        name,
                        img,
                        price
                    })
                })
                resolve(list);
            }
        })
    })
}
maidanglaoSpider(breakfast,breakfastList)
.then(res => {
    console.log(res);
})
exports.main = async (event, context) => {
        const breakfastData = await maidanglaoSpider(breakfast, breakfastList);
        const chaozhitaocanData = await maidanglaoSpider(chaozhitaocan, chaozhitaocanList);
        const happymealsData = await maidanglaoSpider(happymeals, happymealsList);
        const sidesData = await maidanglaoSpider(sides, sidestList);
        const drinkData = await maidanglaoSpider(drink, drinkList);
        const dessertData = await maidanglaoSpider(dessert, dessertList);
        const mccafeData = await maidanglaoSpider(mccafe, mccafeList);
        let arrData = [breakfastData,chaozhitaocanData,happymealsData,sidesData,drinkData,dessertData,mccafeData]
        
        // for(let i = 0; i < arrData.length; i++) {
        //     await db.collection('breakfast').add({
        //         data: {
        //             id: i,
        //             detail: arrData[i]
        //         }
        //     })
        // }
}
