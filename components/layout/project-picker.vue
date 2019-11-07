/*
 * @Description: 布局-侧边栏下拉框选择
 * @Author: danding
 * @Date: 2019-06-17 10:59:46
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:15:42
 */

<template>
  <div class="project-opt">
    <div class="select-wrapper">
      <el-select
        ref="elSelectRef"
        :value="selectedId"
        popper-class="select-component-wrapper"
        placeholder="请选择"
        size="mini"
        filterable
        class="select-content"
        :filter-method="filterOpt"
        @change="changeDependence"
        @visible-change="visibleChange"
      >
        <div class="pm-scrollbar group-wrapper">
          <el-option-group
            v-for="group in options"
            :key="group.label"
            :label="group.label"
          >
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :class="item.className"
                :value="item.value"
              >
                <el-tooltip
                  v-if="item.label && (item.label.length > 20)"
                  :content="item.label"
                  placement="right-start"
                >
                  <div class="pm-ellipsis">{{ item.label }}</div>
                </el-tooltip>
              </el-option>
          </el-option-group>
        </div>
        <el-option-group
          :key="fixedOpts.id"
        >
          <el-option
            v-for="item in fixedOpts.options"
            :key="item.value"
            :label="item.label"
            :class="item.className"
            :value="item.value"
          />
        </el-option-group>
      </el-select>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-arrow-down"
        @click="displaySelect"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataProvider: {
      // 下拉框数据
      type: Array,
      default: () => []
    },
    selectedId: {
      // 选择的值
      type: [Number, String],
      default: null
    },
    fixedOpts: { // 固定在底部的下拉选项（新增/全部）
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      visible: false, // 下拉框是否显示
      options: []
    };
  },
  watch: {
    dataProvider: {
      handler(newVal, oldVal) {
        this.options = newVal;
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    filterOpt(val) {
      // 过滤下拉值
      let filterOpts = [];
      let fixedOpts = {};
      this.dataProvider.forEach(i => {
        if (i.isScroll) {
          filterOpts = i.options.filter(j => {
            return j.label.indexOf(val) !== -1;
          });
        } else {
          fixedOpts = i;
        }
      });
      this.options = [
        {
          id: 1,
          isScroll: true,
          options: filterOpts
        },
        fixedOpts
      ];
    },
    displaySelect() {
      // 是否显示下拉框
      const elSelectRef = this.$refs.elSelectRef;
      if (this.visible) {
        elSelectRef.blur();
        this.visible = false;
      } else {
        elSelectRef.focus();
        this.visible = true;
      }
    },
    changeDependence(val) {
      // 选择值
      this.$emit('changeDependence', val);
    },
    visibleChange(val) {
      this.options = this.dataProvider;
    }
  }
};
</script>

<style lang="less">
.select-component-wrapper {
  max-width: 305px;
  .group-wrapper {
    max-height: 450px;
    padding-bottom: 8px;
    overflow-y: auto;
  }
  .el-select-group__wrap:not(:last-of-type)::after {
    background-color: transparent;
  }
  .el-select-dropdown__wrap {
    max-height: 100%;
  }
}
</style>

<style lang="less" scoped>
@deep: ~'>>>';

.project-opt {
  .selected-project {
    padding: 10px;
    text-align: center;
    background-color: #005999;
  }
  .project-name {
    padding-right: 5px;
    color: #fff;
  }
  .switch {
    color: #409eff;
    font-size: 12px;
    cursor: pointer;
  }
  .select-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 20px 10px 15px;
    @{deep} .el-input__inner {
      padding-right: 15px;
      background-color: #80b4da;
      border: 1px solid #80b4da;
      color: #084686;
    }
    @{deep} input::-webkit-input-placeholder {
      color: #fff;
    }
    @{deep} .el-button--mini {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      text-align: center;
      font-size: 16px;
    }
    @{deep} .el-input__suffix {
      display: none;
    }
  }
  .select-content {
    width: 136px;
  }
}
@{deep} .el-select-group__title {
  font-size: 15px;
  font-weight: bold;
  color: #005999;
  border-bottom: 1px solid #ebeef5
}
.active {
  color: #409eff;
}
</style>
