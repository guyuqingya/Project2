var app = new Vue({
    el:"#app",
    data(){
        return {

        }
    },
    mounted(){
        if(localStorage.getItem("login_status") == "true")
        {
            document.getElementById("people").style.display = 'flex';
            document.body.style.overflow = "";
            document.getElementById("js-login").style.display = 'none';
            document.getElementById("mask").style.display = 'none';
            document.getElementById("login-interface").style.display = 'none';
        }

    }
})