/*
 * @Description: 文件列表-下载删除
 * @Author: moran 
 * @Date: 2019-11-06 16:37:46 
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-06 17:01:30
 */
<template>
  <div class="operation-file-container">
    <template v-if="lists.length">
      <p
      v-for="(item, index) in lists"
      :key="index"
      :class="`file-list ${item.isHover ? 'operation-hover' : ''}`"
      @mouseenter="handleMouseenter(item)"
      @mouseleave="handleMouseleave(item)">
        <span class="el-icon-link"></span>
        <a
          target="_blank"
          :href="
            `${baseUrl}/attachment.resource?resourceId=${item.resourceId}&fileName=${item.fileName}`
          "
          :download="item.fileName"
          >{{ item.fileName }}</a
        >
        <span v-if="item.isHover" class="el-icon-close close" @click="handleRemoveFile(item.id)"></span>
      </p>
    </template>
    
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('common-config');
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data() {
    return {
      baseUrl: process.env.baseUrl,
      lists: []
    };
  },
  watch: {
    data(val) {
      this.lists = JSON.parse(JSON.stringify(val));
    }
  },
  methods: {
    ...mapActions(['deleteFile']),
    setProperty(val) {
      const data = this.lists.map(res => {
        if (res.id !== val.id) {
          this.$set(res, 'isHover', false);
        }
        return res;
      });
      return data;
    },
    handleMouseenter(val) {
      this.lists = this.setProperty(val);
      val.isHover = true;
    },
    handleMouseleave(val) {
      val.isHover = false;
    },
    async handleRemoveFile(id) {
      await this.deleteFile({ id });
      this.$emit('refresh');
    }
  }
};
</script>

<style lang="less" scoped>
.operation-file-container {
  margin-top: 30px;
  .file-list {
    padding: 3px 5px;
  }
  .no-accessory {
    padding-left: 15px;
  }
  .operation-hover {
    background-color: #F5F7FA;
  }
  .close{
    float: right;
    margin-top: 5px;
    cursor: pointer;
  }
}
</style>
