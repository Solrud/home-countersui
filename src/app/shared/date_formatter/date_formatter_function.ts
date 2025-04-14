
export function formatDate(formatFor: string, date: Date = new Date(), fgCounter_datePicked?: any): string {
  let pickedDate;
  let month;
  let year;
  let day;

  if (formatFor === 'create'){
    pickedDate = fgCounter_datePicked;
    year = String(pickedDate.year);
    month = String(pickedDate.month).length == 1 ?
      '0' + String(pickedDate.month) :
      String(pickedDate.month);
    day = String(pickedDate.day).length == 1 ?
      '0' + String(pickedDate.day) :
      String(pickedDate.day);
  }
  if (formatFor === 'edit' || formatFor === 'xlsx'){
    year = String(date.getFullYear());
    month = String(date.getMonth() + 1).length === 1 ?
      '0' + String(date.getMonth() + 1): String(date.getMonth() + 1)
    day = String(date.getDate()).length === 1 ?
      '0' + String(date.getDate()): String(date.getDate())
    if (formatFor === 'xlsx') return `${day}.${month}.${year}`;
  }
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
