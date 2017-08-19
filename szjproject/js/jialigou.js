// 以下为菜单读取
function  Menucomputer(){
	this.loadmenu=function(obj,_none,head){
		ajaxrequest("get","../data.json",true,null,function(data){
			var _data=window.eval("("+data+")");
			var _list="";
			for(var k in _data[head]){
				_list+="<ul id=\""+k+"\"><li><h5><a href=\""+_data[head][k]["url"]+"\">"+_data[head][k]["name"]+"</a></h5></li><li>"
				 for(var key in _data[head][k]["children"]){
				 	_list+="<a href=\""+_data[head][k]["children"][key]["url"]+"\">"+_data[head][k]["children"][key]["name"]+"</a>"
				 }
				_list+="</li></ul>"
			}
			obj.innerHTML=_list;
			bindevent(obj,_data,_none,head);
		})
	}
}

function bindevent(obj,_data,_none,head){ //obj:menu菜单显示 ；_none：隐藏的div ;head:要读取的json文件类名
	var _list=obj.getElementsByTagName("ul");
	_none.onmousemove=function(){
		_none.style.display="block";
	}
	_none.onmouseout=function(){
		_none.style.display="none";
	}
	for(var i=0;i<_list.length;i++){
		_list[i].onmousemove=function(){
			var oli="";
			_none.style.display="block";
			for(var k in _data[head][this.id]["children"]){
				//console.log(_data[head][this.id]["name"])
				oli+="<span><h5><a class=\"exp\" href=\""+_data[head][this.id]["children"][k]["url"]+"\">"+_data[head][this.id]["children"][k]["name"]+"</a></h5>"
				for(var key in _data[head][this.id]["children"][k]["children"]){
					oli+="<a href=\""+_data[head][this.id]["children"][k]["children"][key]["url"]+"\">"+_data[head][this.id]["children"][k]["children"][key]["name"]+"</a>"
				}
				oli+="</span>"
				_none.innerHTML=oli;
			}
		}
		_list[i].onmouseout=function(){
				_none.style.display="none";
		}
	}
}

window.onload=function(){
	var _menu=document.getElementsByClassName("left_menu")[0];
	var _none=document.getElementsByClassName("_none")[0];
	var Mrequest=new Menucomputer();
	Mrequest.loadmenu(_menu,_none,"menu");
}

// 以下为小型轮播图读取

function bindscroll(_div){
	$(".s_left").click(function(){
		//console.log(_div)
		// console.log(_div.offset().left)
		// var m_l=_div.offset().left-$(".scroll").width()+19;
		var _left=parseInt(_div.css("left").replace("px",""));//获取当前left值
		var _width=parseInt(_div.css("width").replace("px",""));//获取当前宽度
		_left-=980;//每次偏移div的宽度
		if(_left<-(_width-980)){
			_left=0;
		}
		_div.animate({
			left:_left+"px"
		},10)
	});
	$(".s_right").click(function(){
		var _left=parseInt(_div.css("left").replace("px",""));
		var _width=parseInt(_div.css("width").replace("px",""));
		_left+=980;
		if(_left>0){
			_left=-(_width-980);
		}
		// var m_r=$("#lbt1").offset().left+$(".scroll").width()-19;
		_div.animate({
			left:_left+"px"
		},10)
	})
}

function Smallpic(){//商品图片滚动函数读取
	this.scroll=function(_data,picture,_div){//picture:json类名 _div：接收文本的div
		var small="";
		small="<ul>"
		for(var key in _data[picture]){
			small+="<li><p>"+_data[picture][key]["time"]+"</p><a href=\"#\"><img class=\"_img\" src=\""+_data[picture][key]["_img"]+"\" /></a><span class=\"live\" style=\"background:url("+_data[picture][key]["live"]+") no-repeat\">直播</span><span><a class=\"desc\" href=\"#\">"+_data[picture][key]["desc"]+"</a></span><span class=\"money\">"+_data[picture][key]["money"]+"</span></li>"
		}
		small+="</ul>"//读取
		_div.html(small)
		var _num=Math.ceil((_div.children("ul").children("li").length)/4);//每四张div为一栏 可分为几栏
		//console.log(_num);
		_div.width(_num*980);//盛放div的容器宽度
		//console.log(_div.width)
		bindscroll(_div);
	}
}
//以下为热销推荐数据读取
function Recommend(){
	this.read=function(_data,picture,_div){//picture:json类名 _div：接收文本的div
		var str="";
		str="<ul>"
		for(var key in _data[picture]){
			str+="<li><a href=\""+_data[picture][key]["url"]+"\"><img class=\"_img\" src=\""+_data[picture][key]["_img"]+"\" /></a><span><a class=\"desc\" href=\""+_data[picture][key]["url"]+"\">"+_data[picture][key]["desc"]+"</a></span><span class=\"money\">"+_data[picture][key]["money"]+"</span><span id=\""+key+"\" class=\"buy\">"+_data[picture][key]["buy"]+"</span><span class=\"rexiao\">"+_data[picture][key]["rexiao"]+"</span></li>"
		}
		str+="</ul>"//读取
		_div.html(str)
	}
}
//以下为服装鞋帽等左div读取
function Closingleft(){//content为json中类名
	this.readdata=function(_data,content,_div){
		var str="";
		str="<div class=\"Cone\"><ul>"
		for(var key in _data[content]["list"]){
			str+="<li><a href=\""+_data[content]["list"][key]["url"]+"\">"+_data[content]["list"][key]["name"]+"</a></li>"
		}
		str+="</ul>"
		for(var key in _data[content]["pic1"]){
			str+="<a href=\""+_data[content]["pic1"][key]["url"]+"\"><img src=\""+_data[content]["pic1"][key]["_img"]+"\" /></a>"
		}
		str+="</div><div class=\"Ctwo\">"
		for(var key in _data[content]["pic2"]){
			str+="<a href=\""+_data[content]["pic2"][key]["url"]+"\"><img class=\"bigpic\" src=\""+_data[content]["pic2"][key]["_img"]+"\" /></a>"
		}
		_div.children(".Cleft").html(str)
	}
}

function Closingright(){
	this.readData=function(_data,content,_div){
		var str="";
		str="<ul>"
		for(var key in _data[content]){
			str+="<li><a href=\""+_data[content][key]["url"]+"\"><img src=\""+_data[content][key]["_img"]+"\"></a><span class=\"Cdesc\"><a href=\""+_data[content][key]["url"]+"\">"+_data[content][key]["desc"]+"</a></span><span class=\"Cmoney\">"+_data[content][key]["money"]+"</span><span id=\""+key+"\" class=\"buy\">"+_data[content][key]["buy"]+"</span></li>"
		}
		str+="</ul>"
		_div.children(".Cright").html(str)
	}
}




























