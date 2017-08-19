function createHttpRequest(){

	try{
		return new XMLHttpRequest()
	}catch(e){
		try{
			return new ActiveXObject("MSXML2.XMLHttp.6.0");
	 }catch(e){

	 	try{
	 		return new ActiveXObject("XMLHttp2.XMLHttp.3.0");
	 	}catch(e){

	 		try{

	 			return new ActiveXObject("XMLHttp2.XMLHttp");
	 		}catch(e){

	 			if(confir("请升级浏览器")){

	 				window.location.href="node.jsx64_3987.com.rar";
	 			}
	 		}
	 	}
	 }
	}
}

function ajaxrequest(_method,_url,_async,_parameter,_fn){
	var _ajax=createHttpRequest();
	if(_ajax){

		_ajax.onreadystatechange=function(){

			if(_ajax.readyState==4){

				_fn(_ajax.responseText);
			}
		}
		_ajax.open(_method,_url,_async);
		_ajax.setRequestHeader("content-type","application/x-www-form-urlencoded;charset=utf8");
		_ajax.send(_parameter);
	}
}