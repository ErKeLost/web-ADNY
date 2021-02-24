//这个js文件就是请求各种借口地址的
import network from './network'
//轮播图
export const getBanner = () => network.get('banner?type=0')
//热门推荐
export const getPersonalized = () => network.get('personalized')
//最新专辑
export const getNewAblum = () => network.get('album/newest')
//最新音乐
export const getNewSong = () => network.get('personalized/newsong')
//歌单详情
export const getPlayList = (data) => network.get('playlist/detail',data)
//手机登录
export const getCellPhone = (data) => network.get('login/cellphone',data)
//所有歌曲详情
export const getSongDetail = (data) => network.get('song/detail',data)
//专辑内容
export const getNewAlbum = (data) => network.get('album',data)
//歌词
export const getSongLyric = (data) => network.get('lyric', data)
//播放地址
export const getSongUrl = (data) => network.get('song/url',data)
//用户播放记录
export const getSongRecord = (data) => network.get('user/record',data)
//mv
export const getMv = (data) => network.get('mv/first?limit=80',data)
//mv数据
export const getMvData = (data) => network.get('mv/detail',data)
//mv播放地址
export const getMvUrl = (data) => network.get('mv/url',data)
//相似mv
export const getMvsimi = (data) => network.get('simi/mv',data)
//推荐mv
export const getMvsear = (data) => network.get('mv/exclusive/rcmd?limit=10',data)
//MV排行
export const getMvrace = (data) => network.get('top/mv?limit=50',data)
//搜索
export const getSearch = (data) => network.get('cloudsearch?type=1',data)
//所有榜单
export const getTop = (data) => network.get('toplist',data)
//排行榜数据
export const getTopData = (data) => network.get('toplist/detail',data)
//歌曲评论
export const getMusicComment = (data) => network.get('comment/music?limit=100',data)
//发送评论
export const getSendComment = (data) => network.get('comment?t=0&type=1',data)
//热搜列表
export const getHotSearch = (data) => network.get('search/hot/detail',data)
//默认搜索关键词
export const getDefaultSearch = (data) => network.get('search/default',data)
//云村热评
export const getCloudComment = (data) => network.get('comment/hotwall/list',data)
//mv评论
export const getMvComment = (data) => network.get('comment/mv?limit=100',data)
//每日推荐歌单
export const getSong = (data) => network.get('recommend/resource',data)














