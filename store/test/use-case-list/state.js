/*
 * @Description: 用例列表
 * @Author: danding
 * @Date: 2019-07-02 14:39:24
 * @Last Modified by: danding
 * @Last Modified time: 2019-07-02 16:49:48
 */
import { PRIORITY } from '@/constants/common/config';

export default () => {
  return {
    paginator: {
      // 分页
      pageNo: 1,
      pageSize: 10,
      totalNum: 0
    },
    savedSearchVals: {
      priorities: PRIORITY.map(i => i.value)
    }, // 存储查询条件
    list: [], // 表单数据
    showUseCaseDrawer: false, // 显示用例抽屉
    storeEditUseCaseMsg: null, // 存储编辑的用例详情
    selectedRows: [], // 选择的行集合
    storeExecuteUseCaseMsg: {}, // 存储执行的用例详情
    storeExecuteResultMsg: {}, // 存储执行的用例结果详情
    showExecuteDialog: false, // 显示执行弹窗
    expandRowKeys: [], // 执行用例结果的列表展开项
    showExecuteResultDialog: false, // 显示执行结果弹窗
    showBugDrawer: false, // 显示bug弹窗
    storeBugDatas: {}, // bug弹窗内容
    showBugDialog: false, // 显示剩余未关闭bug弹窗
    bugList: [],
    detailId: '',
    showUseCaseDetailDrawer: false, // 显示用例详情抽屉
    useCaseDetailMsg: {}, // 用例详情信息
    operateHistory: [] // 操作记录
  };
};
