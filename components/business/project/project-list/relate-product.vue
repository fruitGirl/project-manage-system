<template>
  <div class="relat-product-wrapper">
    <el-checkbox-group v-model="selectedKeys">
      <el-row :gutter="16" type="flex" class="checkbox-wrapper">
        <el-col
          v-for="product in products"
          :key="product.id"
          :span="8"
          class="item-wrapper"
        >
          <div class="item-content">
            <el-checkbox :label="product.id">{{ product.name }}</el-checkbox>
          </div>
        </el-col>
      </el-row>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => []
    },
    defaultSelectedKeys: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedKeys: []
    };
  },
  watch: {
    defaultSelectedKeys(newVal, oldVal) {
      this.selectedKeys = newVal;
    }
  },
  methods: {
    getSelectedKeys() {
      return this.selectedKeys;
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';

.relat-product-wrapper {
  padding: 16px;
  .item-wrapper {
    margin-bottom: 16px;
  }
  .item-content {
    height: 100%;
    padding: 11px 18px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .checkbox-wrapper {
    flex-wrap: wrap;
  }

  @{deep} .el-checkbox {
    width: 100%;
    display: flex;
    align-items: center;
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    word-break: break-all;
  }
}
</style>
