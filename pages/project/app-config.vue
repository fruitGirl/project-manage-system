/*
 * @Description: 项目-应用设置
 * @Author: xiaojian
 * @Date: 2019-07-05 16:19:09
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-06 16:47:54
 */

<template>
  <div>
    <div class="pm-flex">
      <div class="page-container pm-flex-1">
        <!-- <el-button type="primary" @click="handleCreateEmptyItem"
          >+ 关联应用</el-button> -->
        <el-button type="warning"
          :disabled="setBranchDisabled"
          @click="isGenerateVisible = true">
          生成分支
        </el-button>
        <el-button type="primary"
          @click="displayBranchsModal(true)">
          分支列表
        </el-button>
        <div>
            <app-config-item
              v-for="item in appConfigItemList"
              :key="item.id || item.uid"
              :app-code-list="allCodeList"
              :item-create="handleCreateItem"
              :item-modify="handleModifyItem"
              :item-delete="handleDeleteItem"
              :back-data="item"
              :project-data="projectData"
            ></app-config-item>
        </div>
        
      </div>
      <div class="conflict-container">
          <conflict-box :attachment-list="attachmentList" @refresh="handleRefresh"/>
      </div>
    </div>
    

    <div v-if="!setBranchDisabled" class="page-container">
      <div>
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <el-button
          type="primary"
          :disabled="!!!checkBranchs.length"
          @click="markCreateBranch({ ids: checkBranchs, cut: true })"
        >批量标记已打分支</el-button>
        <el-button
          type="primary"
          :disabled="!!!checkBranchs.length"
          @click="markMergeBranch({ ids: checkBranchs, merge: true })"
        >批量标记已合主干</el-button>
      </div>
      <pm-separate size="20" />
      <el-checkbox-group v-model="checkBranchs" @change="handleCheckedBranchChange">
        <app-config-item
          v-for="item in projectAppLinkList"
          :key="item.id || item.uid"
          :app-code-list="allCodeList"
          :item-create="handleCreateItem"
          :item-modify="handleModifyItem"
          :item-delete="handleDeleteItem"
          :back-data="item"
          :project-data="projectData"
        >
          <template v-slot:pre-checkbox>
            <el-checkbox :key="item.id || item.uid" :label="item.id">{{ }}</el-checkbox>
          </template>
          <template v-slot:extra-operate>
            <div class="marks">
              <el-tag
                v-if="item.cutBranch"
                class="tag-mark"
                type="success"
                @click="markCreateBranch({ ids: [item.id], cut: false })"
              >已打分支</el-tag>
              <el-tag
                v-else
                class="tag-mark"
                type="warning"
                @click="markCreateBranch({ ids: [item.id], cut: true })"
              >未打分支</el-tag>
              <el-tag
                v-if="item.mergedTrunk"
                type="success"
                class="tag-mark"
                @click="markMergeBranch({ ids: [item.id], merge: false })"
              >已合主干</el-tag>
              <el-tag
                v-else
                type="warning"
                class="tag-mark"
                @click="markMergeBranch({ ids: [item.id], merge: true })"
              >未合主干</el-tag>
            </div>
          </template>
        </app-config-item>
      </el-checkbox-group>
    </div>
    <generate-branch-dialog :visible.sync="isGenerateVisible" :list="branchUrlLists"/>
    <branch-list-dialog
      :list="branchList"
      :visible="showBranchsModal"
      @hideModal="displayBranchsModal(false)"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import appConfigItem from '@/components/business/project/app-config/app-config-item.vue';
import ConflictBox from '@/components/business/project/app-config/conflict-box.vue';
import GenerateBranchDialog from '@/components/business/project/app-config/generate-branch-dialog.vue';
import BranchListDialog from '@/components/business/project/app-config/branch-list-dialog.vue';
import PmSeparate from '@/components/common/pm-separate';

const { mapActions, mapState, mapMutations, mapGetters } = createNamespacedHelpers('project/app-config');

export default {
  head() {
    return {
      title: '项目-应用设置'
    };
  },
  components: {
    appConfigItem,
    GenerateBranchDialog,
    BranchListDialog,
    PmSeparate,
    ConflictBox
  },
  data() {
    return {
      projectId: this.$route.query.dependenceId,
      isGenerateVisible: false,
      appConfigItemList: [],
      isIndeterminate: false,
      checkBranchs: [], // 选择的分支项
      checkAll: false, // 是否全选
    };
  },
  computed: {
    ...mapState(['allCodeList', 'projectData', 'projectAppLinkList', 'branchUrlLists', 'showBranchsModal', 'attachmentList']),
    ...mapGetters(['branchList']),
    setBranchDisabled() {
      return this.projectAppLinkList && this.projectAppLinkList.length < 1;
    }
  },
  watch: {
    projectAppLinkList(newVal, oldVal) {
      this.isIndeterminate = false;
      this.checkBranchs = [];
      this.checkAll = false;
    }
  },
  mounted() {
    this.getAppCodeList();
    this.getInitPageData();
    this.handleCreateEmptyItem();
    this.handleRefresh();
  },
  methods: {
    ...mapActions([
      'getAppCodeList',
      'getAppLinkQuery',
      'projectAppLinkCreate',
      'projectAppLinkModify',
      'projectAppLinkDelete',
      'markCreateBranch',
      'markMergeBranch',
      'getAttachment'
    ]),
    ...mapMutations(['displayBranchsModal']),
    getInitPageData() {
      this.getAppLinkQuery({
        projectId: this.projectId
      });
    },
    getUniqueId() {
      return new Date().valueOf();
    },
    handleCreateEmptyItem() {
      // 创建空条目，使用uid当做唯一标识
      this.appConfigItemList.unshift({
        uid: this.getUniqueId()
      });
    },
    handleCreateItem(params) {
      const { appCode, branchUrl, workContent } = params;
      return new Promise((resolve, reject) => {
        this.projectAppLinkCreate({
          projectId: this.projectData.id,
          branchUrlType: 'SVN',
          appCode,
          branchUrl,
          workContent
        })
          .then(() => {
            this.getInitPageData();
            resolve();
          })
          .catch(err => {
            this.$showErrorMessage(err);
            reject(err);
          });
      });
    },
    handleModifyItem(params) {
      const { id, appCode, branchUrl, workContent } = params;
      return new Promise((resolve, reject) => {
        this.projectAppLinkModify({
          id,
          projectId: this.projectData.id,
          branchUrlType: 'SVN',
          appCode,
          branchUrl,
          workContent
        })
          .then(() => {
            resolve();
          })
          .catch(err => {
            this.$showErrorMessage(err);
            reject(err);
          });
      });
    },
    handleDeleteItem(params) {
      const { id, uid } = params;
      if (!id) {
        // 说明是创建的空条目，可以直接移除
        const index = this.appConfigItemList.findIndex(
          item => item.uid === uid
        );
        this.appConfigItemList.splice(index, 1);
        return;
      }
      return new Promise((resolve, reject) => {
        this.projectAppLinkDelete({ id })
          .then(() => {
            this.getInitPageData();
            resolve();
          })
          .catch(err => {
            this.$showErrorMessage(err);
            reject(err);
          });
      });
    },
    handleCheckAllChange(val) {
      this.checkBranchs = val
        ? this.projectAppLinkList.map(i => i.id)
        : [];
    },
    handleCheckedBranchChange(value) {
      this.checkBranchs = value;
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.projectAppLinkList.length;
      this.isIndeterminate = (checkedCount > 0)
        && (checkedCount < this.projectAppLinkList.length);
    },
    handleRefresh() {
      this.getAttachment({
        onwerObjectId: this.$route.query.dependenceId,
        ownerObjectType: 'PROJECT_APP_LINK'
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .marks {
    display: inline-block;
    line-height: 46px;
  }
  .tag-mark {
    cursor: pointer;
  }
  .conflict-container {
    background-color: #fff;
    margin: 15px 15px 15px 0;
    width: 400px;
  }
</style>
