<template>
  <el-select
    v-model="currentValue"
    class="filterable-select"
    :multiple="multiple"
    filterable
    remote
    :placeholder="placeholder"
    :remote-method="remoteMethod"
    :loading="loading"
    @change="onChangeHandle"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
import { get } from '@/utils/request';
import { tansData } from '@/utils/common';
export default {
  model: {
    prop: 'value', // 绑定的值，通过父组件传递
    event: 'change' // 自定义事件名
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    optionList: {
      type: Array,
      default: () => []
    },
    filterFunction: {
      // 过滤函数
      type: Function,
      default: (list, query) => {
        return list.filter(item => {
          return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
      }
    },
    action: {
      type: String,
      default: ''
    },
    value: {
      // 初始内容值
      type: [String, Number, Array],
      default: ''
    }
  },
  data() {
    return {
      options: [],
      loading: false,
      list: [],
      states: [],
      currentValue: ''
    };
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = val;
      },
      immediate: true
    },
    optionList: {
      handler(val) {
        this.list = val;
        this.options = this.list;
      },
      immediate: true
    }
  },
  async created() {
    try {
      if (this.action) {
        const data = await get(this.action);
        this.list = tansData(data.userIdAndNickNameMap, true);
        this.options = this.list;
      }
    } catch (error) {
      this.$showErrorMessage(error);
    }
  },
  methods: {
    onChangeHandle(data) {
      this.$emit('change', data);
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.options = this.filterFunction(this.list, query);
        this.loading = false;
      } else {
        this.options = [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';

.filterable-select {
  width: 100%;
  @{deep} .el-input {
    &::after {
      font-family: element-icons !important;
      content: '\e778';
      width: 25px;
      height: 32px;
      position: absolute;
      right: 4px;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ccc;
    }
  }
}
</style>
