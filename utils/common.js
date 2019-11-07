// 对象遍历 转换成数组对象,reverse为true时，label和value对调
export const tansData = (data, reverse) => {
  const needData = [];
  for (const i in data) {
    needData.push({
      label: reverse ? data[i] : i,
      value: reverse ? i : data[i]
    });
  }
  return needData;
};

// 数组遍历 转换成label,value格式
export const transArrs = (arr, labelField = 'title', valueField = 'id') => {
  const needData = arr.map(res => {
    return {
      label: res[labelField],
      value: res[valueField]
    };
  });
  return needData;
};

// 时间段日期转换
export const dateRangeShow = (start, end) => {
  if (start || end) return `${start || '-'} 至 ${end || '-'}`;
  return '-';
};

// 映射出枚举类型的label值
export const filterEnumsLabel = dataProvider => value => {
  if (!dataProvider) return '-';

  const matchItem = dataProvider.find(i => i.value === value);
  if (matchItem) {
    return matchItem.label;
  }
  return '-';
};

// 解析时间区间的字段值
export const decomposeDateRange = obj => {
  const container = {};
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      container[`min${i}`] = obj[i] ? obj[i][0] : undefined;
      container[`max${i}`] = obj[i] ? obj[i][1] : undefined;
      container[i] = undefined;
    }
  }
  return container;
};

const formatRange = m => {
  return m < 10 ? '0' + m : m;
};

// 解析时间戳为时间格式
export const formatToTime = timeStramp => {
  const time = new Date(timeStramp);
  const y = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  const h = time.getHours();
  const mm = time.getMinutes();
  const s = time.getSeconds();
  return (
    y +
    '-' +
    formatRange(m) +
    '-' +
    formatRange(d) +
    ' ' +
    formatRange(h) +
    ':' +
    formatRange(mm) +
    ':' +
    formatRange(s)
  );
};

// 数组转字符串连接
export const arrTransString = (arr, linkString = '、') => {
  let name = '';
  arr.forEach((i, key) => {
    let link = '';
    if (key !== arr.length - 1) link = linkString;
    name = `${name}${i}${link}`;
  });
  return name;
};

// 传tableSortHandler返回的prop, order，返回orderbys字段
export const formatSortProp = (prop, order) => {
  let orderBys = prop.replace(/([A-Z])/g, '_$1').toUpperCase();
  switch (order) {
    case 'ascending':
      orderBys += '_ASC';
      break;
    case 'descending':
      orderBys += '_DESC';
      break;
    default:
      orderBys = '';
  }
  return orderBys;
};

export function showMessage(req, action) {
  req
    .then(() => {
      this.$message({
        type: 'success',
        message: `${action}成功`
      });
    })
    .catch(() => {
      this.$message({
        type: 'warning',
        message: `${action}失败`
      });
    });
}
