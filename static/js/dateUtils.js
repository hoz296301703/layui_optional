
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