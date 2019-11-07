/*
 * @Description: 主页数据产品项目展示组件
 * @Author: moran
 * @Date: 2019-06-18 12:25:33
 * @Last Modified by: moran
 * @Last Modified time: 2019-08-29 10:05:00
 */

<template>
  <div class="home-project-box">
    <div class="project-left">
      <div class="left-son">
        <p class="title">{{ itemTitle }}</p>
        <el-scrollbar>
          <template v-if="lists.length > 0">
            <div
              v-for="item in lists"
              :key="item.value"
              class="lists"
              @click="handleItemClick(item)"
              @mouseenter="handleMouseenter(item)"
              @mouseleave="handleMouseleave(item)"
            >
              <div :class="`select-box ${item.isSelect ? '' : 'hide'}`">
                <span class="select-item"></span>
              </div>
              <div class="show-name">{{ item.label }}</div>

              <div
                v-show="item.isHover"
                class="item-hover el-icon-arrow-right"
                @click="handleEnterPage(item)"
              ></div>
            </div>
          </template>
          <div v-else class="no-data"></div>
        </el-scrollbar>
      </div>
    </div>

    <div class="project-right">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in needLists"
          :key="`${index}${item.label}`"
          :label="item.label"
          :name="item.name || item.title"
          :lazy="true"
        >
          <template v-if="item.showLists.length > 0">
            <el-scrollbar>
              <div style="height: 300px">
                <div v-for="v in item.showLists" :key="v.id" class="show-lists">
                  <div @click="handleJump(v.id)">{{ v.name || v.title }}</div>
                </div>
              </div>
            </el-scrollbar>
          </template>
          <div v-else>
            <pm-no-data />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import PmNoData from '@/components/common/pm-no-data.vue';
export default {
  components: {
    PmNoData
  },
  props: {
    itemTitle: {
      type: String,
      default: '参与项目'
    },
    lists: {
      type: Array,
      default: () => []
    },
    needLists: {
      type: Array,
      default: () => []
    },
    type: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      activeName: this.type === 1 ? 'first' : 'unDemand'
    };
  },
  methods: {
    transData(isVal, val) {
      this.$emit('changeLists', isVal, val);
    },
    handleItemClick(val) {
      val.isSelect = true;
      this.transData('isSelect', val);
      this.$emit('itemClick', val);
    },

    // 鼠标移入
    handleMouseenter(val) {
      this.transData('isHover', val);
      val.isHover = true;
    },

    // 鼠标移出
    handleMouseleave(val) {
      val.isHover = false;
    },
    handleEnterPage(item) {
      this.$emit('enter', item);
      if (this.type === 1) {
        this.$router.push(`/project/home?dependenceId=${item.value}`);
        return;
      }
      if (this.type === 2) {
        this.$router.push(`/product/home?dependenceId=${item.value}`);
      }
    },
    handleClick() {
      this.$emit('tabClick', this.activeName, this.type);
    },
    handleJump(id) {
      this.$emit('jumpClick', this.activeName, id);
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
@deep: ~'>>>';
.home-project-box {
  background-color: @white;
  margin-top: 15px;
  height: 389px;
  box-shadow: 0px 3px 16px 0px rgba(0, 30, 75, 0.11);
  border-radius: 3px;
  padding: 0px 15px 0px 0;
  display: flex;
  font-size: 14px;
  .title {
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    margin-bottom: 12px;
  }
  .hide {
    visibility: hidden;
  }
  .lists {
    color: @gray4;
    height: 34px;
    line-height: 34px;
    margin-top: 5px;
    padding-left: 15px;

    .show-name {
      width: 150px;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &:hover {
      cursor: pointer;
      background-color: @gray5;
    }
    .select-box {
      width: 14px;
      float: left;
    }
    .select-item {
      height: 20px;
      margin-top: 7px;
      width: 4px;
      background-color: @blue2;
      float: left;
    }
    .item-hover {
      width: 35px;
      text-align: center;
      background-color: @gray6;
      float: right;
      height: 34px;
      line-height: 34px;
      color: @blue2;
    }
  }
  .show-lists {
    height: 34px;
    width: 515px;
    line-height: 34px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }

  .project-left {
    width: 260px;

    padding-right: 25px;
    @{deep}.el-scrollbar__wrap {
      width: 255px;
      height: 330px;
      padding-bottom: 20px;
      overflow-x: hidden;
      // overflow-y: hidden
    }
    @{deep}.el-scrollbar__thumb {
      padding-right: 10px;
      background-color: #ededed;
    }
    .left-son {
      background-color: #fafafa;
      // padding-top: 15px;
      padding: 15px 0 9px 0;
    }
    .no-data {
      padding: 0 15px;
    }
  }
  @{deep}.el-scrollbar__bar.is-horizontal {
    display: none;
  }

  .project-right {
    flex: 1;
  }
  @{deep}.el-tabs__nav-wrap::after {
    display: none;
  }
  @{deep}.el-tabs__item {
    color: #929292;
  }
  @{deep} .el-tabs__item.is-active {
    color: #409eff;
  }
}
</style>
