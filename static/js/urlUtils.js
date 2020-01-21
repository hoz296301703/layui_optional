//2019-12-25 URL工具类
document.write(
  '<script src="../../static/js/common.js" type="text/javascript" charset="utf-8"></script>'
);

//根据url与参数对象拼接完整的url查询参数
var appendUrl = function(url, obj) {
  if (isEmpty(url)) {
    return "";
  }
  //获取url中最后一个字符是否为?拼接符号
  var last = url.substr(url.length - 1, 1);
  if (last != "?") {
    //url最后一位不为?拼接符号时，进行参数拼接
    url += "?";
  }
  for (var key in obj) {
    //遍历对象中参数
    var value = obj[key];
    if (!isEmpty(value)) {
      url += key + "=" + value + "&";
    }
  }
  url = url.substring(0, url.length - 1); //移除最后一位&
  return url; //拼接好查询条件的url
};

/**
 *根据key获取url上的值
 * @param {*} variable
 */
function getQueryVariable(key) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == key) {
      return pair[1];
    }
  }
  return "";
}
