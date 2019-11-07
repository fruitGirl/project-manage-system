import service from '@/services/home';

export default {
  // 获取产品下拉数据
  async getProducts({ commit, dispatch, state }, payload) {
    try {
      const data = await service.getparticipationProductApi(payload);
      const { products = [] } = data;
      commit({ type: 'setProducts', payload: products });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 获取项目下拉数据
  async getProjects({ commit, dispatch, state }, payload) {
    try {
      const data = await service.getparticipationProjectApi(payload);
      const { projects = [] } = data;
      commit({ type: 'setProjects', payload: projects });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 我的任务列表
  async getTaskQueryByProjectId({ commit, dispatch, state }, payload) {
    try {
      const data = await service.getTaskQueryByProjectIdApi(payload);
      const { taskList = [] } = data;
      commit({ type: 'setTaskList', payload: taskList });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 我的bug列表
  async getBugQueryByProjectId({ commit, dispatch, state }, payload) {
    try {
      const data = await service.getBugQueryByProjectIdApi(payload);
      const { bugList = [] } = data;
      commit({ type: 'setMyBugList', payload: bugList });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 我的测试单
  async getTestFormQueryByProjectId({ commit, dispatch, state }, payload) {
    try {
      const data = await service.getTestFormQueryByProjectIdApi(payload);
      const { testFormList = [] } = data;
      commit({ type: 'setMyTestList', payload: testFormList });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 待处理需求
  async getMyWattingDemand({ commit, dispatch, state }, payload) {
    try {
      const data = await service.getMyWattingDemandApi(payload);
      const { demandList = [] } = data;
      commit({ type: 'setMyWattingDemandList', payload: demandList });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 未指派需求
  async getUnassignedDemand({ commit, dispatch, state }, payload) {
    try {
      const data = await service.getUnassignedDemandApi(payload);
      const { demandList = [] } = data;
      commit({ type: 'setUnassignedDemandList', payload: demandList });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 产品状态统计
  async getProductProjectStatusNum({ commit, dispatch, state }, payload) {
    try {
      const data = await service.getProductProjectStatusNumApi(payload);
      const {
        runProduct = 0,
        stopProduct = 0,
        terminatedProject = 0,
        underwayProject = 0,
        unstartProject = 0,
        delayedProject = 0,
        finishedProject = 0,
        pausedProject = 0
      } = data;
      const productLists = [];
      const projectLists = [];
      const productCount = runProduct + stopProduct;
      const projectCount =
        unstartProject +
        underwayProject +
        delayedProject +
        finishedProject +
        pausedProject +
        terminatedProject;

      // 产品项目总数
      const countParams = { productCount, projectCount };

      // 产品状态
      productLists.push(
        { name: '运营', value: runProduct, percent: runProduct / productCount },
        {
          name: '停止',
          value: stopProduct,
          percent: stopProduct / productCount
        }
      );

      // 项目状态
      projectLists.push(
        {
          name: '未开始',
          value: unstartProject,
          percent: unstartProject / projectCount
        },
        {
          name: '进行中',
          value: underwayProject,
          percent: underwayProject / projectCount
        },
        {
          name: '已延期',
          value: delayedProject,
          percent: delayedProject / projectCount
        },
        {
          name: '已完成',
          value: finishedProject,
          percent: finishedProject / projectCount
        },
        {
          name: '已暂停',
          value: pausedProject,
          percent: pausedProject / projectCount
        },
        {
          name: '已终止',
          value: terminatedProject,
          percent: terminatedProject / projectCount
        }
      );
      commit({
        type: 'getProductProjectStatusNum',
        payload: {
          productLists,
          projectLists,
          countParams
        }
      });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },

  // 主页头部信息
  async getUserHomePage({ commit, dispatch, state }, payload) {
    try {
      const data = await service.getUserHomePageApi(payload);
      const {
        bugNum,
        delayProjectNum,
        delayTaskNum,
        demandNum,
        productNum,
        projectNum,
        taskNum,
        testFormNum,
        userName = '暂无'
      } = data;

      // 首页头部信息展示
      const moduleData = [];
      moduleData.push(
        { name: '我的需求', mount: demandNum, key: 1, type: 'DEMAND' },
        { name: '我的任务', mount: taskNum, delayMount: delayTaskNum, key: 2, type: 'TASK' },
        { name: '我的BUG', mount: bugNum, key: 3, type: 'BUG' },
        { name: '我的测试单', mount: testFormNum, key: 4, type: 'TEST_FORM' },
        { name: '运营中产品', mount: productNum, key: 5 },
        { name: '未结束项目', mount: projectNum, delayMount: delayProjectNum, key: 6 }
      );

      commit({ type: 'setUserHomePage', payload: { moduleData, userName } });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
  // 首页头部未完成事项弹窗数据
  async getUserHomePageSimpleInfo({ commit, dispatch, state }, payload) {
    try {
      commit({ type: 'displayUnfinishDrawer', payload: true });
      const data = await service.getUserHomePageSimpleInfoApi(payload);
      const { simpleInfos = [] } = data;
      commit({ type: 'setUnfinishLists', payload: simpleInfos });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  },
};


