layui.extend({
	admin: '{/}../../static/js/admin'
});

layui.use(['table', 'jquery', 'form', 'admin'], function () {
	var table = layui.table,
		$ = layui.jquery,
		form = layui.form,
		admin = layui.admin;

	table.render({
		elem: '#articleList',
		cellMinWidth: 80,
		height: 450,
		url: 'https://ym.191ec.com/silver-web-shop/manager/findAllManagerInfo',
		method: 'post',
		cols: [

			[
				// {
				// 	field: 'managerId', title: '管理员编号', sort: true, fixed: 'left'
				// },
				{
					field: 'zizeng', width: 60, title: '序号', fixed: 'left', type: 'numbers'
				}, {
					field: 'managerId', title: '管理员编号', fixed: 'left'
				}, {
					field: 'managerName', title: '管理员名称'
				},
				{
					field: 'realName', title: '姓名'
				}, {
					field: 'managerMarks', width: 120, title: '角色', templet: function (item) {
						if (item.managerMarks == '1') {
							return '超级管理员';
						} else if (item.managerMarks == '2') {
							return '运营管理员';
						} else if (item.managerMarks == '3') {
							return '财务';
						}
					}
				}, {
					field: 'status', width: 100, title: '状态', templet: '#statusTpl',
				}, {
					field: 'createDate', width: 160, title: '日期', templet: function (item) {
						return G_format(item.createDate.time, "yyyy-MM-dd hh:mm:ss");

					}
				},

				{
					field: 'operate', width: 200, title: '操作', toolbar: '#operateTpl', fixed: 'right'
				}]
		],
		// skin: 'row', //行边框风格
		event: true,
		page: true,
		response: {
			statusCode: 1 //重新规定成功的状态码为 200，table 组件默认为 0
		},
		request: {
			pageName: 'page', //页码的参数名称，默认：page
			limitName: 'size' //每页数据量的参数名，默认：limit
		},
		parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
			return {
				"code": res.status, //解析接口状态
				"msg": res.msg, //解析提示文本
				"count": res.totalCount, //解析数据长度
				"data": res.datas //解析数据列表
			};
		},
		done: function (res, curr, count) {
			//如果是异步请求数据方式，res即为你接口返回的信息。
			//如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
			// console.log(res);

			// //得到当前页码
			// console.log(curr);

			// //得到数据总量
			// console.log(count);
		}
	});
	// 重载公共方法
	var _reload = function () {
		var managerName = $('#form_sreach').find('[name=managerName]');
		setTimeout(function () {
			table.reload('articleList', {
				url: urlPrefix + 'silver-web-shop/manager/findAllManagerInfo',
				page: {
					curr: $(".layui-laypage-em").next().html()//重新从第 1 页开始
				},
				where: {
					managerNameblurry: managerName.val()
				}
			});
		}, 800)
	}
	//监听性别操作
	form.on('switch(statusDemo)', function (obj) {
		var status = '';
		if (obj.value == "enable") {
			status = 'disable';
		} else {
			status = 'enable';
		}
		$.ajax({
			url: urlPrefix + "silver-web-shop/manager/updateStatus",
			type: "POST",
			xhrFields: {
				withCredentials: true
			},
			data: {
				managerId: $(obj.elem).attr('data-managerid'),
				status: status
			},
			success: function (response) {
				if (response.status == 1) {
					layer.msg('修改成功！');
					_reload();//执行重载
				} else {
					layer.alert(response.msg);
				}
			}
		});
	});

	/*
	 *数据表格中form表单元素是动态插入,所以需要更新渲染下
	 * http://www.layui.com/doc/modules/form.html#render
	 * */
	// $(function () {
	// 	form.render();
	// });

	var active = {
		// getCheckData: function () { //获取选中数据
		// 	var checkStatus = table.checkStatus('articleList'),
		// 		data = checkStatus.data;
		// 	//console.log(data);
		// 	//layer.alert(JSON.stringify(data));
		// 	if (data.length > 0) {
		// 		layer.confirm('确认要删除吗？' + JSON.stringify(data), function (index) {
		// 			layer.msg('删除成功', {
		// 				icon: 1
		// 			});
		// 			//找到所有被选中的，发异步进行删除
		// 			$(".layui-table-body .layui-form-checked").parents('tr').remove();
		// 		});
		// 	} else {
		// 		layer.msg("请先选择需要删除的文章！");
		// 	}

		// },
		// Recommend: function () {
		// 	var checkStatus = table.checkStatus('articleList'),
		// 		data = checkStatus.data;
		// 	if (data.length > 0) {
		// 		layer.msg("您点击了推荐操作");
		// 		for (var i = 0; i < data.length; i++) {
		// 			console.log("a:" + data[i].recommend);
		// 			data[i].recommend = "checked";
		// 			console.log("aa:" + data[i].recommend);
		// 			form.render();
		// 		}

		// 	} else {
		// 		console.log("b");
		// 		layer.msg("请先选择");
		// 	}

		// 	//$(".layui-table-body .layui-form-checked").parents('tr').children().children('input[name="zzz"]').attr("checked","checked");
		// },
		// Top: function () {
		// 	layer.msg("您点击了置顶操作");
		// },
		// Review: function () {
		// 	layer.msg("您点击了审核操作");
		// },
		reload: function () {
			var managerName = $('#form_sreach').find('[name=managerName]');
			//执行重载
			setTimeout(function () {
				table.reload('articleList', {
					url: urlPrefix + 'silver-web-shop/manager/findAllManagerInfo',
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						managerNameblurry: managerName.val()
					}
				});
			}, 800)

		}
	};
	// 监听查询按钮
	$('#form_sreach .layui-btn').on('click', function () {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

	//监听工具条
	table.on('tool(articleList)', function (obj) {
		console.log(obj)
		var data = obj.data;
		if (obj.event === 'detail') {// 查看详情
			layer.msg('ID：' + data.id + ' 的查看操作');
			
		} else if (obj.event === 'reset') {// 重置密码
			layer.alert("确定重置密码？", {
				time: 0, //不自动关闭
				btn: ["确定", "取消"],
				yes: function (index) {
					$.ajax({
						url: urlPrefix + "silver-web-shop/manager/resetManagerPassword",
						type: "POST",
						xhrFields: {
							withCredentials: true
						},
						data: { managerId: data.managerId },
						success: function (response) {
							if (response.status == 1) {
								layer.msg("重置成功！");
								_reload();
							} else {
								layer.alert(response.msg);
							}
						}
					});
				}
			});

		} else if (obj.event === 'edit') {
			layer.alert('编辑行：<br>' + JSON.stringify(data))
		}
	});

});

// function delAll(argument) {
// 	var data = tableCheck.getData();
// 	layer.confirm('确认要删除吗？' + data, function (index) {
// 		//捉到所有被选中的，发异步进行删除
// 		layer.msg('删除成功', {
// 			icon: 1
// 		});
// 		$(".layui-form-checked").not('.header').parents('tr').remove();
// 	});
// }