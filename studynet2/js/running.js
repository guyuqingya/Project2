var app = new Vue({
        el:'#app',
        data(){
            return {
                value:'',
                modal_ask:false,
                shiyan_addr:'http://119.23.63.232:7777/vnc_operate.html?path=websockify/?token=host1'
            }
        },
        mounted(){
            document.getElementById('run_view').src = this.shiyan_addr
        },
        methods:{
            offtxt(){
                document.getElementById('txt_view').style.display = "none"
                document.getElementById('run_view').style.width = "100%"
                document.getElementById('show_txt').style.display = "inline"
            },
            ontxt(){
                document.getElementById('txt_view').style.display = "block"
                document.getElementById('run_view').style.width = "69.9%"
                document.getElementById('show_txt').style.display = "none"
            },
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
            }
        },
    })