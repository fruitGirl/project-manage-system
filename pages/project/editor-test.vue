/*
 * @Description: 新增/编辑测试单
 * @Author: moran
 * @Date: 2019-06-24 09:43:46
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-05 15:54:26
 */
<template>
  <div class="project-add-test">
    <pm-bread-crumb :paths="paths" />
    <div class="main-container">
      <div class="container">
        <div class="left">
          <el-form
            ref="editor"
            size="small"
            label-width="100px"
            :model="editorForm"
            :rules="rules"
          >
            <el-form-item label="标题" prop="name">
              <el-input
                v-model="editorForm.name"
                autosize
                type="textarea"
                :maxlength="50"
                :rows="1"
                placeholder="请输入标题，最多50字"
              />
            </el-form-item>
            <test-form
              ref="testForm"
              :forms="testModifyDetail"
              :project-id="$route.query.dependenceId"
              :is-test-module="false"
            />
            <el-form-item label="测试单描述">
              <div style="height:500px">
                <pm-editor ref="autotext" :value="editorForm.description"/>
              </div>
            </el-form-item>
          </el-form>
          
        </div>
      </div>
      <pm-button-group
        :show-divide="false"
        :buttons="buttons"
        @saveHandle="handleSave"
        @cancelHandle="handleCancel"
      />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmBreadCrumb from '@/components/common/pm-bread-crumb.vue';
import TestForm from '@/components/business/project/editor-test/test-form.vue';
import PmButtonGroup from '@/components/common/pm-button-group';
import PmEditor from '@/components/common/pm-editor';
import { EDITORRULES } from '@/constants/project/editor-test';
const { mapActions, mapState } = createNamespacedHelpers('project/editor-test');

const buttons = [
  { label: '取消', textColor: 'primary', func: 'cancelHandle' },
  { label: '保存', type: 'primary', func: 'saveHandle' }
];
export default {
  head() {
    return {
      title: '编辑测试单'
    };
  },
  components: {
    PmBreadCrumb,
    TestForm,
    PmButtonGroup,
    PmEditor
  },
  data() {
    return {
      buttons: buttons,
      paths: [
        {
          path: '/project/test-sheet-list',
          name: '测试单列表'
        },
        {
          path: '',
          name: this.$route.query.id ? '编辑测试单' : '新增测试单'
        }
      ],
      testDetail: {},
      rules: EDITORRULES,
      editorForm: {
        name: '',
        description: ''
      }
    };
  },
  computed: {
    ...mapState(['testModifyDetail'])
  },
  async created() {
    const formId = this.$route.query.id || '';
    if (formId) {
      await this.testFormModifyInit({ testFormId: formId });
      const { name, description } = this.testModifyDetail;
      Object.assign(this.editorForm, {
        name,
        description
      });
    }
  },
  methods: {
    ...mapActions(['testFormCreate', 'testFormModifyInit', 'testFormModify']),

    // 创建测试单
    handleSave() {
      const formId = this.$route.query.id || '';
      const formData = this.$refs.testForm.getFormData();
      this.$refs.editor.validate(valid => {
        if (valid && formData) {
          const testFormDatas = {
            ...this.editorForm,
          description: this.$refs.autotext.getContent(),
          ...formData
          };
          if (formId && !this.$route.query.copy) {
          this.testFormModify({ ...testFormDatas, id: formId });
          } else {
            this.testFormCreate(testFormDatas);
          }
        }
      });
    },

    // 取消
    handleCancel() {
      this.$PMRouter.push('/project/test-sheet-list');
    }
  }
};
</script>

<style lang="less" scoped>
.project-add-test {
  .main-container {
    padding: 0 20px 20px 20px;
    background-color: #f0f2f5;
    .container {
      background-color: #fff;
      min-width: 1000px;
      .left {
        padding: 20px;
        width: 1000px;
      }
    }
  }
}
</style>
