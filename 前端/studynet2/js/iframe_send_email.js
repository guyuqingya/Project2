var app = new Vue({
    el:'#app',
    data(){
        return {
            send_email: '',
            new_pass:'',
            re_pass:'',
            yzm:'',
            content:'发送验证码',
            totaltime:10,
            canClick:true,
        }
    },
    methods:{
        send_yzm()
        {

            if(this.send_email == '')
            {
                alert("请输入邮箱！")
            }else{
                if(localStorage.getItem("totaltime") > 0)
                {
                    this.totaltime = localStorage.getItem("totaltime")
                    if(!this.canClick) return
                    this.canClick = false
                    this.content = this.totaltime + 's后重发'
                    let clock = window.setInterval(()=>{
                        this.totaltime--
                        localStorage.setItem("totaltime",this.totaltime)
                        this.content = this.totaltime + 's后重发'
                        if(this.totaltime < 0){
                            window.clearInterval(clock)
                            this.content = '发送验证码'
                            this.totaltime = 10
                            this.canClick = true
                        }
                    },1000)
                }else if(localStorage.getItem("totaltime") < 0)
                {
                    this.totaltime = 10
                    axios({
                        url: 'request_user_reset',
                        method: 'GET',
                        params: {
                            EmailAddress:this.send_email,
                        },
                        contentType: "application/json",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res=>{
                        if(!this.canClick) return
                        this.canClick = false
                        this.content = this.totaltime + 's后重发'
                        let clock = window.setInterval(()=>{
                            this.totaltime--
                            localStorage.setItem("totaltime",this.totaltime)
                            this.content = this.totaltime + 's后重发'
                            if(this.totaltime < 0){
                                window.clearInterval(clock)
                                this.content = '发送验证码'
                                this.totaltime = 10
                                this.canClick = true
                            }
                        },1000)
                        if(res.data = "Success")
                        {
                            alert("验证码发送成功，请到邮箱查收！")
                        }
                    })
                }


            }
        },
    }

})