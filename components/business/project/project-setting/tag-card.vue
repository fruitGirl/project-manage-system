<template>
  <div class="tag-card-container">
    <h1 class="tag-title">{{ title }}</h1>
    <slot>
      <div
        v-for="(item, index) in infoList"
        :key="index"
        class="item-container"
      >
        <span class="item-key">{{ item.key }}:</span>
        <span class="item-value">{{ item.value }}</span>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    infoList: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="less" scoped>
.tag-card-container {
  width: 48%;
  margin: 15px;
  padding: 8px;
  background-color: white;
  .tag-title {
    position: relative;
    padding-left: 12px;
    margin-bottom: 8px;
    &::before {
      content: '';
      width: 6px;
      height: 70%;
      background: #1890ff;
      position: absolute;
      top: 15%;
      left: 0;
      border-radius: 2px;
    }
  }
  .item-key {
    color: #999;
  }
  .item-value {
    margin-left: 10px;
  }
}
.item-container {
  margin-bottom: 2px;
}
</style>
