var a = GetRequest();
console.log(a);

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

var app = new Vue({
        el:'#app',
        data(){
            return {
                value:'',
                modal_ask:false,
                shiyan_addr:'',
            }
        },
        mounted(){
            axios({
                url: 'request_course_list',
                method: 'POST',
                params:{
                    course_id: a.value,
                },
                contentType: "application/json",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res=> {

            })
        },
        methods:{
            offtxt(){
                document.getElementById('txt_view').style.display = "none"
                document.getElementById('shiyan').style.width = "100%"
                document.getElementById('show_txt').style.display = "inline"
            },
            ontxt(){
                document.getElementById('txt_view').style.display = "block"
                document.getElementById('shiyan').style.width = "69.9%"
                document.getElementById('show_txt').style.display = "none"
            },
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
            }
        },
    })