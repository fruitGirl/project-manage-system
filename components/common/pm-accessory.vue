<template>
  <div class="accessory-container">
    <pm-info-title title="附件" :is-blue-line="isBlueLine"/>
    <template v-if="data.length">
      <p v-for="(accessory, index) in data" :key="index">
        <a
          target="_blank"
          :href="
            `${baseUrl}/attachment.resource?resourceId=${accessory.resourceId}&fileName=${accessory.fileName}`
          "
          :download="accessory.fileName"
          >{{ accessory.fileName }}</a
        >
      </p>
    </template>
    <div v-else class="no-accessory">无</div>
    
  </div>
</template>

<script>
import PmInfoTitle from '@/components/common/pm-info-title';
export default {
  components: {
    PmInfoTitle
  },
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    isBlueLine: { // 是否需要标题的蓝色竖线
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      baseUrl: process.env.baseUrl
    };
  }
};
</script>

<style lang="less" scoped>
.accessory-container {
  margin-top: 15px;
  .no-accessory {
    padding-left: 15px;
  }
}
</style>
