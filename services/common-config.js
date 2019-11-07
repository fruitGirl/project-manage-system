import { post } from '@/utils/request';

// 所有的产品数据
export const ALL_PRODUCTS_URL = '/project/productQueryAll';

// 侧边栏产品接口 - 排除不可见的
export const VISIBLE_PRODUCTS_URL = '/project/productQuery';

// 产品下的模块树
export const MODULE_BELONE_PRODUCT_URL = '/project/moduleTreeQuery';

// 获取所有的产品
export const getProductsApi = payload => {
  return post(ALL_PRODUCTS_URL, payload);
};

// 获取测试栏产品数据
export const getVisibleProductsApi = payload => {
  return post(VISIBLE_PRODUCTS_URL, payload);
};

// 获取所有的项目
export const getProjectsApi = payload => {
  return post('/project/projectQuery', payload);
};

// 产品下的模块树
export const getProductByModuleTreeApi = payload => {
  return post(MODULE_BELONE_PRODUCT_URL, payload);
};

// 产品下的模块
export const getModulesByProductApi = payload => {
  return post('/project/moduleQueryByProductId', payload);
};

// 产品下的项目
export const getProjectByProductApi = payload => {
  return post('/project/projectQueryByProductId', payload);
};

export const getModuleTreeApi = payload => {
  return post('', payload);
};

export const getProjectVersionApi = payload => {
  return post('/project/projectVersionQuery', payload);
};

// 所有人员
export const getAllEnabledUserApi = payload => {
  return post('/user/getAllEnabledUser', payload);
};

// 所有角色
export const getRoleQueryApi = payload => {
  return post('/user/roleQuery', payload);
};

// 产品模块级联
export const getProductAndModuleTreeApi = payload => {
  return post('/project/productAndModuleTreeQuery', payload);
};

// 操作日志
export const getOperationLogApi = payload => {
  return post('/system/operationLogRecordQuery', payload);
};

// 获取树 objectType='PRODUCT' |  'PROJECT' 产品文档库|项目文档库
export const getTreeByTypeApi = payload => {
  return post('/project/docLibTreeQuery', payload);
};

// 创建文档库节点
export const docLibCreateApi = payload => {
  return post('/project/docLibCreate', payload);
};

// 修改文档库节点
export const docLibModifyApi = payload => {
  return post('/project/docLibModify', payload);
};

// 删除文档库节点
export const docLibDeleteApi = payload => {
  return post('/project/docLibDelete', payload);
};

// 拖拽文档库节点
export const docLibMoveApi = payload => {
  return post('/project/docLibMove', payload);
};

// 获取组,可按userId获取user所在的组，不传参获取所有组
export const getuserGroupApi = payload => {
  return post('/user/userGroupSetInit', payload);
};

// 附件上传相关限制参数配置
export const attachmentConfigQueryApi = payload => {
  return post('/home/attachmentConfigQuery', payload);
};

// 需求指派人
export const demandAssignPersonApi = payload => {
  return post('/project/demandAssignUserQuery', payload);
};

// 测试单指派人 /project/testFormAssignUserQuery
export const testFormAssignPersonApi = payload => {
  return post('/project/testFormQueryAssignUser', payload);
};


/** 枚举接口定义 */

// 通用url
const BASE_ENUMS_URL = '/home/pageOptionsParamInit?fullPath=';

// 项目状态
export const PROJECT_STATUS_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.project.enums.ProjectStatusEnum`;

// 项目类型
export const PROJECT_TYPE_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.project.enums.ProjectTypeEnum`;

// 项目下的关联产品
export const RELATE_PRODUCT_URL = '/project/productQueryAll';

// 关联应用
export const RELATE_APPLICATION = '/home/appCodeParamInit';

// 动作类型
export const ACTION_TYPE_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.log.enums.OperationLogOperateActionTypeEnum`;

// 文档库类型
export const DOC_LIB_TYPE_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.doc.enums.DocLibOwnerObjectTypeEnum`;

// 操作对象类型
export const OPERATE_OBJECT_TYPE_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.log.enums.OperationLogOperateObjectTypeEnum`;

// 用例类型
export const TEST_CASE_STATUS_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.test.testCase.enums.TestCaseTypeEnum`;

// 用例状态
export const TEST_CASE_STATE_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.test.testCase.enums.TestCaseExecuteResultEnum`;

// 用例-自动化状态
export const AUTOMATION_TYPE_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.test.testCase.enums.TestCaseAutomationStatusEnum`;


// 测试单状态
export const TEST_FORM_STATUS_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.test.testForm.enums.TestFormStatusEnum`;

// 最后执行状态
export const TEST_CASE_EXECUTE_STATUS_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.test.testCase.enums.TestCaseExecuteResultEnum`;

// 需求状态
export const DEMAND_STATUS_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.demand.enums.DemandStatusEnum`;

// 需求来源
export const DEMAND_ORIGIN_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.demand.enums.DemandSourceEnum`;

// 获取公司的人员
export const ALL_USER_URL = '/user/userQueryByName';

// 创建人模糊搜索
export const CREATOR_URL = '/user/getAllEnabledUser';

// 需求标题模糊搜索/demandQueryByName
export const DEMAND_NAME_URL = '/project/demandQueryByName';

// 套件标题模糊搜索
export const TEST_SUITE_NAME_URL = '/project/testSuiteQueryByName';

// bug标题模糊搜索
export const BUG_NAME_URL = '/project/bugQueryByName';

// 产品下的项目
export const PROJECT_BY_PRODUCT = '/project/projectQueryByProductId';

// 产品下的需求下拉
export const REQUIREMENT_BELONE_PRODUCT_URL =
  '/project/demandQueryByProductId';
// 项目下的关联任务
export const TASK_QUERY_URL = '/project/taskQueryByProjectId';

// 按projectId查找成员
export const ASSIGNED_PERSON_URL = `/project/projectMemberQuery`;
//
export const TEST_CASE_URL = `project/testCaseQueryByProductIdAndModuleId`;

// 测试用例结果类型枚举
export const TEST_CASE_EXECUTE_RESULT_TYPE_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.test.testCase.enums.TestCaseStepExecuteResultEnum`;

// bug类型
export const BUG_TYPE_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.bug.enums.BugTypeEnum`;

// bug状态
export const BUG_STATUS_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.bug.enums.BugStatusEnum`;

// bug严重程度
export const BUG_SEVERITY_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.bug.enums.BugSeverityEnum`;

// 浏览器
export const BROWSER_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.bug.enums.BrowserEnum`;

// 操作系统
export const OS_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.bug.enums.OSEnum`;

// bug解决方案
export const BUG_RESOLUTION_URL = `${BASE_ENUMS_URL}com.bench.app.pm.api.web.base.core.model.bug.enums.BugResolutionEnum`;

// 需求指派人 参数：demandId productId
export const DEMAND_ASSIGN_URL = '/project/demandAssignUserQuery';

// 任务指派人 参数：projectId
export const TASK_ASSIGN_URL = '/project/taskQueryAssignUser';

// 测试单指派人 参数：projectId productId
export const TEST_SHEET_ASSIGN_URL = '/project/testFormAssignUserQuery';

// bug指派人 参数： projectId productId
export const BUG_ASSIGN_URL = '/project/bugAssignUserQuery';

// 富文本编辑器上传图片接口
export const EDITOR_UPLOAD_IMG_URL = '/imageUpload';

// 关联需求 参数 projectId
export const LINK_DEMAND_URL = '/project/projectDemandLinkQuery';

// 关联应用 参数 projectId
export const LINK_TASK_APP_URL = '/project/taskAppLinkQuery';

export const DELETE_FILE = '/home/attachmentDelete';


// 项目模块下的所属产品
export const PRODUCT_BY_PROJECT_URL = '/project/productQueryByProjectId';
export const getProductsByProjectApi = payload => {
  return post(PRODUCT_BY_PROJECT_URL, payload);
};
// 文件删除
export const deleteFileApi = payload => {
  return post(DELETE_FILE, payload);
};
