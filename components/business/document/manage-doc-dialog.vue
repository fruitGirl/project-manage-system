/*
 * @Description: 文档-文档列表-管理文档库
 * @Author: yaochen
 * @Date: 2019-06-24 14:59:13
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 14:56:28
 */

<template>
  <div class="manage-doc-dialog">
    <pm-dialog
      :visible.sync="isVisible"
      title="管理文档库"
      @confirm="handleConfirm"
    >
      <tree-bank
        :tree-data="treeData"
        draggable
        :delete-node="handleDeleteNode"
        :add-node="handleAddNode"
        :edit-node="handleEditNode"
        :drag-drop="handleDragDrop"
        :hide-edit-level-list="[1]"
        :hide-delete-level-list="[1]"
        :hide-append-level-list="[2]"
        :forbid-drop-level-list="[{ level: 1 }, { level: 2, place: 'inner' }]"
      ></tree-bank>
    </pm-dialog>
  </div>
</template>

<script>
import PmDialog from '@/components/common/pm-dialog';
import TreeBank from '@/components/business/common/tree-bank';
import {
  docLibCreateApi,
  docLibModifyApi,
  docLibDeleteApi,
  docLibMoveApi
} from '@/services/common-config';
export default {
  components: {
    PmDialog,
    TreeBank
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      require: true
    },
    treeData: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data() {
    return {
      isVisible: false
    };
  },
  watch: {
    show(val) {
      this.isVisible = val;
    },
    isVisible(val) {
      this.$emit('update:show', val);
    }
  },
  methods: {
    handleConfirm() {
      this.isVisible = false;
      this.$emit('confirm');
    },
    handleAddNode(node, inputNodeData) {
      let parentId = '-1';
      if (node) {
        parentId = node.data.parentId;
      }
      const params = {
        parentId,
        name: inputNodeData.label
      };
      return new Promise((resolve, reject) => {
        docLibCreateApi(params)
          .then(() => {
            this.$emit('treeChange');
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
        return this.$confirm('确定删除文档分类？', '操作提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            return docLibDeleteApi({ id })
              .then(() => {
                this.$emit('treeChange');
                this.$showSuccessMessage('删除成功');
                resolve();
              })
              .catch(err => {
                this.$alert(err.error.message, '操作提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                });
                // this.$showErrorMessage(err);
                reject(err);
              });
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    handleEditNode(node, inputNodeData) {
      const name = inputNodeData.label;
      const nodeData = node.data;
      const { id } = nodeData;
      return new Promise((resolve, reject) => {
        docLibModifyApi({ id, name })
          .then(() => {
            this.$emit('treeChange');
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
        docLibMoveApi(params)
          .then(() => {
            this.$emit('treeChange');
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

<style lang="less">
.manage-doc-dialog .modal-body {
  max-height: 600px;
  overflow: auto;
}
</style>
