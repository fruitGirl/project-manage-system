/*
 * @Description: 表单搜索下拉框(参考test-plan.vue: search-bar-dropDown)
 * @Author: yaochen
 * @Date: 2019-06-25 16:50:34
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-29 14:46:08
 */
<template>
  <el-dropdown class="search-bar-dropdown" @command="selectHandle">
    <span>
      {{ selectedItem ? selectedItem.label : '' }}{{ title }}
      <i class="el-icon-caret-bottom"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(item, index) in list"
        :key="index"
        :command="item"
        >{{ item.label }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  model: {
    prop: 'value', // 绑定的值，通过父组件传递
    event: 'change' // 自定义事件名
  },
  props: {
    // 后面拼接的文案如'全部'+'状态'中的'状态'
    title: {
      type: String,
      default: ''
    },
    value: {
      // 初始内容值
      type: [Object, String, null],
      default: () => {}
    },
    // 下拉值
    list: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data() {
    return {
      selectedItem: this.value
    };
  },
  mounted() {
    if (this.list.length) {
      let index = 0;
      if (this.value && typeof this.value === 'string') {
        index = this.findItemIndex(this.value);
      }
      // 冒出第一个
      this.selectedItem = this.list[index];
      // this.selectHandle(this.list[index]);
    }
  },
  methods: {
    selectHandle(item) {
      this.selectedItem = item;
      this.$emit('change', item.value);
    },
    findItemIndex(value) {
      let index = this.list.findIndex(item => item.value === value);
      if (index < 0) {
        index = 0;
      }
      return index;
    }
  }
};
</script>

<style lang="less">
.search-bar-dropdown {
  line-height: 1;
  .el-dropdown-selfdefine {
    cursor: pointer;
  }
}
</style>
