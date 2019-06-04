import { getCode } from '@/service/user';
var show = true
var timer = null

const TIME_COUNT = 60;
var count
var handler = function(captchaObj) {
//	captchaObj.appendTo('#captcha');
	captchaObj.onReady(function() {
		$("#wait").hide();
	});
//	$('#getcode').click(function() {
		var phone = $(".phone").val()
		console.log($(".phone").val())
		if($(".phone").val() == "") {
			alert("手机号不能为空")
		} else {
			var myreg = /^1[345678]\d{9}$/;
			if(myreg.test(phone)) {
				var result = captchaObj.getValidate();
				//              console.log(result)

				if(!result) {
					return alert('请完成验证');
				} else {
					//发送获取验证码的接口请求

					if(show) { //倒计时内只能点一次
						console.log(111)
						getCode({
							phone: $(".phone").val(),
							module: "register"
						});
					}

					if(!timer) {
						 count = TIME_COUNT;
						show = false;
						timer = setInterval(() => {
							if(count > 0 && count <= TIME_COUNT) {
								console.log(count)
								count--;
								vm.$emit("count1",count)
							} else {
								show = true;
								clearInterval(timer);
								timer = null;
							}
						}, 1000)
					}
				}
			}

		}

	$('#getBtn').click(function () {
            // 调用之前先通过前端表单校验
            captchaObj.verify();
        });
	// 更多接口说明请参见：http://docs.geetest.com/install/client/web-front/
};

$.ajax({ //这个地址也是需要根据自己的后台接口地址来改动
	url: "http://192.168.10.128:8081/wap/kff/startCaptcha/sendStartCaptcha?t=" + (new Date()).getTime(), // 加随机数防止缓存
	
	type: "get",
	dataType: "json",
	success: function(data) {
		console.log(data)
		var str = JSON.parse(data.data.resStr)
		console.log(str)
		// 调用 initGeetest 进行初始化
		// 参数1：配置参数
		// 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口

		initGeetest({
			// 以下 4 个配置参数为必须，不能缺少
			gt: str.gt,
			challenge: str.challenge,
			offline: !str.success, // 表示用户后台检测极验服务器是否宕机
			new_captcha: str.new_captcha, // 用于宕机时表示是新验证码的宕机

			product: "float", // 产品形式，包括：float，popup
			width: "300px"
			// 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
		}, handler);
	}
});
