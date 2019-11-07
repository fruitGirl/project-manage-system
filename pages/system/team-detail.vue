/*
 * @Description: 团队详情
 * @Author: yaochen
 * @Date: 2019-06-18 18:21:05
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 14:36:05
 */
<template>
  <div class="team-detail-container">
    <pm-bread-crumb :paths="paths" />
    <div class="team-detail page-gray-container">
      <div class="team-info">
        <h2 class="detail-title">
          <span class="title-tag">标题</span>
          {{ teamInfo.name }}
        </h2>
        <p class="time-container">
          <span>{{ `${teamInfo.creator} 创建于 ${teamInfo.gmtCreate}` }}</span>
          <span class="update-time">{{
            `${teamInfo.modifier} 最后更新于 ${teamInfo.gmtModified}`
          }}</span>
        </p>
        <pm-table
          :data="list"
          :column="column"
          :is-operation="false"
          :is-pagination="false"
        ></pm-table>
      </div>
      <div class="team-proj">
        <div class="proj-timelines">
          <h2 class="detail-title">历史记录</h2>
          <div class="timeline-container">
            <pm-timelines :activities="operationLogList"/>
          </div>
        </div>
      </div>
    </div>
    <pm-button-group
      :buttons="buttons"
      @deleteHandle="deleteHandler"
      @recoverHandle="recoverHandler"
      @backHandle="backHandler"
      @editHandle="editHandler"
    />
  </div>
</template>

<script>
import PmTable from '@/components/common/pm-table';
import PmButtonGroup from '@/components/common/pm-button-group';
import PmTimelines from '@/components/common/pm-timelines';
import PmBreadCrumb from '@/components/common/pm-bread-crumb';
import pageData from '@/constants/system/team-detail';
import cloneDeep from 'lodash.clonedeep';
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  'system/team-detail'
);
const {
  mapActions: commonMapActions,
  mapState: commonMapState
} = createNamespacedHelpers('common-config');
const { mapActions: teamMapActions } = createNamespacedHelpers(
  'system/team-manage'
);
// 为获取菜单中的权限列表
const { mapGetters: layoutMapGetters } = createNamespacedHelpers('layout');

// 权限
const AUTHORITY_CODE = 'PM_TEAM_MANAGE';
export default {
  head() {
    return {
      title: '团队详情'
    };
  },
  components: {
    PmTable,
    PmButtonGroup,
    PmBreadCrumb,
    PmTimelines
  },
  data() {
    return {
      paths: pageData.paths,
      buttons: cloneDeep(pageData.buttons),
      column: pageData.column
    };
  },
  computed: {
    ...mapState(['list', 'teamInfo']),
    ...layoutMapGetters(['siderMenuAuthorityCodes']),
    ...commonMapState(['operationLogs']),
    // 转数据
    operationLogList() {
      return this.operationLogs.map(item => {
        return {
          content: `${item.operator}  ${item.actionType.message}`,
          time: item.gmtCreate,
          memos: [item.memo]
        };
      });
    }
  },
  watch: {
    // 权限
    siderMenuAuthorityCodes: {
      handler(val) {
        if (val && val.length >= 0 && val.includes(AUTHORITY_CODE)) {
          this.getTeamDetailQueryApi({ id: this.$route.query.teamId }).then(
            () => {
              this.switchButton();
            }
          );
          this.loadLog();
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(['getTeamDetailQueryApi']),
    ...commonMapActions(['getOperationLog']),
    ...teamMapActions(['teamModifyEnabledApi']),
    ...mapMutations(['mutationTeamInfo']),
    // 加载时间线数据
    loadLog() {
      this.getOperationLog({
        operateObjectType: 'TEAM',
        operateObjectId: this.$route.query.teamId
      });
    },
    // 换button，如恢复后，要变成删除
    switchButton() {
      this.buttons.splice(
        1,
        1,
        this.teamInfo.enabled
          ? { label: '删除', textColor: 'primary', func: 'deleteHandle' }
          : { label: '恢复', textColor: 'primary', func: 'recoverHandle' }
      );
    },
    deleteHandler() {
      this.enableTeamHandler('确认删除团队');
    },
    recoverHandler() {
      this.enableTeamHandler('确认恢复团队');
    },
    // 团队删除恢复
    enableTeamHandler(message) {
      this.$confirm(message, '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(re => {
          if (re) {
            this.teamModifyEnabledApi({
              id: this.teamInfo.id,
              enabled: !this.teamInfo.enabled
            })
              .then(() => {
                const newTeamInfo = {
                  ...this.teamInfo,
                  enabled: !this.teamInfo.enabled
                };
                this.mutationTeamInfo({ payload: newTeamInfo });
                this.switchButton();
              })
              .catch(err => {
                this.$showErrorMessage(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    backHandler() {
      this.$PMRouter.back();
    },
    editHandler() {
      this.$PMRouter.push(`/system/edit-team?teamId=${this.teamInfo.id}`);
    }
  }
};
</script>

<style lang="less" scoped>
.team-detail-container {
  background-color: transparent;
  padding: 0;
}
.detail-title {
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 12px;
  margin-bottom: 12px;
}
.team-detail {
  display: flex;
  .team-info {
    background-color: white;
    padding: 15px;
    flex: 1;
  }
  .team-proj {
    margin-left: 18px;
    background-color: white;
    padding: 15px;
    width: 400px;
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
.proj-timelines .detail-title {
  margin-bottom: 20px;
}
.title-tag {
  font-weight: 400;
  font-size: 12px;
  background-color: #e3f3ff;
  padding: 1px 8px;
  border-radius: 4px;
  margin-right: 12px;
}
.timeline-container {
  // height: 300px;
  // overflow-y: auto;
}
</style>
