/*
 * @Description: 分支列表
 * @Author: danding
 * @Date: 2019-08-26 16:17:45
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-26 17:07:57
 */

<template>
  <pm-dialog
    :is-cancel-btn="false"
    :visible="visible"
    width="650px"
    title="分支列表"
    @confirm="hideModal"
    @cancel="hideModal"
  >
    <ul>
      <li v-for="item in list" :key="item">{{item}}</li>
    </ul>
  </pm-dialog>
</template>

<script>
import pmDialog from '@/components/common/pm-dialog.vue';

export default {
  components: {
    pmDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    };
  },
  methods: {
    hideModal() {
      this.$emit('hideModal');
    }
  }
};
</script>
