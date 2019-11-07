<template>
  <span>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <div class="batch-option">
          批量操作<i class="el-icon-caret-bottom" style="margin-left: 10px"></i>
        </div>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1" :disabled="!isSelect"
          >批量执行</el-dropdown-item
        >
        <el-dropdown-item command="2" :disabled="!isSelect"
          >批量取消关联</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <el-cascader
      v-if="isModule"
      v-model="moduleArr"
      clearable
      filterable
      class="cascader"
      size="small"
      :options="productByModuleTree"
      placeholder="请选择模块名称"
      :props="{
        children: 'subModuleInfo',
        label: 'name',
        value: 'id',
        checkStrictly: true
      }"
      @change="handleCascaderChange"
    ></el-cascader>
  </span>
</template>

<script>
import {
  createNamespacedHelpers,
  mapMutations as rootMapMutations
} from 'vuex';
const { mapActions, mapState } = createNamespacedHelpers('common-config');
export default {
  props: {
    isModule: {
      type: Boolean,
      default: true
    },
    isSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isVisible: false,
      productId: this.$route.query.productId
        ? this.$route.query.productId
        : this.$route.query.dependenceId,
      moduleArr: []
    };
  },
  computed: {
    ...mapState(['productByModuleTree'])
  },
  created() {
    this.getProductByModuleTree({ productId: this.productId });
  },
  methods: {
    ...mapActions(['getProductByModuleTree']),
    ...rootMapMutations('test/test-sheet-detail', ['displayExecuteDialog']),
    handleCascaderChange() {
      const len = this.moduleArr.length;
      const moduleId = len >= 1 ? this.moduleArr[len - 1] : undefined;
      this.$emit('change', { moduleId });
    },
    handleCommand(command) {
      if (command === '1') {
        this.$emit('batchExecute');
      }
      if (command === '2') {
        this.$confirm('确认批量取消关联？', '操作提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$emit('cancleRelate');
          })
          .catch(() => {
            // this.$message({
            //   type: 'info',
            //   message: '已取消删除'
            // });
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.batch-option {
  border: solid 1px #dcdfe6;
  height: 32px;
  display: inline-block;
  line-height: 27px;
  margin: 0 10px;
  padding: 0 10px;
  border-radius: 3px;
}
.cascader.el-cascader {
  width: 180px;
}
</style>
