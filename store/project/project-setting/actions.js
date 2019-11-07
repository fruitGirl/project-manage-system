import services from '@/services/project/project-setting';
import { PRIORITY } from '@/constants/common/config';

const formatDataSetting = data => {
  const priority = PRIORITY.filter(
    item => item.value === data.project.priority
  );

  const linkedProduct = data.linkedProduct.map(item => item.name).join();

  const info = {
    title: '信息',
    infoList: [
      {
        key: '项目类型',
        value: data.project.type.message
      },
      {
        key: '优先级',
        value: priority.length ? priority[0].label : '-'
      },
      {
        key: '关联产品',
        value: linkedProduct || '-'
      },
      {
        key: '项目描述',
        value: data.project.description || '-'
      },
      {
        key: '访问权限',
        value: data.project.visitType.message || '-'
      }
    ]
  };

  const member = {
    title: '成员',
    infoList: data.member.map(item => {
      return {
        value: item.userId || '-',
        key: item.roleId || '-'
      };
    })
  };

  const time = {
    title: '起止',
    infoList: [
      {
        key: '预估起止时间',
        value: `${data.project.gmtEstimateStart || '-'} 至 ${data.project
          .gmtEstimateEnd || '-'}`
      },
      {
        key: '实际起止时间',
        value: `${data.project.gmtActualStart || '-'}至${data.project
          .gmtActualEnd || '-'}`
      },
      {
        key: '预估上线',
        value: data.project.gmtExpectEnd || '-'
      },
      {
        key: '预估总工时',
        value: (data.estimateHours || 0) + '小时'
      },
      {
        key: '已消耗工时',
        value: (data.actualHours || 0) + '小时'
      },
      {
        key: '剩余工时',
        value: (data.estimateHours || 0) - (data.actualHours || 0) + '小时'
      }
    ]
  };

  const manager = {
    title: '负责人',
    infoList: [
      {
        key: '项目负责人',
        value: data.project.projectManager || '无'
      },
      {
        key: '产品负责人',
        value: data.project.productManager || '无'
      },
      {
        key: '开发负责人',
        value: data.project.developManager || '无'
      },
      {
        key: '测试负责人',
        value: data.project.testManager || '无'
      }
    ]
  };

  return [info, member, time, manager];
};

const formatDataInfo = data => {
  return {
    name: data.project.name || '无',
    status: data.project.status.message || '无',
    statusCode: data.project.status.name || '',
    creator: data.project.creator || '无',
    gmtCreate: data.project.gmtCreate || '无',
    modifier: data.project.modifier || '无',
    gmtModified: data.project.gmtModified || '无',
    gmtEstimateStart: data.project.gmtEstimateStart,
    gmtEstimateEnd: data.project.gmtEstimateEnd,
    id: data.project.id
  };
};

export default {
  async getProjectDetailApi({ commit }, payload) {
    try {
      const data = await services.getProjectDetailApi(payload);
      commit({
        type: 'mutationProjectSetting',
        payload: formatDataSetting(data)
      });
      commit({ type: 'mutationProjectInfo', payload: formatDataInfo(data) });
    } catch (err) {
      this.$showErrorMessage(err);
    }
  }
};
