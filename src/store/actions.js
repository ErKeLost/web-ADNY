import {
  SET_FULL_SCREEN,
  SET_MINI_SCREEN,
  SET_IS_PLAYING,
  SET_SONG_DETAIL,
  SET_CURRENT_INDEX,
  SET_CURRENT_LYRIC,
  SET_CUR_TIME,
  SET_INDEX,
  COMMENT_DATA,
  COMMENT_MV
} from './mutations-type'
import{
  coData
} from './mutations'
import {
  getSongDetail,
  getSongLyric,
  getSongUrl,
  getTop,
  getMusicComment,
  getSendComment,
  getMvComment
} from '../api/index'
export default {
  setFullPlayer({
    commit
  }, flag) {
    commit(SET_FULL_SCREEN, flag)
  },
  setMiniPlayer({
    commit
  }, flag) {
    commit(SET_MINI_SCREEN, flag)
  },
  setIsPlaying({
    commit
  }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  async setTop(context,data){
    let result = await getTop()
    console.log(result);
    context.commit('topData')
  },
  setComment(context,flag){
    context.commit('comment')
  },
  async setCoData({commit},ids){
    let comment = await getMusicComment({id:ids.join(',')})
        let li  = []
        let obj = {}
        obj.comment = comment
        // console.log(comment);
       li.push(obj)
       commit(COMMENT_DATA,li)
  },
  async setMvComment({commit},mvid){
    let result = await getMvComment({id:mvid})
    // console.log(result);
    // console.log(typeof result);
    commit(COMMENT_MV,result.comments)
  },
  async setDetail  ({ commit }, ids) {
    let result = await getSongDetail({ ids: ids.join(',') })
    let urls = await getSongUrl({ id: ids.join(',') })
    // let comment = await getMusicComment({id:ids.join(',')})
    // let sendComment = await getSendComment({id:ids.join(','),content:"test"})
    // console.log(urls)
    // console.log(result)
    // console.log(comment);
    // console.log(sendComment);
    let list = []
    result.songs.forEach(function (value, i) {
      let obj = {}
      // obj.url = urls.data[i].url
      for (let j = 0; j < urls.data.length; j++) {
        let item = urls.data[j]
        if (value.id === item.id) {
          obj.url = item.url
          break
        }
      }
      obj.id = value.id
      obj.name = value.name
      // obj.comment = comment
      let singer = ''
      value['ar'].forEach(function (item, index) {
        if (index === 0) {
          singer = item.name
        } else {
          singer += '-' + item.name
        }
      })
      obj.singer = singer
      obj.picUrl = value['al'].picUrl
      list.push(obj)
    })
    commit(SET_SONG_DETAIL, list)
  },
  async setSongDetail  ({ commit }, ids) {
    let result = await getSongDetail({ ids: ids.join(',') })
    let urls = await getSongUrl({ id: ids.join(',') })
    let comment = await getMusicComment({id:ids.join(',')})
    // let sendComment = await getSendComment({id:ids.join(','),content:"test"})
    // console.log(urls)
    // console.log(result)
    // console.log(comment);
    // console.log(sendComment);
    let list = []
    result.songs.forEach(function (value, i) {
      let obj = {}
      // obj.url = urls.data[i].url
      for (let j = 0; j < urls.data.length; j++) {
        let item = urls.data[j]
        if (value.id === item.id) {
          obj.url = item.url
          break
        }
      }
      obj.id = value.id
      obj.name = value.name
      obj.comment = comment
      let singer = ''
      value['ar'].forEach(function (item, index) {
        if (index === 0) {
          singer = item.name
        } else {
          singer += '-' + item.name
        }
      })
      obj.singer = singer
      obj.picUrl = value['al'].picUrl
      list.push(obj)
    })
    commit(SET_SONG_DETAIL, list)
  },
  setCurrentIndex({
    commit
  }, index) {
    commit(SET_CURRENT_INDEX, index)
  },
  async setSongLyric({
    commit
  }, id) {
    let result = await getSongLyric({
      id: id
    })
    // console.log(result.lrc.lyric)
    let obj = parseLyric(result.lrc.lyric)
    // console.log(obj);
    commit(SET_CURRENT_LYRIC, obj)
  },
  setCurTime({commit},time){
    commit(SET_CUR_TIME,time)
  },
  setTitleIndex({commit},index){
    commit(SET_INDEX,index)
  },
}

function parseLyric(lrc) {
  let lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  let reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  let reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  let reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  let lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) {
      return
    }
    timeStr = timeStr[0]
    // 2.提取分钟
    let minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    let secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    let time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    let text = lyric.replace(reg1, '').trim()
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}