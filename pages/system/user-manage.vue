/*
 * @Description: 系统-组管理
 * @Author: yaochen
 * @Date: 2019-06-17 16:49:24
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-31 11:17:08
 */

<template>
  <div class="page-container">
    <div class="pm-clearfix">
      <el-button
        class="pm-left"
        size="small"
        type="primary"
        @click="groupSetting"
        >批量设置组</el-button
      >
      <el-form class="pm-right" inline>
        <el-form-item>
          <el-input v-model="form.nickName" placeholder="请输入花名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.groupName" placeholder="请输入组"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="queryHandler"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <pm-table
      :data="list"
      :column="column"
      :loading="loading"
      :operation="operation"
      :pagination="pagination"
      @pageChange="pageChangeHandle"
      @roleSettingHandler="roleSettingHandler"
    ></pm-table>
    <batch-role-setting-dialog
      :text="textArr"
      :show.sync="batchRoleDialogIsShow"
      :select-value="selectValue"
      :select-options="transData.selectOptions"
      :trans-all-list="transData.transAllList"
      :trans-items="transData.transItems"
      @confirm="confirmHandler"
    ></batch-role-setting-dialog>
  </div>
</template>

<script>
import PmTable from '@/components/common/pm-table';
import BatchRoleSettingDialog from '@/components/business/system/batch-role-setting-dialog';
import pageData from '@/constants/system/user-manage';
import { createNamespacedHelpers } from 'vuex';

const {
  mapActions: groupMapActions,
  mapState: groupMapState,
  mapMutations: groupMapMutations
} = createNamespacedHelpers('system/group-manage');
const { mapGetters: layoutMapGetters } = createNamespacedHelpers('layout');
const { mapActions, mapState } = createNamespacedHelpers('system/user-manage');
const { mapActions: commonMapActions } = createNamespacedHelpers(
  'common-config'
);
// 权限
const AUTHORITY_CODE = 'PM_USER_MANAGE';

// 查询条件本地存储
let formData = {};

export default {
  head: {
    title: '员工管理'
  },
  components: {
    PmTable,
    BatchRoleSettingDialog
  },
  data() {
    return {
      textArr: ['组', '人员'], // 批量框的文案
      loading: false,
      batchRoleDialogIsShow: false,
      form: {
        nickName: '',
        groupName: ''
      },
      column: pageData.column,
      operation: pageData.operation,
      selectValue: '', // 批量框select值
      dialogSaveFunc: null // 批量框保存时执行的方法
    };
  },
  computed: {
    ...mapState(['list', 'pagination']),
    ...layoutMapGetters(['siderMenuAuthorityCodes']),
    ...groupMapState(['transData'])
  },
  watch: {
    // 权限请求
    siderMenuAuthorityCodes: {
      handler(val) {
        if (val && val.length >= 0 && val.includes(AUTHORITY_CODE)) {
          this.getTableDataHandle({
            currentPage: this.pagination.page,
            pageSize: this.pagination.itemsPerPage
          });
        }
      },
      immediate: true
    }
  },
  beforeDestroy() {
    formData = {};
  },
  methods: {
    ...groupMapActions(['groupUserSetInitApi']),
    ...groupMapMutations(['setTransData']),
    ...commonMapActions(['getuserGroupApi']),
    ...mapActions(['getUserListApi', 'groupUserSetApi', 'userGroupSetApi']),
    confirmHandler(selectValue, selectItems) {
      this.dialogSaveFunc(selectValue, selectItems)
        .then(() => {
          this.batchRoleDialogIsShow = false;
          this.$showSuccessMessage('操作成功');
          this.successHandler();
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    successHandler() {
      this.getTableDataHandle({
        currentPage: this.pagination.page,
        pageSize: this.pagination.itemsPerPage
      });
    },
    // 批量设置组
    groupSetting() {
      // 获取数据
      this.groupUserSetInitApi();
      // 设置批量框确认后执行的函数
      this.dialogSaveFunc = (selectValue, selectItems) => {
        return this.groupUserSetApi({
          groupId: selectValue,
          userIds: selectItems
        });
      };
      this.selectValue = '';
      this.textArr = ['组', '人员'];
      this.batchRoleDialogIsShow = true;
    },
    // 点击查询搜索
    queryHandler() {
      formData = {
        ...this.form
      };
      this.getTableDataHandle({
        currentPage: 1,
        pageSize: this.pagination.itemsPerPage
      });
    },
    // 查询表格数据
    getTableDataHandle(pagination) {
      this.loading = true;
      this.getUserListApi({
        ...formData,
        ...pagination
      })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 角色设置
    roleSettingHandler(index, row) {
      this.getuserGroupApi({
        userId: row.userId
      }).then(re => {
        this.setTransData({
          selectOptions: re.userList.map(item => {
            return {
              value: item.userId,
              label: item.nickName
            };
          }),
          transAllList: re.groupList.map(item => {
            return {
              value: item.id,
              label: item.name
            };
          }),
          transItems: re.groupIds
        });
      });
      // 设置批量框确认后调用的函数
      this.dialogSaveFunc = (selectValue, selectItems) => {
        return this.userGroupSetApi({
          userId: selectValue,
          groupIds: selectItems.join()
        });
      };
      this.selectValue = row.userId;
      this.textArr = ['人员', '组'];
      this.batchRoleDialogIsShow = true;
    },
    // 翻页
    pageChangeHandle(pagination) {
      this.getTableDataHandle(pagination);
    }
  }
};
</script>

<style lang="less" scoped></style>
