/*
 * @Description: 默认布局
 * @Author: danding
 * @Date: 2019-11-05 12:33:44
 * @Last Modified by: danding
 * @Last Modified time: 2019-11-05 12:33:44
 */

<template>
  <el-container>
    <el-header>
      <layout-header
        :user-id="userId"
        :config="topMenus"
        :username="username"
        :is-collapse="isCollapse"
        :short-username="shortUsername"
        :selected-top-id="selectedTopId"
        :is-show-collapse-icon="isShowSiderMenus"
        @handleSelect="handleSelect"
        @foldMenu="changeCollapse"
        @logout="handleLogout"
        @refreshRole="handleRefreshRole"
      />
    </el-header>
    <el-container class="content-wrapper">
      <el-aside>
        <layout-aside
          :menus="siderMenus"
          :is-collapse="isCollapse"
          :selected-idx="selectedSiderIdx"
          :is-show-sider-menus="isShowSiderMenus"
          :selected-dependence-id="selectedDependenceId"
          @onSelectMenu="selectSiderMenu"
        >
          <project-picker
            v-show="dependenceType && !isCollapse"
            slot="project-picker"
            :data-provider="dependenceData"
            :selected-id="selectedDependenceId"
            :fixed-opts="fixedOpts"
            @changeDependence="changeDependence"
          />
        </layout-aside>
      </el-aside>
      <el-main>
        <nuxt keep-alive />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {
  createNamespacedHelpers,
  mapActions as rootMapActions,
  mapGetters as rootMapGetters,
  mapMutations as rootMapMutations
} from 'vuex';
import LayoutHeader from '@/components/layout/layout-header.vue';
import LayoutAside from '@/components/layout/layout-aside.vue';
import ProjectPicker from '@/components/layout/project-picker.vue';
import { getUserInfo } from '@/utils/auth';
import {
  TOP_MENU_CONFIG,
  HOME_MENU_ID,
  FIX_TOP_MENU,
  PROJECT_SELECT_TYPE,
  PRODUCT_SELECT_TYPE,
  FIX_PROJECT_OPTS,
  FIX_PRODUCT_OPTS,
  DEPENDENCE_REDIRECT
} from '@/constants/layout';
import { storeRecentDependenceId } from '@/utils/storage';

const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  'layout'
);

export default {
  components: {
    LayoutHeader,
    LayoutAside,
    ProjectPicker
  },
  data() {
    return {
      username: '', // 用户名
      shortUsername: '', // 用户名简写
      dependenceType: '', // 下拉框的类型（产品或项目）
      userId: '', // 登录用户id
    };
  },
  computed: {
    ...mapState([
      'isCollapse', // 是否折叠
      'topMenus', // 顶部菜单
      'selectedTopId', // 选择的顶部菜单值
      'siderMenus', // 侧边栏菜单
      'selectedSiderIdx', // 选择的侧边栏菜单栏索引值
      'isShowSiderMenus', // 是否显示侧边栏菜单
      'selectedDependenceId', // 选择的依赖id
      'dependenceData'
    ]),
    ...rootMapGetters('common-config', ['projectEnums', 'visibleProductEnums']),

    // 侧边栏依赖的下拉框选项
    fixedOpts() {
      // 展示项目操作下拉
      if (this.dependenceType === PROJECT_SELECT_TYPE) {
        return FIX_PROJECT_OPTS;
      } else if (this.dependenceType === PRODUCT_SELECT_TYPE) { // 展示产品操作下拉
        return FIX_PRODUCT_OPTS;
      } else {
        return {};
      }
    }
  },
  watch: {
    // 监听路由变化，处理菜单逻辑
    $route(to, from) {
      const matchFromItem = TOP_MENU_CONFIG.find(i => {
        return from.path.indexOf(i.path) !== -1;
      });
      const matchToItem = TOP_MENU_CONFIG.find(i => {
        return to.path.indexOf(i.path) !== -1;
      });
      const fromTopMenuId = matchFromItem ? matchFromItem.id : HOME_MENU_ID;
      const toTopMenuId = matchToItem ? matchToItem.id : HOME_MENU_ID;
      const fetchSiderMenu = fromTopMenuId !== toTopMenuId;
      this.resolvePathMenu(fetchSiderMenu);
      const { dependenceId } = to.query;

      // 修改依赖的下拉框值
      if (dependenceId && from.query.dependenceId !== dependenceId) {
        this.changeSelectedDependenceId({ payload: dependenceId });
      }

      // 重置上一个页面的state
      // from.path && this.resetModuleState({ moduleName: from.path });
    }
  },
  created() {
    if (process.client) {
      this.storeRootState();
      this.setUserInfo();
      this.getTopMenus();
      this.resolvePathMenu();
    }
  },
  methods: {
    ...rootMapActions('auth', ['handleLogout', 'handleRefreshRole']),
    ...mapActions([
      'getTopMenus',
      'getSiderMenus',
      'changeTopMenuItem'
    ]),
    ...mapMutations([
      'changeCollapse',
      'handleSelectMenu',
      'displaySiderMenus',
      'changeSelectedDependenceId'
    ]),
    ...rootMapMutations(['storeRootState', 'resetModuleState']),
    handleSelect(payload) {
      // 选择顶部菜单栏
      this.resolveMenuInteraction(payload, true);
    },
    setUserInfo() {
      // 设置用户名称
      const { nickName, userId } = getUserInfo();
      this.username = nickName;
      this.userId = userId;
      this.shortUsername = nickName ? nickName.slice(0, 1) : '';
    },
    resolvePathMenu(fetchSiderMenu) {
      // 解析路径的菜单信息
      const matchItem = TOP_MENU_CONFIG.find(i => {
        return window.location.pathname.indexOf(i.path) !== -1;
      });
      const topMenuId = matchItem ? matchItem.id : HOME_MENU_ID;
      this.resolveMenuInteraction(topMenuId, false, fetchSiderMenu);
    },

    /**
     * 处理侧边菜单栏展示、获取侧边栏功能
     * @param { Number | String } topMenuId 顶部菜单栏的主键
     * @param { Boolean } isManualTrigger   是否手动切换顶部菜单
     * @param { Boolean } fetchSiderMenu   是否需要请求侧边栏菜单
     */
    resolveMenuInteraction(topMenuId, isManualTrigger, fetchSiderMenu = true) {
      const selectedMenuPath = isManualTrigger ? '' : window.location.pathname;
      this.handleSelectMenu(selectedMenuPath);

      // 首页
      if (topMenuId === HOME_MENU_ID) {
        this.$router.push(FIX_TOP_MENU.redirect);
        this.displaySiderMenus(false);
        this.changeTopMenuItem(topMenuId);
      } else { // 选择其他顶部菜单模块
        const matchedItem = TOP_MENU_CONFIG.find(i => i.id === topMenuId);
        this.dependenceType = matchedItem.dependence;
        this.displaySiderMenus(true);
        this.changeTopMenuItem(topMenuId);
        fetchSiderMenu && this.getSiderMenus({ topMenuId, isManualTrigger });
      }
    },
    changeDependence(value) {
      // 切换选择框值
      const fixOptRedirect = DEPENDENCE_REDIRECT[value];
      if (fixOptRedirect) {
        // 如果选择了新增/全部选项
        this.$router.push(
          `${fixOptRedirect}?dependenceId=${this.selectedDependenceId}`
        );
      } else {
        const matchedItem = TOP_MENU_CONFIG.find(
          i => i.id === this.selectedTopId
        );
        const { redirect, dependence } = matchedItem;
        this.changeSelectedDependenceId({ payload: value });
        storeRecentDependenceId(dependence, value);
        window.location.href = `${redirect}?dependenceId=${value}`;
      }
    },

    // 选择侧边栏的菜单
    selectSiderMenu(value) {
      const dependenceId = this.selectedDependenceId || this.$route.query.dependenceId;
      this.$PMRouter.push(`${value}?dependenceId=${dependenceId}`);
      this.handleSelectMenu(value);
    }
  }
};
</script>

<style scoped lang="less">
.el-header {
  padding-left: 0;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 2px 4px 0px;
}
.el-aside {
  width: auto !important;
  background: #005999;
}
.el-main {
  position: relative;
  padding: 0;
  background: #f0f2f5;
}
.content-wrapper {
  overflow-y: auto;
}
</style>
