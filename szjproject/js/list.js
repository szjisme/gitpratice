function shopCarShow(data){
	console.log(data)
	var str = '<tr>'+
					'<td class="num1" class="shop-img">'+
						'<i class="meddin"></i>'+
						'<span class="btn" style="background:url(../images/yes.jpg);"></span>'+
						'<img src="{{_img}}">'+
					'</td>'+
					'<td class="num2">'+
						'<span>{{desc}}</span>'+
					'</td>'+
					'<td><span class="dan">{{money}}</span>元</td>'+
					'<td><span data-key="{{id}}" class="jian">-</span><span class="count">{{count}}</span><span data-key="{{id}}" class="jia">+</span>&nbsp;个</td>'+
					'<td class="qian"><span class="tital">{{money}}</span>元</td>'+
					'<td class="made"><span data-key="{{id}}" class="del-btn">删除</span></td>'+
				'</tr>';
	var html = "";
	for(var i=0,len = data.length;i<len;i++){
		var item = data[i];
		html += format(str,item);
	}
	$("tbody",".car-list").append(html);
		//绑定删除事件
	$(".car-list").on("click",".del-btn",function(){
		var key =$(this).data("key");
		var index = 0;
		//循环遍历 购物车中的数据
		for(var i=0,len = data.length;i<len;i++){
			var item = data[i]; //拿到单个商品数据
			//比对 商品中的 id 与需要删除的商品的 id 是否一致
			if(item.id == key){
				index = i;
				break;
			}
		}
		
		// var item = data[index];
		// //通过数组 splice 方法删除商品
		// // 第一个参数是需要删除元素的下标, 第二个参数是需要删除几个元素
		// data.splice(index,1);
		// //将修改后的数据重新写入 cookie 
		// setCookie("car",JSON.stringify(data));
		// console.log(getCookie("car"));
		// //删除页面中的 dom 节点
		// $(this).parents("li").remove();
		if(confirm("您确定要删除该商品吗")){
			var item = data[index];
			//通过数组 splice 方法删除商品
			// 第一个参数是需要删除元素的下标, 第二个参数是需要删除几个元素
			data.splice(index,1);
			//将修改后的数据重新写入 cookie 
			setCookie("car",JSON.stringify(data));
			console.log(getCookie("car"));
			//删除页面中的 dom 节点
			$(this).parents("tr").remove();
			alert("该商品已成功删除！")
			location.reload();
		};
	});

	$(".car-list").on("click",".jian",function(){
		var cou =$(this).data("key");//获取点击按钮的key值
		console.log(cou)
		var key = $(this).next().html(parseInt($(this).next().html())-1);
		$(this).closest("tr").find(".tital").html("￥"+(parseInt($(this).next().html()))*parseInt($(this).closest("tr").find(".dan").html().replace(/￥/,"")));
		$(".heji").html(parseInt($(".heji").html())-parseInt($(this).closest("tr").find(".dan").html().replace(/￥/,"")))
		for(var i=0,len = data.length;i<len;i++){
			var item = data[i]; //拿到单个商品数据
			//比对 商品中的 id 与需要增减的商品的 id 是否一致
			if(item.id == cou){
				item.count-=1;
				console.log(item)
				break;
			}
		}
	})
	$(".car-list").on("click",".jia",function(){
		var cou =$(this).data("key");
		var key = $(this).prev().html(parseInt($(this).prev().html())+1);
		// $(this).parents("td").next().children(".tital").html((parseInt($(this).next().html())+1)*parseInt($(this).next().html()));
		$(this).closest("tr").find(".tital").html("￥"+(parseInt($(this).prev().html()))*parseInt($(this).closest("tr").find(".dan").html().replace(/￥/,"")));
		$(".heji").html(parseInt($(".heji").html())+parseInt($(this).closest("tr").find(".dan").html().replace(/￥/,"")))
		for(var i=0,len = data.length;i<len;i++){
			var item = data[i]; //拿到单个商品数据
			//比对 商品中的 id 与需要增减的商品的 id 是否一致
			if(item.id == cou){
				item.count+=1;
				console.log(item)
				break;
			}
		}
	})
}
$(function(){
	var flag=0;
	var cars = getCookie("car");
	shopCarShow(JSON.parse(cars || "[]"));
	// 以下为计算商品的合计价 用arr取出每个商品的合计然后相加
	var arr=[];
	arr=$(".tital")
	//console.log(arr[0].innerHTML.replace(/￥/,""))
	var tit=0;
	for(var i=0;i<arr.length;i++){
		tit+=parseInt(arr[i].innerHTML.replace(/￥/,""))
		$(".heji").html(tit)
	}
	//同理 以下为计算多少件商品
	// var arr2=[];
	// arr2=$(".count")
	// //console.log(arr[0].innerHTML.replace(/￥/,""))
	// var tit=0;
	// for(var i=0;i<arr2.length;i++){
	// 	tit+=parseInt(arr2[i].innerHTML.replace(/￥/,""))
	// 	$(".sp").html(tit)
	// }
	var num=$(".btn").length;
	$(".sp").html(num)
	function count(btn,n){
		if(n%2==0){
			//console.log(parseInt(btn.closest("tr").find(".tital").html().replace(/￥/,"")))
			// console.log($(".heji").html())
			// $(".sp").html(parseInt($(".sp").html())+parseInt(btn.closest("tr").find(".count").html()))
			num=num+1
			$(".sp").html(num);
		}else{
			//console.log(parseInt(btn.closest("tr").find(".tital").html().replace(/￥/,"")))
			// console.log($(".heji").html())
			// $(".sp").html(parseInt($(".sp").html())-parseInt(btn.closest("tr").find(".count").html()))
			num=num-1
			$(".sp").html(num);
		}
	}
	//以下为点击按钮时更换按钮背景颜色 并且改变合计的值
	function compute(btn,n){
		if(n%2==0){
			//console.log(parseInt(btn.closest("tr").find(".tital").html().replace(/￥/,"")))
			// console.log($(".heji").html())
			$(".heji").html(parseInt($(".heji").html())+parseInt(btn.closest("tr").find(".tital").html().replace(/￥/,"")))
		}else{
			//console.log(parseInt(btn.closest("tr").find(".tital").html().replace(/￥/,"")))
			// console.log($(".heji").html())
			$(".heji").html(parseInt($(".heji").html())-parseInt(btn.closest("tr").find(".tital").html().replace(/￥/,"")))
		}
	}
	$(".btn").click(function(){
		flag+=1
		if(flag%2!=0){//如果为奇数表示商品没有选择
			$(this).css("background","url(../images/no.jpg)")
			compute($(this),flag);
			count($(this),flag);
		}
		if(flag%2==0){
			$(this).css("background","url(../images/yes.jpg)")
			compute($(this),flag);
			count($(this),flag);
		}
	});
});