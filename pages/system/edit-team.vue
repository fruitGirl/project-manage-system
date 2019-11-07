/*
 * @Description: 修改团队
 * @Author: yaochen
 * @Date: 2019-06-18 18:21:14
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 11:28:40
 */
<template>
  <div>
    <!-- 传入teamId和保存接口 -->
    <team
      :team-id="this.$route.query.teamId"
      :save-callback="teamModifyApi"
    ></team>
  </div>
</template>

<script>
import Team from '@/components/business/system/team-manage/team';
import { createNamespacedHelpers } from 'vuex';

const { mapActions: editMapActions } = createNamespacedHelpers(
  'system/edit-team'
);

export default {
  head() {
    return {
      title: '编辑团队'
    };
  },
  components: {
    Team
  },
  methods: {
    ...editMapActions([
      'getTeamByIdApi',
      'teamModifyApi',
      'teamMemberDeleteApi'
    ])
  }
};
</script>

<style lang="less" scoped></style>
