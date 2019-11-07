/*
 * @Description: 项目主页-任务
 * @Author: danding
 * @Date: 2019-06-24 15:46:07
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 15:34:44
 */

<template>
  <div class="bug-wrapper">
    <pm-link to="/">
      <span class="title">任务</span>
      <i class="el-icon-arrow-right" />
    </pm-link>
    <pm-separate size="20" />
    <div class="pm-flex pm-flex-justify-center">
      <div></div>
      <div>
        <pm-info-list
          label-class="info-label"
          :config="config"
          :data="data"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PmLink from '@/components/common/pm-link';
import PmSeparate from '@/components/common/pm-separate';
import PmInfoList from '@/components/common/pm-info-list';
import { TASK_INFO } from '@/constants/project';

export default {
  components: {
    PmLink,
    PmSeparate,
    PmInfoList
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      config: TASK_INFO,
    };
  }
};
</script>

<style lang="less" scoped>
  @deep: ~'>>>';

  .bug-wrapper {
    height: 280px;
    padding: 15px 15px 20px;
    margin-bottom: 15px;
    background: #fff;
    border-radius: 3px;
    .title {
      color: #333;
    }
    @{deep} .info-label {
      color: #333;
    }
  }
</style>
