// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()

const rp = require('request-promise')
const URL = 'http://musicapi.xiecheng.live/personalized'

const playlistConll = db.collection('playList')
// 当前页数

// 每页多少条数据
const LIMIT = 10
// 云函数入口函数
exports.main = async (event, context) => {

  let count = await playlistConll.count()
  /// 一共有几页
  let pageNum = Math.ceil(count.total / 10)
  console.log(count.total)
  console.log('pageNum: ' + pageNum)
  var list = []
  for (let index = 0; index < pageNum; index++) {
    list.push((await playlistConll.skip(index * LIMIT).limit(LIMIT).get()))
    console.log('index: ' + index)
  }
  let newList = {
    data: []
  }
  if (list.length > 0) {
    newList = (await Promise.all(list)).reduce((acc, cur) =>{
      // newList.data.concat(cur.data)
      console.log('cur.data.length: ' + cur.data.length)
      return {
        data:acc.data.concat(cur.data)
      }
    })
    console.log('newList.data.length: ' + newList.data.length) 
  }
  
  let playList = await rp(URL).then((res) =>{
    return JSON.parse(res).result
  })
  // console.log('success')
  for (let i = 0; i< playList.length; i++) {
    const element = playList[i];
    let flag = true
    for (let j = 0; index < list.data.length; j++) {
      console.log('element.id == ' + element.id)
      console.log('list.data[j].id == ' + list.data[j].id)
      if (element.id == list.data[j].id) {
        flag = false
        break;
      }      
    }
    if (flag == false) {
      break;
    } else {
      await playlistConll.add({
        data:{
          ...element,
          createTime: db.serverDate
        }
      }).then((res) => {
        console.log('success')
      }).catch((err) =>{
        console.log(false)
      })
    }
   }
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}