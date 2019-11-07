/*
 * @Description: 用例详情-关联
 * @Author: danding
 * @Date: 2019-06-21 14:42:35
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:30:32
 */

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="关联需求" name="requirement">
      <el-row
        v-for="item in requirement"
        :key="item.id"
        type="flex"
        justify="space-between"
      >
        <el-col class="relation-title">
          <a
            href="javascript:;"
            @click="lookRequirementDetail(item.id)"
          >{{ item.title }}</a>
        </el-col>
        <el-col class="relation-status">
          {{ item.status && item.status.message }}</el-col>
      </el-row>
      <div v-if="!requirement.length" class="no-data">暂无数据</div>
    </el-tab-pane>
    <el-tab-pane label="关联BUG" name="bug">
      <el-row
        v-for="item in bug"
        :key="item.id"
        type="flex"
        justify="space-between"
      >
        <el-col class="relation-title">
          <a
            href="javascript:;"
            @click="lookBugDetail(item.id)"
          >{{ item.title }}</a>
        </el-col>
        <el-col class="relation-status">
          {{ item.status && item.status.message }}
        </el-col>
      </el-row>
      <div v-if="!bug.length" class="no-data">暂无数据</div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  props: {
    requirement: {
      type: Array,
      default: () => []
    },
    bug: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeName: 'requirement'
    };
  },
  methods: {
    lookBugDetail(key) {
      this.$emit('lookBugDetail', key);
    },
    lookRequirementDetail(key) {
      this.$emit('lookRequirementDetail', key);
    }
  }
};
</script>

<style lang="less" scoped>
.relation-title {
  flex: 3;
  word-break: break-all;
  color: #409eff;
}
.relation-status {
  flex: 1;
  text-align: right;
}
.no-data {
  font-size: 12px;
  color: #999;
}
</style>
