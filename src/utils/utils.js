export function formatTime (date) {
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日`
}

export function formatWeek (date) {
  const showWeek = ['日', '一', '二', '三', '四', '五', '六']
  const day = date.getDay()
  return `${showWeek[day]}`
}
