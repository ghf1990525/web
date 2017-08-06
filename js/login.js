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
	$("#login").click(function () {
		$("form").submit();
	});
	$("form").validate({ 
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
		"pwd":{
      pwdReg:/^[a-z\d]{6,12}$/i,
      },
    "yzm":{
			yzmReg:/^[a-z]{4}$/i,
		  },
	    },
     submitHandler:function (form) {
      // 验证码判断
          if ($("#erweimamingpian").val().toUpperCase()!=$("#validate-code").html().toUpperCase()) {
             alert("验证码错误,请重新输入！");
             return;
          }
     	    var keys=localStorage.length;
            if (keys!=0) {
            	var flag=false;
            for (var i = 0; i <keys; i++) {
            	if ($("#weibiaoti101").val()==localStorage.key(i)) {
            		flag=true;//有这个用户名
                break;
            	  }
              }
              if (flag) {
                   var value=localStorage.getItem($("#weibiaoti101").val());
                  if (value==$("#mima").val()) {
                    localStorage.setItem("login", $("#weibiaoti101").val());
     	              form.submit();
                  } else {
                  	alert("密码不正确,请重新输入！");
                  }
              } else {
              	  alert("用户名不存在,请重新输入！");
              }
            }else {
                   alert("用户名不存在,请重新输入！");
            }
     },
     invalidHandler:function (){
       $("#phoneReg").text("手机号码不合法");
       $("#pwdReg").text("登录密码不合法");
       $("#yzmReg").text("验证码不合法");
     },
	});
	//单个元素的
	$.validator.addMethod("phoneReg",function(value,element,params){
		return params.test(value);
	},"");
	$.validator.addMethod("pwdReg",function(value,element,params){
		return params.test(value);
	},"");
  $.validator.addMethod("yzmReg",function(value,element,params){
    return params.test(value);
  },"");
	function eventValidate(element) {
		if ($(element).valid()) {
              switch (element) {
              	case $("#weibiaoti101")[0]:
                     $(".icon-weibiaoti101").css('color', "green").css('borderColor', "green");
                     $("#weibiaoti101").css('borderColor', "green");
                     $("#phoneReg").css('visibility', 'hidden');
              		 break;
                case $("#mima")[0]:
                     $(".icon-mima").css('color', "green").css('borderColor', "green");
                     $("#mima").css('borderColor', "green");
                     $("#pwdReg").css('visibility', 'hidden');
              		 break;
                case $("#erweimamingpian")[0]:
                     $(".icon-erweimamingpian").css('color', "green").css('borderColor', "green");
                     $("#erweimamingpian").css('borderColor', "green");
                     $("#yzmReg").css('visibility', 'hidden');
                   break;
              	default:
              		break;
              }
			}else{
			  switch ((element)) {
              	case $("#weibiaoti101")[0]:
                     $("#phoneReg").text("手机号码不合法");
                     $(".icon-weibiaoti101").css('color', "red").css('borderColor', "red");
                     $("#weibiaoti101").css('borderColor', "red");
                     $("#phoneReg").css('visibility', 'visible');
              		 break;
                case $("#mima")[0]:
                     $("#pwdReg").text("登录密码不合法");
                     $(".icon-mima").css('color', "red").css('borderColor', "red");
                     $("#mima").css('borderColor', "red");
                     $("#pwdReg").css('visibility', 'visible');
              		 break;
                case $("#erweimamingpian")[0]:
                     $("#yzmReg").text("验证码不合法");
                     $(".icon-erweimamingpian").css('color', "red").css('borderColor', "red");
                     $("#erweimamingpian").css('borderColor', "red");
                     $("#yzmReg").css('visibility', 'visible');
                   break;
                default:
              		break;
              }
			}
	}
	// 密码隐藏显示的效果
	// 先是隐藏按钮
	$(".icon-mimayincang").click(function() {
		$("#mima").attr("type","text");
		$(this).css("display","none");
		$(".icon-password-show").css("display", "inline-block");
	});
	$(".icon-password-show").click(function() {
	    $("#mima").attr("type","password");
		$(this).css("display","none");
		$(".icon-mimayincang").css("display", "inline-block");
		
	});
	// 用户注册
	$("#register").on("click",function () {
		location.href="register.html";
	});
});