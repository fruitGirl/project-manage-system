/*
 * @Description: 树自定义节点 有编辑，新增，删除按钮
 * @Author: xiaojian
 * @Date: 2019-06-19 15:39:57
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:04:41
 */

<template>
  <span>
    <span>{{ node.label }}</span>
    <span class="icon-style tree-operation">
      <span v-if="showEdit" class="el-icon-edit" @click="handleEdit"></span>
      <span
        v-if="showDelete"
        class="el-icon-remove-outline"
        @click="handleDelete"
      ></span>
      <span
        v-if="showAppend"
        class="el-icon-circle-plus-outline"
        @click="handleAppend"
      ></span>
    </span>
  </span>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      }
    },
    showEdit: {
      type: Boolean,
      default: true
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    showAppend: {
      type: Boolean,
      default: true
    },
    node: {
      type: Object,
      default: function() {
        return {};
      }
    },
    removeNodeByKey: {
      type: Function,
      default: () => {}
    },
    handleAddChildNode: {
      type: Function,
      default: () => {}
    },
    getAppendInputNode: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {
    handleEdit() {
      const data = this.data;
      this.$set(data, 'contentEditable', true);
      this.$set(data, 'inputType', 'edit');
    },
    handleDelete() {
      this.$emit('delete', this.node.key);
    },
    // 增加一个可输入的节点
    handleAddInputNode(data) {
      const newChild = {
        id: 'appendInput',
        contentEditable: true,
        label: '',
        parentId: data.parentId ? data.id : '-1'
      };
      this.handleAddChildNode(data, newChild, this.node);
    },
    // 移除可输入节点
    removeNodeInput() {
      this.removeNodeByKey('appendInput');
    },
    handleAppend() {
      const inputNode = this.getAppendInputNode();
      if (inputNode) {
        this.removeNodeInput();
      }
      this.handleAddInputNode(this.data);
    }
  }
};
</script>
<style lang="less" scoped>
.icon-style {
  color: gray;
}
.tree-operation {
  visibility: hidden;
}
</style>
