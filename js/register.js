

$(function(){
	  var arrInput=document.getElementsByTagName("input")
	$("input[type='button']").click(function(){
		
//							if($("input").eq(0).val())

                        if($("#username").val()&&$("#password").val()&&$("#password").val()==$("#password2").val())
                       {
			    		var xhr = createXHR();
				     	xhr.open("POST", "http://localhost/register.php", true);
				     	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				     	xhr.send("username="+arrInput[0].value + "&password="+arrInput[1].value);
				     		xhr.onreadystatechange = function(){
						if (xhr.readyState==4 && xhr.status==200){
							//console.log("success");
							console.log(xhr.responseText);
							
							var obj = JSON.parse(xhr.responseText);
							
							if (obj.status == 1){ //成功
								console.log(obj.msg);
							}
							else if (obj.status == 0){ //失败
								console.log(obj.msg);
							}
							else {
								console.log(obj.msg);								
							}
						}
					}
			    	   alert("注册成功")
			    	}
				         	
				         	
				        else
				        {
				        	alert("请输入正确的注册信息");
				        }
				        
	})
		

})
