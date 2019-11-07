/*
 * @Description: 测试-关联用例
 * @Author: moran
 * @Date: 2019-06-24 15:32:34
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-29 19:00:38
 */
<template>
  <div class="project-relate-use-case">
    <pm-bread-crumb :paths="paths" />
    <div class="page-container operate-reserve-wrapper">
      <el-tabs v-model="activeName" class="pm-tabs">
        <el-tab-pane  label="所有用例" name="all-case" :lazy="true">
          <all-case
            v-if="activeName === 'all-case'"
            :is-test-module="false"
            @selectChange="handleSelectChange"
          ></all-case>
        </el-tab-pane>
        <el-tab-pane label="按需求关联" name="demand-relate" :lazy="true">
          <demand-relate
            v-if="activeName === 'demand-relate'"
            :is-test-module="false"
            @selectChange="handleSelectChange"
          ></demand-relate>
        </el-tab-pane>
        <el-tab-pane label="按套件关联" name="kit-relate" :lazy="true">
          <kit-relate
            v-if="activeName === 'kit-relate'"
            :is-test-module="false"
            @selectChange="handleSelectChange"
          ></kit-relate>
        </el-tab-pane>
        <el-tab-pane label="按BUG关联" name="bug-relate" :lazy="true">
          <bug-relate
            v-if="activeName === 'bug-relate'"
            :is-test-module="false"
            @selectChange="handleSelectChange"
          ></bug-relate>
        </el-tab-pane>
      </el-tabs>
    </div>
    <pm-button-group
      :show-divide="false"
      :buttons="buttons"
      @saveHandle="handleSave"
      @cancelHandle="$PMRouter.back()"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmBreadCrumb from '@/components/common/pm-bread-crumb.vue';
import PmButtonGroup from '@/components/common/pm-button-group';
import AllCase from '@/components/business/project/relate-use-case/all-case.vue';
import DemandRelate from '@/components/business/project/relate-use-case/demand-relate.vue';
import BugRelate from '@/components/business/project/relate-use-case/bug-relate.vue';
import KitRelate from '@/components/business/project/relate-use-case/kit-relate.vue';
const { mapActions, mapState } = createNamespacedHelpers('project/relate-use-case');
export default {
  head() {
    return {
      title: '关联用例'
    };
  },
  // isKeepAlive: true,
  components: {
    PmBreadCrumb,
    AllCase,
    PmButtonGroup,
    DemandRelate,
    BugRelate,
    KitRelate
  },
  data() {
    return {
      activeName: 'all-case',
      paths: [
        {
          path: this.$route.params.url
            ? this.$route.params.url
            : this.$route.fullPath,
          name: this.$route.query.name
        },
        {
          path: '',
          name: '关联用例'
        }
      ],
      buttons: [
        { label: '取消', textColor: 'primary', func: 'cancelHandle' },
        { label: '保存', type: 'primary', func: 'saveHandle' }
      ],
      params: {}
    };
  },
  computed: {
    ...mapState(['testCasePage'])
  },
  methods: {
    ...mapActions(['testFormCaseLink']),
    handleSelectChange(item) {
      this.params = item;
    },
    getTestCaseId() {
      const needTestCaseIds = [];
      this.testCasePage.forEach((a) => {
        if (this.params.testCaseIds.indexOf(a.id) !== -1) {
          needTestCaseIds.push(a.id);
        }
      });
      return needTestCaseIds;
    },

    handleSave() {
      const needTestCaseIds = this.getTestCaseId();
      if (needTestCaseIds.length > 0) {
        this.testFormCaseLink({ ...this.params, testCaseIds: needTestCaseIds });
      } else {
        this.$message.error('请先选择用例再进行保存');
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
