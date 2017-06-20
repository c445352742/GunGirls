Vue.prototype.$ajax=axios
var app2=new Vue({
    el: "#app",
    data:{
        toggle:false,
        acc:"golang",
        pwd:"golang",
        wrongpwd:false,
        noacc:false,
        empty:false,
    },
    methods:{
        see:function () {
            console.log("input is :"+this.pwd+"  "+this.acc);
        },
        submit:function(){
            if(this.acc==""||this.pwd==""){
                this.infoini();
                this.empty=true;
            }else{
                this.myajax();
            }
        },
        infoini:function () {
            this.empty=false;
            this.wrongpwd=false;
            this.noacc=false;
        },
        myajax:function () {
            var vue=this;
            this.$ajax({
                method: 'post',
                url: '/check',
                params: {
                    // account: "",
                    account: vue.acc,
                    // password: "",
                    password: vue.pwd,
                }
            }).then(function(res){
                if(res.data=="wrong password") {
                    vue.infoini();
                    vue.wrongpwd=true;
                }
                else if(res.data=="no such account") {
                    vue.infoini();
                    vue.noacc=true;
                }
                else if(res.data=="logged in") {
                    location.href='./show'
                }
            }).
            catch(function (err) {
                console.log("catch"+err);
            })
        }
    }
});
// method="post" action="./check"
