/*
 * @Description: 相关需求 bug 应用
 * @Author: xiaojian
 * @Date: 2019-07-03 11:36:26
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:21:27
 */
<template>
  <el-tabs v-model="tabActiveName">
    <el-tab-pane label="需求" name="first">
      <div>
        <a href="javascript:;" @click="lookRequirementDetail(demandData.id)">{{ demandData.title }}</a>
        <span v-if="demandData.status" class="status-title">
          {{ demandData.status.message }}
        </span>
      </div>
      <div v-if="!demandData.id" class="no-data">暂无数据</div>
    </el-tab-pane>
    <el-tab-pane label="bug" name="second">
      <div v-for="(bug, index) in bugList" :key="index">
        <a href="javascript:;" @click="lookBugDetail(bug.id)">
          {{ bug.title }}
        </a>
        <span v-if="bug.status" class="status-title">
          {{ bug.status.message }}
        </span>
      </div>
      <div v-if="!bugList.length" class="no-data">暂无数据</div>
    </el-tab-pane>
    <el-tab-pane label="应用" name="third">
      <div v-for="(app, index) in appLinkList" :key="index">
        <span>{{ app.appCode }}</span>
      </div>
      <div v-if="!appLinkList.length" class="no-data">暂无数据</div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  props: {
    demandData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    bugList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    appLinkList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      tabActiveName: 'first'
    };
  },
  methods: {
    lookRequirementDetail(key) {
      this.$emit('lookRequirementDetail', key);
    },
    lookBugDetail(key) {
      this.$emit('lookBugDetail', key);
    }
  }
};
</script>
<style lang="less" scoped>
.status-title {
  display: inline-block;
  padding: 1px 5px;
  background: #ffa02f;
  color: #fff;
  border-radius: 3px;
  font-size: 12px;
}
</style>
