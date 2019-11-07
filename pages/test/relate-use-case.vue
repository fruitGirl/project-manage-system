/*
 * @Description: 关联用例
 * @Author: moran
 * @Date: 2019-06-24 15:32:20
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-29 19:00:55
 */
<template>
  <div class="project-relate-use-case">
    <pm-bread-crumb :paths="paths" />
    <div class="page-container operate-reserve-wrapper">
      <el-tabs v-model="activeName" class="pm-tabs">
        <el-tab-pane label="所有用例" name="first" :lazy="true">
          <all-case v-if="activeName === 'first'" @selectChange="handleSelectChange"></all-case>
        </el-tab-pane>
        <el-tab-pane label="按需求关联" name="second" :lazy="true">
          <demand-relate v-if="activeName === 'second'" @selectChange="handleSelectChange"></demand-relate>
        </el-tab-pane>
        <el-tab-pane label="按套件关联" name="third" :lazy="true">
          <kit-relate v-if="activeName === 'third'" @selectChange="handleSelectChange"></kit-relate>
        </el-tab-pane>
        <el-tab-pane label="按BUG关联" name="fourth" :lazy="true">
          <bug-relate v-if="activeName === 'fourth'" @selectChange="handleSelectChange"></bug-relate>
        </el-tab-pane>
      </el-tabs>
    </div>
    <pm-button-group
      :show-divide="false"
      :buttons="buttons"
      @confirm="handleSave"
      @cancelHandle="$PMRouter.back()"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers, mapState as rootMapState } from 'vuex';
import PmBreadCrumb from '@/components/common/pm-bread-crumb.vue';
import PmButtonGroup from '@/components/common/pm-button-group';
import AllCase from '@/components/business/project/relate-use-case/all-case.vue';
import DemandRelate from '@/components/business/project/relate-use-case/demand-relate.vue';
import BugRelate from '@/components/business/project/relate-use-case/bug-relate.vue';
import KitRelate from '@/components/business/project/relate-use-case/kit-relate.vue';
const { mapActions } = createNamespacedHelpers('test/relate-use-case');
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
      activeName: 'first',
      path: '',
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
        { label: '确认', type: 'primary', func: 'confirm' }
      ],
      params: {}
    };
  },
  computed: {
    ...rootMapState('project/relate-use-case', ['testCasePage'])
  },
  
  methods: {
    ...mapActions(['testFormCaseLink', 'createTestSuiteCaseLink']),

    // 选中数据
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

    // 关联用例
    handleSave() {
      const name = this.$route.query.name;
      const needTestCaseIds = this.getTestCaseId();

      if (needTestCaseIds.length > 0) {
        if (name === '套件详情' || name === '套件列表') {
          const testSuiteId = this.$route.query.id;
          this.createTestSuiteCaseLink({
            testSuiteId,
            testCaseIds: needTestCaseIds
          });
        } else {
          this.testFormCaseLink({ ...this.params, testCaseIds: needTestCaseIds });
        }
      } else {
        this.$message.error('请先选择用例再进行保存');
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
