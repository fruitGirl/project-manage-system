/*
 * @Description: 产品-模块设置
 * @Author: xiaojian
 * @Date: 2019-06-25 11:34:11
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-01 15:25:08
 */

<template>
  <div class="page-container page-wrap">
    <h2>模块</h2>
    <pm-separate />
    <tree-bank
      ref="treeBank"
      draggable
      :tree-data="treeData"
      :delete-node="handleDeleteNode"
      :add-node="handleAddNode"
      :edit-node="handleEditNode"
      :drag-drop="handleDragDrop"
      :default-expanded-level="2"
      :hide-edit-level-list="[1]"
      :hide-delete-level-list="[1]"
    ></tree-bank>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import treeBank from '@/components/business/common/tree-bank';
import PmSeparate from '@/components/common/pm-separate';

const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  'product/module-setting'
);
const { mapState: mapLayoutState } = createNamespacedHelpers('layout');

export default {
  head() {
    return {
      title: '模块设置'
    };
  },
  components: {
    treeBank,
    PmSeparate
  },
  data() {
    return {
      productId: this.$route.query.dependenceId
    };
  },
  computed: {
    ...mapState(['treeData']),
    ...mapLayoutState(['selectedDependenceId'])
  },
  mounted() {
    this.handleGetTreeData();
  },
  methods: {
    ...mapActions([
      'getTreeData',
      'moduleCreate',
      'moduleDelete',
      'moduleEdit',
      'moduleDrag'
    ]),
    ...mapMutations([]),
    handleGetTreeData() {
      this.getTreeData({
        productId: this.productId
      });
    },
    handleAddNode(node, inputNodeData) {
      let parentId = '';
      if (node) {
        parentId = node.data.parentId;
      }
      const params = {
        parentId,
        productId: this.productId,
        name: inputNodeData.label,
        orderValue: inputNodeData.orderValue
      };
      return new Promise((resolve, reject) => {
        this.moduleCreate(params)
          .then(() => {
            this.handleGetTreeData();
            resolve();
          })
          .catch(err => {
            this.$showErrorMessage(err);
            reject(err);
          });
      });
    },
    handleDeleteNode(id) {
      return new Promise((resolve, reject) => {
        this.moduleDelete({ id })
          .then(() => {
            this.$showSuccessMessage('删除成功');
            resolve();
          })
          .catch(err => {
            this.$showErrorMessage(err);
            reject(err);
          });
      });
    },
    handleEditNode(node, inputNodeData) {
      const name = inputNodeData.label;
      const nodeData = node.data;
      const { id, parentId, orderValue } = nodeData;
      return new Promise((resolve, reject) => {
        this.moduleEdit({ id, parentId, name, orderValue })
          .then(() => {
            resolve();
          })
          .catch(err => {
            this.$showErrorMessage(err);
            reject(err);
          });
      });
    },
    handleDragDrop(sourceNode, targetNode, place, event) {
      const { id } = sourceNode.data;
      const { id: targetId } = targetNode.data;
      const params = {
        id,
        targetId,
        place: place.toUpperCase()
      };
      return new Promise((resolve, reject) => {
        this.moduleDrag(params)
          .then(() => {
            resolve();
          })
          .catch(err => {
            reject(err);
            this.$showErrorMessage(err);
          });
      });
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';

.page-wrap {
  width: 640px;
  min-height: 670px;
  margin: 72px auto 0;
  padding: 20px 28px;
  @{deep}.pm-tree-bank {
    .tree {
      height: auto;
    }
  }
}
.empty {
  padding-top: 200px;
  height: 600px;
  text-align: center;
}
</style>
