/*
 * @Description: 主页-环形图模块组件
 * @Author: moran
 * @Date: 2019-06-18 12:20:09
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 15:21:53
 */

<template>
  <div class="home-ring-chart">
    <div class="title">
      <div class="title-left">{{ title }}</div>
      <div class="title-right">
        <slot />
      </div>
    </div>
    <div>
      <div class="ring-left">
        <pm-g2-charts
          :id="id"
          :chart-data="chartData"
          :name="name"
          :count="count"
        />
      </div>
      <div class="ring-right">
        <div class="status-box">
          <p v-for="(item, index) in status" :key="index">
            <label>{{ item.name }}</label>
            <span>{{ item.value }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PmG2Charts from '@/components/common/pm-g2-chart.vue';
export default {
  components: {
    PmG2Charts
  },
  props: {
    title: {
      type: String,
      default: '产品统计'
    },
    id: {
      type: String,
      default: 'ring'
    },
    status: {
      type: Array,
      default: () => []
    },
    chartData: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: '参与产品'
    },
    count: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.home-ring-chart {
  background-color: @white;
  margin-top: 15px;
  padding: 15px;
  height: 244px;
  box-shadow: 0px 3px 16px 0px rgba(0, 30, 75, 0.11);
  border-radius: 3px;
  .title {
    height: 25px;
    font-size: 14px;
    .title-left {
      float: left;
    }
    .title-right {
      float: right;
    }
  }
  .ring-left {
    position: relative;
    float: left;
    width: 240px;
    height: 200px;
  }
  .ring-right {
    float: left;
    font-size: 12px;
    height: 200px;
    .status-box {
      height: 200px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      p {
        margin-bottom: 10px;
        label {
          color: @gray1;
        }
        span {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
