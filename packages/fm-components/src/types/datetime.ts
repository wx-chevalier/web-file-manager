const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const nth = (d: number) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

/** 获取今日的时间字符串 */
export const getTodayDate = () => {
  const d = new Date();
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export const formatDate = (value: string | number) => {
  const date = new Date(value);
  const day = date.getDate(),
    monthIndex = date.getMonth(),
    year = date.getFullYear().toString();
  return `${day}${nth(day)} ${monthNames[monthIndex]}, ${year}`;
};
