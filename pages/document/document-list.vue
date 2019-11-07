/*
 * @Description: 文档-文档列表
 * @Author: yaochen
 * @Date: 2019-06-26 11:37:40
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 16:50:06
 */
<template>
  <!-- 传入libs（既是tabs树的tab）,传入获取数据接口 -->
  <document-list
    :libs="libs"
    :doc-list="list"
    :pagination="pagination"
    :query-list-func="getdocPageQueryApi"
  ></document-list>
</template>

<script>
import DocumentList from '@/components/business/common/document-list.vue';
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  'document/document-list'
);

export default {
  head: {
    title: '文档列表'
  },
  isKeepAlive: true,
  components: {
    DocumentList
  },
  data() {
    return {
      libs: []
    };
  },
  computed: {
    ...mapState(['libTypes', 'list', 'pagination'])
  },
  activated() {
    // 获取tabs
    this.getLibTypesApi().then(() => {
      this.libs = [];

      // 显示产品和项目模块
      const matchItems = this.libTypes.filter(
        i => (i.value === 'PRODUCT') || (i.value === 'PROJECT')
      );
      if (matchItems.length) {
        this.libs = matchItems;
      }
    });
  },
  methods: {
    ...mapActions(['getLibTypesApi', 'getdocPageQueryApi']),
    ...mapMutations(['mutationList', 'mutationPagination'])
  }
};
</script>
