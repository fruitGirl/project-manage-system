/*
 * @Description: 生成分支
 * @Author: moran
 * @Date: 2019-08-22 14:16:11
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-26 16:33:40
 */

<template>
  <pm-dialog :is-cancel-btn="false" :visible.sync="isVisible" width="650px" title="生成分支" @confirm="isVisible = false">
    <el-form
      ref="form"
      label-width="50px"
      :model="formData"
      label-suffix=":"
    >
      <el-form-item label="svn">
        <el-select v-model="formData.type" placeholder="请选择">
          <el-option
            v-for="item in branchTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div v-for="(item, index) in list" :key="index" style="margin-top:15px">{{item}}</div>
      </el-form-item>
    </el-form>
  </pm-dialog>
</template>
<script>
import pmDialog from '@/components/common/pm-dialog.vue';
import { BRANCH_TYPE } from '@/constants/project/app-config';

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
      isVisible: false,
      branchTypes: BRANCH_TYPE,
      formData: {
        type: 'svn'
      }
    };
  },

  watch: {
    visible: {
      handler(val) {
        this.isVisible = val;
      },
      immediate: true
    },
    isVisible(val) {
      this.$emit('update:visible', val);
    }
  },
  methods: {
  }
};
</script>
