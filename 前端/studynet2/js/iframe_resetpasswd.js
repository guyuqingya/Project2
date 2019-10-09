var app = new Vue({
    el:'#app',
    data(){
        return {
            new_pass:'',
            re_pass:'',
        }
    },
    methods:{
        reset_passwd()
        {
            if(this.new_pass == '' || this.re_pass == "")
            {
                alert("请输入密码！")
            }else{
                var user = this.get_id('user');
                var vcode = this.get_vcode('vcode');
                axios({
                    url: 'request_user_activate',
                    method: 'GET',
                    params: {
                        User:user,
                        Vcode:vcode,
                        Passwd:this.new_pass,
                    },
                    contentType: "application/json",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res=>{
                    if(res.data = "Success")
                    {
                        alert("密码重置成功！")
                        window.location.href = "./index.html"
                    }else {
                        alert("密码重置失败！")
                    }
                })
            }
        },
        get_id(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
            if(r!=null)return  unescape(r[2]); return null;
            alert(unescape(r[2]))
        },
        get_vcode(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
            if(r!=null)return  unescape(r[2]); return null;
        },
    }

})