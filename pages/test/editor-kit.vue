/*
 * @Description: 测试-新增/编辑套件
 * @Author: moran
 * @Date: 2019-06-25 10:06:06
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 16:27:10
 */
<template>
  <div v-loading="testLoading">
    <pm-bread-crumb :paths="paths" />
    <el-form
      ref="form"
      size="small"
      label-width="100px"
      class="page-container"
      :model="formData"
    >
      <el-form-item
        label="标题"
        prop="title"
        :rules="[{ required: true, message: '请输入标题' }]"
      >
        <el-input
          v-model.trim="formData.title"
          autosize
          type="textarea"
          :maxlength="50"
          :rows="1"
          placeholder="请输入标题，最多50字"
        />
      </el-form-item>
      <el-form-item label="套件描述">
        <div style="height:500px">
          <pm-editor ref="autotext" :value="formData.description" />
        </div>
      </el-form-item>
    </el-form>
    <pm-button-group
      :show-divide="false"
      :buttons="buttons"
      @saveHandle="handleSave"
      @cancelHandle="$PMRouter.push('/test/test-kit')"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmBreadCrumb from '@/components/common/pm-bread-crumb.vue';
import PmEditor from '@/components/common/pm-editor';
import PmButtonGroup from '@/components/common/pm-button-group.vue';

const { mapActions, mapState } = createNamespacedHelpers('test/editor-kit');

export default {
  head() {
    return {
      title: '编辑套件'
    };
  },
  components: {
    PmBreadCrumb,
    PmEditor,
    PmButtonGroup
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
          name: this.$route.query.id ? '编辑套件' : '新增套件'
        }
      ],
      formData: {
        title: '',
        description: ''
      },

      buttons: [
        { label: '取消', textColor: 'primary', func: 'cancelHandle' },
        { label: '保存', type: 'primary', func: 'saveHandle' }
      ]
    };
  },
  computed: {
    ...mapState(['testSuiteModifyDetail', 'testLoading'])
  },
  async created() {
    const formId = this.$route.query.id || '';
    if (formId) {
      // 回填数据
      await this.testSuiteModifyInit({ id: formId });
      const { title, description } = this.testSuiteModifyDetail;
      this.formData = { ...this.formData, title, description };
    }
  },
  methods: {
    ...mapActions([
      'testSuiteCreate',
      'testSuiteModify',
      'testSuiteModifyInit'
    ]),
    handleSave() {
      const formId = this.$route.query.id || '';
      this.$refs.form.validate(valid => {
        if (valid) {
          const { title } = this.formData;
          const description = this.$refs.autotext.getContent();
          if (formId) {
            this.testSuiteModify({ id: formId, title, description }); // 编辑测试单
          } else {
            const { testCaseIdList } = this.$route.query;
            this.testSuiteCreate({ title, description, testCaseIdList }); // 新增测试单
          }
        }
      });
    }
  }
};
</script>
