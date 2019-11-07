/*
 * @Description:系统-团队管理-团队组件(新增、修改)
 * @Author: yaochen
 * @Date: 2019-06-18 18:18:16
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 14:26:09
 */
<template>
  <div>
    <pm-bread-crumb :paths="paths" />
    <div class="page-container">
      <el-form
        ref="teamForm"
        class="team-form"
        :model="localTeamInfo"
        :rules="rules"
      >
        <div class="operation-bar-container">
          <el-form-item label="团队名称：" prop="name">
            <el-input
              v-model="localTeamInfo.name"
              class="team-name"
              placeholder="请输入，最多50字，必填"
              maxlength="50"
              autosize
              type="textarea"
            />
          </el-form-item>
          <el-button
            class="create-team-btn"
            type="primary"
            size="small"
            plain
            @click="addTeamMemberHandle"
            >+ 添加</el-button
          >
        </div>
        <pm-table
          :data="localTeamInfo.employeeTableData"
          :column="column"
          :loading="loading"
          :is-pagination="false"
          :operation="operation"
          class="team-table"
          @deleteHandle="deleteHandle"
        >
          <template v-slot:userId="{ rowData, index }">
            <el-form-item :prop="`employeeTableData[${index}].userId`">
              <pm-remote-search
                v-model="rowData.userId"
                action="/user/userQueryByName"
                placeholder="请输入花名"
                :parse-structure="nameOptionFormatHanlder"
                :default-option="userDefaultOptions"
              />
            </el-form-item>
          </template>
          <template v-slot:roleId="{ rowData, index }">
            <el-form-item :prop="`employeeTableData[${index}].roleId`">
              <el-select
                v-model="rowData.roleId"
                filterable
                placeholder="请选择角色"
              >
                <el-option
                  v-for="item in enabledRoles"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
        </pm-table>
      </el-form>
      <pm-button-group
        :show-divide="false"
        :buttons="buttons"
        @cancelHandle="back"
      />
    </div>
  </div>
</template>

<script>
import PmTable from '@/components/common/pm-table';
import PmButtonGroup from '@/components/common/pm-button-group';
import PmRemoteSearch from '@/components/common/pm-remote-search';
import PmBreadCrumb from '@/components/common/pm-bread-crumb';
import { createNamespacedHelpers } from 'vuex';
import pageData from '@/constants/common/team';
const {
  mapActions: editMapActions,
  mapState: editMapState
} = createNamespacedHelpers('system/edit-team');
const {
  mapActions: commonMapActions,
  mapState: commonMapState
} = createNamespacedHelpers('common-config');
const { mapGetters: layoutMapGetters } = createNamespacedHelpers('layout');
const AUTHORITY_CODE = 'PM_TEAM_MANAGE';
const ruleResult = {};
export default {
  components: {
    PmTable,
    PmBreadCrumb,
    PmRemoteSearch,
    PmButtonGroup
  },
  props: {
    // 修改时的teamId
    teamId: {
      type: String,
      default: ''
    },
    // 确认保存调用的方法
    saveCallback: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      buttons: [
        { label: '取消', textColor: 'primary', func: 'cancelHandle' },
        { label: '保存', type: 'primary', func: this.saveHandle }
      ],
      localTeamInfo: {
        id: '',
        name: '',
        employeeTableData: []
      },
      column: pageData.column,
      operation: pageData.operation,
      loading: false,
      userDefaultOptions: []
    };
  },
  computed: {
    ...editMapState(['list', 'teamInfo']),
    ...layoutMapGetters(['siderMenuAuthorityCodes']),
    ...commonMapState(['enabledRoles']),
    isCreate() {
      return !this.teamId;
    },
    // 面包屑paths
    paths() {
      return [
        {
          path: '/system/team-manage',
          name: '团队管理'
        },
        {
          path: '',
          name: `${this.isCreate ? '新增' : '修改'}团队`
        }
      ];
    },
    // 表格rules
    rules() {
      const keys = Object.keys(ruleResult);
      keys.map(item => {
        Reflect.deleteProperty(ruleResult, item);
      });
      this.localTeamInfo.employeeTableData.map((item, index) => {
        ruleResult[`employeeTableData[${index}].userId`] = [
          { required: true, message: '请选择人员', trigger: 'change' }
        ];
        ruleResult[`employeeTableData[${index}].roleId`] = [
          { required: true, message: '请选择角色', trigger: 'change' }
        ];
      });
      ruleResult.name = [
        { required: true, message: '请输入团队名称', trigger: 'change' }
      ];
      return ruleResult;
    }
  },
  watch: {
    list(val) {
      this.localTeamInfo.employeeTableData = val.map(item => {
        return {
          id: item.id,
          userId: item.userId,
          roleId: item.roleId
        };
      });
    },
    siderMenuAuthorityCodes: {
      handler(val) {
        if (val && val.length >= 0 && val.includes(AUTHORITY_CODE)) {
          if (!this.isCreate) {
            // 修改-获取team
            this.getTeamByIdHandle(this.teamId).then(() => {
              // 将获取到的team列表中的花名作为初始下拉框数据
              this.userDefaultOptions = this.list
                .reduce((total, current) => {
                  if (total.every(item => item.userId !== current.userId)) {
                    total.push(current);
                  }
                  return total;
                }, [])
                .map(item => {
                  return {
                    label: item.nickName,
                    value: item.userId
                  };
                });
              this.$nextTick(() => {
                // 在表格显示正常后，重置花名下拉框的选项
                this.userDefaultOptions = [];
              });
            });
          } else {
            // 如果是新增，增加三个空行
            this.addTeamMemberHandle();
            this.addTeamMemberHandle();
            this.addTeamMemberHandle();
          }
          this.getRoleQueryApi();
        }
      },
      immediate: true
    }
  },
  methods: {
    ...editMapActions(['getTeamByIdApi', 'teamMemberDeleteApi']),
    ...commonMapActions(['getRoleQueryApi']),
    // 转数据
    nameOptionFormatHanlder(data) {
      return data.userList.map(item => {
        return {
          label: item.nickName,
          value: item.userId
        };
      });
    },
    // 获取team数据
    getTeamByIdHandle(id) {
      this.loading = true;
      return this.getTeamByIdApi({
        id: this.teamId
      }).then(() => {
        this.localTeamInfo.id = this.teamInfo.id;
        this.localTeamInfo.name = this.teamInfo.name;
        this.loading = false;
      });
    },
    // 删除行
    deleteHandle(index, row) {
      if (row.id) {
        this.resultHandler(
          this.teamMemberDeleteApi({
            id: row.id
          }),
          () => {
            this.localTeamInfo.employeeTableData.splice(index, 1);
          }
        );
      } else {
        this.localTeamInfo.employeeTableData.splice(index, 1);
      }
    },
    // 点击添加按钮，添加一行空的
    addTeamMemberHandle() {
      this.localTeamInfo.employeeTableData.push({
        id: null,
        userId: '',
        roleId: ''
      });
    },
    // 保存
    saveHandle() {
      this.$refs.teamForm.validate(valid => {
        if (valid) {
          const data = {
            ...this.localTeamInfo,
            memberListJsonStr: JSON.stringify(
              this.localTeamInfo.employeeTableData.filter(
                item => item.userId || item.roleId
              )
            )
          };
          this.resultHandler(this.saveCallback(data), this.back);
        }
      });
    },
    // 传入一个promise，.then中执行callback
    resultHandler(result, callback) {
      result
        .then(re => {
          callback();
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    // 转数据
    parseStructure(data, text) {
      return data.roleList
        .filter(item => item.enabled)
        .map(item => {
          return {
            label: item.name,
            value: item.id
          };
        });
    },
    back() {
      this.$PMRouter.back();
    }
  }
};
</script>
<style lang="less" scoped>
.team-container {
  padding: 24px 180px;
}
.team-name {
  width: 400px;
}
.operation-bar-container {
  overflow: hidden;
  .create-team-btn {
    float: right;
    margin-left: auto;
  }
}
.operation-container {
  margin-top: 10px;
  text-align: center;
}
</style>

<style lang="less">
.team-form .el-table {
  .el-table__body td {
    padding: 0;
  }
  .el-form-item {
    margin-top: 14px;
  }
}
.operation-bar-container > .el-form-item {
  float: left;
  .el-form-item__content {
    float: left;
  }
}
.team-table .el-table .cell .el-select {
  width: 100%;
}
</style>
