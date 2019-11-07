/*
 * @Description: bug详情-基本信息
 * @Author: danding
 * @Date: 2019-06-21 14:42:50
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 18:08:49
 */

<template>
  <div class="bug-normal-info">
    <div>
      <span class="title-tag">标题</span>
      <span class="title-distance">
        {{bugInfo.versionType ? `[${bugInfo.versionType.message}]` : ''}}{{ bugInfo.title }}
      </span>
      <span class="pm-tag-yellow">{{ bugInfo.priorityMessage }}</span>
      <span v-if="bugInfo.bugTypeMessage" class="pm-tag-blue">{{bugInfo.bugTypeMessage}}</span>
    </div>
    <pm-separate :size="15" />
    <div class="info-box">
      <pm-info-list :config="config" :data="bugInfo" :is-vertical="false" label-class="label-style"/>
    </div>
  </div>
</template>

<script>
import PmSeparate from '@/components/common/pm-separate';
import PmInfoList from '@/components/common/pm-info-list';
import { NORMAL_INFO_CONFIG } from '@/constants/project/bug-detail';
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('project/bug-detail');

export default {
  components: {
    PmSeparate,
    PmInfoList
  },
  data() {
    return {
      config: NORMAL_INFO_CONFIG
    };
  },
  computed: {
    ...mapState(['bugInfo'])
  }
};
</script>

<style lang="less" scoped>
  @deep: ~'>>>';
  .bug-normal-info {
    @{deep}.label-style {
      color: #333 !important;
    }
    .title-distance {
      margin-right: 5px;
    }
    .title-tag {
      font-weight: 400;
      font-size: 12px;
      background-color: #e3f3ff;
      padding: 1px 8px;
      border-radius: 4px;
      margin-right: 12px;
    }
    .info-box {
      background-color: #F5F5F5;
      padding: 10px;
    }
  }
</style>
