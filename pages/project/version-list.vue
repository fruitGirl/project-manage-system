/*
 * @Description: 项目-版本列表
 * @Author: yaochen
 * @Date: 2019-07-26 14:32:48
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-06 17:32:29
 */
<template>
  <div class="page-content-container">
    <el-button type="primary" @click="addVersionHandle">新增</el-button>
    <pm-table
      :data="list"
      :column="column"
      :operation="operation"
      :is-pagination="false"
      @editHandle="editHandle"
      @deleteHandle="deleteHandle"
    >
      <template v-slot:operation="{ rowData }">
        <el-button type="text" @click.stop="editHandle(rowData)"
          >编辑</el-button
        >
        <el-button
          v-if="rowData.type.name === 'BRANCH'"
          type="text"
          @click.stop="deleteHandle(rowData)"
          >删除</el-button
        >
      </template>
    </pm-table>
    <version-dialog
      :version="editVersion"
      :project-id="projectId"
      :show.sync="versionDialogShow"
      @confirm="confirmHandler"
    ></version-dialog>
  </div>
</template>

<script>
import PmTable from '@/components/common/pm-table';
import VersionDialog from '@/components/business/project/version-list/version-dialog.vue';
import pageData from '@/constants/project/version-list';
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState } = createNamespacedHelpers(
  'project/version-list'
);

export default {
  head: {
    title: '设置-版本'
  },
  components: {
    PmTable,
    VersionDialog
  },
  data() {
    return {
      versionDialogShow: false,
      editVersion: {},
      projectId: '',
      column: pageData.column,
      operation: pageData.operation
    };
  },
  computed: {
    ...mapState(['list'])
  },
  created() {
    this.projectId = this.$route.query.dependenceId;
    this.query();
  },
  methods: {
    ...mapActions(['getProjectVersionListApi', 'projectVersionDeleteApi']),
    // 查询版本列表数据
    query() {
      this.getProjectVersionListApi({
        projectId: this.projectId
      });
    },
    confirmHandler() {
      this.query();
    },
    addVersionHandle() {
      this.editVersion = false;
      this.versionDialogShow = true;
    },
    // 删除版本
    deleteHandle(row) {
      this.$confirm('确定删除吗？', '操作提示', {
        type: 'warning'
      })
        .then(re => {
          this.projectVersionDeleteApi({
            id: row.id
          })
            .then(() => {
              this.query();
            })
            .catch(err => {
              this.$showErrorMessage(err);
            });
        })
        .catch(re => {
          console.log('取消');
        });
    },
    editHandle(row) {
      this.versionDialogShow = true;
      this.editVersion = row;
    }
  }
};
</script>

<style lang="less" scoped></style>
