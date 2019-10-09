window.onload = function() {

    ////////////////////// 登录弹框
    pop_up();

    ///点击登录或注册时显示隐藏
    click_reg_log();

    ///进入云课堂
    gotoclassyun();

    //  获取推荐课程内容
    getrecommed_course("course-recommend");

    //点击分类课程
    var sort_a = document.getElementById("sort").getElementsByTagName("a");
    for (var i = 0; i < sort_a.length; i++) {
        // console.log(sort_a[i].innerHTML);
        Home(sort_a[i]);
    }

    //点击首页
    var p1 = document.getElementById("page1");
    Home(p1);

    //点击课程
    var p2 = document.getElementById("page2");
    Home(p2);

    //验证码
    verity();

    //注册
    register();

    login_status();
}

var t;

function login_status() {
    localStorage.getItem("email");
    if (localStorage.getItem("login_status") == "true") {
        document.getElementById("people").style.display = 'flex';
        document.getElementById("js-login").style.display = 'none';
    }
}

//点击注册
function register() {
    document.getElementById("next").onclick = function() {
        var user = document.getElementById("sign-up-userid").value;
        var password1 = document.getElementById("sign-up-password").value;
        var password2 = document.getElementById("sign-up-again-password").value;
        var email = document.getElementById("sign-up-email").value
        var vcode = document.getElementById("verify-num").value;
        if (email != localStorage.getItem("user_add_email")) {
            alert("邮箱被修改，请重新获取验证码！")
        } else {
            if (user == "") {
                alert("帐号不能为空！")
            } else if (email == "") {
                alert("邮箱不能为空！")
            } else if (password1 == "") {
                alert("密码不能为空！")
            } else if (password2 == "") {
                alert("请确认密码！")
            } else if (password1 != password2) {
                alert("两次密码不一致，请重新输入！")
            } else if (vcode == "") {
                alert("请输入验证码！")
            } else {
                axios({
                    url: 'request_user_activate',
                    method: 'POST',
                    params: {
                        User: user,
                        Vcode: vcode,
                        Passwd: password1,
                    },
                    contentType: "application/json",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    if (res.data == "User isn't Legal") {
                        alert("帐号格式不合法！")
                    } else if (res.data == "User Exist") {
                        alert("帐号已存在！")
                    } else if (res.data == "Passwd Isn't Legal") {
                        alert("密码格式不合法！")
                    } else if (res.data == "Vcode Isn't Vaild") {
                        alert("验证码已失效！")
                    } else if (res.data == "User Not Match Vcode") {
                        alert("验证码错误！")
                    } else if (res.data == "Success") {
                        alert("注册成功,请进行登录！");
                        document.body.style.overflow = "";
                        document.getElementById("mask").style.display = "none";
                        document.getElementById("login-interface").style.display = "none";
                        localStorage.removeItem("user_add_email");
                    }
                })
            }
        }

    }
}

//发送验证码
function verity() {
    $('.hmac').on('click', function() {
        var user = document.getElementById("sign-up-userid").value;
        var password1 = document.getElementById("sign-up-password").value;
        var password2 = document.getElementById("sign-up-again-password").value;
        var email = document.getElementById("sign-up-email").value
        localStorage.setItem("user_add_email", email);
        // console.log(data);
        if (user == "") {
            alert("帐号不能为空！")
        } else if (email == "") {
            alert("邮箱不能为空！")
        } else if (password1 == "") {
            alert("密码不能为空！")
        } else if (password2 == "") {
            alert("请确认密码！")
        } else if (password1 != password2) {
            alert("两次密码不一致，请重新输入！")
        } else {

            axios({
                url: 'request_user_add',
                method: 'POST',
                params: {
                    Operator: '',
                    User: user,
                    Role: 'student',
                    EmailAddress: email,
                },
                contentType: "application/json",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                //console.log(res);
                var k = 0;
                if (res.data == "Success") {
                    alert("验证码发送成功，请注意查看！验证码5分钟后失效！")

                } else if (res.data == "User Exist") {
                    alert("帐号已存在！")
                    k = 1
                } else if (res.data == "EmailAddress Exist") {
                    alert("邮箱已被注册！")
                    k = 1
                } else if (res.data == "Email Wrong") {
                    alert("邮箱格式错误！")
                    k = 1
                } else if (res.data == "Send Email Failed") {
                    alert("邮件发送失败，请重新发送！")

                }
                if (k == 0) {
                    var that = $(this)
                    var timeo = 10;
                    var timeStop = setInterval(function() {
                        timeo--;
                        if (timeo > 0) {
                            that.text('重新发送' + timeo + 's');
                            that.attr('disabled', 'disabled'); //禁止点击
                        } else {
                            timeo = 10; //当减到0时赋值为60
                            that.text('获取验证码');
                            clearInterval(timeStop); //清除定时器
                            that.removeAttr('disabled'); //移除属性，可点击
                        }
                    }, 1000)
                }
            });

        }
    })
}


function Home(name) {

    name.onclick = function functionName() {
        // console.log(name.id);
        //将所有的下划线去掉，给指定的加上
        var tag = document.getElementById("tag").getElementsByTagName("a");
        for (var i = 0; i < tag.length; i++) {
            tag[i].className = "";
        }


        if (name.id == "page1") {
            name.className = "navbar_border";

            document.getElementById("home2").className = "main_hide";
            document.getElementById("home1").className = "main_show";
        } else {
            document.getElementById("page2").className = "navbar_border";

            //将第二个页面上home2div的内容清空
            var father = document.getElementById("home2");
            father.innerHTML = "";

            //创建结构
            var new_h4 = document.createElement("h4");
            new_h4.innerText = this.innerText;
            console.log(new_h4.innerText);
            new_h4.className = "course-hd";
            father.appendChild(new_h4);

            var new_div = document.createElement("div");
            new_div.id = this.innerText;
            new_div.className = "course-bd";
            father.appendChild(new_div);

            getrecommed_course(new_div.id); //获取课程详情

            document.getElementById("home1").className = "main_hide";
            document.getElementById("home2").className = "main_show";
        }


    }
}


function click_reg_log() { //点击注册
    var regObj = document.getElementById("reg");
    regObj.onclick = function() {
        regObj.style.borderBottom = "2px solid #5716ac";
        document.getElementById("log").style.borderBottom = "2px solid #ccc";
        document.getElementById("login-write-frame").style.display = "none"
        document.getElementById("reg-write-frame").style.display = "flex";
        var x = document.getElementsByName("kong1");
        console.log("注册的input" + x.length);
        for (var i = 0; i < x.length; i++) {
            x[i].value = "";
        }
    }

    //点击登录
    var loginObj = document.getElementById("log");
    loginObj.onclick = function() {
        // document.getElementById("login-write-frame".load(location.href + " #login-write-frame"));
        loginObj.style.borderBottom = "2px solid #5716ac";
        document.getElementById("reg").style.borderBottom = "2px solid #ccc";
        document.getElementById("login-write-frame").style.display = "flex";
        document.getElementById("reg-write-frame").style.display = "none";
        var x = document.getElementsByName("kong0");
        console.log("登录的input" + x.length);
        for (var i = 0; i < x.length; i++) {
            x[i].value = "";
        }
    }
}

function pop_up() { // ////////////////////// 登录弹框
    var loObj = document.getElementById("js-login");
    loObj.onclick = function() {
        var maskObj = document.getElementById("mask");
        maskObj.style.display = "flex";
        document.body.style.overflow = "hidden";
        var login_frame = document.getElementById("login-interface");
        login_frame.style.display = "flex";
        document.getElementById("log").style.borderBottom = "2px solid #5716ac";
        document.getElementById("reg").style.borderBottom = "2px solid #ccc";
        document.getElementById("login-write-frame").style.display = "flex";
        document.getElementById("reg-write-frame").style.display = "none";
        var x = document.getElementsByName("kong0");
        console.log("登录的input" + x.length);
        for (var i = 0; i < x.length; i++) {
            x[i].value = "";
        }
    }

    var close = document.getElementById("login-close");
    close.onclick = function() {
        document.body.style.overflow = "";
        document.getElementById("mask").style.display = "none";
        document.getElementById("login-interface").style.display = "none";
    }
}

//点击登录
function gotoclassyun() { /////进入云课堂
    document.getElementById("login-in").onclick = function() {
        var user = document.getElementById("sign-in-userid").value;
        // console.log(username);
        var password = document.getElementById("sign-in-password").value;
        // console.log(password);

        if (user == '' || password == "") {
            alert("用户名或密码不能为空");
        } else {
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
                }
            }).then((res) => {
                if (res.data == "student") {
                    alert("登录成功！")
                    document.getElementById("people").style.display = 'flex';
                    document.body.style.overflow = "";
                    document.getElementById("js-login").style.display = 'none';
                    document.getElementById("mask").style.display = 'none';
                    document.getElementById("login-interface").style.display = 'none';
                    localStorage.setItem("user_id", user);
                    localStorage.setItem("login_status", "true");
                    document.getElementById("page3").style.display = "none";
                } else if (res.data == "teacher" || res.data == "admin" || res.data == "root") {
                    alert("登录成功！")
                    document.getElementById("people").style.display = 'flex';
                    document.body.style.overflow = "";
                    document.getElementById("js-login").style.display = 'none';
                    document.getElementById("mask").style.display = 'none';
                    document.getElementById("login-interface").style.display = 'none';
                    localStorage.setItem("user_id", user);
                    localStorage.setItem("login_status", "true");
                    document.getElementById("page3").style.display = "block";
                } else if (res.data == "Login Failed") { //错误
                    alert("用户名或密码错误");
                    var tip = document.getElementById("t-one");
                    tip.style.display = "flex";
                    setTimeout("document.getElementById('t-one').style.display = 'none'", 1700);
                    document.getElementById("sign-in-userid").value = "";
                    document.getElementById("sign-in-password").value = "";
                    localStorage.setItem("login_status", "false");
                    document.getElementById("page3").style.display = "none";

                }
            });
        }
    }
}
//个人中心
function person_center() {
    window.location.href = "./Personal_Center.html"
}

//退出
function quit() {

    axios({
        url: 'request_user_logout',
        method: 'POST',
        params: {
            Operator: localStorage.getItem("user_id")
        },
        contentType: "application/json",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status == 200) {
            alert("退出成功！")
            localStorage.removeItem("user_id");
            localStorage.setItem("login_status", false);
            document.getElementById("people").style.display = 'none';
            document.getElementById("js-login").style.display = 'flex';
            window.location.href = "./index.html"
        }
    })
}

var temp = 0;

function getrecommed_course(name) { ////  获取推荐课程内容
    var list = new Array();
    var cos_recommed = document.getElementById(name);
    var div = 1;
    console.log("名称+" + name);
    axios({
        url: 'trequest_course_lis',
        method: 'POST',
        params: {
            tag: name,
        },
        contentType: "application/json",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.data.length <= 0) {
            var recommed_div = document.createElement("div");
            cos_recommed.appendChild(recommed_div);
            var data = "暂无课程，敬请期待!";
            var recommed_p = document.createElement("p");
            recommed_p.innerText = data;
            recommed_div.appendChild(recommed_p);
        } else {
            for (var i = 0; i < res.data.length; i++) {
                list[i] = {
                    'course_img': "data:image/png;base64," + res.data[i].image,
                    'course_title': res.data[i].course_name,
                    'course_introduce': res.data[i].introduce,
                    'course_id': res.data[i].id,
                }
            }
            console.log("推荐课程数 = " + list.length);

            // var name = "course-recommend";



            if (list.length != 0) {
                for (var i = 0; i < list.length; i++) {
                    var recommed_div = document.createElement("div");
                    recommed_div.id = name + "-" + div;

                    recommed_div.addEventListener("click", function(event) {
                        var target = event.target;
                        console.log(target);
                        if (target.nodeName == "IMG" || target.nodeName == "H3" || target.nodeName == "P") {
                            // console.log(target);
                            // console.log(this);
                            var rec_value = this.getElementsByTagName("input")[0].value;
                            console.log(rec_value);

                            if (login_status) {
                                window.location.href = "home.html?value=" + rec_value;
                                // window.location.href = "home.html"
                            } else {
                                var maskObj = document.getElementById("mask");
                                maskObj.style.display = "flex";
                                document.body.style.overflow = "hidden";
                                var login_frame = document.getElementById("login-interface");
                                login_frame.style.display = "flex";
                                document.getElementById("log").style.borderBottom = "2px solid #5716ac";
                                document.getElementById("reg").style.borderBottom = "2px solid #ccc";
                                document.getElementById("login-write-frame").style.display = "flex";
                                document.getElementById("reg-write-frame").style.display = "none";
                                var x = document.getElementsByName("kong0");
                                console.log("登录的input" + x.length);
                                for (var i = 0; i < x.length; i++) {
                                    x[i].value = "";
                                }
                            }
                        }
                    })

                    // console.log(recommed_div.id);
                    cos_recommed.appendChild(recommed_div);
                    div++;

                    var recommed_img = document.createElement("img");
                    var recommed_h = document.createElement("h3");
                    var recommed_p = document.createElement("p");
                    var recommed_input = document.createElement("input");

                    recommed_img.src = list[i].course_img;
                    recommed_img.width = "250";
                    recommed_img.height = "200";

                    recommed_h.innerText = list[i].course_title;

                    recommed_p.innerText = list[i].course_introduce;

                    recommed_input.style.display = "none";
                    recommed_input.value = list[i].course_id;

                    recommed_div.appendChild(recommed_img);
                    recommed_div.appendChild(recommed_h);
                    recommed_div.appendChild(recommed_p);
                    recommed_div.appendChild(recommed_input);
                }
            }
        }
    })

    // list[0] = {
    //     'course_img': "./images/课程.png",
    //     'course_title': "<Linux基础入门>",
    //     'course_introduce': "简介简介简介简介简介简介简介简介简介简介简介简介简介",
    //     'course_id': "0001",
    // };
    //
    // list[1] = {
    //     'course_img': "./images/课程.png",
    //     'course_title': "<Linux基础入门>",
    //     'course_introduce': "简介简介简介简介简介简介简介简介简介简介简介简介简介",
    //     'course_id': "0002",
    // }
    // list[2] = {
    //     'course_img': "./images/课程.png",
    //     'course_title': "<Linux基础入门>",
    //     'course_introduce': "简介简介简介简介简介简介简介简介简介简介简介简介简介",
    //     'course_id': "0003",
    // }
    // list[3] = {
    //     'course_img': "./images/课程.png",
    //     'course_title': "<Linux基础入门>",
    //     'course_introduce': "简介简介简介简介简介简介简介简介简介简介简介简介简介",
    //     'course_id': "0004",
    // }
    // list[4] = {
    //     'course_img': "./images/课程.png",
    //     'course_title': "<Linux基础入门>",
    //     'course_introduce': "简介简介简介简介简简介简介简介简介简介介简介简介简介简介介简介简介简介简介简介简介简介简介",
    //     'course_id': "0005",
    // }
    // list[5] = {
    //     'course_img': "./images/课程.png",
    //     'course_title': "<Linux基础入门>",
    //     'course_introduce': "hello ",
    //     'course_id': "0006",
    // }
    // list[6] = {
    //     'course_img': "./images/课程.png",
    //     'course_title': "<Linux基础入门>",
    //     'course_introduce': "hello ",
    //     'course_id': "0007",
    // }



}