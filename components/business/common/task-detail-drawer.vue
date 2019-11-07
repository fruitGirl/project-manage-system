/*
 * @Description: 任务详情抽屉
 * @Author: danding
 * @Date: 2019-10-24 14:52:39
 * @Last Modified by: danding
 * @Last Modified time: 2019-11-05 15:15:46
 */

<template>
  <pm-drawer
    title="任务详情"
    :visible="visible"
    @onCancel="hideDrawer"
  >
    <template v-slot:headerRight>
      <el-button
        type="primary"
        @click="$emit('onEditTask', taskData)"
      >编辑</el-button>
    <el-dropdown v-if="showMoreOperate" @command="handleMoreOperate">
      <el-button type="primary">
        更多操作
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="onPause">暂停</el-dropdown-item>
        <el-dropdown-item command="onContinue">继续</el-dropdown-item>
        <el-dropdown-item command="onFinishTask">完成</el-dropdown-item>
        <el-dropdown-item command="onTerminal">终止</el-dropdown-item>
        <el-dropdown-item command="onCopyTask">复制</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </template>
    <div class="detail-normal-info">
      <div>
        <el-tag size="mini">标题</el-tag>
        <span class="title">{{ taskData.name }}</span>
        <el-tag
          type="warning"
          effect="dark"
          size="mini"
        >{{ taskData.priorityMessage }}</el-tag>
        <el-tag effect="dark" size="mini">{{taskData.typeMessage}}</el-tag>
      </div>
      <pm-separate :size="15" />
      <div class="info-box">
        <pm-info-list
          :config="config"
          :data="taskData"
          :is-vertical="false"
          label-class="label-style"
        />
      </div>
    </div>
    <pm-separate :size="25" />
    <pm-info-title title="任务描述" :has-bottom-margin="false" />
    <pm-editor-detail class="content" :content="taskData.description" />
    <pm-accessory :data="attachmentList"/>
    <pm-separate :size="25" />
    <pm-info-title :has-bottom-margin="false" title="关联"/>
      <relate-card
        :demand-data="demandData"
        :bug-list="bugList"
        :app-link-list="appLinkList"
        @lookRequirementDetail="lookRequirementDetail"
        @lookBugDetail="lookBugDetail"
      />
    <pm-separate :size="25" />
    <pm-info-title title="操作记录"/>
    <pm-timelines :activities="operationLogsGetter"/>
  </pm-drawer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmDrawer from '@/components/common/pm-drawer.vue';
import PmTimelines from '@/components/common/pm-timelines';
import PmInfoList from '@/components/common/pm-info-list';
import PmAccessory from '@/components/common/pm-accessory';
import mixins from '@/mixins/task-list-query';
import relateCard from '@/components/business/project/task-detail/relate-card.vue';
import PmEditorDetail from '@/components/common/pm-editor-detail.vue';
import { DETAIL_INFO_CONFIG } from '@/constants/project/task-list-query';
import PmSeparate from '@/components/common/pm-separate';
import PmInfoTitle from '@/components/common/pm-info-title.vue';

const { mapActions, mapState } = createNamespacedHelpers('project/task-list-query');
const {
  mapActions: mapCommonActions,
  mapGetters: mapCommonGetters
} = createNamespacedHelpers('common-config');

export default {
  components: {
    PmInfoList,
    PmTimelines,
    PmAccessory,
    relateCard,
    PmEditorDetail,
    PmDrawer,
    PmSeparate,
    PmInfoTitle
  },
  mixins: [mixins],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    taskId: {
      type: [Number, String],
      default: ''
    },

    // 是否显示更多操作按钮
    showMoreOperate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      config: DETAIL_INFO_CONFIG
    };
  },
  computed: {
    ...mapState([
      'taskData',
      'attachmentList',
      'bugList',
      'appLinkList',
      'demandData'
    ]),
    ...mapCommonGetters(['operationLogsGetter'])
  },
  watch: {
    taskId(id) {
      this.getDetailMsg(id);
    }
  },
  methods: {
    ...mapActions([
      'getTaskDetail'
    ]),
    ...mapCommonActions(['getOperationLog']),

    // 获取详情
    getDetailMsg(id) {
      this.getTaskDetail({ taskId: id });
      this.getOperationLog({
        operateObjectType: 'TASK',
        operateObjectId: id
      });
    },

    // 隐藏抽屉
    hideDrawer() {
      this.$emit('onHideDrawer');
    },

    // 操作更多
    handleMoreOperate(command) {
      this.$emit(command, this.taskData);
    },

    // 查看需求详情
    lookRequirementDetail(key) {
      this.$emit('onLookRequirementDetail', key);
    },

    // 查看Bug详情
    lookBugDetail(key) {
      this.$emit('onLookBugDetail', key);
    }
  }
};
</script>

<style lang="less" scoped>
 @deep: ~'>>>';
.detail-normal-info {
  @{deep}.label-style {
    color: #333;
  }
  .info-box {
    background-color: #F5F5F5;
    padding: 10px;
  }
  .title {
    margin: 0 5px 0 10px;
    font-weight: bold;
  }
}
.task-detail-wrap {
  display: flex;
  padding: 0px 15px;
  .detail-info {
    background-color: white;
    padding: 20px;
    flex: 1;
  }
}
.file-wrap {
  margin-top: 10px;
}
.content {
  padding: 20px;
  height: auto;
}
.status-title {
  display: inline-block;
  padding: 1px 5px;
  background: #ffa02f;
  color: #fff;
  border-radius: 3px;
  font-size: 12px;
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
  margin-left: 15px;
  max-width: 500px;
}
.detail-title {
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 12px;
  margin-bottom: 12px;
}
</style>
