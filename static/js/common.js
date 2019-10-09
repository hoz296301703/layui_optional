// var urlPrefix = 'http:///192.168.1.116:8080/';
var urlPrefix = "https://ym.191ec.com/";
// var urlPrefix = 'http://120.132.118.211:8080/';
// var urlPrefix = 'http://120.132.118.214:8080/';

var imgPrefix = function (id) {
  var imgPrefix1 = "https://ym.191ec.com/img/merchant/";
  var imgPrefix2 = "/goods/";

  return imgPrefix1 + id + imgPrefix2;
};
var merchantImgPrefix = "https://ym.191ec.com/img/";// 图片拼接前缀
// 日期格式化 fmt => "yyyy-MM-dd hh:mm:ss"
var G_format = function (datetime, fmt) {
  if (isEmpty(datetime)) {
    return '';
  }
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
var splitImg = function (img) {
  if (isEmpty(img)) {
    return '';
  }
  var arr = img.split(";");
  return arr[0];
};

/**
 * 将yyyyMMdd格式化成yyyy-MM-dd
 * @param {*} time 
 */
function formatTime(time) {
  if (isEmpty(time)) {
    return '';
  } else {
    return time.slice(0, 4) + "-" + time.slice(4, 6) + "-" + time.slice(6, 8);
  }
}
/**
 * yyyyMMddHHmmss转换成yyyy-MM-dd HH:mm:ss
 * @param {*} time 
 */
function toStringTime(time) {
  if (isEmpty(time)) {
    return '';
  }
  var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
  return time.replace(pattern, "$1-$2-$3 $4:$5:$6");
}
// yyyy-MM-dd
function toStringDay(time) {
  if (isEmpty(time)) {
    return '';
  }
  var pattern = /(\d{4})(\d{2})(\d{2})/;
  return time.replace(pattern, "$1-$2-$3");
}


// 获取当天日期
function get_newDate_D() {// 年月日
  var lw = new Date();
  var lastY = lw.getFullYear();
  var lastM = lw.getMonth() + 1;
  var lastD = lw.getDate();
  // var lasthour = '00';
  // var lastminute = '00';
  // var lastsecond = '00';
  var startDate = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD);
  return startDate;
}

// 获取当月
function get_newDate_M() {// 年月日
  var lw = new Date();
  var lastY = lw.getFullYear();
  var lastM = lw.getMonth() + 1;

  var startDate = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM);
  return startDate;
}

// 操作节点
function actionNode(data) {
  var processNode = "";
  if (data == "1") {
    processNode = "运营审核";
  } else if (data == "2") {
    processNode = "财务审核";
  } else if (data == "200") {
    processNode = "完成";
  } else if (data == "400") {
    processNode = "终止";
  }
  return processNode;
}
// 状态
function g_orderStatus(data) {
  var status = "";
  if (data == "success") {
    status = "成功";
  } else if (data == "failure") {
    status = "失败";
  } else if (data == "process") {
    status = "处理中";
  } else if (data == "pending") {
    status = "待处理";
  } else if (data == "abnormal") {
    status = "异常";
  }

  return status;
}
// 格式化字符串时间 例如："2019-08-21T10:11:39.000Z"
function G_formatStr(value) {
  // 创建日期
  var date = "";
  if (!isEmpty(value)) {
    date = value.split("T")[0] + " " + value.split("T")[1].split(".")[0];
  }
  return date;
}
// 截取图片
var imgPrefix = function (id) {
  var imgPrefix1 = "https://ym.191ec.com/img/merchant/";
  var imgPrefix2 = "/goods/";

  return imgPrefix1 + id + imgPrefix2;
};
function g_imgSplit(img, goodsMerchantId) {// 传图片与商户id
  var goodsImg = "../../static/images/bgImg.jpg";

  if (!isEmpty(img)) {
    var tag = "https://ym.191ec.com/img/";
    if (img.indexOf(tag) != -1) {
      goodsImg = img.split(";")[0];
    } else {
      goodsImg =
        imgPrefix(goodsMerchantId) +
        img.split(";")[0];
    }
  }
  return goodsImg;
}
/** 数字金额大写转换(可以处理整数,小数,负数) */
var digitUppercase = function (n) {
  var fraction = ['角', '分'];
  var digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ];
  var unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  var head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  var s = '';
  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (var i = 0; i < unit[0].length && n > 0; i++) {
    var p = '';
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
};

// 将数字转换成金额显示
function toMoney(num) {
  if (num) {
    if (isNaN(num)) {
      return "";
    }
    num = typeof num == 'string' ? parseFloat(num) : num // 判断是否是字符串如果是字符串转成数字
    num = num.toFixed(2); // 保留两位           
    num = parseFloat(num); // 转成数字
    num = num.toLocaleString(); // 转成金额显示模式
    // 判断是否有小数
    if (num.indexOf('.') === -1) {
      num = '￥' + num + '.00';
    } else {
      num.split('.')[1].length;
      // console.log(num.split('.')[1].length)
      // num = num.split('.')[1].length < 2 ? '￥' + num + '0' : '￥' + num;
    }
    return num; // 返回的是字符串23,245.12保留2位小数
  } else {
    return num = null;
  }
}

