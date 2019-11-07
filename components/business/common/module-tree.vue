/*
 * @Description: 模块树
 * @Author: danding
 * @Date: 2019-06-20 09:35:51
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-05 12:25:04
 */

<template>
  <div class="module-tree module-container">
    <div class="module-top">
      <div class="pm-clearfix">
        <span class="pm-left title pm-ellipsis">
          {{ selectedNode.label }}
        </span>
        <el-checkbox
          v-model="needSubModule"
          class="pm-right"
          @change="handleShowDemand"
          >显示子模块需求</el-checkbox
        >
      </div>
      <pm-separate size="16" />
      <el-input
        v-model="filterText"
        size="mini"
        placeholder="请输入"
        suffix-icon="el-icon-search"
      >
      </el-input>
    </div>
    
    <pm-separate size="16" />
    <div class="tree-box">
      <div class="tree-left">
        <el-tree
          v-if="isShow"
          ref="tree"
          class="filter-tree"
          :check-on-click-node="true"
          :data="config"
          :highlight-current="true"
          :props="defaultProps"
          :filter-node-method="filterNode"
          node-key="isProduct"
          :default-expanded-keys="expandData"
          :current-node-key="selectedNode.value"
          @node-click="onSelect"
        >
        </el-tree>
        <div v-else class="tree-no-data no-data">暂无数据</div>
      </div>
      <div class="tree-right" @click="$emit('pickUp')">
        <div class="triangle-bottom-right"></div>
        <div class="pack-up">
          <div>收</div>
          <div>起</div>
        </div>
        <div class="triangle-top-right"></div>
      </div>

    </div>
    
    
    <pm-separate size="36" />
    <div class="pm-center footer">
      <el-button size="mini" type="primary" plain @click="goModuleManage"
        >维护模块</el-button
      >
    </div>
  </div>
</template>

<script>
import PmSeparate from '@/components/common/pm-separate';

export default {
  components: {
    PmSeparate
  },
  props: {
    config: {
      // 模块树配置
      type: Array,
      default: () => []
    },
    name: {
      type: [String, Number],
      default: ''
    },
    expandData: {
      type: Array,
      default: () => []
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      filterText: '',
      defaultProps: {
        children: 'subModuleInfo',
        label: 'name'
      },
      selectedNode: {
        label: this.name,
        value: this.$route.query.dependenceId,
        productId: this.$route.query.dependenceId,
        isProduct: true
      },
      needSubModule: true
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    name(val) {
      this.selectedNode = {
        label: this.name,
        value: this.$route.query.dependenceId,
        productId: this.$route.query.dependenceId,
        isProduct: true
      };
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    onSelect(obj) {
      // 选中节点
      this.selectedNode = {
        label: obj.name,
        value: obj.id,
        isProduct: obj.isProduct ? obj.isProduct : undefined,
        productId: obj.isProduct ? obj.id : obj.productId
      };
      const params = {
        moduleId: obj.isProduct ? undefined : obj.id,
        productId: obj.isProduct ? obj.id : obj.productId,
        needSubModule: this.needSubModule
      };
      this.$emit('handleSelect', params);
    },
    goModuleManage() {
      // 维护模块
      this.$emit('goModuleManage');
    },
    handleShowDemand() {
      const { isProduct, productId } = this.selectedNode;
      const params = {
        moduleId: isProduct ? undefined : this.selectedNode.value,
        productId,
        needSubModule: this.needSubModule
      };
      this.$emit('handleSelect', params);
    }
  }
};
</script>

<style scoped lang="less">
@deep: ~'>>>';
.module-container {
  background-color: #fff;
  padding: 15px 0 20px 0;
}
.module-tree {
  position: relative;
  min-width: 300px;
  min-height: 437px;
  padding-bottom: 55px;
  .module-top {
    padding: 0 15px;
  }
  .tree-no-data {
    text-align: center;
    width: 250px;
    margin-top: 68px;
  }
  @{deep}.el-tree-node__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .title {
    font-weight: bold;
    width: 100px;
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: 20px;
    width: 100%;
  }
  .tree-box {
    .tree-left{
      float: left;
      padding-left: 15px;
    }
    .tree-right {
      float: right;
      margin-top: 80px;
      cursor: pointer;
    }
    .pack-up {
      padding: 20px 0;
      width: 27px;
      text-align: center;
      font-size: 12px;
      color: #409EFF;
      background-color: #ecf5ff;
    }
    .triangle-bottom-right{
      width: 0;
      height: 0;
      border-bottom: 8px solid #ecf5ff;
      border-left: 27px solid transparent;
    }
    .triangle-top-right {
      width: 0;
      height: 0;
      border-top: 8px solid #ecf5ff;
      border-left: 27px solid transparent; 
    }
  }
}
</style>
