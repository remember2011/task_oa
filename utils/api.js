/**
 * 小程序接口URL配置文件
 */
var host = 'https://www.easy-mock.com/mock/5b459c0c5e7cb2279e6efe06/task';
var config = {

  myApi: {

    host,
    
    getMyinfo: `${host}/getMyinfo`,
    setMyinfo: `${host}/setMyinfo`,
    getMyleader: `${host}/getMyleader`, 
    getMyunder: `${host}/getMyunder`, 
    getMytask: `${host}/getMytask`,
    getAlluser: `${host}/getAlluser`,
    getParts: `${host}/getParts`,
  }
};

module.exports = config;