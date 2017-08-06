$(function () {
	var swiper=new Swiper(".swiper-container",{
		pagination:".swiper-pagination",
		paginationClickable:true,
		direction:"vertical",
		mousewheelControl:true,
		onInit:function(swiper) {
		  $("#top").addClass('top');
		  swiperAnimateCache(swiper); //隐藏动画元素 
          swiperAnimate(swiper); //初始化完成开始动画
		},
		onSlideChangeEnd:function(swiper){
			if (swiper.activeIndex==0) {
				 $("#top").addClass('top');
				 $("#top").removeClass('top1');
			}else{
                 $("#top").addClass('top1');
				 $("#top").removeClass('top');
			}
			     $("#top").css("display","none");
				 $("#top").slideDown(500);
				 swiperAnimate(swiper);
		}

	});
	// 判断是否登录
	if(localStorage.getItem("login")){
     $("#log-reg").text(localStorage.getItem("login"));
     $("#exit").css("display","inline-block");
	}else{
	 $("#exit").css("display","none");
     $("#log-reg").click(function() {
     	location.href="login.html";
     });
	}
	 $("#exit").click(function() {
	 	localStorage.removeItem("login");
	 	location.href="login.html";
	 });
});


