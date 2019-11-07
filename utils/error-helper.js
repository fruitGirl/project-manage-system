import { MessageBox, Message } from 'element-ui';
import { clearToken } from '@/utils/auth';
/**
 * 获取错误信息
 *
 * @param {object} data
 * @returns
 */
const getError = data => {
  if (!data) return '';
  if (typeof data !== 'object') {
    return data;
  }
  if (data.detailMessage) {
    return data.detailMessage;
  }
  if (data.errorMessage) {
    if (typeof data.errorMessage === 'object') {
      return data.errorMessage.message;
    }
    return data.errorMessage;
  } else if (typeof data.errorEnum === 'object') {
    return data.errorEnum.message;
  } else if (data.errorCode) {
    return data.errorCode.message;
  } else if (data.error) {
    if (typeof data.error === 'object') {
      return data.error.message || data.error.code;
    }
    return data.error;
  } else if (data.fieldErrors) {
    return data.fieldErrors;
  } else {
    return '系统错误';
  }
};

/**
 * 获取错误代码
 *
 * @param {object} data
 * @returns
 */
const getErrorCode = data => {
  if (data.errorCode) {
    return data.errorCode;
  } else if (data.error && typeof data.error === 'object') {
    return data.error.code;
  } else if (data.errorEnum && typeof data.error === 'object') {
    return data.errorEnum.name || data.errorEnum.message;
  } else if (data.target) {
    // window.location = data['target'];
    // redirectUrl(data.outputParameters.targetUrl);
  } else {
    return null;
  }
};

/**
 * 用modal显示错误信息
 *
 * @param {object} data
 * @returns
 */
export const showError = data => {
  if (getErrorCode(data) === 'USER_NOT_LOGIN') {
    MessageBox.alert('未登录，请先登录！', '提示', {
      confirmButtonText: '去登录',
      callback: () => {
        clearToken();
        const redirectUrl = encodeURIComponent(`${location.pathname}${location.search}`);
        window.location.href = `/auth/login?redirectUrl=${redirectUrl}`;
      }
    });
  } else if (getErrorCode(data) === 'USER_PERMISSION_DENIED') {
    // 访问被拒绝
    window.location.href = data.outputParameters.targetUrl;
  } else if (getErrorCode(data) === 'SALARY_OPERATE_VALIDATE_EXPIRE') {
    // 令牌失效，重定向
  } else {
    MessageBox.alert({
      type: 'error',
      message: getError(data),
      title: '提示',
      confirmButtonText: '知道了'
    });
  }
};

/**
 * 用message显示错误信息
 *
 * @param {object} data
 * @returns
 */
export const showErrorMessage = data => {
  if (getErrorCode(data) === 'USER_NOT_LOGIN') {
    MessageBox.alert('未登录，请先登录！', '提示', {
      type: 'warning',
      confirmButtonText: '去登录',
      callback: () => {
        clearToken();
        const redirectUrl = encodeURIComponent(`${location.pathname}${location.search}`);
        window.location.href = `/auth/login?redirectUrl=${redirectUrl}`;
      }
    });
  } else if (getErrorCode(data) === 'SALARY_OPERATE_VALIDATE_EXPIRE') {
    // 令牌失效，重定向
    // redirectUrl(data.outputParameters.targetUrl);
  } else {
    Message.error({ message: getError(data) });
  }
};

export default {
  getError,
  getErrorCode,
  showError,
  showErrorMessage
};
