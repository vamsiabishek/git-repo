export function getFormattedLastWeekDate() {
  const lastWeekDate = getLastWeekDate()
  let date = `${lastWeekDate.getDate()}`
  let month = `${lastWeekDate.getMonth() + 1}`
  date = date.length < 2 ? `0${date}` : date
  month = month.length < 2 ? `0${month}` : month

  return `${lastWeekDate.getFullYear()}-${month}-${date}`
}

function getLastWeekDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
}