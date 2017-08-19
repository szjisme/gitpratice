window.onload=function(){
	var odiv1= document.getElementById("sbox")//小图所在容器
	var odiv2= document.getElementById("bbox")//大图所在容器
	var osmal=document.getElementById("fdj")//放大镜
	var _img=document.getElementById("big");
	odiv1.onmousemove=function(e){
		var e=e||window.event;
		//以下为确定放大镜偏移
		osmal.style.display="block";
		odiv2.style.display="block";
		var l=e.clientX-36-osmal.offsetWidth/2;
		var t=e.clientY-150-osmal.offsetHeight/2;
		//以下为规定放大镜运动范围
		l=l<0?0:l;
		t=t<0?0:t;
		if(l>(odiv1.offsetWidth-osmal.offsetWidth-1)){
			l=odiv1.offsetWidth-osmal.offsetWidth-1
		}
		if(t>(odiv1.offsetHeight-osmal.offsetHeight-1)){
			t=odiv1.offsetHeight-osmal.offsetHeight-1
		}
		osmal.style.left=l+"px";
		osmal.style.top=t+"px";
		//以下为在小图中确定放大镜活动范围的比例
		var _left=l/(odiv1.offsetWidth-osmal.offsetWidth);
		var _top=t/(odiv1.offsetHeight-osmal.offsetHeight);
		//大图中放大镜的活动范围确定
		_img.style.left=-(_img.offsetWidth-odiv2.offsetWidth)*_left+"px";
		_img.style.top=-(_img.offsetHeight-odiv2.offsetHeight)*_top+"px";
	}
	odiv1.onmouseout=function(){
		osmal.style.display="none";
		odiv2.style.display="none";
	}
}