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

var isEmpty = function (value) {
  return value == null || (value + "").trim() == "null" || (value + "").trim() == "" || (value + "").trim() == "undefined"
}

/**
 * 拼接默认起始时间，默认位0点
 * @param {*} value 
 */
function appendStartDate(value) {
  if (isEmpty(value)) {
    return '';
  } else if (value.length == 10) {//10位格式时yyyy-MM-dd
    return value + ' 00:00:00';
  } else {
    return value;
  }
}

/**
 * 拼接默认结束时间，默认为23:59:59
 * @param {*} value 
 */
function appendEndDate(value) {
  if (isEmpty(value)) {
    return '';
  } else if (value.length == 10) {//10位格式时yyyy-MM-dd
    return value + ' 23:59:59';
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

//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(arg1, arg2) {
  var t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) { }
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) { }
  with (Math) {
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * pow(10, t2 - t1);
  }
}

//给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg) {
  return accDiv(this, arg);
};

//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) { }
  try {
    m += s2.split(".")[1].length;
  } catch (e) { }
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}

//给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg) {
  return accMul(arg, this);
};
//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg) {
  return accAdd(arg, this);
};

function accSub(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //last modify by deeka
  //动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 图片去;分号
var splitImg = function(img) {
  if(isEmpty(img)){
    return '';
  }
  var arr = img.split(";");
  return arr[0];
};

// 异步加载查询商户分润比例
function g_async(data , url) {
  var obj = '';
  $.ajax({
    url: url,
    type: "POST",
    async: false,
    xhrFields: {
      withCredentials: true
    },
    data: data,
    success: function(response) {
      if (response.status == 1) {
        obj = response.datas;
      }
    },
    error: function() {

    }
  });
  return obj;
}