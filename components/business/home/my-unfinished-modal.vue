/*
 * @Description: 头部-我的未完成事项弹窗
 * @Author: moran 
 * @Date: 2019-10-24 11:13:25 
 * @Last Modified by: moran
 * @Last Modified time: 2019-11-04 10:46:21
 */

 <template>
    <pm-dialog
      class="my-unfinish-modal"
      :visible.sync="isVisible"
      :title="title"
      :is-cancel-btn="false"
      @confirm="handleConfirm"
      @cancel="handleConfirm"
    >
      <ul
      class="infinite-list pm-scrollbar"
      style="overflow:auto; height: 205px">
      <li v-for="(item, index) in lists" :key="index" class="infinite-list-item">
        <span class="left">{{ item.name }}</span>
        <pm-link :to="intoPath(item.id)" class="right pm-ellipsis">{{ item.title }}</pm-link>
      </li>
    </ul>
    </pm-dialog>
 </template>

 <script>
  import PmDialog from '@/components/common/pm-dialog.vue';
  export default {
    components: {
      PmDialog
    },
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: ''
      },
      lists: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        loading: false,
        isVisible: false,
      };
    },
    watch: {
      show(val) {
        this.isVisible = val;
      },
      isVisible(val) {
        this.$emit('update:show', val);
      }
    },
    methods: {
      intoPath(id) {
        switch(this.type) {
          case 'DEMAND':
            return `/product/requirement-list?dependenceId=${id}`;
          case 'TASK':
            return `/project/task-list-query?dependenceId=${id}`;
          case 'BUG':
            return `/project/bug-list?dependenceId=${id}`;
          case 'TEST_FORM':
            return `/project/test-sheet-list?dependenceId=${id}`;
          default:
            return '';
        }
      },
      handleConfirm() {
        this.$emit('update:show', false);
      }
    }
  };
 </script>

 <style lang="less" scoped>
 @deep: ~'>>>';
 .my-unfinish-modal {
  .infinite-list-item {
    display: flex;
    margin-bottom: 10px;
    .left {
      width: 200px;
    }
    .right {
      flex: 1;
      cursor: pointer;
    }
  }
   
 }
 </style>
