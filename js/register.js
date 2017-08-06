$(function () {
	// 获取验证码
	var timer=0;
    var freeTime=10;
	$("#get-validate-code").click(function () {
	clearInterval(timer);
	var arr=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var randoms="";
	for(var i = 0; i < 4 ;i++){
		randoms+=arr[parseInt(52*Math.random())];
	}
     $("#get-validate-code").text(freeTime+"s后重发");
     timer=setInterval(function () {
				 freeTime--;
			     $("#get-validate-code").text(freeTime+"s后重发");
			     if (freeTime==0) {
				 clearInterval(timer);
			     $("#validate-code").css("visibility", "visible");
                 $("#validate-code").html(randoms);
				 $("#get-validate-code").text("获取验证码");
				 freeTime=10;
	    }
	}, 1000);
 });
	// 普通div变成submit按钮
	$("#submit").click(function () {
		$("form").submit();
	});
	$("form").validate({ 
		// 调试模式
		// debug:true,
		//  复选框 1个
        onclick:function(element){ 
        	console.log("onclick"+element);
        	$(element).valid(); 
        },
        //  非复选框 3个
		onfocusin:function(element){ 
			eventValidate(element);
		},
        onfocusout:function(element){
           eventValidate(element);
        },
        onkeyup:function(element){ 
        	eventValidate(element);
        },
		rules:{
		"phone-number":{
			phoneReg:/^1[34578]\d{9}$/,
		  },
		"yzm":{
            yzmReg:/^[a-z]{4}$/i,
		},
		"pwd":{
			pwdReg:/^[a-z\d]{6,12}$/i,
		  },
		"repwd":{
			equalTo:"#mima1",
		  },
	    },
	    messages:{
         "repwd":{
			equalTo:"",
		  },
	    },
     submitHandler:function (form) {
     	// 验证码判断
     	if ($("#erweimamingpian").val().toUpperCase()!=$("#validate-code").html().toUpperCase()) {
             alert("验证码错误,请重新输入！");
             return;
           }
     	    var keys=localStorage.length;
     	    var flag=true;
            console.log("localStorage的长度为"+keys);
            if (keys!=0) {
            for (var i = 0; i <keys; i++) {
            	if ($("#shouji").val()==localStorage.key(i)) {
                    flag=false;
                    break;
            	}
              }
              if (flag) {
                 localStorage.setItem($("#shouji").val(),
            	     $("#mima1").val());
              }else{
              	alert("用户名已存在,请重新输入！");
              	return;
              }
            }else {
            	localStorage.setItem($("#shouji").val(),
            	     $("#mima1").val());
            }
     	   form.submit();
     },
     invalidHandler:function (){
       $("#phoneReg").text("手机号码不合法");
       $("#yzmReg").text("验证码不合法");
       $("#pwdReg").text("登录密码不合法");
       $("#repwdReg").text("两次密码输入不相同 ");
     },
	});
	//单个元素的
	$.validator.addMethod("phoneReg",function(value,element,params){
		return params.test(value);
	},"");
	$.validator.addMethod("yzmReg",function(value,element,params){
		return params.test(value);
	},"");
	$.validator.addMethod("pwdReg",function(value,element,params){
		return params.test(value);
	},"");
	function eventValidate(element) {
		if ($(element).valid()) {
              switch (element) {
              	case $("#shouji")[0]:
                     $(".icon-shouji").css('color', "green").css('borderColor', "green");
                     $("#shouji").css('borderColor', "green");
                     $("#phoneReg").css('visibility', 'hidden');
              		 break;
                case $("#erweimamingpian")[0]:
                     $(".icon-erweimamingpian").css('color', "green").css('borderColor', "green");
                     $("#erweimamingpian").css('borderColor', "green");
                     $("#yzmReg").css('visibility', 'hidden');
              		 break;
                case $("#mima1")[0]:
                     $(".icon-mima1").css('color', "green").css('borderColor', "green");
                     $("#mima1").css('borderColor', "green");
                     $("#pwdReg").css('visibility', 'hidden');
              		 break;
              	case $("#mima2")[0]:
              	     if ($("#mima2").val()!="") {
	              	     $(".icon-mima2").css('color', "green").css('borderColor', "green");
	                     $("#mima2").css('borderColor', "green");
	                     $("#repwdReg").css('visibility', 'hidden');
              	     }
              		 break;
              	default:
              		break;
              }
			}else{
			  switch ((element)) {
              	case $("#shouji")[0]:
                     $("#phoneReg").text("手机号码不合法");
                     $(".icon-shouji").css('color', "red").css('borderColor', "red");
                     $("#shouji").css('borderColor', "red");
                     $("#phoneReg").css('visibility', 'visible');
              		 break;
                case $("#erweimamingpian")[0]:
                     $("#yzmReg").text("验证码不合法");
                     $(".icon-erweimamingpian").css('color', "red").css('borderColor', "red");
                     $("#erweimamingpian").css('borderColor', "red");
                     $("#yzmReg").css('visibility', 'visible');
              		 break;
                case $("#mima1")[0]:
                     $("#pwdReg").text("登录密码不合法");
                     $(".icon-mima1").css('color', "red").css('borderColor', "red");
                     $("#mima1").css('borderColor', "red");
                     $("#pwdReg").css('visibility', 'visible');
              		 break;
              	case $("#mima2")[0]:
                     $("#repwdReg").text("两次密码输入不相同 ");
                     $(".icon-mima2").css('color', "red").css('borderColor', "red");
                     $("#mima2").css('borderColor', "red");
                     $("#repwdReg").css('visibility', 'visible');
              		 break;
                default:
              		break;
              }
			}
	}
	// 密码隐藏显示的效果
	// 先是隐藏按钮
	$(".icon-mimayincang1").click(function() {
		$("#mima1").attr("type","text");
		$(this).css("display","none");
		$(".icon-password-show1").css("display", "inline-block");
	});
	$(".icon-password-show1").click(function() {
	    $("#mima1").attr("type","password");
		$(this).css("display","none");
		$(".icon-mimayincang1").css("display", "inline-block");
		
	});
	$(".icon-mimayincang2").click(function() {
		$("#mima2").attr("type","text");
		$(this).css("display","none");
		$(".icon-password-show2").css("display", "inline-block");
	});
	$(".icon-password-show2").click(function() {
		$("#mima2").attr("type","password");
		$(this).css("display","none");
		$(".icon-mimayincang2").css("display", "inline-block");
	});
	// 已注册？立即登录
	$("#already-register").on("click",function () {
		location.href="login.html";
	});
});