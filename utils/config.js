const basePath = 'http://127.0.0.1:8080/api';
const config = {
  saveUserUrl: basePath + '/api/user/saveUser.htm',
  queryOpenIdUrl: basePath + '/api/wx/getOpenId.htm',
  saveUserScoreUrl: basePath + '/api/act/user/score/save.htm'
}
module.exports = config