
const formatTime = date =>  {
  //获取年月日
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  //获取时分秒
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  //格式化日期
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatDate = date => {
  //获取年月日
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  //格式化日期
  return [year, month, day].map(formatNumber).join('-')
}

const dateDiff = tmp =>{
  tmp = Number(tmp)
  var result
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  var halfamonth = day * 15
  var month = day * 30
  var now = new Date().getTime()
  var diffValue = now - tmp
  if (diffValue < 0) { return }
  var monthC = diffValue / month
  var weekC = diffValue / (7 * day)
  var dayC = diffValue / day
  var hourC = diffValue / hour
  var minC = diffValue / minute
  if (monthC >= 1) {
    // result = "" + parseInt(monthC) + "月前"
    result = formatDate(new Date(tmp))
  }
  else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前"
  }
  else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前"
  }
  else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前"
  }
  else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前"
  } else
    result = "刚刚"
  return result
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatGender = value =>{
  return value==1 ? "男" : "女"
}

const getRandom = n =>{
  const charactors = "ab1cd2ef3gh4ij5kl6mn7opq8rst9uvw0xyz"
  var i,value=''
  for (var j = 1; j <= n; j++) {
    i = parseInt(35 * Math.random())
    value = value + charactors.charAt(i)
  }
  return value
}


module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatGender: formatGender,
  getRandom: getRandom,
  dateDiff: dateDiff
}