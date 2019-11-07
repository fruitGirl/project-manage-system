<template>
  <div class="conflict-box">
    <span class="title">冲突文档</span>
    <span v-if="isFileLists" style="float: right">
      <pm-upload-file
        ref="uploadRef"
        name="上传"
        :params-fields="paramsFields"
        :show-file-list="false"
        action="/home/attachmentUploadObject"
        @change="handleUploadChange"/>
    </span>
    <pm-operation-file :data="attachmentList" @refresh="$emit('refresh')"/>
    <div v-if="!isFileLists" class="btn-box">
      <pm-upload-file
        ref="uploadRef"
        name="上传"
        :params-fields="paramsFields"
        :show-file-list="false"
        action="/home/attachmentUploadObject"
        @change="handleUploadChange"/>
    </div>
  </div>
</template>

<script>
import PmUploadFile from '@/components/common/pm-upload-file/index.vue';
import PmOperationFile from '@/components/common/pm-operation-file.vue';
export default {
  components: {
    PmUploadFile,
    PmOperationFile
  },
  props: {
    attachmentList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      paramsFields: {
        ownerId: this.$route.query.dependenceId,
        ownerType: 'PROJECT_APP_LINK'
      },
      fileLists: []
    };
  },
  computed: {
    isFileLists() {
      if (this.fileLists.length || this.attachmentList.length) return true;
      return false;
    }
  },
  methods: {
    handleUploadChange(file, fileList) {
      this.fileLists = fileList;
      this.$emit('refresh');
    }
  }
};
</script>

<style lang="less" scoped>
.conflict-box {
  padding: 15px;
  .title {
    font-weight: bolder;
  }
  .btn-box {
    display: flex;
    width: 100%;
    height: 340px;
    align-items: center;
    justify-content: center;
  }
}

</style>