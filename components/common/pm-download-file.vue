/*
 * @Description: 文件下载
 * @Author: danding
 * @Date: 2019-07-18 11:41:58
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:10:29
 */

<template>
  <a
    class="pm-download-file"
    :href="
      `${baseUrl}/attachment.resource?resourceId=${resourceId}&fileName=${fileName}`
    "
    >{{ fileName }}</a
  >
</template>

<script>
export default {
  props: {
    resourceId: {
      type: [String, Number],
      default: ''
    },
    fileName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      baseUrl: process.env.baseUrl
    };
  }
};
</script>

<style scoped lang="less">
.pm-download-file {
  padding: 2px 0;
  display: block;
}
</style>
