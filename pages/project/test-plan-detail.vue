/*
 * @Description: 项目-测试计划-计划详情
 * @Author: yaochen
 * @Date: 2019-06-25 14:24:11
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 18:20:45
 */

<template>
  <div class="detail-container">
    <pm-bread-crumb :paths="paths" />
    <div class="detail">
      <div class="detail-info">
        <h2 class="detail-title">
          <span class="title-tag">标题</span>
          {{ testPlanData.name }}
        </h2>
        <p class="time-container">
          <span>{{
            `${testPlanData.creatorName}创建于 ${testPlanData.gmtCreate}`
          }}</span>
          <span class="update-time">{{
            `${testPlanData.modifyName}最后更新于 ${testPlanData.gmtModified}`
          }}</span>
        </p>
        <pm-editor
          v-model="testPlanData.content"
          class="pm-detail-editor"
          @onEditor="handleEditor"
        />
        <pm-accessory :data="attachmentList" :is-blue-line="false"/>
      </div>
      <div class="right-card">
        <pm-info-card>
          <template v-slot:title>
            <span>基本信息</span>
          </template>
          <template v-slot:content>
            <pm-info-list
              :config="config"
              :data="{
                projectId: testPlanData.projectName,
                priority: testPlanData.priorityMessage
              }"
            />
          </template>
        </pm-info-card>
        <pm-info-card>
          <template v-slot:title>
            <span>历史记录</span>
          </template>
          <template v-slot:content>
            <pm-timelines v-if="operationLogList && operationLogList.length" :activities="operationLogList"/>
            <div v-else class="no-data">暂无数据</div>
          </template>
        </pm-info-card>
      </div>
    </div>
    <pm-button-group
      :buttons="buttons"
      @cancelHandle="cancelHandle"
      @confirmHandle="confirmHandle"
    />
  </div>
</template>

<script>
import PmButtonGroup from '@/components/common/pm-button-group';
import PmTimelines from '@/components/common/pm-timelines';
import PmBreadCrumb from '@/components/common/pm-bread-crumb';
import PmInfoCard from '@/components/common/pm-info-card';
import PmInfoList from '@/components/common/pm-info-list';
import PmAccessory from '@/components/common/pm-accessory.vue';
import PmEditor from '@/components/common/pm-editor';
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState } = createNamespacedHelpers(
  'project/test-plan-detail'
);
const buttons = [
  { label: '取消', textColor: 'primary', func: 'cancelHandle' },
  { label: '编辑', textColor: 'primary', func: 'confirmHandle' }
];

export default {
  head() {
    return {
      title: '计划详情'
    };
  },
  components: {
    PmButtonGroup,
    PmBreadCrumb,
    PmInfoList,
    PmAccessory,
    PmInfoCard,
    PmEditor,
    PmTimelines
  },

  data() {
    return {
      config: [
        {
          label: '所属项目',
          field: 'projectId'
        },
        {
          label: '优先级',
          field: 'priority'
        }
      ],
      buttons: buttons,
      paths: [
        {
          path: '/project/test-plan-list',
          name: '测试计划'
        },
        {
          path: '',
          name: '计划详情'
        }
      ]
    };
  },
  computed: {
    ...mapState(['testPlanData', 'operationLogList', 'attachmentList']),
    testPlanId() {
      return this.$route.query.testPlanId;
    }
  },
  mounted() {
    this.getTestPlanData({ id: this.testPlanId });
    this.getOperationLog({
      operateObjectType: 'TEST_PLAN',
      operateObjectId: this.testPlanId
    });
  },
  methods: {
    ...mapActions(['getTestPlanData', 'getOperationLog']),
    handleEditor(editor) {
      editor.enable(false);
      editor.blur();
    },
    cancelHandle() {
      this.$PMRouter.push('/project/test-plan-list');
    },
    confirmHandle() {
      this.$PMRouter.push(
        `/project/create-test-plan?testPlanId=${this.testPlanId}`
      );
    }
  }
};
</script>

<style lang="less" scoped>
.detail-container {
  background-color: transparent;
  padding: 0;
}
.detail {
  display: flex;
  padding: 0px 15px;
  .detail-info {
    background-color: white;
    padding: 20px;
    flex: 2;
  }
}
.time-container {
  color: rgba(0, 0, 0, 0.427450980392157);
  font-size: 14px;
  margin-bottom: 16px;
  .update-time {
    margin-left: 20px;
  }
}
.title-tag {
  font-weight: 400;
  font-size: 12px;
  background-color: #e3f3ff;
  padding: 1px 8px;
  border-radius: 4px;
  margin-right: 12px;
}
.right-card {
  flex: 1;
  min-width: 380px;
  margin-left: 15px;
}

.detail-title {
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 12px;
  margin-bottom: 12px;
}
</style>
