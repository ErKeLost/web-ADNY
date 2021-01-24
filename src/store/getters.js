export default {
  isFullPlayer(state) {
    return state.isFullPlayer
  },
  isMiniPlayer(state) {
    return state.isMiniPlayer
  },
  isComment(state){
    return state.isComment
  },
  isPlaying(state) {
    return state.isPlaying
  },
  songs(state) {
    return state.songs
  },
  currentIndex (state) {
    return state.currentIndex
  },
  currentSong(state) {
    let obj = {
      name: '',
      singer: '',
      picUrl: null,
      comment:{}
    }
    if (state.songs.length !== 0) {
      obj = state.songs[state.currentIndex]
    }
    return obj
  },
  currentLyric(state) {
    return state.currentLyric
  }
  ,
  curtime(state){
    return state.curtime
  },
  titleIndex(state){
    return state.titleIndex
  }
}