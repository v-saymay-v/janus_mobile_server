$(function(){
	$(".gnav .acd_head").click(function(){
		$(this).toggleClass("is-active");
		$(this).siblings().removeClass("is-active");
	});
	
	$(".menu").click(function(){
		$(".side_nav, .menu").toggleClass("is-active");
	});
});