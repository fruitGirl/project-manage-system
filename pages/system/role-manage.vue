/*
 * @Description: 系统-角色管理
 * @Author: yaochen
 * @Date: 2019-06-17 16:43:23
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 12:12:31
 */

<template>
  <div class="page-container">
    <div class="pm-clearfix">
      <el-button size="small" type="primary" @click="addRoleHandler"
        >+ 新增角色</el-button
      >
      <el-form class="pm-right" inline></el-form>
    </div>
    <pm-table
      :data="list"
      :loading="loading"
      :column="column"
      :operation="operation"
      :is-pagination="false"
      @editHandle="editHandler"
    >
      <template v-slot:enabled="slotProps">
        <available :available="slotProps.rowData.enabled"></available>
      </template>
    </pm-table>
    <role-dialog
      :operation="roleOperation"
      :add-func="roleCreateApi"
      :edit-func="roleModifyApi"
      :role="editRow"
      :show.sync="roleDialogIsShow"
      @success="query"
    ></role-dialog>
  </div>
</template>

<script>
import PmTable from '@/components/common/pm-table.vue';
import RoleDialog from '@/components/business/system/role-manage/role-dialog';
import Available from '@/components/business/common/available';
import pageData from '@/constants/system/role-manage';
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState } = createNamespacedHelpers('system/role-manage');
const { mapGetters: layoutMapGetters } = createNamespacedHelpers('layout');

// 权限
const AUTHORITY_CODE = 'PM_ROLE_MANAGE';

export default {
  head: {
    title: '角色管理'
  },
  components: {
    PmTable,
    Available,
    RoleDialog
  },
  data() {
    return {
      roleDialogIsShow: false,
      roleOperation: 'add',
      loading: false,
      editRow: {},
      column: pageData.column,
      operation: pageData.operation
    };
  },
  computed: {
    ...mapState(['list', 'pagination']),
    ...layoutMapGetters(['siderMenuAuthorityCodes'])
  },
  watch: {
    // 有权限才加载数据
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
    ...mapActions(['getRoleQueryApi', 'roleModifyApi', 'roleCreateApi']),
    query() {
      this.loading = true;
      this.getRoleQueryApi()
        .then(() => {
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$showErrorMessage(err);
        });
    },
    addRoleHandler() {
      this.roleOperation = 'add';
      this.roleDialogIsShow = true;
    },
    editHandler(index, row) {
      this.roleOperation = 'edit';
      this.editRow = row;
      this.roleDialogIsShow = true;
    }
  }
};
</script>
