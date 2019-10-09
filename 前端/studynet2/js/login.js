/*clic = document.getElementsByTagName("button")[0];
clic.onclick = function login()
{
	window.location.href = "../back/back.html";
	document.form.submit();
}*/

document.getElementsByClassName("commit")[0].onclick = function() {
        var user = document.getElementById("backname").value;
        var password = document.getElementById("backpasswd").value;

        if(user == "")
        {
            alert("用户名不能为空！")
        }else if(password == ""){
            alert("密码不能为空！")
        }else{
            axios({
                url: 'request_user_login',
                method: 'POST',
                params: {
                    User: user,
                    Passwd: password
                },
                contentType: "application/json",
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((res) => {
                if(res.data == "Login Failed" ){
                    alert("登录失败！")
                    console.log("用户名或密码错误");
                    /*  var tip = document.getElementById("t-one");
                      tip.style.display = "flex";
                      setTimeout("document.getElementById('t-one').style.display = 'none'", 1200);*/
                    document.getElementById("backname").value = "";
                    document.getElementById("backpasswd").value = "";
                }else{
                    localStorage.setItem("user_name",user);
                    localStorage.setItem("Role",res.data)
                    window.location.href = "back.html";

                }
            });
        }
    }
	
/*	var intr = document.getElementById('reminder');
	document.getElementsByClassName("commit")[0].onclick = function() {
	        var email = document.getElementById("backname").value;
	         console.log(email);
	        var password = document.getElementById("backpasswd").value;
	         console.log(password);
	
	        var data = { email, password };
	        console.log(data);
	
	        axios({
	            url: 'http://192.168.100.180:8080/cloud_class/login',
	            method: 'POST',
	            params: {
	                email: email,
	                password: password
	            },
	            contentType: "application/json",
	            headers: {
	                'Content-Type': 'application/json'
	            }
	        }).then((res) => {
	            console.log(res.data);
				if (res.data == ""){
					intr.style.display = "block";
				}
				else{
					console.log("222");*/
					/*document.getElementById("backname").value = "";
					document.getElementById("backpasswd").value = "";*/
			/*		window.location.href = "../back/back.html";
				}
	        }).catch( (err) => {
				console.log(err);
				});
	    }*/
		
// document.getElementsByClassName("commit")[0].onclick = function(){
// 	window.location.href = "./back.html";
// }