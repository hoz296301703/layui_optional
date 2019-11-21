
document.write('<script src="../../static/js/common.js" type="text/javascript" charset="utf-8"></script>');
// 日期格式化 fmt => "yyyy-MM-dd hh:mm:ss"
function dateFormat(datetime, fmt) {
    if (isEmpty(datetime)) {
        return '';
    }
    if (isEmpty(fmt)) {
        fmt = 'yyyy-MM-dd hh:mm:ss';
    }
    if (Object.prototype.toString.call(datetime) === '[object Object]') {
        datetime = datetime.time;
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
//将yyyyMMddHHmmss转化为 yyyy-MM-dd HH:mm:ss
function toDateFormat(value) {
    if (isEmpty(value)) {
        return '';
    }
    var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
    return value.replace(pattern, '$1-$2-$3 $4:$5:$6');
}

// 校验日期是否跨月			
var isCrossMonth = function (startDate, endDate) {
    if (isEmpty(startDate) || isEmpty(endDate)) {
        // popwin.info('提示', '日期不可为空');
        return true;
    }
    // if (startDate == '' || endDate == '') {
    // 	popwin.info('提示', '请输入查询日期');
    // 	return false;
    // }
    var start_date = startDate + " 00:00";
    var end_date = endDate + " 00:00";
    start_date = new Date(start_date.replace(/-/g, "/"));
    end_date = new Date(end_date.replace(/-/g, "/"));
    // if (start_date > end_date) {
    // 	popwin.info('提示', '截止日期不能小于起始日期');
    // 	return false;
    // }
    // 获取num天以后的日期   
    // var currentDate = new Date();
    // currentDate.setDate(currentDate.getDate() + num);
    // if (end_date > currentDate) {
    // 	popwin.info('提示', '截止日期不能大于' + num + '天之后的日期');
    // 	return false;
    // }
    // 判断是否跨月查询 
    // if (flag == false) {
    // if (start_date.getMonth() != end_date.getMonth()) {
    // popwin.info('提示', '该查询不支持跨月查询');
    // return true;
    // } else {
    // return false;
    // }
    return start_date.getMonth() != end_date.getMonth();
    // }
}
