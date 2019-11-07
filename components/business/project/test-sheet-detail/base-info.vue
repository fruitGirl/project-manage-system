<template>
  <div class="project-base-info">
    <p class="title">基本信息</p>
    <div v-if="isNeedProgress" class="progress">
      <label style="margin-right: 10px">测试进度：</label>
      <div class="pm-flex-1">
        <el-progress :percentage="testInfo.percentage"></el-progress>
      </div>
      <span
        >({{ testInfo.executedTestCaseIds }}/{{ testInfo.allTestCase }})</span
      >
      <el-tag type="warning" style="margin:-5px 0 0 20px;">{{
        testInfo.testStatus
      }}</el-tag>
    </div>
    <pm-info-list :config="config" :data="data" />
  </div>
</template>

<script>
import PmInfoList from '@/components/common/pm-info-list.vue';
export default {
  components: {
    PmInfoList
  },
  props: {
    config: {
      // 配置
      type: Array,
      default: () => []
    },
    data: {
      // 数据源 -> 基本信息
      type: Object,
      default: () => ({})
    },
    testInfo: {
      // 其他信息
      type: Object,
      default: () => ({
        percentage: 0
      })
    },
    isNeedProgress: {
      // 是否需要进度条
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
.project-base-info {
  font-size: 14px;
  .title {
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: solid 1px #ebebeb;
    margin-bottom: 30px;
  }
  .container {
    margin-top: 10px;
    .base-label {
      color: #999;
    }
    .base-container {
      margin-left: 10px;
    }
  }
  .progress {
    display: flex;
    height: 50px;
    padding: 15px 20px;
    border: solid 1px #dcdfe6;
    border-radius: 30px;
    margin-bottom: 30px;
  }
}
</style>
