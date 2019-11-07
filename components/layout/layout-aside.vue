/*
 * @Description: 布局-侧边栏
 * @Author: danding
 * @Date: 2019-06-17 10:58:59
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:15:21
 */

<template>
  <div v-show="isShowSiderMenus" class="aside-container">
    <slot name="project-picker" />
    <el-menu
      :default-active="selectedIdx"
      :collapse="isCollapse"
      class="menu-container"
      background-color="#005999"
      text-color="#83AECD"
      active-text-color="#fff"
      @select="selectMenu"
    >
      <template v-for="item in menus">
        <el-submenu v-if="item.showed" :key="item.id" :index="item.id">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="children in item.children"
            :key="children.id"
            :index="children.path"
          >
            <i v-if="children.imgPath" :class="children.imgPath"></i>
            <span slot="title">{{ children.name }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-for="children in item.children"
          v-else
          :key="children.id"
          :index="children.path"
        >
          <i
            v-if="children.imgPath"
            :style="{
              color:
                selectedIdx === children.path ? '#fff' : 'rgb(131, 174, 205)'
            }"
            :class="children.imgPath"
          />
          <span slot="title">{{ children.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    isCollapse: {
      // 是否折叠菜单栏
      type: Boolean,
      default: false
    },
    menus: {
      // 菜单配置
      type: Array,
      default: () => []
    },
    selectedIdx: {
      // 选择的菜单
      type: String,
      default: ''
    },
    isShowSiderMenus: {
      // 是否显示菜单栏
      type: Boolean,
      default: false
    },
    selectedDependenceId: {
      type: String,
      default: ''
    }
  },
  methods: {
    selectMenu(index) {
      this.$emit('onSelectMenu', index);
    }
  }
};
</script>

<style scoped lang="less">
@deep: ~'>>>';

.aside-container {
  .el-menu {
    width: 210px;
  }
  .menu-container {
    border-right: none;
    background-color: #005999;
  }
  @{deep}.el-menu--collapse {
    width: 64px;
  }
  @{deep}.el-submenu__title {
    padding: 0 10px;
    i {
      color: #83aecd;
    }
    &:hover {
      color: #fff;
      i {
        color: #fff;
      }
    }
  }
  .el-menu-item {
    background: #005999;
    &.is-active {
      background-color: rgb(0, 71, 122) !important;
    }
  }
}
</style>
