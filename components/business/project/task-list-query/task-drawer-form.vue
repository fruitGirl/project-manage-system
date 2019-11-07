<template>
  <div>
    <el-form
      ref="drawerForm"
      class="drawer-form"
      :model="formData"
      label-width="90px"
      :rules="rules"
    >
      <el-row class="form-wrap">
        <el-col :span="12">
          <el-form-item label="所属项目" prop="projectId">
            <pm-remote-search
              v-model="formData.projectId"
              field-text="projectList"
              :default-option="[{ label: projectName, value: projectId }]"
              :parse-structure="formatProjectSearch"
              action="/project/projectQueryByName"
            ></pm-remote-search>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="任务类型" prop="type">
            <pm-remote-select
              v-model="formData.type"
              :need-all-opt="false"
              :is-transparent-border="false"
              action="/home/pageOptionsParamInit?fullPath=com.bench.app.pm.api.web.base.core.model.task.enums.TaskTypeEnum"
            ></pm-remote-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="优先级" prop="priority">
            <el-select v-model="formData.priority">
              <el-option
                v-for="item in priorityList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="负责人" prop="assignedPerson">
            <pm-remote-select
              v-model="formData.assignedPerson"
              field-text="labelValueObjects"
              :need-all-opt="false"
              :is-transparent-border="false"
              :default-option="userSearchDefaultOption"
              :filterable="true"
              :action="
                formData.projectId
                  ? `${TASK_ASSIGN_URL}?projectId=${formData.projectId}`
                  : ''
              "
            ></pm-remote-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="起止日期" prop="dateRange">
            <el-date-picker
              v-model="formData.dateRange"
              popper-class="pm-date-picker"
              type="datetimerange"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['09:30:00', '18:30:00']"
              style="width:280px"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="预估工时" prop="estimateHours">
            <el-input-number
              v-model="formData.estimateHours"
              placeholder="请输入工时数"
              :min="0"
              :precision="1"
              controls-position="right"
            ></el-input-number>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="关联需求" prop="demandId">
            <pm-remote-select
              v-model="formData.demandId"
              field-text="objectMap"
              :need-all-opt="false"
              :is-transparent-border="false"
              :default-option="demandDefaultOption"
              :filterable="true"
              :action="
                formData.projectId
                  ? `${LINK_DEMAND_URL}?projectId=${formData.projectId}`
                  : ''
              "
            ></pm-remote-select>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="关联应用" prop="linkedAppCode">
            <relate-application
              v-model="formData.linkedAppCode"
              :project-id="formData.projectId"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import dateFormat from 'dateformat';
import { tansData, transArrs } from '@/utils/common';
import { PRIORITY } from '@/constants/common/config';
import pmRemoteSearch from '@/components/common/pm-remote-search';
import pmRemoteSelect from '@/components/common/pm-remote-select.vue';
import { TASK_ASSIGN_URL, LINK_DEMAND_URL } from '@/services/common-config';
import relateApplication from '@/components/business/project/task-list-query/relate-application.vue';

const today = dateFormat(Date.now(), 'yyyy-mm-dd');

export default {
  components: {
    pmRemoteSearch,
    pmRemoteSelect,
    relateApplication
  },
  props: {
    propDemandDefaultOption: {
      type: Array,
      default: () => []
    },
    propUserSearchDefaultOption: {
      type: Array,
      default: () => []
    },
    projectName: {
      type: String,
      default: ''
    },
    projectId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      TASK_ASSIGN_URL,
      LINK_DEMAND_URL,
      priorityList: PRIORITY,
      userSearchDefaultOption: [],
      demandDefaultOption: [],
      formData: {
        projectId: undefined,
        projectName: undefined,
        type: undefined,
        priority: 3,
        assignedPerson: undefined,
        dateRange: [`${today} 09:30:00`, `${today} 18:30:00`], // 拆成gmtEstimateStart和gmtEstimateEnd给后端
        estimateHours: undefined,
        demandId: undefined,
        linkedAppCode: []
      },
      rules: {
        projectId: [{ required: true, message: '请选择所属项目' }],
        type: [{ required: true, message: '请选择任务类型' }],
        assignedPerson: [{ required: true, message: '请输入负责人' }],
      }
    };
  },
  watch: {
    propDemandDefaultOption(val) {
      if (val && val.length) {
        this.demandDefaultOption = [...val];
      }
    },
    propUserSearchDefaultOption(val) {
      if (val && val.length) {
        this.userSearchDefaultOption = [...val];
      }
    }
  },
  methods: {
    tansData,
    transArrs,
    formatProjectSearch(data, fieldText) {
      return data[fieldText].map(item => {
        return {
          label: item.name,
          value: item.id
        };
      });
    },
    getFormData() {
      let result = null;
      this.$refs.drawerForm.validate(valid => {
        if (valid) {
          result = this.formData;
        }
      });
      return result;
    },
    setFormData(formData) {
      this.formData = { ...formData };
    },
    setProjectId(projectId) {
      this.formData.projectId = projectId;
    },
    resetFormData() {
      this.$refs.drawerForm.resetFields();
      this.formData = {
        projectId: '',
        projectName: '',
        type: '',
        priority: 3,
        assignedPerson: '',
        dateRange: [`${today} 09:30:00`, `${today} 18:30:00`],
        estimateHours: '',
        demandId: '',
        linkedAppCode: []
      };
    }
  }
};
</script>

<style lang="less">
.drawer-form {
  .el-input-number,
  .el-select,
  .el-input__inner,
  .el-date-editor {
    width: 100% !important;
  }
}
</style>
