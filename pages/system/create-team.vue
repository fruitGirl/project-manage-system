/*
 * @Description: 创建团队
 * @Author: yaochen
 * @Date: 2019-06-18 18:20:49
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 11:28:33
 */
<template>
  <div>
    <!-- 传入保存接口 -->
    <team :save-callback="createTeamApi"></team>
  </div>
</template>

<script>
import Team from '@/components/business/system/team-manage/team';
import { createNamespacedHelpers } from 'vuex';

const { mapActions: createMapActions } = createNamespacedHelpers(
  'system/create-team'
);
export default {
  head() {
    return {
      title: '创建团队'
    };
  },
  components: {
    Team
  },
  methods: {
    ...createMapActions(['createTeamApi'])
  }
};
</script>

<style lang="less" scoped></style>
