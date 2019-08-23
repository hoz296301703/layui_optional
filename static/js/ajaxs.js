// 查询所有已加入海关
export function findAllCustomsPort() {
    layui.use(['jquery'], function () {
        var $ = layui.jquery;
        var _allCustomsPort = function (data) {
            var allCustomsPortArr = [];
            $.ajax({
                url: urlPrefix + "silver-web-shop/customsPort/findAllCustomsPort",
                type: "POST",
                xhrFields: {
                    withCredentials: true
                },
                success: function (response) {
                    if (response.status == 1) {
                        allCustomsPortArr = response.datas;
                        _showallCustomsPort(allCustomsPortArr);
                    } else {
                    }
                }
            });
            return allCustomsPortArr;
        };
        _allCustomsPort()

    });
}


