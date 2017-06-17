


//创建xhr对象
function createXHR(){
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest(); //IE7+,谷歌，火狐..
	}
	return new ActiveXObject("Microsoft.XMLHTTP"); //IE6
}
			
/*
 	ajax({
		type: "get",  
		url: "http://60.205.181.47/myPHPCode2/checkname.php",  
		async: true,  
		data:{},  
		
		//success
		success: function(responseData){
			console.log("success");
		},
		//error
		error: function(){
			console.log("error");
		}
	});
*/

//js 逻辑性 
//语言基础: C，C++
//高等数学， 线性代数， 离散数学， 概率论，... 数据库，计算机原理， 计算机软件设计， 数据结构， 算法设计， 计算机网络， 设计模式...
// AI: 机器学习，深度学习.
// 微软： 
// Facebook: 
// 谷歌：alpha狗， master
// 百度：2004, 
// 腾讯：2016.4月
// 阿里巴巴：
// 京东：

function ajax(obj){
	
	//1, xhr对象
	var xhr = createXHR();
	
	//2, open()
	var paramStr = param(obj.data);
	if (obj.type.toLowerCase() == "get"){
		obj.url +=  paramStr ? ("?"+paramStr) : "";
	}
	xhr.open(obj.type, obj.url, obj.async);
	
	//3, send()
	if (obj.type.toLowerCase() == "get"){
		xhr.send(null);
	}
	else if (obj.type.toLowerCase() == "post"){
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(paramStr);
	}
	
	//4,接收数据
	if (obj.async){ //异步
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4){
				callback();
			}
		}
	}
	else { //同步
		callback();
	}
	
	function callback(){
		//success
		if (xhr.status == 200){
			if (obj.success) {
				obj.success(xhr.responseText); //成功后的回调，并把数据返回
			}
		}
		//error
		else {
			if (obj.error){
				obj.error(xhr.status); //失败后的回调， 把状态码返回
			}
		}
	}
	
	
}

//{regname:"zhangsan", pwd: "123456"} => regname=zhangsan&pwd=123456
function param(obj){
	var arr = [];
	for (var key in obj){
		var str = key + "=" + obj[key]; //regname=zhangsan
		arr.push(str);
	}
	//["regname=zhangsan", "pwd=123456"]
	return arr.join("&"); //regname=zhangsan&pwd=123456
}



