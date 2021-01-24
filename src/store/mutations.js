import {
  COMMENT_DATA,
  SET_FULL_SCREEN
} from './mutations-type'
import { 
  SET_MINI_SCREEN,
  SET_IS_PLAYING,
  SET_SONG_DETAIL,
  SET_CURRENT_INDEX,
  SET_CURRENT_LYRIC,
  SET_CUR_TIME,
  SET_INDEX,
  MV_DATA,
  COMMENT_MV
} from './mutations-type'
export default {
  //   changeFullPlayer(state,flag){
  //     state.isFullPlayer = flag
  // }
  [SET_FULL_SCREEN](state, flag) {
    state.isFullPlayer = flag
  },
  [SET_MINI_SCREEN](state, flag) {
    state.isMiniPlayer = flag
    // console.log("aaa");
  },
  [SET_IS_PLAYING](state, flag) {
    state.isPlaying = flag
  },
  [SET_SONG_DETAIL](state, list) {
    state.songs = list
  },
  [SET_CURRENT_INDEX](state, index) {
    if (index < 0) {
      index = state.songs.length - 1
    } else if (index > state.songs.length - 1) {
      index = 0
    } else {
      state.currentIndex = index
    }
  },
  [SET_CURRENT_LYRIC](state,lyric){
    state.currentLyric = lyric
  },
  [SET_CUR_TIME](state, time) {
    state.curtime = time
  },
  [SET_INDEX](state, index) {
    state.titleIndex = index
  },
  [MV_DATA](state,data){
    state.mvData = data
  },
  topData(state,data){
    state.top = data
  },
  setmv(state,data){
    state.mvPlaying = data
  },
  comment(state,flag){
    state.isComment = flag
  },
  [COMMENT_DATA](state,list){
    state.commentData = list
  },
  [COMMENT_MV](state,list){
    state.mvComment = list
  }
}