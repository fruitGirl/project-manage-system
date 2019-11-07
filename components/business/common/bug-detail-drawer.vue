/*
  * @Description: bug详情
  * @Author: yaochen
  * @Date: 2019-06-20 19:00:13
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 11:27:32
  */

<template>
  <pm-drawer
    title="bug详情"
    :visible="visible"
    :footer="false"
    @onCancel="$emit('cancel')">
    <template v-slot:headerRight>
      <el-button
        v-if="rowData.status === BUG_ACTIVATED_STATUS"
        type="primary"
        @click="$emit('editor', { id: rowData.id })">
        编辑
      </el-button>
      <el-button
        v-if="rowData.status === BUG_ACTIVATED_STATUS && rowData.managerMember"
        type="primary"
        @click="$emit('solve', { id: rowData.id })">
        处理
      </el-button>
      <el-button
        v-if="rowData.status === BUG_RESOLVED_STATUS && rowData.managerCreater"
        type="primary"
        @click="$emit('close', { id: rowData.id })">
        关闭
      </el-button>
      <el-button
        v-if="rowData.status !== BUG_ACTIVATED_STATUS && rowData.managerCreater"
        type="primary"
        @click="$emit('activate', { id: rowData.id })">
        激活
      </el-button>
    </template>
    <div>
      <normal-info />
      <main-content />
      <pm-info-title title="关联" :has-bottom-margin="false"/>
      <relation
        @task="$emit('task', $event)"
        @demand="$emit('demand', $event)"/>
      <history :history="operationLogsGetter" />
    </div>
  </pm-drawer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmDrawer from '@/components/common/pm-drawer.vue';
import MainContent from '@/components/business/common/bug-detail/main-content.vue';
import NormalInfo from '@/components/business/common/bug-detail/normal-info.vue';
import Relation from '@/components/business/common/bug-detail/relation.vue';
import History from '@/components/business/common/bug-detail/history';
import PmInfoTitle from '@/components/common/pm-info-title';
import { BUG_RESOLVED_STATUS, BUG_ACTIVATED_STATUS, BUG_CLOSED_STATUS } from '@/constants/common/bug-list';

const { mapActions, mapState } = createNamespacedHelpers('project/bug-detail');
const {
  mapActions: mapCommonActions,
  mapGetters: mapCommonGetters
} = createNamespacedHelpers('common-config');

export default {
  components: {
    MainContent,
    NormalInfo,
    Relation,
    History,
    PmDrawer,
    PmInfoTitle
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    rowData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      BUG_RESOLVED_STATUS,
      BUG_ACTIVATED_STATUS,
      BUG_CLOSED_STATUS,
    };
  },
  computed: {
    ...mapState(['bugInfo']),
    ...mapCommonGetters(['operationLogsGetter']),
  },
  watch: {
    visible(val) {
      if (val && this.rowData.id) this.getDetailMsg(this.rowData.id);
    }
  },
  methods: {
    ...mapActions(['bugDetailQuery']),
    ...mapCommonActions(['getOperationLog']),

    // 详情信息
    getDetailMsg(id) {
      this.bugDetailQuery({
        bugId: id
      });
      this.getOperationLog({
        operateObjectType: 'BUG',
        operateObjectId: id
      });
    },
  }
};
</script>
