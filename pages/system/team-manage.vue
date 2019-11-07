/*
 * @Description: 系统-团队管理
 * @Author: yaochen
 * @Date: 2019-06-17 17:24:01
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-29 12:03:46
 */

<template>
  <div class="page-container">
    <div class="pm-clearfix">
      <nuxt-link class="pm-left" to="./create-team">
        <el-button size="small" type="primary">+ 新增团队</el-button>
      </nuxt-link>
      <el-form class="pm-right" inline>
        <el-form-item>
          <pm-search-bar-dropdown
            v-model="form.enabled"
            title="状态"
            :list="availables"
          />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="团队名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <pm-table
      :data="teamTableData"
      :column="column"
      :loading="loading"
      :pagination="pagination"
      @pageChange="pageChangeHandle"
    >
      <template v-slot:teamName="slotProps">
        <nuxt-link :to="`./team-detail?teamId=${slotProps.rowData.id}`">{{
          slotProps.rowData.teamName
        }}</nuxt-link>
      </template>
      <template v-slot:available="slotProps">
        <available :available="slotProps.rowData.available"></available>
      </template>
      <template v-slot:operation="slotProps">
        <template>
          <el-button type="text">
            <nuxt-link :to="`./edit-team?teamId=${slotProps.rowData.id}`"
              >编辑</nuxt-link
            >
          </el-button>
          <el-button
            v-if="slotProps.rowData.deleted"
            type="text"
            @click.stop="enableTeamHandler(slotProps.rowData, '确定恢复团队')"
            >恢复</el-button
          >
          <el-button
            v-else
            type="text"
            @click.stop="enableTeamHandler(slotProps.rowData, '确定删除团队')"
            >删除</el-button
          >
        </template>
      </template>
    </pm-table>
  </div>
</template>

<script>
import PmTable from '@/components/common/pm-table.vue';
import Available from '@/components/business/common/available';
import { createNamespacedHelpers } from 'vuex';
import pageData from '@/constants/system/team-manage';
import PmSearchBarDropdown from '@/components/common/pm-search-bar-dropdown';
import { ENABLED } from '@/constants/common/config';

const { mapActions, mapState } = createNamespacedHelpers('system/team-manage');
const { mapGetters: layoutMapGetters } = createNamespacedHelpers('layout');

// 权限
const AUTHORITY_CODE = 'PM_TEAM_MANAGE';

let formData = {
  name: '',
  enabled: null
};

export default {
  head: {
    title: '团队管理'
  },
  isKeepAlive: true,
  components: {
    PmTable,
    PmSearchBarDropdown,
    Available
  },
  data() {
    return {
      loading: false,
      form: {
        name: '',
        enabled: ''
      },
      column: pageData.column,
      availables: ENABLED
    };
  },
  computed: {
    ...mapState(['teamList', 'pagination']),
    ...layoutMapGetters(['siderMenuAuthorityCodes']),
    // 转数据
    teamTableData() {
      return this.teamList.map(item => {
        return {
          id: item.id,
          teamName: item.name,
          available: item.enabled,
          creater: item.creator,
          updateDate: item.gmtModified,
          deleted: !item.enabled
        };
      });
    },
    enabled() {
      return this.form.enabled;
    }
  },
  watch: {
    // 状态改变时，查询
    enabled(val) {
      formData.enabled = val;
      this.getTableDataHandle({
        currentPage: 1,
        pageSize: this.pagination.itemsPerPage,
        ...formData
      });
    },
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
    ...mapActions(['getTeamListApi', 'teamModifyEnabledApi']),
    // 查询
    query() {
      formData = {
        ...this.form
      };
      if (formData.enabled === 'all') {
        formData.enabled = '';
      }
      this.getTableDataHandle({
        currentPage: 1,
        pageSize: this.pagination.itemsPerPage,
        ...formData
      });
    },
    // 查询表格数据
    getTableDataHandle(data) {
      if (data) {
        const options = {
          all: null,
          enabled: true,
          disabled: false
        };
        if (typeof data.enabled === 'string') {
          data.enabled = options[data.enabled];
        }
      }
      this.loading = true;
      this.getTeamListApi(data)
        .then(() => {
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$showErrorMessage(err);
        });
    },
    // 改变团队有效性
    enableTeamHandler(row, message) {
      this.$confirm(message, '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(re => {
          if (re) {
            this.teamModifyEnabledApi({
              id: row.id,
              enabled: !row.available
            })
              .then(() => {
                this.$showSuccessMessage('操作成功');
                this.getTeamListApi({
                  currentPage: 1,
                  pageSize: this.pagination.itemsPerPage,
                  ...formData
                });
              })
              .catch(err => {
                this.$showErrorMessage(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 翻页
    pageChangeHandle(pagination) {
      this.getTableDataHandle({
        ...pagination,
        ...formData
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
