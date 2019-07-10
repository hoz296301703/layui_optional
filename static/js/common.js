// var urlPrefix = 'http:///192.168.1.116:8080/';
var urlPrefix = "https://ym.191ec.com/";
// var urlPrefix = 'http://120.132.118.211:8080/';

// 日期格式化
var G_format = function (datetime, fmt) {
  if (parseInt(datetime) == datetime) {
    if (datetime.length == 10) {
      datetime = parseInt(datetime) * 1000;
    } else if (datetime.length == 13) {
      datetime = parseInt(datetime);
    }
  }
  datetime = new Date(datetime);
  var o = {
    "M+": datetime.getMonth() + 1,                 //月份   
    "d+": datetime.getDate(),                    //日   
    "h+": datetime.getHours(),                   //小时   
    "m+": datetime.getMinutes(),                 //分   
    "s+": datetime.getSeconds(),                 //秒   
    "q+": Math.floor((datetime.getMonth() + 3) / 3), //季度   
    "S": datetime.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

var empty = function (value) {
  return value == null || (value + "").trim() == "null" || (value + "").trim() == "" || (value + "").trim() == "undefined"
}

/**
 * 拼接默认起始时间，默认位0点
 * @param {*} value 
 */
function appendStartDate(value) {
  if (empty(value)) {
    return '';
  } else if (value.length == 10) {//10位格式时yyyy-MM-dd
    return value + ' 00:00:00';
  } else {
    return value;
  }
}

function getDay(day) {
  //Date()返回当日的日期和时间。
  var days = new Date();
  //getTime()返回 1970 年 1 月 1 日至今的毫秒数。
  var gettimes = days.getTime() + 1000 * 60 * 60 * 24 * day;
  //setTime()以毫秒设置 Date 对象。
  days.setTime(gettimes);
  var year = days.getFullYear();
  var month = days.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var today = days.getDate();
  if (today < 10) {
    today = "0" + today;
  }
  return year + "-" + month + "-" + today;
}
