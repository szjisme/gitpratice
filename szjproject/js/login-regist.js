$(document).ready(function(){
	var code;//在全局定义验证码
	//产生验证码
	function createCode(){
		code="";
		var codeLength=4;
		var random=new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',  
     'S','T','U','V','W','X','Y','Z');//随机数 
		for(var i=0;i<codeLength;i++){//循环操作  
			var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
			code += random[index];//根据索引取得随机数加到code上
		}
		$("#yzm").html(code);//把code值赋给验证码
	}
	createCode();

	//校验验证码  
	function validate(name,pwd,N,P){  
		console.log(code)
	    var inputCode = $("#QR").val(); //取得输入的验证码并转化为大写        
	    if(inputCode.length <= 0) { //若输入的验证码长度为0  
	        alert("请输入验证码！"); //则弹出请输入验证码  
	    }         
	    else if(inputCode != code ) { //若输入的验证码与产生的验证码不一致时  
	        alert("验证码输入错误！@_@"); //则弹出验证码输入错误  
	        createCode();//刷新验证码  
	        $("#QR").val("");//清空文本框  
	    }         
	    else { //输入正确时  
	       if (N==name&&P==pwd){
				window.location.href = "index.html";
			}else{
				alert("用户名或密码不正确！")
			} 
	    }             
	}  

	// function setCookie(str,strValue,dat) 
	// { 
	//     var _date=new Date()
	//     _date.setDate(_date.getDate()+dat)
	//     document.cookie=str+"="+strValue+";expires="+_date;
	// }
	// function getCookie(Name) 
	// { 
	//     var search = Name + "=" 
	//     if(document.cookie.length > 0) 
	//     { 
	//         offset = document.cookie.indexOf(search) 
	//         if(offset != -1) 
	//         { 
	//             offset += search.length 
	//             end = document.cookie.indexOf(";", offset) 
	//             if(end == -1) end = document.cookie.length 
	//             return unescape(document.cookie.substring(offset, end)) 
	//         } 
	//         else return "" 
	//     } 
	// } 

	// $("input").bind({
	// 	focus:function(){
	// 		if(this.value==this.defaultValue){
	// 			this.value="";
	// 		}
	// 	},
	// 	blur:function(){
	// 		if(this.value==""){
	// 			this.value=this.defaultValue
	// 		}
	// 	}
	// })
	$(".registbtn").click(function(){
		var name=$(".ruser").val();
		var pwd1=$(".pwd1").val();
		var pwd2=$(".pwd2").val();
        	if($("input").val()!=""){
				if(pwd1===pwd2){
					setCookie("name",name,30)
					setCookie("pwd",pwd1,30)
					alert("您已注册成功")
					window.location.href = "login.html";
				}else{
					alert("两次密码不匹配！")
				}
			}else{
					alert("文本不能为空")
			}
	})

	$(".loginbtn").click(function(){
		var name=$("#user").val();
		var pwd=$("#pwd").val();
		var N=getCookie("name");
		var P=getCookie("pwd");
		validate(name,pwd,N,P)
	})
	$("#yzm").click(function(){
		createCode();
	})
	$("input").blur(function(){
		if($("#input").val()){
    		$("#input").attr("placeholder","默认值");
		}
	})
})