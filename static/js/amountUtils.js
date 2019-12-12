//2019-12-12 金额工具类

document.write('<script src="../../static/js/common.js" type="text/javascript" charset="utf-8"></script>');
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
    for (var i = 0; i < fraction.length; i++) {//角分   
      s += (digit[Math.floor(accMul(n, 10) * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
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
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
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