/*
 * @Description: 路由跳转
 * @Author: danding
 * @Date: 2019-06-24 09:50:33
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:10:37
 */

<template>
  <nuxt-link :to="linkTo">
    <slot></slot>
  </nuxt-link>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('layout');

export default {
  props: {
    to: {
      type: [String, Object],
      required: true
    }
  },
  computed: {
    ...mapState(['selectedDependenceId']),
    linkTo() {
      let link = this.to;
      if (!link) return;
      if (typeof link === 'object') {
        const { query = {} } = link;
        link.query = { ...query, dependenceId: this.selectedDependenceId };
      }
      if (typeof link === 'string' && link.indexOf('dependenceId') === -1) {
        if (link.indexOf('?') !== -1) {
          link += `&dependenceId=${this.selectedDependenceId}`;
        } else {
          link += `?dependenceId=${this.selectedDependenceId}`;
        }
      }
      return link;
    }
  }
};
</script>
