function shopList(data){
	var keys = Object.keys(data);
	var arr=[];
	var num=0;
	var obj=[];
	for(var i=1;i<=keys.length-1;i++){
		//console.log(keys[i])
		//Tpicture  0
		//Ypicture  1
		//recommend 2
		//Cleft     3
		//Cright 	4
		//Bleft		5
		//Bright	6
		//Sleft		7
		//Sright	8
		//Fleft		9
		var desc = keys[i];//如key=data["recommend"]
		arr.push(desc)
	}
	for(var i=0;i<arr.length;i++){
		var str=String(arr[i])
		console.log(arr[i])
		for(var key in data[str]){
			//根据 key 获取 value
			var item = data[str][key];
			item.id = key;
			obj.push(item)
		}
	}
	//console.log(obj)
	 $("body").on("click",".buy",function(){
	 	num+=1;
	 	$(".num").html(num);
	 	var _id=$(this).attr("id")
	 	console.log(_id)
	 	var cars = JSON.parse(getCookie("car") || "[]");
	 	var status = true;
	 	//console.log(_id)
	 	for(var i=0;i<obj.length;i++){//判断被点击的商品 并且数量设置为1
		 		if(_id==obj[i].id){
		 			obj[i].count = 1;
		 			//console.log(obj[i])
		 			for(var n=0,len=cars.length;n<len;n++){
						var shop=cars[n];
						//console.log("这是第"+n+"个");
						if(shop.id == _id){
							shop.count += obj[i].count; //将新购买的商品与购物车中的商品累加
							//$(".car").html(shop.count)
							status = false;
						}
					}
					if(status){
				 		cars.push(obj[i]);
				 	}
				 	setCookie("car",JSON.stringify(cars));
					console.log(getCookie("car"));
					confirm("商品已成功加入购物车！")
		 		}
	 		}
	 })
	//var item=data["recommend"][key];
	// 	//console.log("对象："+item);
	// 	item.count = 1;
	// 	var item=data["recommend"][key];
	// 	//console.log("对象："+item);
	// 	item.count = 1;
	// 	var cars = JSON.parse(getCookie("car") || "[]");
	// 	var status = true;
	// 	for(var i=0,len=cars.length;i<len;i++){
	// 		var shop=cars[i];
	// 		console.log("这是第"+i+"个");
	// 		if(shop.id == key){
	// 			shop.count += item.count; //将新购买的商品与购物车中的商品累加
	// 			//$(".car").html(shop.count)
	// 			status = false;
	// 		}
	// 	}
	// 	//$(".car").html(item.count)
	// 	if(status){
	// 		cars.push(item);
	// 	}
	// 	//console.log(item)
	// 	// if(var item=data["recommend"][key]||item=data["Cright"][key]||item=data["Bright"][key]||item=data["Sright"][key]||item=data["Fright"][key]){
	// 	// 	alert("ok")
	// 	// }
	// 	setCookie("car",JSON.stringify(cars));
	// 	//console.log(getCookie("car"));
	// 	//alert("已经购买" + item.desc)
	// });












	// for(var key in data["recommend"]){
	// 	//根据 key 获取 value
	// 	var item = data["recommend"][key];
	// 	item.id = key;
	// 	//console.log(item)
	// }
	// var num=0;
	// $("body").on("click",".buy",function(){
	// 	//alert("1")
	// 	num+=1;
	// 	$(".num").html(num)
	// 	var key=$(this).attr("id")
	// 	//console.log(key);
	// 	var item=data["recommend"][key];
	// 	//console.log("对象："+item);
	// 	item.count = 1;
	// 	var flag=0;
	// 	var cars = JSON.parse(getCookie("car") || "[]");
	// 	var status = true;
	// 	for(var i=0,len=cars.length;i<len;i++){
	// 		var shop=cars[i];
	// 		console.log("这是第"+i+"个");
	// 		if(shop.id == key){
	// 			shop.count += item.count; //将新购买的商品与购物车中的商品累加
	// 			//$(".car").html(shop.count)
	// 			status = false;
	// 		}
	// 	}
	// 	//$(".car").html(item.count)
	// 	if(status){
	// 		cars.push(item);
	// 	}
	// 	//console.log(item)
	// 	// if(var item=data["recommend"][key]||item=data["Cright"][key]||item=data["Bright"][key]||item=data["Sright"][key]||item=data["Fright"][key]){
	// 	// 	alert("ok")
	// 	// }
	// 	setCookie("car",JSON.stringify(cars));
	// 	console.log(getCookie("car"));
	// 	//alert("已经购买" + item.desc)
	// });
}

$(function(){
	$.get("../data.json",null,function(data){
		//var data = JSON.parse(data);
		var data=window.eval("("+data+")")
		//console.log(data);
		shopList(data);
	},"text");
})
// 
// 
// 
