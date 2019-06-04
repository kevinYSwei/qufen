var myDate = new Date;
//获取当前年
var year = myDate.getFullYear();
//获取当前月
var month = myDate.getMonth() + 1;
//获取当前日
var date1 = myDate.getDate();
var now = year + '-' + p(month) + "-" + p(date1);


function p(s) {
		return s < 10 ? '0' + s : s;
}

export default {
	customData: function() {
		return now
	}
}