     
     $(function(){
     	var arrInput = document.getElementsByTagName("input");
     	
     		$("input[type='button']").click(function(){
     			var xhr = createXHR();
					xhr.open("POST", "http://localhost/login.php", true);
					xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
					xhr.send("username="+arrInput[0].value + "&password="+arrInput[1].value);
					xhr.onreadystatechange = function(){
						if (xhr.readyState==4 && xhr.status==200){
							
							var obj = JSON.parse(xhr.responseText);
							
							if (obj.status == 1){ //成功
								alert(obj.msg);
							}
							else if (obj.status == 0){ //失败
								alert(obj.msg);
							}
							else {
								alert(obj.msg);								
							}
						}
					}
     		})
							
				
     })
       