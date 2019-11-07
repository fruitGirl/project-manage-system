<template>
  <div class="version-container">
    <pm-dialog
      :visible.sync="isVisible"
      :title="!isEdit ? '新增版本' : '编辑版本'"
      :is-loading="confirmLoading"
      @confirm="handleConfirm"
    >
      <el-form
        ref="formRef"
        label-width="4rem"
        :rules="rules"
        :model="formData"
      >
        <el-form-item label="名称:" prop="name">
          <el-input
            v-model="formData.name"
            autosize
            type="textarea"
            placeholder="请输入,最多50字"
            maxlength="50"
          />
        </el-form-item>
        <el-form-item label="类型:" prop="type">
          <el-select
            v-model="formData.type"
            class="version-types"
            placeholder="请选择"
          >
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述:" prop="description">
          <el-input
            v-model="formData.description"
            type="textarea"
            :rows="5"
            placeholder="请输入,最多100字"
            maxlength="100"
          />
        </el-form-item>
      </el-form>
    </pm-dialog>
  </div>
</template>

<script>
import PmDialog from '@/components/common/pm-dialog';
import dialogMixin from '@/mixins/dialog-mixin';
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('project/version-list');
export default {
  components: {
    PmDialog
  },
  mixins: [dialogMixin],
  props: {
    version: {
      type: [Object, Boolean],
      default: () => ({}),
      required: true
    },
    projectId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      types: [
        {
          label: '主干',
          value: 'TRUNK'
        },
        {
          label: '分支',
          value: 'BRANCH'
        }
      ],
      formData: {
        name: '',
        type: 'BRANCH',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入,最多50字' }],
        type: [{ required: true, message: '请选择类型' }],
        description: [{ required: true, message: '请输入描述' }]
      },
      confirmLoading: false
    };
  },
  computed: {
    isEdit() {
      return !!this.version;
    }
  },
  watch: {
    isVisible(val) {
      if (val && this.version) {
        this.formData = { ...this.version, type: this.version.type.name };
      } else if (val) {
        this.resetForm();
      }
      if (this.$refs.formRef) {
        this.$nextTick(() => {
          this.$refs.formRef.clearValidate();
        });
      }
    }
  },
  methods: {
    ...mapActions(['projectVersionCreateApi', 'projectVersionModifyApi']),
    handleConfirm() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          const { name, type, description, id } = this.formData;
          const params = {
            name,
            type,
            description,
            projectId: this.projectId
          };
          this.confirmLoading = true;
          if (!this.isEdit) {
            this.resultHandler(
              this.projectVersionCreateApi({
                ...params
              })
            );
          } else {
            this.resultHandler(
              this.projectVersionModifyApi({
                ...params,
                id
              })
            );
            // 修改
          }
        }
      });
    },

    resultHandler(result) {
      result
        .then(() => {
          this.confirmLoading = false;
          this.$emit('confirm');
          this.closeDialog();
        })
        .catch(err => {
          this.confirmLoading = false;
          this.$showErrorMessage(err);
        });
    },
    resetForm() {
      this.formData.name = '';
      this.formData.type = 'BRANCH';
      this.formData.description = '';
    }
  }
};
</script>

<style lang="less" scoped>
.version-container .pm-dialog .el-form {
  width: 300px;
  margin: auto;
}
.version-types {
  width: 100%;
}
</style>
