import qs from 'qs';

// 获取url的search对象参数
export const getSearchParams = (action) => {
  const startIdx = action.indexOf('?');
  let searchParams = {};
  let originAction = action;

  // 查找到带有参数?的url
  if (startIdx !== -1) {
    const actionArr = action.split("?");
    searchParams = actionArr[1];
    originAction = actionArr[0];
    searchParams = qs.parse(searchParams, { ignoreQueryPrefix: true });
  }

  return {
    action: originAction,
    search: searchParams
  };
};
