import { BG_IMGS, BASE_CODE_IMG_URL } from '@/constants/auth';

const state = () => ({
  bgImg: BG_IMGS, // 背景图片索引值
  codeImgUrl: BASE_CODE_IMG_URL, // 验证码图片地址
  submitLoading: false
});

export default state;
