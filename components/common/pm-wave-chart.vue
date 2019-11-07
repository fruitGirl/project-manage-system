/*
 * @Description: 水波图 g2版
 * @Author: xiaojian
 * @Date: 2019-07-10 11:28:49
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:12:29
 */

<template>
  <div ref="wave" :style="{ width: width + 'px' }"></div>
</template>
<script>
let G2;
if (process.client) {
  G2 = require('@antv/g2');
}
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 160
    },
    waveColor: {
      type: String,
      default: '#409eff'
    }
  },
  data() {
    return {
      dataSource: [
        {
          name: 'name',
          value: this.value
        }
      ],
      chartInstance: null
    };
  },
  watch: {
    value(val) {
      this.$set(this.dataSource, 0, {
        ...this.dataSource[0],
        value: val
      });
    },
    dataSource() {
      this.renderChart();
    }
  },
  mounted() {
    this.chartInstance = new G2.Chart({
      container: this.$refs.wave,
      height: this.width,
      forceFit: true,
      padding: 0
    });
    this.chartInstance.legend(false);
    this.chartInstance.axis(false);
    this.chartInstance.tooltip(false);
    this.renderChart();
  },
  methods: {
    renderChart() {
      this.chartInstance.clear();
      this.chartInstance.source(this.dataSource, {
        value: {
          min: 0,
          max: 100
        }
      });
      this.chartInstance.guide().text({
        top: true,
        position: {
          name: 'name',
          value: 50
        },
        content: this.label + '\n' + this.value + '%',
        style: {
          opacity: 0.75,
          fontSize: 14,
          textAlign: 'center'
        }
      });
      this.chartInstance
        .interval()
        .position('name*value')
        .color('name', [this.waveColor])
        .shape('liquid-fill-gauge')
        .size(this.width * 0.85)
        .style({
          lineWidth: 3,
          opacity: 0.75
        });
      this.chartInstance.render();
    }
  }
};
</script>
