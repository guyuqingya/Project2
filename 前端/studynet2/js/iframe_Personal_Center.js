var app = new Vue({
    el:'#app',
    data(){
        return {
            name:'',
            user_id:'',
            sex:'',
            email:'',
            role:'',


            send_email:'',
            change_pass:'',
            change_repass:'',
            yzm:'',
            old_email:'',
            email_yzm:'',
            new_email:'',

            bj_name:'',
            bj_email:'',
            bj_passwd:'',
            select_sex_1:'男',
            select_role_1:'学生',

            pass_content:'发送验证码',
            pass_totaltime:60,
            pass_canClick:true,

            email_content:'发送验证码',
            email_totaltime:60,
            email_canClick:true,
        }
    },
    mounted(){
        axios({
            url: 'request_user_info',
            method: 'POST',
            params: {
                User:localStorage.getItem("user_id"),
            },
            contentType: "application/json",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=>{
            // alert(JSON.stringify(res.data))
            this.name = res.data.name
            this.user_id = res.data.id
            this.sex = res.data.sex
            this.email = res.data.email
            if(res.data.role == "student")
            {
                this.role = "学生"
            }
        })
    },
    methods:{
        send_email_yzm(){
            if(this.old_email == '')
            {
                alert("请输入邮箱！")
            }else{
                if(!this.email_canClick) return
                this.email_canClick = false
                this.email_content = this.email_totaltime + 's后重发'
                let clock = window.setInterval(()=>{
                    this.email_totaltime--
                    this.email_content = this.email_totaltime + 's后重发'
                    if(this.email_totaltime < 0){
                        window.clearInterval(clock)
                        this.email_content = '发送验证码'
                        this.email_totaltime = 60
                        this.email_canClick = true
                    }
                },1000)
            }
        },
        pass_yzm(){
            if(this.send_email == '')
            {
                alert("请输入邮箱！")
            }else{
                if(!this.pass_canClick) return
                this.pass_canClick = false
                this.pass_content = this.pass_totaltime + 's后重发'
                let clock = window.setInterval(()=>{
                    this.pass_totaltime--
                    this.pass_content = this.pass_totaltime + 's后重发'
                    if(this.pass_totaltime < 0){
                        window.clearInterval(clock)
                        this.pass_content = '发送验证码'
                        this.pass_totaltime = 60
                        this.pass_canClick = true
                    }
                },1000)
            }
        },
        select_role(){
            this.select_role_1 = document.getElementById('select_role').value
        },
        select_sex(){
            this.select_sex_1 = document.getElementById('select_sex').value;

        },
        email_send(){
            document.getElementById('old_email').readOnly="readonly"
        },
        email_change(){

        },
        pass_change(){

        },
        pass_send(){
            document.getElementById('email').readOnly="readonly"
        },
        save(){
            if(!(this.select_sex_1 == '男' || this.select_sex_1 == '女')){
                alert("性别错误！")
            }else if(this.bj_passwd != "" &&this.bj_passwd.length < 8)
            {
                alert("密码长度不能小于8位！")
            }else{
                axios({
                    url: 'request_user_update',
                    method: 'POST',
                    params: {
                        Operator:'',
                        Userid:localStorage.getItem("user_id"),
                        Name:this.bj_name,
                        Sex:this.select_sex_1,
                        Passwd:this.bj_passwd,
                        EmailAddress:this.bj_email,
                        Logo:'',
                        Role:'',
                    },
                    contentType: "application/json",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res=>{
                    if(res.data == "Success"){
                        alert("资料修改成功！")
                        window.location.href = "./iframe_Personal_Center.html"
                    }else{
                        alert("资料修改失败！")
                    }
                })
            }
        },
        cancel(){
            document.getElementById('save').style.display = "none"
            document.getElementById('cancel').style.display = "none"
            document.getElementById('show_info').style.display = "block"
            document.getElementById('bj_info').style.display = "none"

        },
        bianji(){
            document.getElementById('show_info').style.display = "none"
            document.getElementById('bj_info').style.display = "block"
            document.getElementById('save').style.display = "block"
            document.getElementById('cancel').style.display = "block"
        },
        change_tou(){

        },
        jiben_info(){
            document.getElementById('jiben_info').className = "active"
            // document.getElementById('changee_password').className = ""
            document.getElementById('bind_eamil').className = ""
            document.getElementById('div1').style.display = "block"
            // document.getElementById("div2").style.display = "none"
            document.getElementById('div3').style.display = "none"
        },
        changee_password(){
            document.getElementById('jiben_info').className = ""
            // document.getElementById('changee_password').className = "active"
            document.getElementById('bind_eamil').className = ""
            document.getElementById('div1').style.display = "none"
            // document.getElementById("div2").style.display = "block"
            document.getElementById('div3').style.display = "none"
        },
        bind_eamil(){
            document.getElementById('jiben_info').className = ""
            // document.getElementById('changee_password').className = ""
            document.getElementById('bind_eamil').className = "active"
            document.getElementById('div1').style.display = "none"
            // document.getElementById("div2").style.display = "none"
            document.getElementById('div3').style.display = "block"
        },
    },
})