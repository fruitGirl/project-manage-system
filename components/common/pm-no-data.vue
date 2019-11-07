<template>
  <div class="pm-data-blank">
    <div class="blank-bg"></div>
    {{ blankTip }}
  </div>
</template>
<script>
export default {
  props: {
    blankTip: {
      type: [String, Number],
      default: '暂无数据'
    }
  }
};
</script>
<style lang="less" scoped>
.pm-data-blank {
  width: auto;
  text-align: center;
  font-size: 14px;
  padding-top: 20px;
  padding-bottom: 50px;
  color: #a4a4a4;
  .blank-bg {
    height: 130px;
    background: url('~@/static/images/common/no-data.png') no-repeat center
      center;
  }
}
</style>
