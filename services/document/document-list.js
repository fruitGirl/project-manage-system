import { post } from '@/utils/request';
import { DOC_LIB_TYPE_URL } from '@/services/common-config';
import { getSearchParams } from '@/utils/utils-helper';

export default {
  getLibTypesApi: () => {
    const params = getSearchParams(DOC_LIB_TYPE_URL);
    return post(params.action, params.search);
  },

  getdocPageQueryApi: payload => {
    return post('/project/docPageQuery', payload);
  },

  docCreateApi: payload => {
    return post('/project/docCreate', payload);
  },

  // 按ID获取文档，用于修改init
  docModifyInitApi: payload => {
    return post('/project/docModifyInit', payload);
  },

  // 文档修改接口
  docModifyApi: payload => {
    return post('/project/docModify', payload);
  },

  // 文档修改接口
  docModifyEnabledApi: payload => {
    return post('/project/docModifyEnabled', payload);
  },

  // 文档修改接口
  getDocLibTreeVisibleQueryApi: payload => {
    return post('/project/docLibTreeVisibleQuery', payload);
  },
};
