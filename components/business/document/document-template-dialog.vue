/*
 * @Description: 文档-文档列表-文档(新增、修改)
 * @Author: yaochen
 * @Date: 2019-06-24 15:23:31
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 14:53:13
 */
<template>
  <div class="doc-container">
    <pm-dialog
      :visible.sync="isVisible"
      :title="operation === 'add' ? '新增文档' : '编辑文档'"
      width="700px"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <el-form
        ref="docForm"
        :model="form"
        :rules="rules"
        class="doc-template-form"
        label-width="6rem"
      >
        <el-form-item label="文档标题:" prop="docTitle">
          <el-input
            v-model="form.docTitle"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入，最多50字"
          ></el-input>
        </el-form-item>
        <el-form-item label="文档库:" prop="docLibId">
          <el-popover
            ref="docPopover"
            placement="bottom"
            popper-class="doc-tree-pop"
            width="400"
            trigger="click"
          >
            <tree-bank
              ref="docTree"
              :tree-data="treeData"
              :show-custom-node="false"
              @current-change="selectHandler"
            ></tree-bank>
            <el-input
              slot="reference"
              ref="docTreeSelect"
              :value="form.label"
              :label="form.label"
              placeholder="请选择"
            ></el-input>
          </el-popover>
        </el-form-item>
        <el-form-item label="文档摘要:">
          <el-input
            v-model="form.docAbstract"
            type="textarea"
            placeholder="请文档摘要，最多300字"
            maxlength="300"
            show-word-limit
            :autosize="{minRows: 4}"
          ></el-input>
        </el-form-item>
        <el-form-item label="附件:">
          <pm-upload-file
            :file-list="form.fileList"
            @change="fileChangeHandler"
          />
        </el-form-item>
        <el-form-item label="可见性:">
          <el-radio-group v-model="form.visibleness">
            <el-radio label="PUBLIC">公开</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </pm-dialog>
  </div>
</template>

<script>
import PmDialog from '@/components/common/pm-dialog.vue';
import PmUploadFile from '@/components/common/pm-upload-file';
import TreeBank from '@/components/business/common/tree-bank';
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState } = createNamespacedHelpers(
  'document/document-list'
);

export default {
  components: {
    PmDialog,
    TreeBank,
    PmUploadFile
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      require: true
    },
    initValue: {
      type: Object,
      default: () => ({
        value: '',
        label: ''
      })
    },
    defaultDoc: { // 默认文档
      type: Object,
      default: () => {}
    },
    docId: {
      type: String,
      default: ''
    },
    treeData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isVisible: false,
      form: {
        docTitle: '',
        docLibId: '',
        label: '',
        docAbstract: '',
        visibleness: 'PUBLIC',
        fileList: []
      },
      rules: {
        docTitle: [
          { required: true, message: '请输入文档标题', trigger: 'blur' }
        ],
        docLibId: [
          { required: true, message: '请选择文档库', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapState(['editDocInfo']),
    operation() {
      return this.docId ? 'edit' : 'add';
    }
  },
  watch: {
    show(val) {
      this.isVisible = val;
      if (val && this.docId) {
        this.docModifyInitApi({
          id: this.docId
        }).then(() => {
          this.form.docLibId = this.editDocInfo.docLibId;
          this.form.label = this.editDocInfo.docLibName;
          this.$nextTick(() => {
            this.$refs.docForm.clearValidate();
          });
        });
      }
    },
    isVisible(val) {
      if (val && this.$refs.docForm) {
        this.$refs.docForm.clearValidate();
      }
      this.$emit('update:show', val);
    },
    defaultDoc(val) {
      const { label, docLibId } = val;
      this.form.label = label;
      this.form.docLibId = docLibId;
    },
    editDocInfo(val) {
      if (val) {
        this.form.id = val.id;
        this.form.docTitle = val.title;
        this.form.docAbstract = val.brief;
        this.form.visibleness = val.visitType;
        if (val.attachmentList.length) {
          this.form.fileList = val.attachmentList.map(item => {
            item.name = item.fileName;
            return item;
          });
        }
      }
    }
  },
  methods: {
    ...mapActions(['docCreateApi', 'docModifyInitApi', 'docModifyApi']),
    fileChangeHandler(file, fileList) {
      this.form.fileList = fileList;
    },
    handleConfirm() {
      this.$refs.docForm.validate(valid => {
        if (valid) {
          if (this.operation === 'edit') {
            this.editDoc();
          } else if (this.operation === 'add') {
            this.createDoc();
          }
        }
      });
    },
    createDoc() {
      const { form } = this;
      const fileNameList = form.fileList
            .map(item => {
              return item.response.fileName;
            })
            .join() || undefined;
      this.successHandler(
        this.docCreateApi({
          docLibId: form.docLibId,
          title: form.docTitle,
          brief: form.docAbstract,
          visitType: form.visibleness,
          type: 'TEXT',
          fileNameList
        })
      );
    },
    editDoc() {
      const { form } = this;
      const fileNameList = form.fileList
            .filter(item => item.response)
            .map(item => {
              return item.response.fileName;
            })
            .join() || undefined;
      this.successHandler(
        this.docModifyApi({
          id: form.id,
          title: form.docTitle,
          docLibId: form.docLibId,
          brief: form.docAbstract,
          visitType: form.visibleness,
          fileNameList
        })
      );
    },
    successHandler(result) {
      result
        .then(() => {
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.isVisible = false;
          this.$emit('confirm', this.form);
          this.resetForm();
        })
        .catch(err => {
          this.$showErrorMessage(err);
        });
    },
    selectHandler(data, node) {
      this.form.docLibId = data.id;
      this.form.label = data.name;
      this.$refs.docTreeSelect.blur();
      this.$refs.docPopover.doClose();
    },
    resetForm() {
      this.form = {
        id: '',
        docTitle: '',
        docLibId: this.defaultDoc.docLibId,
        label: this.defaultDoc.label,
        docAbstract: '',
        visibleness: 'PUBLIC',
        fileList: []
      };
    },
    handleCancel() {
      this.resetForm();
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';

.doc-template-form {
  @{deep} .el-select {
    width: 100%;
  }
}
</style>
<style lang="less">
.doc-lib-option.el-select-dropdown__item {
  height: 240px;
  background: white;
  overflow-y: scroll;
}
.doc-tree-pop {
  width: 400px;
  .el-tree {
    width: 100%;
    height: 400px;
    overflow: auto;
  }
}
</style>
