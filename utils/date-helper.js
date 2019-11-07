/**
 * 格式化时间
 *
 * @param {Date} date 时间
 * @param {String} format 格式 默认为 "yyyy-MM-dd hh:mm:ss";
 * @returns {String} 返回字符
 */
const formatDateToString = (date, format = 'yyyy-MM-dd hh:mm:ss') => {
  const map = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds() // millisecond
  };
  let formatString = format;

  if (/(y+)/.test(formatString)) {
    formatString = formatString.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }

  for (const k in map) {
    if (new RegExp('(' + k + ')').test(formatString)) {
      formatString = formatString.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? map[k]
          : ('00' + map[k]).substr(('' + map[k]).length)
      );
    }
  }

  return formatString;
};
export { formatDateToString };
