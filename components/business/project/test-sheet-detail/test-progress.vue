<template>
  <div class="test-progress">
    <div class="progress">
      <label style="margin-right: 10px">{{ title }}：</label>
      <div class="pm-flex-1">
        <el-progress :percentage="percentage" :color="color"></el-progress>
      </div>
      <span
        >({{ leftNum }}/{{ rightNum }})</span
      >
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      percentage: {
        type: [String, Number],
        default: 0
      },
      color: {
        type: String,
        default: '#409EFF'
      },
      leftNum: {
        type: [Number, String],
        default: ''
      },
      rightNum: {
        type: [Number, String],
        default: ''
      }
    },
    data() {
      return {

      };
    }
  };
</script>>

<style lang="less" scoped>
  .test-progress {
    display: inline-block;
    .progress {
      display: flex;
      width: 300px;
      padding: 10px 20px;
      border: solid 1px #dcdfe6;
      border-radius: 30px;
    }
  }
</style>