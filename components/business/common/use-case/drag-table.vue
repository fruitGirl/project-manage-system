<template>
  <div v-if="showTable">
    <el-table
      :data="tableList"
      border
      default-expand-all
      class="drag-table"
      row-key="key"
      align="left"
      :tree-props="{ children: 'testCaseStepList' }"
    >
      >
      <el-table-column prop="number" label="编号" width="90px">
        <template slot-scope="scope">
          <span v-if="scope.row.isChild">
            {{ scope.row.number }}
          </span>
          <span v-else :style="{ paddingLeft: '8px' }">
            {{ scope.row.number }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="stepDescribe" label="步骤">
        <template slot-scope="scope">
          <div :draggable="false" class="pm-clearfix">
            <div :style="{ width: '120px' }" class="pm-left">
              <el-input
                v-model="scope.row.stepDescribe"
                maxlength="1000"
                autosize
                type="textarea"
              />
            </div>
            <el-checkbox
              v-if="!scope.row.isChild"
              :value="scope.row.hasChild"
              class="pm-right"
              @change="displayChild(scope.row)"
              >分组</el-checkbox
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column draggable="false" prop="expectedResult" label="预期结果">
        <template slot-scope="scope" :draggable="false">
          <el-input
            v-model="scope.row.expectedResult"
            draggable="false"
            autosize
            type="textarea"
          />
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="操作">
        <template slot-scope="scope">
          <i class="el-icon-plus operate-icon" @click="handleAdd(scope.row)" />
          <i
            class="el-icon-minus operate-icon"
            @click="handleRemove(scope.row)"
          />
          <i
            class="el-icon-rank operate-icon J-drag-el"
            :data-is-child="scope.row.isChild"
            :data-parent-key="scope.row.parentKey"
            :data-key="scope.row.key"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import cloneDeep from 'lodash.clonedeep';
import {
  changeSortNumber,
  createParentCase
} from '@/constants/test/use-case-list';
import { post } from '@/utils/request';
import services from '@/services/test/use-case-list';

const Sortable = process.client ? require('sortablejs').default : null;

export default {
  props: {
    initialTableList: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      draggedMsg: null, // 拖拽的对象信息
      relatedMsg: null, // 替换的对象信息
      showTable: true, // 是否显示表格
      tableList: [] // 表格数据
    };
  },

  watch: {
    showTable(newVal) {
      // 解决拖拽节点未更新问题
      newVal &&
        this.$nextTick(() => {
          this.rowDrop();
        });
    },

    initialTableList(newVal) {
      this.tableList = newVal;
    },

    tableList: {
      handler(newVal) {
        if (!newVal.length) {
          this.tableList = createParentCase(3);
        }
      },
      immediate: true
    }
  },

  mounted() {
    // 阻止默认行为
    document.body.ondrop = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };
    this.rowDrop();
  },

  methods: {
    // 行拖拽
    rowDrop() {
      const _self = this;
      const tbody = document.querySelector(
        '.drag-table .el-table__body-wrapper tbody'
      );

      Sortable.create(tbody, {
        handle: '.J-drag-el',
        onMove(evt) {
          // 拖拽的对象
          let dragged = evt.dragged.getElementsByClassName('J-drag-el');
          dragged = dragged ? dragged[0] : null;

          // 替换的对象
          let related = evt.related.getElementsByClassName('J-drag-el');
          related = related ? related[0] : null;

          if (!dragged || !related) return false;

          const isDragChild = dragged.getAttribute('data-is-child');
          const dragParentKey = dragged.getAttribute('data-parent-key');
          const dragKey = dragged.getAttribute('data-key');

          const isRelateChild = related.getAttribute('data-is-child');
          const relateParentKey = related.getAttribute('data-parent-key');
          const relateKey = related.getAttribute('data-key');

          // 移动父元素或者同一父元素下的子元素
          if (
            isDragChild === isRelateChild &&
            dragParentKey === relateParentKey
          ) {
            _self.draggedMsg = {
              isChild: isDragChild,
              parentKey: dragParentKey,
              key: dragKey
            };
            _self.relatedMsg = {
              isChild: isRelateChild,
              parentKey: relateParentKey,
              key: relateKey
            };
            return true;
          }

          return false; // 停止拖拽
        },

        onSort() {
          // 拖拽排序
          const { draggedMsg, relatedMsg } = _self;
          const tableList = cloneDeep(_self.tableList);
          if (draggedMsg.isChild) {
            // 如果是拖拽子元素
            const matchIdx = tableList.findIndex(
              i => i.key === draggedMsg.parentKey
            );
            const parentList = tableList[matchIdx].testCaseStepList;
            const matchDragIdx = parentList.findIndex(
              i => i.key === draggedMsg.key
            );
            const matchRelateIdx = parentList.findIndex(
              i => i.key === relatedMsg.key
            );
            const dragItem = parentList.splice(matchDragIdx, 1)[0];
            parentList.splice(matchRelateIdx, 0, dragItem);

            tableList[matchIdx] = {
              ...tableList[matchIdx],
              testCaseStepList: parentList
            };
          } else {
            // 拖拽父元素
            const matchDragIdx = tableList.findIndex(
              i => i.key === draggedMsg.key
            );
            const matchRelateIdx = tableList.findIndex(
              i => i.key === relatedMsg.key
            );
            const dragItem = tableList.splice(matchDragIdx, 1)[0];
            tableList.splice(matchRelateIdx, 0, dragItem);
          }
          _self.tableList = _self.changeSortNumber(tableList);

          // 强制更新表格节点
          _self.showTable = false;
          _self.$nextTick(() => {
            _self.showTable = true;
          });
        }
      });
    },

    displayChild(row) {
      // 选择分组
      const { hasChild, key, number } = row;
      const matchIdx = this.tableList.findIndex(i => i.key === key);
      if (hasChild) {
        // 取消分组
        const { testCaseStepList } = this.tableList[matchIdx];
        let testCaseIdList = [];
        if (testCaseStepList) {
          testCaseIdList = testCaseStepList.filter(i => i.testCaseId);
          testCaseIdList = testCaseIdList.map(i => i.testCaseId);
        }
        this.removeCaseStep(testCaseIdList);
        delete this.tableList[matchIdx].testCaseStepList;
      } else {
        // 选中分组
        const parentKey = this.tableList[matchIdx].key;
        const testCaseStepList = [
          {
            key: parentKey + '-' + 1,
            number: number + '-' + '1',
            parentKey: parentKey,
            isChild: true,
            stepDescribe: '',
            expectedResult: ''
          }
        ];
        this.$set(
          this.tableList[matchIdx],
          'testCaseStepList',
          testCaseStepList
        );
      }
      this.$set(this.tableList[matchIdx], 'hasChild', !hasChild);
    },

    handleAdd(row) {
      // 新增
      const { isChild, parentKey } = row;
      isChild ? this.addChildNode(parentKey) : this.addParentNode();
    },

    addParentNode() {
      // 新增父节点
      const length = this.tableList.length;
      const testCase = {
        key: Date.now() + '_parent',
        number: length + 1 + '',
        stepDescribe: '',
        hasChild: false,
        expectedResult: ''
      };
      this.$set(this.tableList, length, testCase);
    },

    addChildNode(parentKey) {
      // 新增子节点
      const matchIdx = this.tableList.findIndex(i => i.key === parentKey);
      const { testCaseStepList, number, key } = this.tableList[matchIdx];
      const testCaseStep = {
        key: Date.now() + '_child',
        number: number + '-' + (testCaseStepList.length + 1),
        parentKey: key,
        isChild: true,
        stepDescribe: '',
        expectedResult: ''
      };
      this.$set(
        this.tableList[matchIdx].testCaseStepList,
        testCaseStepList.length,
        testCaseStep
      );
    },

    changeSortNumber, // 排序

    handleRemove(row) {
      // 删除
      const { isChild, parentKey, key } = row;
      const { tableList } = this;
      if (isChild) {
        // 删除子节点
        const matchParentIdx = tableList.findIndex(i => i.key === parentKey);
        const { testCaseStepList } = tableList[matchParentIdx];
        const matchChildIdx = testCaseStepList.findIndex(j => j.key === key);
        const { id } = testCaseStepList[matchChildIdx];
        id && this.removeCaseStep([id]);
        testCaseStepList.splice(matchChildIdx, 1);
        this.tableList = this.changeSortNumber(tableList);
      } else {
        // 删除父节点
        const matchIdx = tableList.findIndex(i => i.key === key);
        const { id, testCaseStepList } = tableList[matchIdx];
        let testCaseIdList = [];
        if (id && testCaseStepList) {
          testCaseIdList = testCaseStepList.map(i => i.id);
        }
        id && testCaseIdList.push(id);
        this.removeCaseStep(testCaseIdList);
        tableList.splice(matchIdx, 1);
        this.tableList = this.changeSortNumber(tableList);
      }
    },

    // 调用接口删除
    async removeCaseStep(ids) {
      if (ids && ids.length) {
        try {
          await post(services.REMOVE_CASE_STEP_URL, { ids });
        } catch (err) {
          this.$showErrorMessage(err);
        }
      }
    },

    getData() {
      return changeSortNumber(this.tableList);
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';

.drag-table {
  .operate-icon {
    display: inline-block;
    padding: 3px;
    margin-right: 2px;
    border: 1px solid #dcdfe6;
    color: #dcdfe6;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    &:hover {
      border-color: #cacfda;
    }
  }
  @{deep} .el-textarea__inner {
    border: none;
    resize: none;
  }
  @{deep} .el-table__expand-icon,
  @{deep} .el-table__expand-icon--expanded {
    display: none;
  }
}
</style>
