/*
 * @Description: 用例详情抽屉
 * @Author: danding
 * @Date: 2019-10-24 14:52:39
 * @Last Modified by: danding
 * @Last Modified time: 2019-11-05 15:15:46
 */

<template>
  <pm-drawer
    title="用例详情"
    :visible="visible"
    @onCancel="hideDrawer"
  >
    <template v-slot:headerRight>
      <el-button
        type="primary"
        @click="$emit('onEdit', {testCaseId: useCaseDetailMsg.id})"
      >编辑</el-button>
      <el-button
        v-if="showMoreOperate"
        type="primary"
        @click="$emit('transferBug', {testCaseId: useCaseDetailMsg.id})"
      >转BUG</el-button>
    <el-dropdown v-if="showMoreOperate" @command="handleMoreOperate">
      <el-button type="primary">
        更多操作
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="handleCopyUseCaseMsg">复制</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </template>
    <div class="detail-normal-info">
      <div>
        <el-tag size="mini">标题</el-tag>
        <span class="title">{{ useCaseDetailMsg.title }}</span>
        <el-tag
          type="warning"
          effect="dark"
          size="mini"
        >{{ useCaseDetailMsg.priority }}</el-tag>
      </div>
      <pm-separate :size="15" />
      <div class="info-box">
        <pm-info-list
          :config="NORMAL_INFO_CONFIG"
          :data="useCaseDetailMsg"
          :is-vertical="false"
          label-class="label-style"
        />
      </div>
    </div>
    <pm-separate :size="25" />
    <pm-info-title title="自动化" />
      <div>
        是否自动化：{{ useCaseDetailMsg.automation ? '是' : '否'}}
      </div>
      <div v-if="useCaseDetailMsg.automation">
        自动化状态：{{useCaseDetailMsg.automationStatus}}
      </div>
      <div v-if="useCaseDetailMsg.automation">
        开发人：{{useCaseDetailMsg.developer}}
      </div>
    <pm-separate :size="15" />
    <main-content
      :data-provider="useCaseDescription"
      :files="useCaseDetailMsg.attachmentList || []"
    />
    <pm-separate :size="15" />
    <pm-info-title :has-bottom-margin="false" title="关联"/>
      <relation
        :bug="useCaseDetailMsg.bugs"
        :requirement="useCaseDetailMsg.requirement"
        @lookBugDetail="lookBugDetail"
        @lookRequirementDetail="lookRequirementDetail"
      />
    <pm-separate :size="25" />
    <pm-info-title title="操作记录"/>
    <pm-timelines :activities="operateHistory"/>
  </pm-drawer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmDrawer from '@/components/common/pm-drawer.vue';
import PmTimelines from '@/components/common/pm-timelines';
import PmInfoList from '@/components/common/pm-info-list';
import PmSeparate from '@/components/common/pm-separate';
import PmInfoTitle from '@/components/common/pm-info-title.vue';
import { NORMAL_INFO_CONFIG } from '@/constants/test/use-case-detail';
import Relation from '@/components/business/test/use-case-detail/relation.vue';
import {
  TEXT_DESCRIBE,
  USE_CASE_DETAIL_COLUMN,
  STEP_DESCRIBE
} from '@/constants/test/use-case-list';
import MainContent from '@/components/business/test/use-case-detail/main-content.vue';

const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  'test/use-case-list'
);

export default {
  components: {
    PmDrawer,
    PmTimelines,
    PmInfoList,
    PmSeparate,
    PmInfoTitle,
    Relation,
    MainContent
  },
  props: {
    detailId: { // 详情的主键
      type: [String, Number],
      default: ''
    },
    visible: {
      type: Boolean,
      default: false,
    },

    // 显示更多操作
    showMoreOperate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      NORMAL_INFO_CONFIG,
      buttons: [
        { label: '返回', textColor: 'primary', func: 'goBack' },
        { label: '执行', textColor: 'primary', func: 'resolve' },
        { label: '删除', textColor: 'primary', func: 'deleteUseCase' }
      ],
      TEXT_DESCRIBE, // 文本描述步骤
      STEP_DESCRIBE, // 用例步骤
      USE_CASE_DETAIL_COLUMN
    };
  },
  computed: {
    ...mapState([
      'operateHistory',
      'useCaseDetailMsg',
      'showExecuteDialog',
      'storeExecuteUseCaseMsg',
      'storeExecuteResultMsg',
      'expandRowKeys',
      'showBugDrawer',
      'storeBugDatas'
    ]),

    // 用例描述的值
    useCaseDescription(newVal) {
      return this.useCaseDetailMsg.testCase || {};
    }
  },
  watch: {
    // 得到详情id,请求详情数据
    detailId(newVal) {
      this.getUseCaseDetailInfo({ testCaseId: newVal });
      this.getOperateHistory({ testCaseId: newVal });
    },

    // 抽屉隐藏，清空数据源
    visible(newVal) {
      !newVal && this.clearData();
    }
  },
  methods: {
    ...mapActions([
      'getExecuteDetailResult',
      'transferBug',
      'executeUseCase',
      'createExecuteResult',
      'createBug',
      'getUseCaseDetailInfo',
      'getOperateHistory',
      'handleDelete'
    ]),
    ...mapMutations([
      'displayExecuteDialog',
      'displayBugDrawer',
      'setUseCaseDetailMsg',
      'storeOperateHistory'
    ]),
    handleMoreOperate(command) {
      this.$emit(command, { testCaseId: this.useCaseDetailMsg.id });
    },
    hideDrawer() {
      this.$emit('hideDrawer');
    },

    // 重置数据
    clearData() {
      this.setUseCaseDetailMsg({ payload: {} });
      this.storeOperateHistory({ payload: [] });
    },

    // 查看bug详情
    lookBugDetail(key) {
      this.$emit('onLookBugDetail', key);
    },

    // 查看需求详情
    lookRequirementDetail(key) {
      this.$emit('onLookRequirementDetail', key);
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';

@{deep} .el-dropdown {
  margin-left: 9px;
}
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
