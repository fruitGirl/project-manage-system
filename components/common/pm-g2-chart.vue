/*
 * @Description: 环形图组件
 * @Author: moran
 * @Date: 2019-06-18 12:16:17
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:09:22
 */

<template>
  <div :id="id"></div>
</template>

<script>
let G2;
if (process.client) {
  G2 = require('@antv/g2');
}

export default {
  props: {
    id: {
      type: String,
      default: 'ring'
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
  },
  watch: {
    chartData(val) {
      this.initCharts(val);
    }
  },
  methods: {
    initCharts(data) {
      // 创建图表
      const chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        height: 200,
        padding: [20, 10, 20, 20],
        animate: true
      });

      // 主题色，但是没有作用
      const theme = G2.Util.deepMix(
        {
          colors: ['red', 'blue', 'yellow']
          // 具体的配置项详见 api/global.html
        },
        G2.Theme
      );
      G2.Global.setTheme(theme);

      // 图例
      // chart.legend({
      //   position: 'right-center', // 设置图例的显示位置
      //   itemGap: 10 // 图例项之间的间距
      // });

      // 图例不显示
      chart.legend(false);

      // 数据源数据，格式化数据
      chart.source(data, {
        percent: {
          formatter: function formatter(val) {
            val = Math.round(val * 100) + '%';
            return val;
          }
        }
      });

      // 环形图宽度
      chart.coord('theta', {
        radius: 0.75,
        innerRadius: 0.7
      });

      // 提示框
      chart.tooltip({
        showTitle: false,
        itemTpl:
          '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });

      // 绘制环形图中心文字
      chart.guide().html({
        position: ['50%', '50%'],
        html:
          '<div style="font-size: 24px;text-align: center;width: 3em;"><p>' +
          this.count +
          '</p><p style="font-size:12px;marignTop:-10px">' +
          this.name +
          '</p></div>',
        alignX: 'middle',
        alignY: 'middle'
      });

      // 格式化提示框数据
      const interval = chart
        .intervalStack()
        .position('percent')
        .color('name')
        .tooltip('name*percent', function(name, percent) {
          percent = Math.round(percent * 100) + '%';
          return {
            name,
            value: percent
          };
        })
        .style({
          lineWidth: 0,
          stroke: '#fff'
        });
      chart.render();
      interval.setSelected();
    }
  }
};
</script>
