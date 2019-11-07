/*
 * @Description: 文档-文档列表-文档详情
 * @Author: yaochen
 * @Date: 2019-06-24 16:58:42
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 16:49:51
 */
<template>
  <div class="detail-container">
    <pm-bread-crumb :paths="paths" />
    <div class="detail">
      <div class="detail-info">
        <h2 class="detail-title">
          <span class="title-tag">标题</span>
          {{ docInfo.title }}
        </h2>
        <p class="time-container">
          <span>{{ `${docInfo.creator} 创建于 ${docInfo.gmtCreate}` }}</span>
          <span class="update-time">{{
            `${docInfo.modifier} 最后更新于 ${docInfo.gmtModified}`
          }}</span>
        </p>
        <p class="brief-content">{{ docInfo.brief }}</p>
        <pm-accessory :data="attachmentList" :is-blue-line="false" />
      </div>
      <div class="right-card">
        <pm-info-card>
          <template v-slot:title>
            <span>基本信息</span>
          </template>
          <template v-slot:content>
            <pm-info-list :config="config" :data="baseInfo" />
          </template>
        </pm-info-card>
        <pm-info-card>
          <template v-slot:title>
            <span>历史记录</span>
          </template>
          <template v-slot:content>
            <pm-timelines :activities="operationLogList"/>
          </template>
        </pm-info-card>
      </div>
    </div>
    <pm-button-group
      :buttons="buttons"
      @deleteHandle="deleteHandle"
      @backHandle="backHandle"
    />
  </div>
</template>

<script>
import PmButtonGroup from '@/components/common/pm-button-group';
import PmTimelines from '@/components/common/pm-timelines';
import PmBreadCrumb from '@/components/common/pm-bread-crumb';
import PmInfoCard from '@/components/common/pm-info-card';
import PmInfoList from '@/components/common/pm-info-list';
import PmAccessory from '@/components/common/pm-accessory';
import PageData from '@/constants/document/doc-detail';
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState } = createNamespacedHelpers('document/doc-detail');
const { mapActions: docMapActions } = createNamespacedHelpers(
  'document/document-list'
);

export default {
  head() {
    return {
      title: '文档详情'
    };
  },
  components: {
    PmButtonGroup,
    PmBreadCrumb,
    PmInfoList,
    PmAccessory,
    PmInfoCard,
    PmTimelines
  },
  data() {
    return {
      config: PageData.config,
      paths: PageData.paths,
      docId: ''
    };
  },
  computed: {
    ...mapState(['docInfo', 'attachmentList', 'operationLogList']),
    baseInfo() {
      return {
        id: this.docInfo.id,
        visitType: this.docInfo.visitType && this.docInfo.visitType.message,
        name: this.docInfo.name,
        ownerObject: this.docInfo.ownerObject
      };
    },
    buttons() {
      // 回收站进来的详情没有删除按钮
      const buttons = [
        { label: '返回', textColor: 'primary', func: 'backHandle' }
      ];
      if (!this.hasNoDelete) {
        buttons.push({
          label: '删除',
          textColor: 'primary',
          func: 'deleteHandle'
        });
      }
      return buttons;
    }
  },
  created() {
    this.docId = this.$route.query.docId;
    this.hasNoDelete = this.$route.query.hasNoDelete;

    // 从回收站进入与从文档列表进来是不一样的
    if (this.hasNoDelete) {
      this.paths[0] = {
        path: './trash',
        name: '回收站'
      };
    } else {
      this.paths[0] = {
        path: './document-list',
        name: '文档'
      };
    }

    // 获取文档列表
    this.getdocDetailQueryApi({
      id: this.docId
    });

    // 获取操作日志
    this.getOperationLogApi({
      operateObjectType: 'DOC',
      operateObjectId: this.docId
    });
  },
  methods: {
    ...mapActions(['getdocDetailQueryApi', 'getOperationLogApi']),
    ...docMapActions(['docModifyEnabledApi']),

    // 删除文档
    deleteHandle() {
      this.$confirm(
        '确定删除文档？提示：删除后，可在回收站进行恢复',
        '操作提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(re => {
          this.docModifyEnabledApi({
            id: this.docId,
            enabled: false
          })
            .then(() => {
              this.$router.back();
            })
            .catch(err => {
              this.$showErrorMessage(err);
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    backHandle() {
      this.$router.back();
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
    flex: 1;
    .brief-content {
      word-break: break-all;
    }
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
  margin-left: 15px;
  max-width: 400px;
}

.detail-title {
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 12px;
  margin-bottom: 12px;
}
</style>

<style lang="less">
.right-card .pm-module-container:last-child {
  margin-bottom: 0;
  .content {
    max-height: 400px;
    overflow-y: auto;
  }
}
</style>
