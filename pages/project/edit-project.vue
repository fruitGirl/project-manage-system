/*
 * @Description: 新增
 * @Author: danding
 * @Date: 2019-06-28 18:03:54
 * @LastModified by: yaochen
 * @Last Modified time: 2019-07-29 18:37:25
 */

<template>
  <div>
    <project-template ref="projectTemplateRef" />
    <pm-button-group
      :show-divide="false"
      :buttons="buttons"
      @onCancel="handleCancel"
      @onSubmit="handleSubmit"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ProjectTemplate from '@/components/business/project/project-template.vue';
import PmButtonGroup from '@/components/common/pm-button-group.vue';
import { buttons } from '@/constants/project/create-project';

const { mapActions, mapState } = createNamespacedHelpers(
  'project/edit-project'
);

export default {
  head() {
    const { projectId } = this.$route.query;
    return {
      title: projectId ? '编辑项目' : '新增项目'
    };
  },
  components: {
    ProjectTemplate,
    PmButtonGroup
  },
  props: {},
  data() {
    return {
      buttons,
      projectId: '',
      isCopy: false
    };
  },
  computed: {
    ...mapState(['form']),
    project() {
      return {};
    }
  },
  watch: {},
  created() {
    this.projectId = this.$route.query.projectId;
    this.isCopy = this.$route.query.isCopy;
    if (this.projectId) {
      this.query(this.projectId);
    }
  },
  methods: {
    ...mapActions([
      'saveProjectMsg',
      'projectModifyInitPageApi',
      'projectModifyApi'
    ]),
    handleCancel() {
      this.$PMRouter.back();
    },
    query(id) {
      this.projectModifyInitPageApi({
        projectId: id
      }).then(() => {
        this.$refs.projectTemplateRef.setValue(this.form);
      });
    },
    handleSubmit() {
      this.$refs.projectTemplateRef.getValue(data => {
        if (this.projectId && !this.isCopy) {
          // this.projectModifyApi({
          //   id: this.projectId,
          //   name: data.name || '',
          //   type: data.type || '',
          //   description: data.description || '',
          //   projectManager: data.projectManager || '',
          //   productManager: data.productManager || '',
          //   testManager: data.testManager || '',
          //   developManager: data.developManager || '',
          //   visitType: data.visitType || '',
          //   gmtEstimateStart: data.gmtEstimateStart || '',
          //   gmtEstimateEnd: data.gmtEstimateEnd || '',
          //   priority: data.priority,
          //   productIds: JSON.stringify(data.productIds)
          // });
          this.projectModifyApi({ ...data, id: this.projectId });
        } else {
          this.saveProjectMsg(data);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
