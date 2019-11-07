<template>
  <div class="tab-tree-container">
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="(tab, index) in tabs"
        :key="index"
        :label="tab.label"
        :name="index + ''"
      >
        <tree-bank
          :ref="tab.value"
          :tree-data="treeData"
          :show-custom-node="false"
          :active-tree-node-id="
            index + '' === activeName ? activeTreeNodeId : ''
          "
          :default-expanded-level="1"
          @current-change="selectHandler"
        ></tree-bank>
      </el-tab-pane>
    </el-tabs>
    <el-button
      v-if="hasOperationButton"
      class="tab-operation-btn"
      size="small"
      type="primary"
      plain
      @click="operationHandle"
      >{{ operationText }}</el-button
    >
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import TreeBank from './index.vue';

const { mapActions } = createNamespacedHelpers('common-config');
export default {
  components: {
    TreeBank
  },
  props: {
    tabs: {
      type: Array,
      default: () => [],
      required: true
    },
    activeTabVal: {
      type: String,
      default: ''
    },
    activeTreeNodeId: {
      type: String,
      default: ''
    },
    hasOperationButton: {
      type: Boolean,
      default: false
    },
    operationText: {
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
      activeName: '0'
    };
  },
  computed: {},
  watch: {
    tabs: {
      handler: function(val) {
        if (val.length) {
          this.$emit('tab-change', this.tabs[this.activeName]);
        }
      },
      immediate: false
    },
    activeName() {
      const isManual = true; // 手动触发
      this.$emit('tab-change', this.tabs[this.activeName], isManual);
    }
  },
  mounted() {
    this.tabs.map((item, index) => {
      if (item.value === this.activeTabVal) {
        this.activeName = index;
      }
    });
  },
  methods: {
    ...mapActions(['getTreeByTypeApi']),
    loadTree(objectType) {
      this.getTreeByTypeApi({
        objectType
      }).then(re => {
        this.$set(this.treeData, objectType, this.formatTree(re));
      });
    },
    selectHandler(data, node) {
      this.$emit('current-change', data, node);
    },
    formatTree(data) {
      return data.docLibList.map(item => {
        item.label = item.name;
        item.children = item.subDobLib.map(child => {
          child.label = child.name;
          return child;
        });
        return item;
      });
    },
    operationHandle() {
      this.$emit('operationClick');
    }
  }
};
</script>

<style lang="less" scoped>
.tab-tree-container {
  display: flex;
  position: relative;
  min-width: 300px;
  min-height: 437px;
  padding-bottom: 55px;
  padding: 15px 15px 20px;
  margin-bottom: 15px;
  background: #fff;
  border-radius: 3px;
  .tab-operation-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
<style lang="less">
.tab-tree-container .el-tabs {
  width: 100%;
}
</style>
