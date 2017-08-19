$(function(){
	// 小图被点击以后两个大图分别获取其链接
	$(".minsmall img").click(function(){
		var src=$(this).attr("src")
		//console.log(src)
		$(".centpic").attr("src",src)
		$("body").children().find($("#big").attr("src",src))
	})
	// 尺码背景色改变
	$(".baohan span").click(function(){
		$(this).css("background","#bf0200").siblings().css("background","#fff")
	})
	// $(".shuliang .shao").click(function(){
	// 	//console.log(num)
	// 	var num=parseInt($(".shuliang #dnum").val());
	// 	console.log(num)
	// })
	// 以下为点击事件以后数量的变化
	$(".shuliang .shao").click(function(){
		var num=parseInt($(".shuliang #dnum").val());
		num-=1;
		$(".shuliang #dnum").val(num);
	})
	$(".shuliang .duo").click(function(){
		var num=parseInt($(".shuliang #dnum").val());
		num+=1;
		$(".shuliang #dnum").val(num);
	})
	$(".dadd").click(function(){
		var num=parseInt($(".num").html());
		num+=1;
		$(".num").html(num)
	})
	// 以下为商品详细介绍部分点击以后的显示隐藏
	var $dbtn_span=$(".dbtn span")
	$dbtn_span.click(function(){
		var index=parseInt($dbtn_span.index(this))+1;
		//console.log(index)
		//console.log($(".jieshao div").eq(index))
		$(this).css("background","url(../images/bj2.jpg) center 0 no-repeat").siblings().css("background","url(../images/bj1.jpg) center 0 no-repeat");
		$(".jieshao div").eq(index).css("display","block").siblings().not(".dbtn").css("display","none")
	})
})
