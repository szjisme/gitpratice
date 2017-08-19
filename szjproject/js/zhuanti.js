// 求json数据对象长度 只需调用即可
// function getJsonLength(jsonData){ 
// 	var jsonLength = 0; 
// 	for(var item in jsonData){ 
// 		jsonLength++; 
// 	} 
// 	return jsonLength; 
// }


// function ReadData(){
// 	this.Read=function(_data,s,_div,key){
// 	var _ul="";
// 	var n=0;
// 	var len=getJsonLength(_data[key]["children"])
// 	//console.log(len)
// 	_ul+="<ul>"
// 	for(var i=s;i<len&&i<s+5;i++){
// 			for(var k in _data[key]["children"]){
// 				n++
// 				_ul+="<li><a href=\""+_data[key]["children"][k]["url"]+"\"><img src=\""+_data[key]["children"][k]["img"]+"\"/><span class=\"lione\">"+_data[key]["children"][k]["money"]+"</span><span class=\"litwo\">"+_data[key]["children"][k]["desc"]+"</span></li>"
// 				if(n>=5){
// 					break;
// 				}
// 			}
// 			if(n>=5){
// 					break;
// 			}
// 		}
// 		_ul+="</ul>"
// 		_div.innerHTML=_ul;
// 	}
// }
// function LoadData(){
// 	ajaxrequest("post","../page.json",true,null,function(data){
// 		var _data=window.eval("("+data+")")
// 		var _div1=document.getElementById("shop-list1")
// 		var _div2=document.getElementById("shop-list2")
// 		var _div3=document.getElementById("shop-list3")
// 		var read1=new ReadData()
// 		read1.Read(_data,0,_div1,"1001")
// 		// readData(_data,0)
// 		// pagesize(_data,1)
// 	},"json")
// }

// window.onload=function(){
// 	LoadData();
// }
function format(html,data){
	// [] 中括号中的正则条件，可以随意匹配
	return html.replace(/{{([\w]+)}}/g,function(name,key){
		return data[key] || "";
	});
}

//给 tab 动态创建 html 元素
function navHtml($nav,data){//.nav 1001
	var html = "";
	var i = 0;
	//var children = data.children; 
	//console.log(children)
	$.each(data,function(key,item){
		item.key = key; //动态创建一个属性，属性值是 key 值
		if(i == 0){
			i += 1;
			item.cur = "cur";
		}else{
			item.cur = "";
		}
		var str = '<span class="{{cur}}" data-key="{{key}}">'+
					'{{name}}'+
				'</span>';
		html += format(str,item);
	});
	//把 html 动态写入到页面
	$nav.html(html);
	//动态存值 ， 写入 dom 元素内存中
	$nav.data("list",data)//=============两个参数
	//手动触发点击事件
	//模拟用户点击了这个元素
	$(".cur",$nav).trigger("click");
}


 function navClick(){
// 	//给 tab 绑定 click 事件
 	$(".nav").on("click","span",function(e){
// 		//取出元素中自定义的 key 值
 		var key = $(this).data("key");
 		var $nav = $(this).parent();//====盛放列表内容的div
// 		//取出上面动态存入的 children [29 行]
 		var list = $nav.data("list");
// 			//根据分类 动态创建 html
 		pageList(list[key]);
// 		
// 		// addClass 给当前元素对象添加一个 class 类
// 		// siblings 获取除了本身元素以外的兄弟元素
// 		// removeClass 动态的删除一个 class 类
 		$(this).addClass("cur").siblings().removeClass("cur");
 	});
// 	//分页的点击事件
 	$(".page-list","#demo").on("click","span",function(){
 		if($(this).hasClass("cur")){
 			return false;
 		}
// 		//取出动态存入的数据 [121 行]
 		var children = $(this).parent().data("children");
 		console.log(children)
// 		//拿到点击的是第几页
 		var index = $(this).data("index");
// 		//根据分页页码 动态创建所需要展示的列表
 		pageHtml((index - 1) * 10,children);
// 		//给当前点击的页码标识一个状态
 		$(this).addClass("cur").siblings().removeClass("cur");
 	});
 }

 function pageHtml(startIndex,children){
 	var keys = Object.keys(children);
 	var str = '<li data-i="{{i}}">'+
					'<a url={{url}}>'+
						'<i class="meddin"></i>'+
						'<img src="{{img}}">'+
					'</a>'+
					'<span class="lione">'+'{{money}}'+'</span>'+
					'<a href="{{url}}"><span class="litwo">'+'{{desc}}'+'</span>'+
				'</li>';
 	var html = "";
 	for(var i=startIndex; i < startIndex +10 && i < keys.length; i++){
 		var item = children[keys[i]];
 		item.i = i+"";//============意义
 		item.key = keys[i];
 		html += format(str,item)
 	}
 	$("ul","#demo").html(html);
 }
// //动态创建 列表
 function pageList(data){
 	//获取 children 数据，如果没有 则默认为 空的对象
 	var children = data.children || {};
// 	// Object.keys 不兼容 IE8 ，使用时需要在页面中加 hack
// 	// 引入 es5-shim.js
// 	// es5-shim.js 对不支持部分语法的浏览器打补丁，让它支持部分语法
// 	//获取对象中所有 key 值
 	var keys = Object.keys(children);
// 	//默认创建第一页的列表
 	pageHtml(0,children);
	
 	var pages = "";
 	for(var i=0 , len = keys.length ,num = 1; i< len ; i+=10, num++){
 		var str = '<span class="{{cur}}" data-index="{{number}}" data-pagesize="{{pagesize}}">{{number}}</span>';
		pages += format(str,
			{
				"number" : num,
				"pagesize" : 10,
				"cur" : num == 1 ? "cur" : ""
			}
		);
	}
	console.log(pages)
	$(".page-list","#demo").html(pages);
	//把所有商品的数据存入 分页 dom 元素的内存中
	$(".page-list","#demo").data("children",children);
}
$(function(){
	navClick(); //绑定事件
	//请求数据
	$.get("../page.json",{},function(data){
		//默认给第一个 tab 动态添加 html 元素
		navHtml($(".nav"),data);
	},"json");
// =====================json text
});