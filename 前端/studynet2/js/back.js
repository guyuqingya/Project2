window.onload=function() {
    initTree("inittree");
}

function  back_exit() {
    axios({
        url: 'request_user_logout',
        method: 'POST',
        params: {
            Operator:localStorage.getItem("user_name")
        },
        contentType: "application/json",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>{
        if(res.status == 200){
            alert("退出成功！")
            localStorage.removeItem("user_name");
            localStorage.setItem("login_status", false);
            localStorage.removeItem("Role")
            window.location.href = "./login.html"
        }
    })
}
function user_guanli(){
    document.getElementById("back_course").style.display = "none"
    document.getElementById("back_user").style.display = "block"
    document.getElementById("user_guanli").className = "checked"
    document.getElementById("course_guanli").className = ""
}
function course_guanli(){
    document.getElementById("back_user").style.display = "none"
    document.getElementById("back_course").style.display = "block"
    document.getElementById("course_guanli").className = "checked"
    document.getElementById("user_guanli").className = ""
}

var btn = document.getElementsByTagName('a');
var div = document.getElementsByClassName('back_main');
for(var i = 0; i < btn.length; i++) {
	(function (n) {
		btn[n].onclick = function () {
			for (var j = 0; j < btn.length; j++) {
				btn[j].className = "";
				div[j].style.display = "none";
			}
			this.className= "checked";
			div[n].style.display = "block";
		}
	}(i))
}
var app = new Vue({
    el:'#app',
    data(){
        return{
            user_name:localStorage.getItem("user_name"),
            user:{
                id:'',
                email:'',
                role:'',
            },
            users:[],
        }
    },
    methods:{
        find_user() {
            var k = localStorage.getItem("Role")
            var user = document.getElementById("searchmail").value;
            if(user == "")
            {
                alert("用户名不能为空！")
            }else {
                axios({
                    url: 'request_user_search',
                    method: 'POST',
                    params: {
                        Role: k,
                        User: user,
                    },
                    contentType: "application/json",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    alert(res.data.length)
                    // if(res.data.length<=0)
                    // {
                    //     alert("查询结果为空！")
                    // }else{
                        this.users = []
                        for(var i=0;i<res.data.length;i++)
                        {
                            var user = res.data[i]
                            this.users.push(user)
                        }
                    // }
                })
            }
        }
    }
})

// function ObjStory(name, email, limit) {
//     this.name = name;
//     this.email = email;
//     this.limit = limit;
// }
//
// var courseInfo = [];
// courseInfo.push(new ObjStory('1','111111111','教师'));
// courseInfo.push(new ObjStory('2','222222222','学生'));
// courseInfo.push(new ObjStory('3','333333333','学生'));
// courseInfo.push(new ObjStory('4','444444444','管理员'));
// courseInfo.push(new ObjStory('5','444444444','学生'));
// courseInfo.push(new ObjStory('6','555555555','教师'));
// window.onload = function () {
//
//
//     for (var i = 0; i < courseInfo.length; i++){
//         //创建行
//         var trObj = document.createElement("tr");
//         //创建单元格数组
//         var tdObj = [];
//         //创建每个单元格并赋值
//         var nameObj = document.createElement("td");
//         nameObj.innerText = courseInfo[i].name;
//         var emailObj = document.createElement("td");
//         emailObj.innerText = courseInfo[i].email;
//         var limitObj = document.createElement("td");
//         limitObj.innerText = courseInfo[i].limit;
//
//         //将单元格放入单元格数组
//         tdObj.push(nameObj);
//         tdObj.push(emailObj);
//         tdObj.push(limitObj);
//
//         //将单元格放入行
//         for (var j = 0; j < tdObj.length; j++) {
//             trObj.appendChild(tdObj[j]);
//         }
//         //将行放入表格
//         document.getElementsByClassName("inf_function_main")[0].appendChild(trObj);
//     }
//   /* for (var i = 0; i < tdObj.length; i++){
//         trObj.appendChild(tdObj[i]);
//     }*/
// };

