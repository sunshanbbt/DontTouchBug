const basePath = 'http://127.0.0.1:8585/api';
const config = {
  saveUserUrl: basePath + '/api/user/saveUser.htm',
  queryOpenIdUrl: basePath + '/api/wx/getOpenId.htm',
  saveUserScoreUrl: basePath + '/api/user/score/save.htm',
  saveBuriedPointUrl: basePath + '/api/buriedPoint/add.htm'
}
module.exports = config