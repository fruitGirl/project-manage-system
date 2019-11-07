/*
 * @Description: 项目-新增项目（编辑项目）
 * @Author: yaochen
 * @Date: 2019-06-24 18:34:09
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-28 10:03:50
 */

<template>
  <div class="project-template-container page-content-container">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      class="project-template-form"
      label-width="7rem"
    >
      <el-form-item label="项目名称:" prop="name">
        <el-input
          v-model="form.name"
          type="textarea"
          autosize
          maxlength="50"
          placeholder="请输入最多50字"
        />
      </el-form-item>
      <el-form-item label="项目类型:" prop="type">
        <pm-remote-select
          v-model="form.type"
          :need-all-opt="false"
          :is-transparent-border="false"
          :action="PROJECT_TYPE_URL"
        />
      </el-form-item>
      <el-form-item label="起止时间:" prop="gmtEstimate">
        <div>
          <el-radio-group v-model="timeRange" class="time-range">
            <el-radio
              v-for="item in timeOption"
              :key="item.label"
              :label="item.label"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
          <el-date-picker
            v-model="form.gmtEstimate"
            :clearable="false"
            type="datetimerange"
            popper-class="pm-date-picker"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['09:30:00', '18:30:00']"
          ></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="项目负责人:" prop="projectManager">
        <pm-remote-search
          v-model="form.projectManager"
          :action="ALL_USER_URL"
          :parse-structure="getUsers"
          :default-option="defaultUserOption"
        />
      </el-form-item>
      <el-form-item label="产品负责人:">
        <pm-remote-search
          v-model="form.productManager"
          :action="ALL_USER_URL"
          :parse-structure="getUsers"
          :default-option="defaultUserOption"
        />
      </el-form-item>
      <el-form-item label="开发负责人:">
        <pm-remote-search
          v-model="form.developManager"
          :action="ALL_USER_URL"
          :parse-structure="getUsers"
          :default-option="defaultUserOption"
        />
      </el-form-item>
      <el-form-item label="测试负责人:">
        <pm-remote-search
          v-model="form.testManager"
          :action="ALL_USER_URL"
          :parse-structure="getUsers"
          :default-option="defaultUserOption"
        />
      </el-form-item>
      <el-form-item label="优先级:">
        <el-select v-model="form.priority" placeholder="请选择">
          <el-option
            v-for="item in PRIORITY"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联产品:">
        <pm-remote-select
          v-model="form.productIds"
          :filterable="true"
          :is-multiple="true"
          :has-all-opt="false"
          :is-transparent-border="false"
          :action="RELATE_PRODUCT_URL"
          :parse-structure="getPrducts"
        />
      </el-form-item>
      <el-form-item label="项目描述:">
        <el-input
          v-model="form.description"
          show-word-limit
          :rows="5"
          type="textarea"
          placeholder="请输入项目描述，最多1000字"
          maxlength="1000"
        ></el-input>
      </el-form-item>
      <el-form-item label="访问权限:">
        <el-radio-group v-model="form.visitType" class="access-auth">
          <el-radio label="PUBLIC">全部可见 (有产品视图权限,即可访问)</el-radio>
          <el-radio label="PRIVATE"
            >成员可见 (只有产品相关负责人和关联的项目团队成员才能访问)</el-radio
          >
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PmRemoteSearch from '@/components/common/pm-remote-search.vue';
import { timeOption, rules } from '@/constants/project/create-project';
import PmRemoteSelect from '@/components/common/pm-remote-select.vue';
import {
  PROJECT_TYPE_URL,
  RELATE_PRODUCT_URL,
  ALL_USER_URL
} from '@/services/common-config';
import { PRIORITY, MIDDLE_PRIORITY } from '@/constants/common/config';
import cloneDeep from 'lodash.clonedeep';

export default {
  components: {
    PmRemoteSelect,
    PmRemoteSearch
  },
  props: {
    hasDefaultTimeRange: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      PROJECT_TYPE_URL,
      RELATE_PRODUCT_URL,
      ALL_USER_URL,
      rules,
      PRIORITY,
      timeRange: this.hasDefaultTimeRange ? '两周' : '',
      form: {
        name: '',
        type: '',
        gmtEstimate: [],
        priority: MIDDLE_PRIORITY,
        productIds: [],
        projectManager: '',
        productManager: '',
        testManager: '',
        developManager: '',
        visitType: 'PUBLIC',
        description: ''
      },
      defaultUserOption: [],
      timeOption: timeOption
    };
  },
  watch: {
    timeRange: {
      handler: function(newVal) {
        const matchItem = timeOption.find(i => i.label === newVal);
        this.form.gmtEstimate = matchItem
          ? matchItem.getRange()
          : this.form.gmtEstimate;
      },
      immediate: true
    }
  },
  methods: {
    changeGmtEstimate() {
      this.timeRange = null;
    },
    getValue(callBack) {
      this.$refs.formRef.validate(valid => {
        if (!valid) return false;
        const { gmtEstimate = [] } = this.form;
        const gmtEstimateStart = gmtEstimate[0];
        const gmtEstimateEnd = gmtEstimate[1];
        callBack({
          ...this.form,
          gmtEstimateStart,
          gmtEstimateEnd
        });
      });
    },
    setValue(data) {
      const { defaultUserOption } = data;
      this.form = cloneDeep(data);
      this.defaultUserOption = defaultUserOption;
    },
    getPrducts(data) {
      const { products = [] } = data;
      const combindProducts = products.map(i => {
        const { id, name } = i;
        return {
          label: name,
          value: id
        };
      });
      return combindProducts || [];
    },
    getApps(data) {
      const { allCodeList = {} } = data;
      const combineApps = allCodeList.map(i => ({
        label: i,
        value: i
      }));
      return combineApps || [];
    },
    getUsers(data) {
      const { userList } = data;
      const combineUsers = userList.map(i => {
        const { userId, nickName } = i;
        return {
          label: nickName,
          value: userId
        };
      });
      return combineUsers;
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';

.project-template-form {
  width: 700px;
  @{deep} .time-range .el-radio {
    margin-right: 20px;
  }
  @{deep} .el-date-editor {
    width: 100%;
  }
  @{deep} .el-select {
    width: 100%;
  }
}
.time-range {
  display: block;
  margin: 10px 0px;
}
.access-auth {
  @{deep} .el-radio:first-child {
    margin: 4px 0px 10px 0px;
  }
}
</style>
