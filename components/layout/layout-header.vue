/*
 * @Description: 布局-头部导航栏
 * @Author: danding
 * @Date: 2019-06-17 10:59:12
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-31 11:15:45
 */

<template>
  <div class="header-container">
    <div class="asider-left">
      <a
        href="/"
        :class="[
          'aside-top',
          isCollapse || !isShowCollapseIcon ? 'collapse-left-aside' : ''
        ]"
      >
        <img
          class="logo-img"
          src="@/assets/common/logo_sm.png"
          alt="向鑫logo"
        />
        <img
          v-show="!isCollapse"
          class="logo-img-text"
          src="@/assets/common/logo_text.png"
          alt="向鑫logo"
        />
      </a>
      <span v-show="isShowCollapseIcon" class="collapse-wrapper">
        <i
          :class="[
            'el-icon-s-unfold menu-fold-icon',
            isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
          ]"
          @click="foldMenu"
        />
      </span>
      <div>
        <el-menu
          :default-active="selectedTopId"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="item in config"
            :key="item.value"
            :index="item.value"
            >{{ item.label }}</el-menu-item
          >
        </el-menu>
      </div>
    </div>
    <div>
      <el-dropdown @command="handleCommand">
        <div>
          <!-- <img class="user-avatar" :src="`/user/userLogoQuery.resource?userId=${userId}`" alt=""> -->
          <span class="login-user">{{ shortUsername }}</span>
          <span>{{ username }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">
            <a
              :style="{
                color: '#606266',
                textDecoration: 'none'
              }"
              href="javascript:;"
              >退出</a
            >
          </el-dropdown-item>
          <el-dropdown-item command="refresh-role">
            <a
              :style="{
                color: '#606266',
                textDecoration: 'none'
              }"
              href="javascript:;"
              >刷新权限</a
            >
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeIndex: {
      // 当前选择的菜单索引值
      type: String,
      default: '1'
    },
    isCollapse: {
      // 是否折叠
      type: Boolean,
      default: true
    },
    config: {
      // 菜单配置项
      type: Array,
      default: () => []
    },
    selectedTopId: {
      // 选中的菜单
      type: String,
      default: ''
    },
    isShowCollapseIcon: {
      // 是否显示收缩icon
      type: Boolean,
      default: true
    },
    username: {
      type: String,
      default: ''
    },
    shortUsername: {
      type: String,
      default: ''
    },
    userId: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 选择菜单栏
    handleSelect(payload) {
      this.$emit('handleSelect', payload);
    },
    foldMenu() {
      // 折叠菜单栏
      this.$emit('foldMenu', !this.isCollapse);
    },
    handleCommand(command) {
      if (command === 'logout') {
        // 登出
        this.$emit('logout');
      } else if (command === 'refresh-role') {
        this.$emit('refreshRole');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .aside-top {
    width: 210px;
    height: 60px;
    line-height: 60px;
    background: #fff;
    padding: 0 11px;
    &.collapse-left-aside {
      width: auto;
    }
  }
  .asider-left {
    display: flex;
    align-items: center;
  }
  .logo-img {
    vertical-align: middle;
  }
  .logo-img-text {
    vertical-align: middle;
    margin-left: 10px;
  }
  .logo-name {
    color: #005999;
    font-size: 18px;
    margin: 0 5px;
    vertical-align: middle;
  }
  .collapse-wrapper {
    padding-right: 20px;
    font-size: 0;
  }
  .login-user {
    display: inline-block;
    width: 30px;
    height: 30px;
    color: #fff;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    margin-right: 5px;
    background-color: rgb(95, 204, 214);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px 0px;
  }
  .user-avatar {
    display: inline-block;
    width: 30px;
    height: 30px;
    color: #fff;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    margin-right: 5px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px 0px;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .logout {
    color: #606266;
  }
  .menu-fold {
    margin-left: 8px;
  }
  .menu-unfold {
    margin-left: 0px;
  }
  .menu-fold-icon {
    color: #83aecd;
    font-size: 19px;
    vertical-align: middle;
    cursor: pointer;
  }
}
</style>
