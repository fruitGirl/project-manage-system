<template>
  <div class="trash-container">
    <div class="tree-container">
      <tab-tree
        :tabs="libs"
        :tree-data="treeData"
        @current-change="currentNodeChangeHandler"
        @tab-change="tabChangeHandler"
      ></tab-tree>
    </div>
    <div class="table-container">
      <div class="table-content">
        <pm-table
        :data="list"
        :column="column"
        :loading="isTableLoading"
        :operation="operation"
        :pagination="pagination"
        @pageChange="pageChangeHandle"
        @recoverHandle="recoverHandle"
      >
        <template v-slot:title="{ rowData }">
          <pm-link :to="`./doc-detail?docId=${rowData.id}&hasNoDelete=true`">{{
            rowData.title
          }}</pm-link>
        </template>
      </pm-table>
      </div>
    </div>
  </div>
</template>

<script>
import TabTree from '@/components/business/common/tree-bank/tab-tree';
import PmTable from '@/components/common/pm-table';
import pageData from '@/constants/document/trash';
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  'document/trash'
);
const { mapActions: commonMapActions } = createNamespacedHelpers(
  'common-config'
);

export default {
  head: {
    title: '回收站'
  },
  isKeepAlive: true,
  components: {
    TabTree,
    PmTable
  },
  data() {
    return {
      column: pageData.column,
      currentTabValue: '',
      operation: pageData.operation,
      libs: [],
      treeData: [],
      isTableLoading: false,
      activeData: {}
    };
  },
  computed: {
    ...mapState(['libTypes', 'list', 'pagination'])
  },
  watch: {
    libs(val) {
      if (val.length) {
        this.tabs = val;
        this.$nextTick(() => {
          // 刚进页面的第一次查询
          const data = {
            ownerObjectTypeEnum: this.currentTabValue,
            enabled: false
          };
          this.getdocPageQueryApi({
            ...data,
            currentPage: this.pagination.page
          });
        });
      }
    }
  },
  activated() {
    // 获取产品lib与项目lib
    this.getLibTypesApi().then(() => {
      this.libs = [];

       // 显示产品和项目模块
      const matchItems = this.libTypes.filter(
        i => (i.value === 'PRODUCT') || (i.value === 'PROJECT')
      );
      if (matchItems.length) {
        this.libs = matchItems;
      }
    });
  },
  methods: {
    ...commonMapActions(['getTreeByTypeApi']),
    ...mapActions([
      'getLibTypesApi',
      'getdocPageQueryApi',
      'docModifyEnabledApi'
    ]),
    ...mapMutations(['mutationList', 'mutationPagination']),

    // 树节点改变时（点击树节点）
    currentNodeChangeHandler(data, node) {
      this.activeData = data;
      this.getTableDataHandle({
        currentPage: 1,
        pageSize: this.pagination.itemsPerPage
      });
    },

    // 切换tab
    tabChangeHandler(tab) {
      this.currentTabValue = tab.value;
      const data = {
        ownerObjectTypeEnum: this.currentTabValue,
        enabled: false
      };
      this.getdocPageQueryApi(data);
      this.getTreeByTypeApi({
        objectType: tab.value
      }).then(res => {
        this.$set(this, 'treeData', this.formatTree(res));
      });
    },
    pageChangeHandle(pagination) {
      this.getTableDataHandle(pagination);
    },

    // 恢复文档
    recoverHandle(index, row) {
      this.$confirm('确认恢复文档？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: re => {
          if (re === 'confirm') {
            this.docModifyEnabledApi({
              id: row.id,
              enabled: true
            })
              .then(() => {
                // 查询数据
                this.getTableDataHandle({
                  currentPage: this.pagination.page,
                  pageSize: this.pagination.itemsPerPage
                });
              })
              .catch(err => {
                this.$showErrorMessage(err);
              });
          }
        }
      });
    },

    // 查询数据
    getTableDataHandle(pagination) {
      this.isTableLoading = true;
      const data = {
        docLibId: this.activeData.id,
        enabled: false,
        ...pagination
      };
      this.getdocPageQueryApi(data).then(() => {
        this.isTableLoading = false;
      });
    },

    // 数据格式转化
    formatTree(data) {
      // 设置初始化第一个文档库
      if (data.docLibList && data.docLibList[0]) {
        this.activeData.id = data.docLibList[0].id;
      }

      return data.docLibList.map(item => {
        item.label = item.name;
        item.subModuleInfo = item.subDobLib ? item.subDobLib.map(child => {
          child.label = child.name;
          return child;
        }) : [];
        return item;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.trash-container {
  padding: 20px;
  .tree-container {
    float: left;
    width: 300px;
  }
  .table-container {
    width: 100%;
    padding-left: 315px;
    box-sizing: border-box
  }
  .table-content {
    padding: 10px;
    background: #fff;
  }
}
</style>

<style lang="less">
.trash-container {
  .tree-container {
    width: 300px;
    min-height: 320px;
    margin-right: 15px;
    position: relative;
    height: 100%;
  }
}
</style>
