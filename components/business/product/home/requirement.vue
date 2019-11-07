/*
 * @Description: 产品-首页-需求块
 * @Author: xiaojian
 * @Date: 2019-06-17 14:46:07
 * @Last Modified by: moran
 * @Last Modified time: 2019-10-30 18:26:51
 */
<template>
  <section class="card-section">
    <div class="section-header">
      <h2 class="title">需求</h2>
      <a @click="setReqDrawer({ payload: true })">
        <span class="extra"> <i class="el-icon-plus"></i> 提需求 </span>
      </a>
    </div>
    <div v-if="data.length > 0" class="content">
      <pm-wave-chart :value="percent" label="剩余需求"></pm-wave-chart>
      <div class="info-content">
        <p
          v-for="(item, index) in formatedLists"
          :key="index"
          class="info-item">
          {{item.message}}: {{item.num}}
        </p>
      </div>
    </div>
    <div v-else class="content">
      <pm-no-data />
    </div>
    <edit-requirement
      title="提需求"
      :visible="showReqDrawer"
      :product-id="productId"
      :forms="{ attchmentList: [], title: '' }"
      @onCancel="setReqDrawer({ payload: false })"
      @onSubmit="handleDemandSubmit"
    />
  </section>
</template>
<script>
import PmWaveChart from '@/components/common/pm-wave-chart';
import EditRequirement from '@/components/business/common/requirement-list/edit-requirement.vue';
import PmNoData from '@/components/common/pm-no-data';
import { PROCESSING, WAITING } from "@/constants/product/home";
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  'product/home'
);
export default {
  components: {
    PmWaveChart,
    PmNoData,
    EditRequirement
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      productId: '',
    };
  },
  computed: {
    ...mapState(['showReqDrawer']),
    percent() {
      const data = this.formatValue(this.data);
      const total = data[0].num;
      const waiting = data.filter(i => i.name === WAITING)[0].num;
      const processing = data.filter(i => i.name === PROCESSING)[0].num;
      if (total === 0) return 0;
      return Number((((waiting + processing) / total) * 100).toFixed(0));
    },
    formatedLists() {
      return this.formatValue(this.data);
    }
  },
  created() {
    this.productId = this.$route.query.dependenceId;
  },
  methods: {
    ...mapActions(['createDemand']),
    ...mapMutations(['setReqDrawer']),
    formatValue(data) {
      let total = 0;
      const demandLists = JSON.parse(JSON.stringify(data));
      data.forEach(i => {
        total += i.num;
      });
      demandLists.unshift({ message: "总需求", num: total });
      return demandLists;
    },
    // 编辑需求以及提需求
    handleDemandSubmit(params) {
      // 提需求
      this.createDemand(params);
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  display: flex;
  .info-content {
    width: 200px;
    margin-left: 30px;
  }
  .info-item {
    margin-bottom: 20px;
  }
}
</style>

<style lang="less">
.card-section .content .pm-data-blank {
  width: 100%;
}
</style>
