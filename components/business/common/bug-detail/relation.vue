/*
 * @Description: bug详情-关联
 * @Author: danding
 * @Date: 2019-06-21 14:42:35
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 11:25:29
 */

<template>
  <div class="pm-module-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="关联用例" name="a">
        <div v-if="testCase.id" class="flex-container">
          <pm-link to="/">
            <span>{{ testCase.title }}</span>
          </pm-link>
        </div>
        <div v-else class="no-data">暂无数据</div>
      </el-tab-pane>
      <el-tab-pane label="关联需求" name="b">
        <div v-if="demand.id" class="flex-container">
          <span>{{ demand.id }}</span>
          <a href="javascript:;"
            class="pm-ellipsis"
            @click="$emit('demand', demand.id)">
            {{ demand.title }}
          </a>
          <span>{{ demand.status && demand.status.message }}</span>
        </div>
        <div v-else class="no-data">暂无数据</div>
      </el-tab-pane>
      <el-tab-pane label="关联任务" name="c">
        <div v-if="task.id" class="flex-container">
          <span>{{ task.id }}</span>
           <a href="javascript:;"
            class="pm-ellipsis"
            @click="$emit('task', task.id)">
            {{ task.name }}
          </a>
        </div>
        <div v-else class="no-data">暂无数据</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import pmLink from '@/components/common/pm-link';

const { mapState } = createNamespacedHelpers('project/bug-detail');

export default {
  components: {
    pmLink
  },
  data() {
    return {
      activeName: 'a'
    };
  },
  computed: {
    ...mapState(['demand', 'testCase', 'task'])
  },
  methods: {
    handleClick(key) {
      this.$emit('switchTab', key.name);
    }
  }
};
</script>
<style lang="less" scoped>
.flex-container {
  display: flex;
  justify-content: space-around;
}
</style>
