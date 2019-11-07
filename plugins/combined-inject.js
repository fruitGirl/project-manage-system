/*
 * @Description: 注入this的方法
 * @Author: danding
 * @Date: 2019-06-24 10:51:46
 * @Last Modified by: moran
 * @Last Modified time: 2019-07-01 17:40:29
 */

import { Message } from 'element-ui';
import { showErrorMessage } from '@/utils/error-helper';
import PMRouter from '@/utils/pm-router';

export default ({ app }, inject) => {
  inject('showErrorMessage', showErrorMessage);
  inject('showSuccessMessage', Message.success);
  inject('PMRouter', new PMRouter(app));
};
