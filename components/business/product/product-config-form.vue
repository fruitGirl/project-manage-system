/*
 * @Description: 产品-新增产品 或者 编辑产品
 * @Author: xiaojian
 * @Date: 2019-06-18 15:53:19
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-22 17:58:39
 */
<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="100px"
    class="product-config-form"
  >
    <el-form-item label="产品名称" prop="name">
      <el-input
        v-model="form.name"
        autosize
        type="textarea"
        placeholder="请输入，最多50字"
        maxlength="50"
      />
      <span v-if="form.status && form.status.name" :class="`status-on ${form.status.name === 'RUN' ? 'green': 'red'}`">{{
        form.status.message
      }}</span>
    </el-form-item>
    <el-form-item label="产品负责人" prop="productManager">
      <pm-remote-search
        v-model="form.productManager"
        :action="searchUrl"
        field-text="userList"
        :default-option="productManagerDefault"
        :parse-structure="handleFormatSearch"
      ></pm-remote-search>
    </el-form-item>
    <el-form-item label="开发负责人" prop="developManager">
      <pm-remote-search
        v-model="form.developManager"
        :action="searchUrl"
        field-text="userList"
        :default-option="developManagerDefault"
        :parse-structure="handleFormatSearch"
      ></pm-remote-search>
    </el-form-item>
    <el-form-item label="测试负责人" prop="testManager">
      <pm-remote-search
        v-model="form.testManager"
        :action="searchUrl"
        field-text="userList"
        :default-option="testManagerDefault"
        :parse-structure="handleFormatSearch"
      ></pm-remote-search>
    </el-form-item>
    <el-form-item label="产品描述" prop="description">
      <el-input
        v-model="form.description"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="请输入内容,最多300字"
        maxlength="300"
      ></el-input>
    </el-form-item>

    <el-form-item label="访问权限" prop="visitType">
      <el-radio-group v-model="form.visitType">
        <el-radio label="PUBLIC">全部可见 (有产品视图权限，即可访问)</el-radio>
        <el-radio label="PRIVATE"
          >成员可见 (只有产品相关负责人和关联的项目团队成员才能访问)</el-radio
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <slot name="extraBtn"></slot>
      <pm-link :to="backPath">
        <el-button type="default" native-type="button" class="btn"
          >返回</el-button
        >
      </pm-link>
      <el-button
        type="primary"
        class="btn"
        :loading="submitLoading"
        @click="submitForm('form')"
        >确定</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import pmLink from '@/components/common/pm-link.vue';
import pmRemoteSearch from '@/components/common/pm-remote-search.vue';
import { ALL_USER_URL } from '@/services/common-config';

export default {
  components: {
    pmLink,
    pmRemoteSearch
  },
  props: {
    // 是否是编辑产品
    isEdit: {
      type: Boolean,
      default: false
    },
    /// 回填数据  编辑的时候才有
    formData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    submit: {
      type: Function,
      default: params => {}
    }
  },
  data() {
    return {
      searchUrl: ALL_USER_URL,
      form: {
        name: '',
        productManager: '',
        developManager: '',
        testManager: '',
        description: '',
        visitType: 'PUBLIC',
        id: '',
        status: {}
      },
      testManagerDefault: [],
      productManagerDefault: [],
      developManagerDefault: [],
      rules: {
        name: [{ required: true, message: '请输入产品名称' }],
        productManager: [{ required: true, message: '请输入产品负责人' }]
      },
      submitLoading: false,
      backPath: '/product/product-list-query'
    };
  },
  computed: {},
  watch: {
    formData(val) {
      if (val) {
        const {
          visitType,
          userBaseInfos,
          productManager,
          developManager,
          testManager
        } = val;
        this.form = { ...val, visitType: visitType.name };
        this.productManagerDefault = productManager
          ? userBaseInfos
          : [];

        this.developManagerDefault = developManager
          ? userBaseInfos
          : [];

        this.testManagerDefault = testManager
          ? userBaseInfos
          : [];
      }
    }
  },
  methods: {
    handleFormatSearch(data, fieldText) {
      const list = data[fieldText];
      return list.map(item => {
        return {
          label: item.nickName,
          value: item.userId
        };
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          const finalData = { ...this.form };
          if (!this.isEdit) {
            delete finalData.id;
          }
          this.submit({
            ...finalData
          })
            .then(() => {
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.submitLoading = false;
            })
            .catch(err => {
              this.submitLoading = false;
              this.$showErrorMessage(err);
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.product-config-form {
  padding-top: 20px;
  background: #fff;
  .el-select {
    width: 100%;
  }
  .btn {
    margin-left: 10px;
  }
  .status-on {
    display: inline-block;
    padding: 5px 5px;
    line-height: 1;
    color: #fff;
    border-radius: 3px;

  }
  .green {
    background: #58c07f;
  }
  .red {
    background: #ff3838;
  }
}
</style>

<style lang="less">
.product-config-form .el-form-item {
  .el-input,
  .el-textarea {
    width: 700px;
  }
}
</style>
