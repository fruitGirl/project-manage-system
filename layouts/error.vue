<template>
  <div class="__nuxt-error-page">
    <div class="error">
      <i class="el-icon-lightning" />
      {{ statusCode }}
      {{ message }}
      <pm-separate :is-vertical="false" size="15" />
      <nuxt-link class="link-home" to="/">您可以返回首页</nuxt-link>
    </div>
  </div>
</template>

<script>
import PmSeparate from '@/components/common/pm-separate';

const ERROR_CONFIG = {
  404: '页面没找到...'
};

export default {
  name: 'NuxtError',
  layout: 'empty',
  components: {
    PmSeparate
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: this.message,
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
        }
      ]
    };
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500;
    },
    message() {
      return ERROR_CONFIG[this.error && this.error.statusCode] || '系统错误';
    }
  }
};
</script>

<style>
.__nuxt-error-page {
  width: 100%;
  height: 100%;
  padding-top: 300px;
  background: #f7f8fb;
  color: #47494e;
  font-size: 18px;
}
.__nuxt-error-page .error {
  text-align: center;
}
.link-home {
  font-size: 14px;
}
</style>
