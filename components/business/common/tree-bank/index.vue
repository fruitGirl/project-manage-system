/*
 * @Description: 树组件
 * @Author: xiaojian
 * @Date: 2019-06-19 09:37:52
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-27 16:29:11
 */
<template>
  <div class="pm-tree-bank">
    <span v-if="localeTreeData.length > 0">
      <el-input
        v-model="filterText"
        size="small"
        class="filter-input"
        placeholder="请输入"
        suffix-icon="el-icon-search"
      ></el-input>

      <!-- <el-scrollbar> -->
        <el-tree
          ref="tree"
          class="tree pm-scrollbar"
          highlight-current
          node-key="id"
          :draggable="draggable"
          :data="localeTreeData"
          :props="localDefaultTreeProps"
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          :allow-drag="handleAllowDrag"
          :allow-drop="handleAllowDrop"
          :default-expanded-keys="defaultExpandedKeys"
          :auto-expand-parent="false"
          @node-expand="handleNodeExpand"
          @node-collapse="handleNodeCollapse"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDragDrop"
          @current-change="currentChangeHandler"
        >
          <template v-if="showCustomNode" v-slot="{ node, data }">
            <span>
              <span v-if="data.contentEditable">
                <node-input
                  :label.sync="data[localDefaultTreeProps.label]"
                  :type="data.inputType"
                  :order-value="data.orderValue"
                  :loading="nodeInputLoading"
                  @cancel="() => handleInputCancel(node, data)"
                  @confirm="
                    inputNodeData =>
                      handleInputConfirm(node, data, inputNodeData)
                  "
                ></node-input>
              </span>
              <span v-else>
                <custom-node
                  :data="data"
                  :node="node"
                  :show-edit="hideEditLevelList.indexOf(node.level) === -1"
                  :show-delete="hideDeleteLevelList.indexOf(node.level) === -1"
                  :show-append="hideAppendLevelList.indexOf(node.level) === -1"
                  :get-append-input-node="getAppendInputNode"
                  :handle-add-child-node="handleAddChildNode"
                  :remove-node-by-key="removeNodeByKey"
                  @delete="handleDeleteNode"
                ></custom-node>
              </span>
            </span>
          </template>
        </el-tree>
      <!-- </el-scrollbar> -->
    </span>
    <template v-else-if="localeTreeData.length === 0 && showCustomNode">
      <slot name="no-data">
        <no-data
          :handle-input-confirm="handleInputConfirm"
          :root-input-visible-sync="rootInputVisible"
          :node-input-loading="nodeInputLoading"
        />
      </slot>
    </template>
  </div>
</template>

<script>
import nodeInput from './node-input';
import customNode from './custom-node.vue';
import NoData from './no-data';
let crrentRenderTimes = 0;
export default {
  components: {
    nodeInput,
    customNode,
    NoData
  },
  props: {
    showCustomNode: {
      type: Boolean,
      default: true
    },
    treeData: {
      type: Array,
      default: () => []
    },
    addNode: {
      type: Function,
      default: (node, inputNodeData) => {}
    },
    deleteNode: { type: Function, default: key => {} },
    editNode: {
      type: Function,
      default: (node, inputNodeData) => {}
    },
    draggable: {
      type: Boolean,
      default: false
    },
    dragDrop: {
      type: Function,
      default: (sourceNode, targetNode, place, event) => {}
    },
    defaultExpandedLevel: {
      // 默认展开第几层
      type: Number,
      default: 1
    },
    forbidDragLevelList: {
      // 第几层禁止拖拽
      type: Array,
      default: () => {
        // 返回数字数组
        return [1];
      }
    },
    forbidDropLevelList: {
      // 第几层禁止放置
      type: Array,
      default: () => {
        // 返回数字数组  或者对象数组 [{level:1,place:'inner'}]
        return [1];
      }
    },
    activeTreeNodeId: {
      type: String,
      default: ''
    },
    hideEditLevelList: {
      // 第几层隐藏编辑按钮
      type: Array,
      default: () => []
    },
    hideDeleteLevelList: {
      // 第几层隐藏删除按钮
      type: Array,
      default: () => []
    },
    hideAppendLevelList: {
      // 第几层隐藏添加按钮
      type: Array,
      default: () => []
    },
    defaultTreeProps: {
      type: Object,
      default: () => {
        return {
          children: 'subModuleInfo',
          label: 'name',
          disabled: 'disabled',
          isLeaf: 'isLeaf'
        };
      }
    }
  },
  data() {
    return {
      localeTreeData: [],
      defaultExpandedKeys: [],
      rootInputVisible: false, // 无数据时 新增根节点的输入框显示
      nodeInputLoading: false,
      filterText: '',
      localDefaultTreeProps: {
        children: 'subModuleInfo',
        label: 'name',
        disabled: 'disabled',
        isLeaf: 'isLeaf'
      }
    };
  },
  watch: {
    treeData: {
      handler(val) {
        this.localeTreeData = JSON.parse(JSON.stringify(val));
        const circleCount = 0;
        this.formatTreeData(
          this.localeTreeData,
          this.defaultExpandedKeys,
          circleCount
        );
      },
      immediate: true
    },
    defaultTreeProps(val) {
      this.localDefaultTreeProps = { ...this.localDefaultTreeProps, ...val };
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    crrentRenderTimes = 0;
  },
  updated() {
    const { activeTreeNodeId } = this;
    if (!crrentRenderTimes && activeTreeNodeId) {
      crrentRenderTimes++;
      const tree = this.$refs.tree;
      tree.setCurrentKey(activeTreeNodeId);
      const node = tree.getNode(activeTreeNodeId);
      this.currentChangeHandler(node.data, node);
    }
  },
  methods: {
    formatTreeData(list, arr, circleCount) {
      const length = list.length;
      const children = this.localDefaultTreeProps.children;
      for (let i = 0; i < length; i++) {
        const item = list[i];
        if (circleCount === this.defaultExpandedLevel) {
          return;
        }
        if (item[children] && item[children].length > 0) {
          arr.push(item.id);
          this.formatTreeData(item[children], arr, circleCount + 1);
        }
      }
    },
    currentChangeHandler(data, node) {
      this.$emit('current-change', data, node);
    },
    // 给当前的树节点，增加一个子节点
    handleAddChildNode(data, nodeData, node) {
      const parentNode = this.$refs.tree.getNode(data.id);
      const children = this.localDefaultTreeProps.children;
      let orderValue;
      // 得到父节点下所有子节点的数据  取子节点中orderValue最大值 并加1传给后台
      if (!parentNode.data[children]) {
        orderValue = 1;
      } else {
        const orderValueList = parentNode.data[children].map(item => {
          if (item.orderValue) {
            return item.orderValue;
          }
        });
        orderValue =
          orderValueList.length > 0 ? Math.max(...orderValueList) + 1 : 1;
      }
      this.$refs.tree.append({ ...nodeData, orderValue }, parentNode);
      if (this.defaultExpandedKeys.indexOf(data.id) === -1 && !node.expanded) {
        this.defaultExpandedKeys.push(data.id);
      }
    },
    getAppendInputNode() {
      // 检查是否已经存在添加输入框的节点了
      return this.$refs.tree.getNode('appendInput');
    },
    // 根据key移除树节点
    removeNodeByKey(nodeKey) {
      this.$refs.tree.remove(nodeKey);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data[this.localDefaultTreeProps.label].indexOf(value) !== -1;
    },

    handleDeleteNode(key) {
      this.deleteNode(key)
        .then(() => {
          this.removeNodeByKey(key);
        })
        .catch(() => {});
    },
    removeNodeInput() {
      this.removeNodeByKey('appendInput');
    },
    // 输入框的取消操作
    handleInputCancel(node, data) {
      const { inputType } = data;
      if (inputType === 'edit') {
        this.$set(data, 'contentEditable', false);
      } else {
        this.removeNodeInput();
      }
    },
    // 输入框的确定操作
    handleInputConfirm(node, data, inputNodeData) {
      const { inputType } = inputNodeData;
      let ret;
      if (inputType === 'add') {
        // 如果是新增的输入框的确定按钮
        ret = this.addNode(node, inputNodeData);
        if (ret && ret.then) {
          this.nodeInputLoading = true;
          ret
            .then(() => {
              this.removeNodeInput();
              this.nodeInputLoading = false;
            })
            .catch(() => {
              this.nodeInputLoading = false;
            });
        }
      } else if (inputType === 'edit') {
        // 如果是编辑的输入框右边的确定按钮
        // 编辑的数据与原数据相同，不需要提交给后台
        if (
          node.data[this.localDefaultTreeProps.label] === inputNodeData.label
        ) {
          this.$set(data, 'contentEditable', false);
          return;
        }
        ret = this.editNode(node, inputNodeData);
        if (ret && ret.then) {
          this.nodeInputLoading = true;
          ret
            .then(() => {
              this.$set(data, 'label', inputNodeData.label);
              this.$set(data, 'name', inputNodeData.label);
              this.$set(data, 'contentEditable', false);
              this.nodeInputLoading = false;
            })
            .catch(() => {
              this.$set(data, 'contentEditable', false);
              this.nodeInputLoading = false;
            });
        }
      }
    },
    handleNodeExpand(data, node, treeNode) {
      this.defaultExpandedKeys.push(data.id);
    },
    handleNodeCollapse(data, node, treeNode) {
      const index = this.defaultExpandedKeys.findIndex(
        item => item === data.id
      );
      this.defaultExpandedKeys.splice(index, 1);
    },
    handleAllowDrag(node) {
      return !this.forbidDragLevelList.indexOf(node.level) > -1;
    },
    handleAllowDrop(node, dropNode, type) {
      const item = this.forbidDropLevelList.find(item => {
        if (Object.prototype.toString.call(item) === '[object Object]') {
          return (
            item.level === dropNode.level &&
            (item.place ? type === item.place : true)
          );
        } else if (typeof item === 'number') {
          return item === dropNode.level;
        }
      });
      return !item;
    },
    handleDragEnd(sourceNode, targetNode, place, event) {
      this.$emit('drag-end', sourceNode, targetNode, place, event);
    },
    handleDragDrop(sourceNode, targetNode, place, event) {
      this.dragDrop(sourceNode, targetNode, place, event).catch(() => {
        this.localeTreeData = JSON.parse(JSON.stringify(this.treeData));
      });
    }
  }
};
</script>

<style lang="less">
.pm-tree-bank {
  background: #fff;
  .tree {
    max-height: 600px;
    overflow: auto;
    min-height: 280px;
    margin-top: 20px;
    max-width: 478px;
  }
  .filter-input {
    width: 100%;
  }
  .el-tree-node__content {
    &:hover {
      .tree-operation {
        visibility: initial;
      }
    }
    display: inline-block;
    white-space: nowrap;
    min-width: 100%;
    height: 30px;
  }
  .el-tree-node {
    display: inline-block;
    white-space: normal;
    min-width: 100%;
  }
  .el-tree-node > .el-tree-node__children {
    overflow: inherit;
  }
}
</style>
