/*
 * @Description:项目-团队管理
 * @Author: yaochen
 * @Date: 2019-06-18 18:18:16
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-07 09:53:30
 */
<template>
  <div>
    <pm-bread-crumb :paths="paths" />
    <div class="team-container page-container operate-reserve-wrapper">
      <h1>项目负责人</h1>
      <charger-info :team-info="teamInfo"></charger-info>
      <div class="operation-bar-container">
        <label for="select">复制团队：</label>
        <pm-remote-select
          v-model="copyTeam"
          :need-all-opt="false"
          :filterable="true"
          :is-transparent-border="false"
          :parse-structure="parseStructure"
          :action="'/project/teamQuery'"
        />
        <el-button
          class="create-team-btn"
          type="primary"
          size="small"
          plain
          @click="addTeamHandle"
          >+ 添加</el-button
        >
      </div>
      <el-form
        ref="teamForm"
        class="team-form"
        :model="form"
        :rules="rules"
        label-width="7rem"
      >
        <pm-table
          :data="form.localMemberList"
          :column="column"
          :operation="operation"
          :is-pagination="false"
          row-key="rowKey"
          @deleteHandle="deleteHandle"
        >
          <template v-slot:userId="{ rowData, index }">
            <el-form-item :prop="`localMemberList[${index}].userId`">
              <pm-remote-search
                v-model="rowData.userId"
                action="/user/userQueryByName"
                :parse-structure="nameOptionFormatHanlder"
                :default-option="rowData.userDefaultOptions"
              />
            </el-form-item>
          </template>
          <template v-slot:roleId="{ rowData, index }">
            <el-form-item :prop="`localMemberList[${index}].roleId`">
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
          <template v-slot:days="{ rowData, index }">
            <el-form-item :prop="`localMemberList[${index}].days`">
              <el-input v-model="rowData.days" placeholder="请输入"></el-input>
            </el-form-item>
          </template>
          <template v-slot:hours="{ rowData, index }">
            <el-form-item :prop="`localMemberList[${index}].hours`">
              <el-input v-model="rowData.hours" placeholder="请输入"></el-input>
            </el-form-item>
          </template>
        </pm-table>
      </el-form>
      <pm-button-group
        :show-divide="false"
        :buttons="buttons"
        @saveHandle="saveHandle"
        @cancelHandle="cancelHandle"
      />
    </div>
  </div>
</template>

<script>
import PmTable from '@/components/common/pm-table.vue';
import PmButtonGroup from '@/components/common/pm-button-group';
import ChargerInfo from '@/components/business/common/charger-info';
import PmBreadCrumb from '@/components/common/pm-bread-crumb';

import PmRemoteSearch from '@/components/common/pm-remote-search.vue';
import PmRemoteSelect from '@/components/common/pm-remote-select';
import pageData from '@/constants/project/edit-team';
import reg from '@/utils/regex';

import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState } = createNamespacedHelpers('project/team-manage');

const {
  mapActions: commonMapActions,
  mapState: commonMapState
} = createNamespacedHelpers('common-config');

const {
  mapActions: editMapActions,
  mapState: editMapState
} = createNamespacedHelpers('system/edit-team');
const ruleResult = {};
export default {
  head() {
    return {
      title: '编辑团队'
    };
  },
  components: {
    PmTable,
    PmButtonGroup,
    PmRemoteSearch,
    PmRemoteSelect,
    ChargerInfo,
    PmBreadCrumb
  },
  data() {
    return {
      copyTeam: null,
      paths: pageData.paths,
      buttons: pageData.buttons,
      column: pageData.column,
      form: {
        localMemberList: []
      },
      operation: pageData.operation,
      selectedDependenceId: ''
    };
  },
  computed: {
    ...editMapState(['list']),
    ...commonMapState(['enabledRoles']),
    ...mapState(['teamInfo', 'memberList']),
    // 表格列表rule
    rules() {
      const keys = Object.keys(ruleResult);
      keys.map(item => {
        Reflect.deleteProperty(ruleResult, item);
      });
      this.form.localMemberList.map((item, index) => {
        ruleResult[`localMemberList[${index}].userId`] = [
          { required: true, message: '请选择人员', trigger: 'change' }
        ];
        ruleResult[`localMemberList[${index}].roleId`] = [
          { required: true, message: '请选择角色', trigger: 'change' }
        ];
        ruleResult[`localMemberList[${index}].hours`] = [
          {
            pattern: reg.oneNumberPoint,
            message: '请输入最多一位小数的数字',
            trigger: 'blur'
          }
        ];
        ruleResult[`localMemberList[${index}].days`] = [
          {
            pattern: reg.overZeroInt,
            message: '请输入从0开始的整数',
            trigger: 'blur'
          }
        ];
      });
      return ruleResult;
    }
  },
  watch: {
    memberList: {
      handler: function(val) {
        const now = Date.now();
        this.form.localMemberList = [...val.map((item, idx) => {
          return {
            ...item,
            rowKey: `${idx}_${now}`
          };
        })];
      },
      immediate: true
    },
    // 复制团队
    copyTeam(val, oldVal) {
      if (val !== oldVal) {
        this.getTeamByIdApi({ id: val }).then(() => {
          this.setEmployeeByTeam();
        });
      }
    }
  },
  created() {
    this.selectedDependenceId = this.$route.query.dependenceId;
    this.query();
    this.getRoleQueryApi();
  },
  methods: {
    ...editMapActions(['getTeamByIdApi']),
    ...commonMapActions(['getRoleQueryApi']),
    ...mapActions([
      'getProjectMemberApi',
      'projectMemberModifyApi',
      'projectMemberDeleteApi'
    ]),
    // 转数据
    nameOptionFormatHanlder(data) {
      return data.userList.map(item => {
        return {
          label: item.nickName,
          value: item.userId
        };
      });
    },
    // 设置复制的团队
    setEmployeeByTeam() {
      const now = Date.now();
      this.form.localMemberList = this.list.map((item, idx) => {
        return {
          days: '',
          hours: '8',
          id: '',
          userId: item.userId,
          roleId: item.roleId,
          rowKey:  `${idx}_${now}`,
          userDefaultOptions: item.userDefaultOptions
        };
      });
    },
    // 转数据
    parseStructure(data, allOptText, needAllOpt) {
      const needData = [];
      data.teamList.map(item => {
        needData.push({
          value: item.id,
          label: item.name
        });
      });
      if (needAllOpt) {
        needData.unshift({ label: allOptText, value: null });
      }
      return needData;
    },
    // 查询团队
    query() {
      this.getProjectMemberApi({
        projectId: this.selectedDependenceId
      }).then(() => {
        if (!this.memberList.length) {
          // 如果没有团队成员，默认添加三个
          this.addTeamHandle();
          this.addTeamHandle();
          this.addTeamHandle();
        }
      });
    },
    cancelHandle() {
      this.$PMRouter.push('/project/team-manage');
    },
    // 删除条目
    deleteHandle(index, row) {
      if (row.id) {
        this.projectMemberDeleteApi({
          id: row.id
        })
          .then(() => {
            this.form.localMemberList.splice(index, 1);
          })
          .catch(err => {
            this.$showErrorMessage(err);
          });
      } else {
        this.form.localMemberList.splice(index, 1);
      }
    },
    // 增加条目
    addTeamHandle() {
      const rowKey = `add_${Date.now()}`;
      this.form.localMemberList.push({
        projectId: '',
        userId: '',
        roleId: '',
        days: '',
        hours: '8',
        rowKey
      });
    },
    // 保存
    saveHandle() {
      this.$refs.teamForm.validate(valid => {
        if (valid) {
          const filtered = this.form.localMemberList.filter(
            item => item.userId || item.roleId
          );

          if (filtered.length) {
            this.projectMemberModifyApi({
              memberListJsonStr: JSON.stringify(
                this.form.localMemberList
                  .filter(item => item.userId || item.roleId)
                  .map(item => {
                    item.projectId = this.selectedDependenceId;
                    return item;
                  })
              ),
              projectId: this.$route.query.dependenceId
            })
              .then(() => {
                this.$PMRouter.push('/project/team-manage');
              })
              .catch(err => {
                this.$showErrorMessage(err);
              });
          } else {
            this.$message({
              type: 'info',
              message: '请填写团队人员'
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.team-container {
  padding: 24px 180px;
}
.operation-bar-container {
  overflow: hidden;
  .create-team-btn {
    float: right;
    margin: 10px 0px;
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
  width: 99.9% !important;
  .el-table__body td {
    padding: 0;
  }
  .el-form-item {
    margin-top: 14px;
    .el-form-item__content {
      width: 100%;
      margin: 0 !important;
    }
  }
}
</style>
