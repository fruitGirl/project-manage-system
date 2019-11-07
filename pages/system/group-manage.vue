/*
 * @Description: 系统-组管理
 * @Author: yaochen
 * @Date: 2019-06-17 16:43:23
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-31 11:16:27
 */

<template>
  <div class="page-container">
    <div class="pm-clearfix">
      <el-button size="small" type="primary" @click="addHandler"
        >+ 新增组</el-button
      >
    </div>

    <pm-table
      :data="list"
      :loading="loading"
      :column="column"
      :is-pagination="false"
    >
      <template v-slot:enabled="slotProps">
        <available :available="slotProps.rowData.enabled"></available>
      </template>
      <template v-slot:operation="{ rowData }">
        <el-button type="text" @click="editHandler(rowData)">编辑</el-button>
        <el-button
          v-if="rowData.enabled"
          type="text"
          @click="bindUserHandler(rowData)"
          >组设置</el-button
        >
        <el-button
          v-if="rowData.enabled"
          type="text"
          @click="authConfigHandler(rowData)"
          >设置权限</el-button
        >
      </template>
    </pm-table>
    <group-dialog
      :add-func="groupCreateApi"
      :edit-func="groupModifyApi"
      :data="editRow"
      :show.sync="groupDialogIsShow"
      @success="query"
    ></group-dialog>
    <batch-role-setting-dialog
      :text="textArr"
      :show.sync="batchRoleDialogIsShow"
      :select-value="selectValue"
      :select-options="transData.selectOptions"
      :trans-all-list="transData.transAllList"
      :trans-items="transData.transItems"
      @confirm="handleConfirm"
    ></batch-role-setting-dialog>
  </div>
</template>

<script>
import PmTable from '@/components/common/pm-table';
import GroupDialog from '@/components/business/system/group-manage/group-dialog.vue';
import BatchRoleSettingDialog from '@/components/business/system/batch-role-setting-dialog.vue';
import Available from '@/components/business/common/available';
import pageData from '@/constants/system/group-manage';
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState } = createNamespacedHelpers('system/group-manage');
const { mapActions: userMapActions } = createNamespacedHelpers(
  'system/user-manage'
);
const {
  mapActions: groupMapActions,
  mapState: groupMapState
} = createNamespacedHelpers('system/group-manage');
const { mapGetters: layoutMapGetters } = createNamespacedHelpers('layout');
// 权限
const AUTHORITY_CODE = 'PM_GROUP_MANAGE';

export default {
  head: {
    title: '组管理'
  },
  components: {
    PmTable,
    Available,
    GroupDialog,
    BatchRoleSettingDialog
  },
  data() {
    return {
      groupDialogIsShow: false,
      batchRoleDialogIsShow: false,
      textArr: ['组', '人员'],
      loading: false,
      editRow: false,
      selectValue: '',
      column: pageData.column,
      dialogSaveFunc: null
    };
  },
  computed: {
    ...mapState(['list']),
    ...layoutMapGetters(['siderMenuAuthorityCodes']),
    ...groupMapState(['transData'])
  },
  watch: {
    // 权限
    siderMenuAuthorityCodes: {
      handler(val) {
        if (val && val.length >= 0 && val.includes(AUTHORITY_CODE)) {
          this.query();
        }
      },
      immediate: true
    }
  },
  methods: {
    ...groupMapActions([
      'groupUserSetInitApi',
      'authorityGroupSetInitApi',
      'authorityGroupSetApi'
    ]),
    ...userMapActions(['groupUserSetApi']),
    ...mapActions(['groupQueryApi', 'groupModifyApi', 'groupCreateApi']),
    // 批量框确认回调
    handleConfirm(selectValue, selectItems) {
      this.dialogSaveFunc(selectValue, selectItems)
        .then(() => {
          this.batchRoleDialogIsShow = false;
          this.$showSuccessMessage('操作成功');
          this.query();
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    // 查询表格数据
    query() {
      this.loading = true;
      this.groupQueryApi()
        .then(() => {
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$showErrorMessage(err);
        });
    },
    // 新增组
    addHandler() {
      this.editRow = false;
      this.groupDialogIsShow = true;
    },
    // 修改组
    editHandler(row) {
      this.editRow = row;
      this.groupDialogIsShow = true;
    },
    // 组绑定权限
    authConfigHandler(row) {
      this.authorityGroupSetInitApi({
        groupId: row.id
      });
      this.selectValue = row.id;
      // 设置批量框确认接口
      this.dialogSaveFunc = (selectValue, selectItems) => {
        return this.authorityGroupSetApi({
          groupId: selectValue,
          authorityIds: selectItems
        });
      };
      this.textArr = ['组', '权限'];
      this.batchRoleDialogIsShow = true;
    },
    // 组绑定人员
    bindUserHandler(row) {
      this.groupUserSetInitApi({
        groupId: row.id
      });
      this.selectValue = row.id;
      // 设置批量框确认接口
      this.dialogSaveFunc = (selectValue, selectItems) => {
        return this.groupUserSetApi({
          groupId: selectValue,
          userIds: selectItems
        });
      };
      this.textArr = ['组', '人员'];
      this.batchRoleDialogIsShow = true;
    }
  }
};
</script>

<style lang="less" scoped></style>
