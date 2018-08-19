const basePath = 'https://127.0.0.1/api';
const config = {
  version: '1.1.0',
  saveUserUrl: basePath + '/api/user/saveUser.htm',
  queryOpenIdUrl: basePath + '/api/wx/getOpenId.htm',
  saveUserScoreUrl: basePath + '/api/user/score/save.htm',
  saveBuriedPointUrl: basePath + '/api/buriedPoint/add.htm',
  getRankListUrl: basePath + '/api/user/score/rank.htm'
}
module.exports = config