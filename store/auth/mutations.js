import { BASE_CODE_IMG_URL } from '@/constants/auth';

const mutations = {
  changeCodeUrl(state) {
    // 修改验证码图片地址
    state.codeImgUrl = `${BASE_CODE_IMG_URL}?_=${Date.now()}`;
  }
};

export default mutations;
