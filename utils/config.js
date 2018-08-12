const basePath = 'https://bug.ty1990.cn/api';
const config = {
  saveUserUrl: basePath + '/api/user/saveUser.htm',
  queryOpenIdUrl: basePath + '/api/wx/getOpenId.htm',
  saveUserScoreUrl: basePath + '/api/user/score/save.htm',
  saveBuriedPointUrl: basePath + '/api/buriedPoint/add.htm',
  getRankListUrl: basePath + '/api/user/score/rank.htm'
}
module.exports = config