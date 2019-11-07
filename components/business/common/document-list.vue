/*
 * @Description: 文档列表相关组件
 * @Author: yaochen
 * @Date: 2019-06-26 11:37:58
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-31 10:48:28
 */
<template>
  <div class="doc-list-container">
    <div class="tree-container">
      <tab-tree
        ref="tabTree"
        v-loading="loading"
        :tabs="tabs"
        :has-operation-button="true"
        operation-text="管理文档库"
        :tree-data="treeData"
        :active-tab-val="activeTabVal"
        :active-tree-node-id="activeNodeId"
        @operationClick="manageDocHandle"
        @current-change="currentNodeChangeHandler"
        @tab-change="tabChangeHandler"
      ></tab-tree>
    </div>
    <div class="table-container">
      <div class="table-content">
        <el-button type="primary" @click="addDocHandle">+ 新增文档</el-button>
        <pm-table
          :data="docList"
          :column="column"
          :operation="operation"
          :pagination="pagination"
          :loading="isTableLoading"
          @editHandle="editHandle"
          @deleteHandle="deleteHandle"
          @pageChange="pageChangeHandle"
          @sort="sortHandler"
        >
          <template v-slot:title="{ rowData }">
            <pm-link :to="`./doc-detail?docId=${rowData.id}`">{{
              rowData.title
            }}</pm-link>
          </template>
        </pm-table>
      </div>
    </div>
    <manage-doc-dialog
      :tree-data="treeData"
      :show.sync="manageDocShow"
      @confirm="handleMangeDocConfirm"
      @treeChange="reloadTree"
    ></manage-doc-dialog>
    <document-template-dialog
      :tree-data="treeData"
      :doc-id="docId"
      :show.sync="templateShow"
      :default-doc="defaultDoc"
      @confirm="confirmHandler"
    ></document-template-dialog>
  </div>
</template>

<script>
import TabTree from '@/components/business/common/tree-bank/tab-tree.vue';
import PmTable from '@/components/common/pm-table.vue';
import pageData from '@/constants/document/document-list';
import ManageDocDialog from '@/components/business/document/manage-doc-dialog.vue';
import DocumentTemplateDialog from '@/components/business/document/document-template-dialog.vue';
import PmLink from '@/components/common/pm-link';
import { formatSortProp } from '@/utils/common';
import services from '@/services/document/document-list';
import { createNamespacedHelpers } from 'vuex';

const { mapActions: commonMapActions } = createNamespacedHelpers(
  'common-config'
);
const { mapActions, mapMutations, mapState } = createNamespacedHelpers(
  'document/document-list'
);

export default {
  components: {
    TabTree,
    PmLink,
    PmTable,
    DocumentTemplateDialog,
    ManageDocDialog
  },
  props: {
    inProjectOrProduct: {
      type: Boolean,
      default: false
    },
    libs: {
      type: Array,
      default: () => []
    },
    docList: {
      type: Array,
      default: () => []
    },
    queryListFunc: {
      type: Function,
      default: () => {}
    },
    pagination: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      manageDocShow: false,
      templateShow: false,
      column: pageData.column,
      operation: pageData.operation,
      tabs: [],
      currentTabValue: '',
      treeData: [],
      activeData: {},
      docId: null,
      orderBys: null,
      dependenceId: '',
      isTableLoading: false,
      loading: false,
      defaultDoc: {}
    };
  },
  computed: {
    ...mapState(['activeNodeId', 'activeTabVal'])
  },
  watch: {
    libs(val) {
      if (val.length) {
        this.tabs = val;
        this.$nextTick(() => {
          const data = {
            ownerObjectTypeEnum: this.currentTabValue
          };
          if (this.inProjectOrProduct) {
            data.ownerObjectId = this.dependenceId;
          }
          this.queryListFunc({ ...data, currentPage: this.pagination.page });
        });
      }
    }
  },
  created() {
    if (this.inProjectOrProduct) {
      this.dependenceId = this.$route.query.dependenceId;
    }
  },
  beforeDestroy() {
    this.setActiveNodeId({ payload: '' });
    this.setActiveTabVal({ payload: '' });
  },
  methods: {
    ...commonMapActions(['getTreeByTypeApi']),
    ...mapMutations(['setActiveNodeId', 'setActiveTabVal']),
    ...mapActions(['docModifyEnabledApi']),
    reloadTree() {
      this.handleGetTreeData();
    },
    sortHandler({ prop, order }) {
      this.orderBys = formatSortProp(prop, order);
      this.getTableDataHandle({
        currentPage: this.pagination.page,
        pageSize: this.pagination.itemsPerPage
      });
    },
    confirmHandler(form) {
      this.getTableDataHandle({
        currentPage: this.pagination.page,
        pageSize: this.pagination.itemsPerPage
      });
    },
    handleGetTreeData() {
      this.loading = true;

      // 是否是产品或者项目模块下
      if (this.inProjectOrProduct) {
        // 是否存在依赖的id
        if (this.dependenceId) {
          services.getDocLibTreeVisibleQueryApi({
            objectType: this.currentTabValue,
            id: this.dependenceId
          })
            .then(re => {
              this.$set(this, 'treeData', this.formatTree(re));

              // 默认回填相应产品或者项目
              this.defaultDoc = {
                label: this.treeData[1].label,
                docLibId: this.treeData[1].id
              };
              this.loading = false;
            })
            .catch(err => {
              this.loading = false;
              this.$showErrorMessage(err);
            });
        }
      } else {
        this.getTreeByTypeApi({
          objectType: this.currentTabValue
        })
          .then(re => {
            this.$set(this, 'treeData', this.formatTree(re));
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            this.$showErrorMessage(err);
          });
      }
    },
    pageChangeHandle(pagination) {
      this.getTableDataHandle(pagination);
    },
    getTableDataHandle(pagination) {
      this.isTableLoading = true;
      const data = {
        docLibId: this.activeData.id,
        enabled: true,
        orderBys: this.orderBys,
        ...pagination,
        ownerObjectTypeEnum: this.currentTabValue
      };
      if (this.inProjectOrProduct) {
        data.ownerObjectId = this.dependenceId;
      }
      this.queryListFunc(data).then(() => {
        this.isTableLoading = false;
      });
    },
    currentNodeChangeHandler(data, node) {
      const { label, id } = data;
      this.defaultDoc = {
        label,
        docLibId: id
      };
      this.activeData = data;
      this.setActiveNodeId({ payload: data.id });
      this.getTableDataHandle({
        currentPage: 1,
        pageSize: this.pagination.itemsPerPage
      });
    },

    // 切换tab，是否手动触发切换
    tabChangeHandler(tab, isManual) {
      this.currentTabValue = tab.value;
      this.setActiveTabVal({ payload: tab.value });
      this.handleGetTreeData();
      const data = {
        ownerObjectTypeEnum: this.currentTabValue,
        currentPage: !isManual ? this.pagination.page : 1 // 手动触发，重置分页
      };
      if (this.inProjectOrProduct) {
        data.ownerObjectId = this.dependenceId;
      }
      this.queryListFunc(data);
    },
    formatTree(data) {
      return data.docLibList.map(item => {
        item.label = item.name;
        item.subModuleInfo = item.subDobLib ? item.subDobLib.map(child => {
          child.label = child.name;
          return child;
        }) : [];
        return item;
      });
    },
    addDocHandle() {
      this.docId = null;
      this.templateShow = true;
    },
    manageDocHandle(tab) {
      this.manageDocShow = true;
    },
    handleMangeDocConfirm() {
      this.handleGetTreeData();
    },
    deleteHandle(index, row) {
      this.$confirm(
        '确定删除文档？提示：删除后，可在回收站进行恢复',
        '操作提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(re => {
          this.docModifyEnabledApi({
            id: row.id,
            enabled: false
          })
            .then(() => {
              this.getTableDataHandle({
                currentPage: this.pagination.page,
                pageSize: this.pagination.itemsPerPage
              });
            })
            .catch(err => {
              this.$showErrorMessage(err);
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    editHandle(index, row) {
      this.docId = row.id;
      this.templateShow = true;
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.doc-list-container {
  padding: 15px;
  .tree-container {
    float: left;
    width: 300px;
    min-height: 320px;
    margin-right: 15px;
    position: relative;
    height: 100%;
  }
  .table-container {
    width: 100%;
    padding-left: 315px;
    min-height: 437px;
  }
  .table-content {
    padding: 10px;
    background: #fff;
  }
  @{deep}.el-pagination {
    height: 60px;
  }
}
</style>
<style lang="less">
.doc-list-container {
  height: 100%;
}
</style>
