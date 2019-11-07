/*
 * @Description: 授权系列功能
 * @Author: danding
 * @Date: 2019-06-17 11:03:32
 * @Last Modified by: danding
 * @Last Modified time: 2019-10-24 15:03:55
 */

const cookieparser = process.server ? require('cookieparser') : undefined;

// 服务端获取cookie
export const getUserFromCookie = req => {
  const { cookie } = req.headers;
  if (!cookie) return;
  const parsed = cookieparser.parse(cookie);
  return parsed.loginInfo;
};

// 存储用户信息
export const saveUserInfo = obj => {
  if (obj && typeof obj === 'object') {
    const userInfo = JSON.stringify(obj);
    window.localStorage.setItem('userInfo', userInfo);
  }
};

// 获取用户信息
export const getUserInfo = () => {
  const userInfo = window.localStorage.getItem('userInfo');
  if (!userInfo) return {};
  return JSON.parse(userInfo);
};

// 获取token值
export const getToken = () => {
  return localStorage.getItem('token');
};

// 设置token值
export const setToken = (val) => {
  localStorage.setItem('token', val);
};

// 删除token值
export const clearToken = () => {
  localStorage.removeItem('token');
};

// 存储session name
export const setSessionName = (val) => {
  localStorage.setItem('sessionName', val);
};

// 获取session name
export const getSessionName = () => {
  return localStorage.getItem('sessionName');
};

// 获取接口header鉴权参数
export const getAuthHeaderParams = (version = '1.0') => {
  return {
    headers: {
      'Web-Exterface-AppCode': 'pm.api.web.base',
      'Web-Exterface-ExterfaceVersion': version,
      'Web-Exterface-SourceVersion': '1.2.20191016.58-SNAPSHOT'
    }
  };
};
