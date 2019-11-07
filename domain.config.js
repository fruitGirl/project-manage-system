// 接口域名（jenkins配置）
const baseURL = process.env.NODE_ENV === 'development'
  ? '//pm-api-web-base1.daxiang.net'
  : '${baseUrl}';

module.exports = {
  baseURL,
};
