/*
 * @Description: 项目主页-项目信息
 * @Author: moran 
 * @Date: 2019-08-26 11:52:41 
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-28 16:58:15
 */
<template>
<div v-loading="baseInfoLoading" class="pm-flex">
    <div class="pm-flex-1 module-bac pm-scrollbar">
      <module-info title="信息" :config="PROJECT_INFO" :data="projectBaseInfo.projectInfo"/>
      <module-info title="成员" :member='projectBaseInfo.members'/>
      <module-info title="负责人" :config="MANAGER" :data="projectBaseInfo.managerInfo"/>
      <module-info title="起止" :config="TIME_INFO" :data="projectBaseInfo.timeInfo"/>
    </div>
    <div class="info-container module-bac">
      <h3>信息</h3>
      <pm-timelines :activities="operationLogsGetter" class="timeline-box pm-scrollbar"/>
    </div>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmTimelines from '@/components/common/pm-timelines.vue';
import ModuleInfo from '@/components/business/project/home/module-info.vue';
import { PROJECT_INFO, MANAGER, TIME_INFO } from '@/constants/project/home';
const { mapActions, mapState } = createNamespacedHelpers(
  'project/home'
);
const {
  mapActions: commonMapActions,
  mapGetters: commMapGetters
} = createNamespacedHelpers('common-config');

export default {
  components: {
    PmTimelines,
    ModuleInfo
  },
  data() {
    return {
      PROJECT_INFO,
      MANAGER,
      TIME_INFO
    };
  },
  computed: {
    ...mapState(['projectBaseInfo', 'baseInfoLoading']),
    ...commMapGetters(['operationLogsGetter']),
  },
  created() {
    // 只有第一次调取接口
    if (!this.projectBaseInfo.name) {
      this.getProjectquery();
      this.getOperation();
    }
  },
  methods: {
    ...mapActions(['getProjectDetail']),
    ...commonMapActions(['getOperationLog']),
    
    // 项目基本信息
    getProjectquery() {
      this.getProjectDetail({
        projectId: this.$route.query.dependenceId
      });
    },
    
    // 操作记录
    getOperation() {
      this.getOperationLog({
        operateObjectType: 'PROJECT',
        operateObjectId: this.$route.query.dependenceId
      });
    }
  }
  
};
</script>

<style lang="less" scoped>
.module-bac {
  background-color: #F7F7F7;
  padding: 15px;
  height: 310px;
}
.info-container {
  width: 400px;
  margin-left: 15px;
 
}
h3 {
  margin-bottom: 10px;
}
.timeline-box {
  height: 252px;
}
</style>