/*
 * @Description: 项目主页-任务
 * @Author: danding
 * @Date: 2019-06-24 15:46:07
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-30 17:22:18
 */

<template>
  <div class="bug-wrapper">
    <pm-link to="/project/task-list-query">
      <span class="title">任务</span>
      <i class="el-icon-arrow-right" />
    </pm-link>
    <pm-separate size="20" />
    <div v-if="data.length > 0">
      <div class="pm-flex pm-flex-justify-center">
        <div>
          <pm-wave-chart :value="percent" label="剩余量"></pm-wave-chart>
        </div>
        <div class="info-wrap">
          <pm-info-list
            label-class="info-label"
            :config="formatedLists"
            :is-array-show="true"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <pm-no-data />
    </div>
  </div>
</template>

<script>
import PmSeparate from '@/components/common/pm-separate';
import PmInfoList from '@/components/common/pm-info-list.vue';
import PmWaveChart from '@/components/common/pm-wave-chart.vue';
import { FINISHED } from '@/constants/project/home';
import PmNoData from '@/components/common/pm-no-data';
import { transArrs } from '@/utils/common';

export default {
  components: {
    PmSeparate,
    PmNoData,
    PmInfoList,
    PmWaveChart
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      percent: 0,
      formatedLists: []
    };
  },
  watch: {
    data: {
      handler(val) {
        const data = this.formatValue(val);
        const total = data[0].num;
        const finished = data.filter(i => i.name === FINISHED)[0].num;
        let percent = 0;
        percent = Math.round(((total - finished) / total) * 100) || 0;
        this.percent = percent;
        this.formatedLists = this.transArrs(data, 'message', 'num');
      },
      // immediate: true
    }
  },
  methods: {
    transArrs,
    formatValue(data) {
      let total = 0;
      const taskLists = JSON.parse(JSON.stringify(data));
      data.forEach(i => {
        total += i.num;
      });
      taskLists.unshift({ message: "总任务", num: total });
      return taskLists;
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';

.bug-wrapper {
  height: 300px;
  padding: 15px 15px 20px;
  margin-bottom: 15px;
  background: #fff;
  border-radius: 3px;
  .title {
    color: #333;
  }
  .info-wrap {
    margin-left: 20px;
  }
  @{deep} .info-label {
    color: #333;
  }
}
</style>
