export function util_date_interpreter(dateNum: number, style?: string): string {
  const date: Date = new Date(dateNum);
  const monthList_long: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthList_short: string[] = ['Jan', 'Feb', 'Ma', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthList_number: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  if (style === 'long')
    return `${date.getDate()} ${monthList_long[date.getMonth()]} ${date.getFullYear()}`;
  if (style === 'short')
    return `${date.getDate()} ${monthList_short[date.getMonth()].toUpperCase()} ${date.getFullYear()}`;
  if (style === 'number') {
    return `${date.getDate()}-${monthList_number[date.getMonth()].toUpperCase()}-${date.getFullYear()}`;
  }
  else
    return "";
}


export function util_timeInterpreter(dateNum: number, form?: string): string {
  // 1. declaration
  const date: Date = new Date(dateNum);

  // 2. Operation
  if (form === '12')
    return `${twelveStyle(date.getHours(), 'hour')}:${fillZero(date.getMinutes())} ${date.getHours() > 12 ? ' pm' : ' am'}`;
  if (form === '24' || !form)
    return `${fillZero(date.getHours())}:${fillZero(date.getMinutes())}`;
  else
    return "";
};


//  FUNCITONS

function twelveStyle(num: number, type: string): string {
  // 1. hours
  if (type === 'hour' && num < 13)
    return num === 0 ? '12' : num.toString();
  if (type === 'hour' && num > 13)
    return (num - 12).toString();
  // 2. minutes
  if (type === 'min' && num < 13) {
    if (num - 12 > 10)
      return num.toString();
    else
      return "0" + num.toString();
  }
  else {
    if (type === 'min' && num - 12 > 10)
      return (num - 12).toString();
    else
      return "0" + (num - 12).toString();
  }
}

function fillZero(num: number): string {
  if (num > 10)
    return num.toString() + " ";
  else
    return "0" + num.toString();
}