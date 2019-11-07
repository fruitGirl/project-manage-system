import axios from 'axios';
import qs from 'qs';
import { getToken, setToken, setSessionName, getSessionName, getAuthHeaderParams } from '@/utils/auth';
import { LOGIN_URL } from '@/services/auth';

const CancelToken = axios.CancelToken;
const api = axios.create({
  baseURL: `${process.env.baseUrl}/web/exterface/execute`,
  timeout: 30000, // 超时时间
  responseType: 'json', // default
  withCredentials: true,
  validateStatus: status => status === 200,
  headers: { 'Content-Type': 'application/json' }
});

// 请求拦截
api.interceptors.request.use(
  config => {
    config.cancelToken = new CancelToken(c => {});
    if (config.method === 'get') {
      // 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
      config.data = true; // 解决get请求设置content-type问题
      config.paramsSerializer = function(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      };
    }

    // 已经登录，headers增加token
    if (getToken()) {
      config.headers[getSessionName()] = getToken();
    }
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截
api.interceptors.response.use(
  (res = {}) => {
    const { headers, config } = res;
    let data = res.data;
    if (data && data.response) {
      data = data.response;
    }
    if (data.success) {
      const loginUrlReg = new RegExp(LOGIN_URL, 'g');

      // 匹配到登录接口，设置token
      if (loginUrlReg.test(config.url)) {
        const token = headers[headers.sessionname.toLowerCase()];
        setToken(token);
        setSessionName(headers.sessionname);
      }
      return Promise.resolve(data);
    } else {
      return Promise.reject(data);
    }
  },
  () => {
    return Promise.reject(new Error('系统错误'));
  }
);

/**
 * @example 请求方法定义
 * get(url, params);
 * post(url, params);
 *
 * @param {string} url - 路径
 * @param {object} params - 参数
 *
 * @returns
 */
export const get = (url, params, rest) =>
  api.get(url, { params, ...rest });

export const post = (url, params, version, rest) => {
  return api.post(url, { ...params, ...rest }, getAuthHeaderParams(version));
};

export const upload = (url, params, version, ...rest) => {
  return api.post(url, params, getAuthHeaderParams(version), {
    transformRequest: [
      data => {
        return data;
      }
    ],
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    ...rest
  });
};
