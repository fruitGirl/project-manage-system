/*
 * @Description: 主页头部组件
 * @Author: moran
 * @Date: 2019-06-18 12:19:06
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 10:48:48
 */

<template>
  <div class="home-header">
    <div class="left">
      <div class="nick-name">{{ shortName }}</div>
    </div>

    <div class="right">
      <div v-for="(item, index) in userHomeLists" :key="index" class="task-box" >
        <div :class="`task-left ${item.type ? 'cursor-point' : ''}`" @click="handleListsShow(item)">
          <span class="task-font">{{ item.mount }}</span>
          <p class="task-distance">{{ item.name }}</p>
        </div>
        <div v-if="item.delayMount" class="task-right">
          <div class="task-tip">已延期:{{ item.delayMount }}</div>
        </div>
      </div>
    </div>
    {{showItem.id}}
    <MyUnfinishedModal :show.sync="isVisible" :title="showItem.name" :lists="simpleInfos" :type="showItem.type"/>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import MyUnfinishedModal from '@/components/business/home/my-unfinished-modal.vue';
const { mapActions, mapState } = createNamespacedHelpers('home');
export default {
  components: {
    MyUnfinishedModal
  },
  data() {
    return {
      showItem: {},
      isVisible: false
    };
  },
  computed: {
    ...mapState(['userHomeLists', 'userName', 'simpleInfos']),
    shortName() {
      return this.userName.slice(0, 5);
    },
  },
  created() {
    this.getUserHomePage();
  },
  methods: {
    ...mapActions(['getUserHomePage', 'getUserHomePageSimpleInfo']),
    handleListsShow(item) {
      const { type } = item;
      this.showItem = item;
      if (type) {
        this.isVisible = true;
        this.getUserHomePageSimpleInfo({ type });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.home-header {
  width: 100%;
  height: 129px;
  background: linear-gradient(79deg, @purple1, @blue5, @blue6);
  border-radius: 3px;
  display: flex;
  .left {
    position: relative;
    width: 250px;
    .nick-name {
      width: 114px;
      height: 114px;
      background-color: @orange1;
      border-radius: 50%;
      position: absolute;
      left: 74px;
      top: -30px;
      color: @white;
      line-height: 114px;
      text-align: center;
      font-weight: bold;
      font-size: 18px;
    }
  }
  .right {
    flex: 1;
    color: @white;
    font-size: 12px;
    display: flex;
    align-items: center;
    .task-box {
      min-width: 140px;
      text-align: center;
      .task-left {
        padding: 0 0 0 20px;
        text-align: center;
        float: left;
        .task-font {
          font-size: 20px;
        }
        .task-distance {
          margin-top: 11px;
        }
      }
      .task-right {
        float: left;
        margin-top: -5px;
        .task-tip {
          height: 22px;
          padding: 0 5px;
          border: solid 1px @white;
          border-radius: 3px;
          font-size: 12px;
        }
      }
    }
    .cursor-point {
      cursor: pointer;
    }
  }
}
</style>
