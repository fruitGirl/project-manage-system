/*
 * @Description: 测试-套件详情
 * @Author: moran
 * @Date: 2019-06-25 10:05:41
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 15:15:10
 */
<template>
  <div class="kit-detail">
    <pm-bread-crumb :paths="paths" />
    <div class="detail-transparent-container operate-reserve-wrapper">
      <el-row :gutter="16">
        <el-col :span="18">
          <div class="pm-module-white pm-detail-editor">
            <h5 class="distance-editor">
              <el-tag>标题</el-tag> {{ testSuiteModifyDetail.title }}
            </h5>
            <pm-editor-detail
              :content="testSuiteModifyDetail.description || '无'"
            />
          </div>
          <div class="distance-top pm-module-white">
            <kit-table />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="pm-module-white">
            <p class="history-title">操作记录</p>
            <el-scrollbar>
              <div class="detail-box">
                <pm-timelines
                  class="project-timelines"
                  :activities="operationLogsGetter"
                />
              </div>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
    </div>
    <pm-button-group
      :show-divide="false"
      :buttons="buttons"
      @cancel="$PMRouter.push('/test/test-kit')"
      @editor="
        $PMRouter.push({
          path: '/test/editor-kit',
          query: { id: $route.query.id }
        })
      "
    />
  </div>
</template>

<script>
import {
  createNamespacedHelpers,
  mapActions as rootMapActions,
  mapGetters as rootMapGetters
} from 'vuex';
import PmBreadCrumb from '@/components/common/pm-bread-crumb.vue';
import PmTimelines from '@/components/common/pm-timelines.vue';
import PmButtonGroup from '@/components/common/pm-button-group';
import KitTable from '@/components/business/test/kit-detail/kit-table.vue';
import PmEditorDetail from '@/components/common/pm-editor-detail.vue';

const { mapActions, mapState } = createNamespacedHelpers('test/editor-kit');

export default {
  head() {
    return {
      title: '套件详情'
    };
  },
  components: {
    PmBreadCrumb,
    PmTimelines,
    PmButtonGroup,
    KitTable,
    PmEditorDetail
  },
  data() {
    return {
      paths: [
        {
          path: '/test/test-kit',
          name: '套件列表'
        },
        {
          path: '',
          name: '套件详情'
        }
      ],
      buttons: [
        { label: '取消', textColor: 'primary', func: 'cancel' },
        { label: '编辑', type: 'primary', func: 'editor' }
      ]
    };
  },
  computed: {
    ...mapState(['testSuiteModifyDetail']),
    ...rootMapGetters('common-config', ['operationLogsGetter'])
  },
  created() {
    const formId = this.$route.query.id || '';
    this.testSuiteModifyInit({ id: formId });
    this.getOperationLog({
      operateObjectId: formId,
      operateObjectType: 'TEST_SUITE'
    });
  },
  methods: {
    ...mapActions(['testSuiteModifyInit']),
    ...rootMapActions('common-config', ['getOperationLog'])
    // handleEditor(editor) {
    //   editor.enable(false);
    //   editor.blur();
    // }
  }
};
</script>

<style lang="less" scoped>
.kit-detail {
  .history-title {
    font-weight: bold;
    margin-bottom: 15px;
  }
  .detail-box {
    height: 250px;
    // overflow-y: auto;
  }
  .distance-top {
    margin-top: 15px;
    padding-bottom: 20px;
  }
  .distance-editor {
    margin-bottom: 10px;
    height: 30px;
    border-bottom: solid 1px #ebebeb;
  }
}
</style>
