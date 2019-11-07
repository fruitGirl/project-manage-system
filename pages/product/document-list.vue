/*
 * @Description: 产品-文档列表
 * @Author: yaochen
 * @Date: 2019-06-26 11:37:17
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 12:15:23
 */
<template>
  <document-list
    :libs="libs"
    :doc-list="list"
    :in-project-or-product="true"
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
    title: '文档'
  },
  isKeepAlive: true, // 缓存页面
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
  created() {
    this.getLibTypesApi().then(() => {
      const matchItem = this.libTypes.find(i => i.value === 'PRODUCT');
      if (matchItem) {
        this.libs = [matchItem];
      }
    });
  },
  beforeDestroy() {
    this.mutationList({ payload: [] });
    this.mutationPagination({
      payload: {
        page: 0,
        pages: 1,
        itemsPerPage: 10,
        items: 0
      }
    });
  },
  methods: {
    ...mapActions(['getLibTypesApi', 'getdocPageQueryApi']),
    ...mapMutations(['mutationList', 'mutationPagination'])
  }
};
</script>
