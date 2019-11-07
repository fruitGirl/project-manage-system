/*
 * @Description: 需求详情-关联
 * @Author: moran
 * @Date: 2019-06-21 14:42:35
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 11:04:13
 */

<template>
  <div class="pm-module-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="关联用例" name="a" :lazy="true">
        <el-scrollbar>
          <pm-table
            class="relation-height"
            :data="testCaseList"
            :column="columns"
            :is-pagination="false"
            :is-operation="false"
            :show-header="false"
          >
            <template v-slot:title="{ rowData }">
              <a href="javascript:;"
                class="pm-ellipsis"
                @click="$emit('useDetail', rowData)">
                {{ rowData.title }}
              </a>
            </template>
          </pm-table>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="关联BUG" name="b" :lazy="true">
        <el-scrollbar>
          <pm-table
            class="relation-height"
            :data="bugList"
            :column="bugColumn"
            :is-pagination="false"
            :is-operation="false"
            :show-header="false"
          >
            <template v-slot:title="{ rowData }">
              <a href="javascript:;"
                class="pm-ellipsis"
                @click="$emit('bugDetail', rowData)">
                {{ rowData.title }}
              </a>
            </template>
          </pm-table>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="关联任务" name="c" :lazy="true">
        <el-scrollbar>
          <pm-table
            class="relation-height"
            :data="taskList"
            :column="taskColumn"
            :is-pagination="false"
            :is-operation="false"
            :show-header="false"
          >
            <template v-slot:name="{ rowData }">
              <a href="javascript:;"
                class="pm-ellipsis"
                @click="$emit('taskDetail', rowData.id)">
                {{ rowData.name }}
              </a>
            </template>
          </pm-table>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="关联项目" name="d" :lazy="true">
        <el-scrollbar>
          <pm-table
            class="relation-height"
            :data="projectLists"
            :column="projectColumn"
            :is-pagination="false"
            :is-operation="false"
            :show-header="false"
          >
            <template v-slot:name="{ rowData }">
              <pm-link class="pm-ellipsis" :to="`/project/home?dependenceId=${rowData.id}`">
                <span>{{ rowData.name }}</span>
              </pm-link>
            </template>
          </pm-table>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PmTable from '@/components/common/pm-table.vue';
import {
  CASECOLUMNS,
  BUGCOLUMNS,
  TASKCOLUMNS,
  PROJECTCOLUMNS
} from '@/constants/product/requirement-detail';
const { mapActions, mapState } = createNamespacedHelpers(
  'product/requirement-detail'
);
export default {
  components: {
    PmTable
  },
  props: {
    demandId: {
      type: [String, Number],
      default: ''
    },
    projectLists: {
      type: Array,
      default: () => []
    }
    
  },
  data() {
    return {
      activeName: 'a',
      columns: CASECOLUMNS,
      bugColumn: BUGCOLUMNS,
      taskColumn: TASKCOLUMNS,
      projectColumn: PROJECTCOLUMNS,
      list: [{}]
    };
  },
  computed: {
    ...mapState(['testCaseList', 'bugList', 'taskList'])
  },
  created() {
    this.getDemandRelateCase({ demandId: this.demandId });
  },
  methods: {
    ...mapActions([
      'getDemandRelateCase',
      'getDemandRelateBug',
      'getDemandRelateTask'
    ]),
    handleClick(key) {
      switch (key.name) {
        case 'a':
          this.getDemandRelateCase({ demandId: this.demandId });
          break;
        case 'b':
          this.getDemandRelateBug({ demandId: this.demandId });
          break;
        case 'c':
          this.getDemandRelateTask({ demandId: this.demandId });
          break;
        default:
          break;
      }
      this.$emit('switchTab', key.name);
    }
  }
};
</script>

<style scoped lang="less">
@deep: ~'>>>';
.relation-height {
  height: 185px;
  @{deep}.no-data {
    padding: 20px 0 0 0;
  }
}
</style>
