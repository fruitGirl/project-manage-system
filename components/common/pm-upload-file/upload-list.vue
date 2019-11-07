/*
 * @Description: 文件上传编辑列表  暂时不用
 * @Author: xiaojian
 * @Date: 2019-07-03 16:56:03
 * @Last Modified by: xiaojian
 * @Last Modified time: 2019-07-03 16:56:30
 */
<template>
  <transition-group
    tag="ul"
    :class="[
      'el-upload-list',
      'el-upload-list--' + listType,
      { 'is-disabled': disabled }
    ]"
    name="el-list"
  >
    <li
      v-for="file in fileList"
      :key="file.uid"
      :class="['el-upload-list__item', 'is-' + file.status, focusing ? 'focusing' : '']"
      tabindex="0"
      @keydown.delete="!disabled && $emit('remove', file)"
    >
      <slot :file="file">
        <img
          v-if="file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1"
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          alt
        />
        <a class="el-upload-list__item-name" @click="handleClick(file)">
          <i class="el-icon-document"></i>
          <span v-if="file.contentEditable">
            <el-input v-model="file.name" size="mini" :style="{width:'60%'}"></el-input>
            <el-button size="mini" @click="handleCancelEdit(file)">取消</el-button>
            <el-button size="mini" type="primary" @click="handleConfirmEdit(file)">确定</el-button>
          </span>
          <span v-else>{{file.name}}</span>
        </a>
        <label class="el-upload-list__item-status-label">
          <i
            :class="{
            'el-icon-upload-success': true,
            'el-icon-circle-check': listType === 'text',
            'el-icon-check': ['picture-card', 'picture'].indexOf(listType) > -1
          }"
          ></i>
        </label>
        <i v-if="!disabled" class="el-icon-close" @click="handleRemove(file)"></i>
        <i v-if="!disabled" class="el-icon-edit" @click="handleEdit(file)"></i>
        <i v-if="!disabled" class="el-icon-close-tip"></i>
        <!--因为close按钮只在li:focus的时候 display, li blur后就不存在了，所以键盘导航时永远无法 focus到 close按钮上-->
        <el-progress
          v-if="file.status === 'uploading'"
          :type="listType === 'picture-card' ? 'circle' : 'line'"
          :stroke-width="listType === 'picture-card' ? 6 : 2"
          :percentage="parsePercentage(file.percentage)"
        ></el-progress>
        <span v-if="listType === 'picture-card'" class="el-upload-list__item-actions">
          <span
            v-if="handlePreview && listType === 'picture-card'"
            class="el-upload-list__item-preview"
            @click="handlePreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="$emit('remove', file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </slot>
    </li>
  </transition-group>
</template>
<script>
export default {
  props: {
    files: {
      type: Array,
      default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    handlePreview: {
      type: Function,
      default: () => {}
    },
    listType: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {
      focusing: false,
      fileList: []
    };
  },
  watch: {
    files: {
      handler(val) {
        this.fileList = [...val];
      },
      immediate: true
    }
  },
  methods: {
    parsePercentage(val) {
      return parseInt(val, 10);
    },
    handleClick(file) {
      this.handlePreview && this.handlePreview(file);
    },
    getFileItemById(id) {
      return this.fileList.findIndex(item => item.uid === id);
    },
    handleRemove(file) {
      const { uid } = file;
      const index = this.getFileItemById(uid);
      this.fileList.splice(index, 1);
      this.$emit('update:files', this.fileList);
      this.$emit('change', file, this.fileList);
    },
    handleEdit(file) {
      const { uid } = file;
      const index = this.getFileItemById(uid);
      this.$set(this.fileList, index, {
        ...this.fileList[index],
        contentEditable: true
      });
    },
    handleCancelEdit(file) {
      const { uid } = file;
      const index = this.getFileItemById(uid);
      const oldName = this.files[index].name;
      file.contentEditable = false;
      file.name = oldName;
    },
    handleConfirmEdit(file) {
      file.contentEditable = false;
      this.$emit('update:files', this.fileList);
      this.$emit('change', file, this.fileList);
    }
  }
};
</script>
<style lang="less" scoped>
.el-upload-list__item {
  .el-icon-edit {
    display: none;
    position: absolute;
    top: 5px;
    right: 25px;
    cursor: pointer;
    opacity: 0.75;
    color: #606266;
  }
  &:hover {
    .el-icon-edit {
      display: inline-block;
    }
  }
}
</style>

