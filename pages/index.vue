/*
 * @Description: 主页
 * @Author: moran
 * @Date: 2019-06-18 12:22:59
 * @LastModified by: moran
 * @Last Modified time: 2019-07-29 11:20:00
 */

<template>
  <div class="home-container">
    <div class="home">
      <home-header></home-header>
      <div class="container">
        <div class="container-left">
          <project-box
            :lists="projects"
            :need-lists="itemTabLists"
            @changeLists="handeChangeProject"
            @itemClick="handleProjectClick"
            @tabClick="handleTabClick"
            @jumpClick="handleJumpClick"
          >
          </project-box>
          <project-box
            item-title="参与产品"
            :lists="products"
            :need-lists="productTabLists"
            :type="2"
            @changeLists="handeChangeProduct"
            @itemClick="handleProductClick"
            @tabClick="handleTabClick"
            @jumpClick="handleJumpClick"
          >
          </project-box>
        </div>
        <div class="container-right">
          <ring-chart
            :status="productStatus"
            :chart-data="productStatus"
            name="所有产品"
            :count="countParams.productCount"
          >
            <pm-link to="/product/product-list-query">所有产品</pm-link>
          </ring-chart>
          <ring-chart
            id="itemRing"
            title="项目统计"
            :status="projectStatus"
            :chart-data="projectStatus"
            name="所有项目"
            :count="countParams.projectCount"
          >
            <pm-link to="/project/project-list">所有项目</pm-link>
          </ring-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import HomeHeader from '@/components/business/home/header.vue';
import ProjectBox from '@/components/business/home/project-box.vue';
import RingChart from '@/components/business/home/ring-chart.vue';

const { mapActions, mapGetters, mapState } = createNamespacedHelpers('home');

export default {
  middleware: 'authenticated',
  head() {
    return {
      title: '首页'
    };
  },
  components: {
    HomeHeader,
    ProjectBox,
    RingChart
  },
  data() {
    return {
      products: [],
      productId: '',
      projectId: '',
      activeName: '',
      productActiveName: '',
      projects: []
    };
  },
  computed: {
    ...mapGetters(['productEnums', 'projectEnums']),
    ...mapState([
      'taskLists',
      'itemTabLists',
      'productTabLists',
      'productStatus',
      'countParams',
      'projectStatus'
    ])
  },
  async created() {
    await this.getProducts();
    await this.getProjects();

    // 产品/项目数据源转换 加默认第一个选中
    this.products = this.addProperty(this.productEnums);
    this.projects = this.addProperty(this.projectEnums);
    if (this.projects.length > 0) {
      this.projectId = this.projects[0].value;
      await this.getTaskQueryByProjectId({ projectId: this.projectId });
    }
    if (this.products.length > 0) {
      this.productId = this.products[0].value;
      await this.getMyWattingDemand({ productId: this.productId });
    }

    // 产品/项目统计
    await this.getProductProjectStatusNum();
  },
  methods: {
    ...mapActions([
      'getTaskQueryByProjectId',
      'getBugQueryByProjectId',
      'getTestFormQueryByProjectId',
      'getMyWattingDemand',
      'getUnassignedDemand',
      'getProductProjectStatusNum',
      'getProducts',
      'getProjects'
    ]),
    // 添加默认属性 isSelect， isHover
    addProperty(item) {
      const data = item.map(res => {
        return { isSelect: false, isHover: false, ...res };
      });
      if (data.length > 0) data[0].isSelect = true;
      return data;
    },

    // 设置属性
    setProperty(item, isVal, val) {
      const data = item.map(res => {
        if (res.value !== val.value) {
          this.$set(res, isVal, false);
        }
        return res;
      });
      return data;
    },

    handeChangeProduct(isVal, val) {
      this.products = this.setProperty(this.products, isVal, val);
    },
    handeChangeProject(isVal, val) {
      this.projects = this.setProperty(this.projects, isVal, val);
    },

    // 项目list点击 联动
    handleProjectClick(val) {
      this.projectId = val.value;
      this.handleTabClick(this.activeName || 'first', 1);
    },

    // 产品list点击 联动
    handleProductClick(val) {
      this.productId = val.value;
      this.handleTabClick(this.productActiveName || 'unDemand', 2);
    },
    handleTabClick(activeName, type) {
      if (type === 1) this.activeName = activeName; // 项目
      if (type === 2) this.productActiveName = activeName; // 产品
      switch (activeName) {
        case 'first': // 我的任务
          if (this.projectId)
            this.getTaskQueryByProjectId({ projectId: this.projectId });
          break;
        case 'second': // BUG
          if (this.projectId)
            this.getBugQueryByProjectId({ projectId: this.projectId });
          break;
        case 'third': // 测试单
          if (this.projectId)
            this.getTestFormQueryByProjectId({ projectId: this.projectId });
          break;
        case 'unDemand': // 待处理需求
          if (this.productId)
            this.getMyWattingDemand({ productId: this.productId });
          break;
        case 'unAssign': // 未指派需求
          if (this.productId)
            this.getUnassignedDemand({ productId: this.productId });
          break;
        default:
          break;
      }
    },

    handleJumpClick(activeName) {
      switch (activeName) {
        case 'first': // 我的任务
          this.$router.push(`/project/task-list-query?dependenceId=${this.projectId}`);
          break;
        case 'second': // BUG
          this.$router.push(`/project/bug-list?dependenceId=${this.projectId}`);
          break;
        case 'third': // 测试单
          this.$router.push(`/project/test-sheet-list?dependenceId=${this.projectId}`);
          break;
        default: // 未指派需求和已指派需求
          this.$router.push(`/product/requirement-list?dependenceId=${this.productId}`);
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  margin: -20px 0;
  padding: 20px 0;
  background: #eaf7ff;
}
.home {
  width: 1200px;
  margin: 47px auto 0;
  .container-left {
    width: 795px;
    float: left;
  }
  .container-right {
    width: 390px;
    float: left;
    margin-left: 15px;
  }
  .container {
    overflow: hidden;
  }
}
</style>
